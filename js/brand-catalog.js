class BrandCatalog {
    constructor() {
        this.equipmentStructure = null;
        this.currentBrand = 'daikin';
        this.currentCategory = 'indoor_units';
        this.equipmentData = {};
        this.selectedProduct = null;
        this.crossMatches = {};
        
        this.init();
    }

    async init() {
        try {
            await this.loadEquipmentStructure();
            await this.loadAllEquipmentData();
            this.setupBrandTabs();
            this.setupCategoryTabs();
            this.setupFilters();
            this.setupURLHandling();
            this.displayProducts();
        } catch (error) {
            console.error('Error initializing brand catalog:', error);
        }
    }

    async loadEquipmentStructure() {
        try {
            const response = await fetch('data/equipment-structure.json');
            this.equipmentStructure = await response.json();
        } catch (error) {
            console.error('Failed to load equipment structure:', error);
            throw error;
        }
    }

    async loadAllEquipmentData() {
        const brands = Object.keys(this.equipmentStructure.brands);
        
        for (const brandKey of brands) {
            const brand = this.equipmentStructure.brands[brandKey];
            this.equipmentData[brandKey] = {};
            
            for (const categoryKey of Object.keys(brand.categories)) {
                const category = brand.categories[categoryKey];
                try {
                    const response = await fetch(category.csv_file);
                    const csvText = await response.text();
                    this.equipmentData[brandKey][categoryKey] = this.parseCSV(csvText);
                } catch (error) {
                    console.error(`Failed to load ${brandKey} ${categoryKey} data:`, error);
                    this.equipmentData[brandKey][categoryKey] = [];
                }
            }
        }
    }

    parseCSV(csvText) {
        const lines = csvText.trim().split('\n');
        const headers = lines[0].split(',');
        const data = [];

        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',');
            const item = {};
            headers.forEach((header, index) => {
                const value = values[index]?.trim();
                // Convert numeric values
                if (!isNaN(value) && value !== '' && value !== undefined) {
                    item[header] = parseFloat(value);
                } else if (value === 'true') {
                    item[header] = true;
                } else if (value === 'false') {
                    item[header] = false;
                } else {
                    item[header] = value || '';
                }
            });
            data.push(item);
        }
        return data;
    }

    setupBrandTabs() {
        const brandTabsContainer = document.getElementById('brandTabs');
        if (!brandTabsContainer) return;

        const brands = Object.keys(this.equipmentStructure.brands);
        brandTabsContainer.innerHTML = '';

        brands.forEach(brandKey => {
            const brand = this.equipmentStructure.brands[brandKey];
            const tab = document.createElement('button');
            tab.className = `brand-tab ${brandKey === this.currentBrand ? 'active' : ''}`;
            tab.dataset.brand = brandKey;
            tab.style.borderColor = brand.color;
            
            if (brandKey === this.currentBrand) {
                tab.style.backgroundColor = brand.color;
                tab.style.color = 'white';
            }
            
            tab.innerHTML = `
                <div class="brand-tab-content">
                    <img src="${brand.logo}" alt="${brand.name}" class="brand-logo">
                    <span class="brand-name">${brand.name}</span>
                </div>
            `;
            
            tab.addEventListener('click', () => this.switchBrand(brandKey));
            brandTabsContainer.appendChild(tab);
        });
    }

    setupCategoryTabs() {
        const categoryTabsContainer = document.getElementById('categoryTabs');
        if (!categoryTabsContainer) return;

        const brand = this.equipmentStructure.brands[this.currentBrand];
        const categories = Object.keys(brand.categories);
        
        categoryTabsContainer.innerHTML = '';

        categories.forEach(categoryKey => {
            const category = brand.categories[categoryKey];
            const tab = document.createElement('button');
            tab.className = `category-tab ${categoryKey === this.currentCategory ? 'active' : ''}`;
            tab.dataset.category = categoryKey;
            
            const currentLang = localStorage.getItem('preferredLanguage') || 'ru';
            tab.textContent = currentLang === 'en' ? category.name_en : category.name;
            
            tab.addEventListener('click', () => this.switchCategory(categoryKey));
            categoryTabsContainer.appendChild(tab);
        });
    }

    setupFilters() {
        const filtersContainer = document.getElementById('filtersContainer');
        if (!filtersContainer) return;

        const brand = this.equipmentStructure.brands[this.currentBrand];
        const category = brand.categories[this.currentCategory];
        
        filtersContainer.innerHTML = '';

        category.filters.forEach(filter => {
            const filterElement = this.createFilterElement(filter);
            filtersContainer.appendChild(filterElement);
        });
    }

    createFilterElement(filter) {
        const filterDiv = document.createElement('div');
        filterDiv.className = 'filter-item';
        
        const label = document.createElement('label');
        label.textContent = filter.label || filter.name;
        label.className = 'filter-label';
        
        let input;
        
        switch (filter.type) {
            case 'range':
                input = this.createRangeFilter(filter);
                break;
            case 'select':
                input = this.createSelectFilter(filter);
                break;
            case 'boolean':
                input = this.createBooleanFilter(filter);
                break;
        }
        
        filterDiv.appendChild(label);
        filterDiv.appendChild(input);
        
        return filterDiv;
    }

    createRangeFilter(filter) {
        const container = document.createElement('div');
        container.className = 'range-filter';
        
        const minInput = document.createElement('input');
        minInput.type = 'number';
        minInput.min = filter.min;
        minInput.max = filter.max;
        minInput.step = filter.step;
        minInput.placeholder = `Мин ${filter.unit}`;
        minInput.dataset.filterName = filter.name;
        minInput.dataset.filterType = 'min';
        
        const maxInput = document.createElement('input');
        maxInput.type = 'number';
        maxInput.min = filter.min;
        maxInput.max = filter.max;
        maxInput.step = filter.step;
        maxInput.placeholder = `Макс ${filter.unit}`;
        maxInput.dataset.filterName = filter.name;
        maxInput.dataset.filterType = 'max';
        
        [minInput, maxInput].forEach(input => {
            input.addEventListener('input', () => this.applyFilters());
        });
        
        container.appendChild(minInput);
        container.appendChild(maxInput);
        
        return container;
    }

    createSelectFilter(filter) {
        const select = document.createElement('select');
        select.dataset.filterName = filter.name;
        select.className = 'filter-select';
        
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Все';
        select.appendChild(defaultOption);
        
        filter.options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.textContent = filter.labels ? filter.labels[option] : option;
            select.appendChild(optionElement);
        });
        
        select.addEventListener('change', () => this.applyFilters());
        
        return select;
    }

    createBooleanFilter(filter) {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.dataset.filterName = filter.name;
        checkbox.addEventListener('change', () => this.applyFilters());
        
        return checkbox;
    }

    switchBrand(brandKey) {
        this.currentBrand = brandKey;
        this.updateURL();
        this.setupBrandTabs();
        this.setupCategoryTabs();
        this.setupFilters();
        this.displayProducts();
        this.updateCrossMatches();
    }

    switchCategory(categoryKey) {
        this.currentCategory = categoryKey;
        this.updateURL();
        this.setupCategoryTabs();
        this.setupFilters();
        this.displayProducts();
        this.updateCrossMatches();
    }

    applyFilters() {
        this.displayProducts();
        this.updateCrossMatches();
    }

    getFilteredProducts() {
        const products = this.equipmentData[this.currentBrand][this.currentCategory];
        const filters = this.getActiveFilters();
        
        return products.filter(product => {
            return Object.entries(filters).every(([filterName, filterValue]) => {
                const productValue = product[filterName];
                
                if (filterValue.type === 'range') {
                    if (filterValue.min !== null && productValue < filterValue.min) return false;
                    if (filterValue.max !== null && productValue > filterValue.max) return false;
                }
                else if (filterValue.type === 'select') {
                    if (filterValue.value && productValue !== filterValue.value) return false;
                }
                else if (filterValue.type === 'boolean') {
                    if (filterValue.value && !productValue) return false;
                }
                
                return true;
            });
        });
    }

    getActiveFilters() {
        const filters = {};
        const filtersContainer = document.getElementById('filtersContainer');
        if (!filtersContainer) return filters;

        // Range filters
        const rangeInputs = filtersContainer.querySelectorAll('input[type="number"]');
        const rangeFilters = {};
        
        rangeInputs.forEach(input => {
            const filterName = input.dataset.filterName;
            const filterType = input.dataset.filterType;
            const value = input.value ? parseFloat(input.value) : null;
            
            if (!rangeFilters[filterName]) {
                rangeFilters[filterName] = { type: 'range', min: null, max: null };
            }
            
            rangeFilters[filterName][filterType] = value;
        });
        
        Object.entries(rangeFilters).forEach(([name, filter]) => {
            if (filter.min !== null || filter.max !== null) {
                filters[name] = filter;
            }
        });

        // Select filters
        const selects = filtersContainer.querySelectorAll('select');
        selects.forEach(select => {
            if (select.value) {
                filters[select.dataset.filterName] = {
                    type: 'select',
                    value: select.value
                };
            }
        });

        // Boolean filters
        const checkboxes = filtersContainer.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                filters[checkbox.dataset.filterName] = {
                    type: 'boolean',
                    value: true
                };
            }
        });

        return filters;
    }

    displayProducts() {
        const productsGrid = document.getElementById('productsGrid');
        if (!productsGrid) return;

        const filteredProducts = this.getFilteredProducts();
        const currentLang = localStorage.getItem('preferredLanguage') || 'ru';

        productsGrid.innerHTML = '';

        if (filteredProducts.length === 0) {
            productsGrid.innerHTML = `
                <div class="no-products">
                    <p>${currentLang === 'en' ? 'No products found' : 'Товары не найдены'}</p>
                </div>
            `;
            return;
        }

        filteredProducts.forEach(product => {
            const productCard = this.createProductCard(product);
            productsGrid.appendChild(productCard);
        });
    }

    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.dataset.productId = product.id;
        
        const brand = this.equipmentStructure.brands[this.currentBrand];
        
        card.innerHTML = `
            <div class="product-header">
                <div class="product-brand" style="color: ${brand.color}">
                    ${brand.name}
                </div>
                <div class="product-series">${product.series}</div>
            </div>
            <div class="product-image">
                <img src="assets/products/${product.image}" alt="${product.model}" loading="lazy">
            </div>
            <div class="product-info">
                <h3 class="product-model">${product.model}</h3>
                <p class="product-description">${product.description}</p>
                
                <div class="product-specs">
                    <div class="spec-item">
                        <span class="spec-label">Мощность:</span>
                        <span class="spec-value">${product.power} кВт</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Охлаждение:</span>
                        <span class="spec-value">${product.cooling_capacity} кВт</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Обогрев:</span>
                        <span class="spec-value">${product.heating_capacity} кВт</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Расход воздуха:</span>
                        <span class="spec-value">${product.airflow} м³/ч</span>
                    </div>
                </div>
                
                <div class="product-footer">
                    <div class="product-price">${product.price_rub?.toLocaleString()} ₽</div>
                    <div class="product-actions">
                        <button class="btn-compare" onclick="brandCatalog.selectForComparison('${product.id}')">
                            Сравнить
                        </button>
                        <button class="btn-add-to-cart" onclick="brandCatalog.addToCart('${product.id}')">
                            В корзину
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.product-actions')) {
                this.selectProduct(product.id);
            }
        });
        
        return card;
    }

    selectProduct(productId) {
        // Удаляем предыдущее выделение
        document.querySelectorAll('.product-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        // Добавляем выделение к выбранному продукту
        const selectedCard = document.querySelector(`[data-product-id="${productId}"]`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
        }
        
        this.selectedProduct = productId;
        this.updateCrossMatches();
    }

    selectForComparison(productId) {
        this.selectProduct(productId);
    }

    addToCart(productId) {
        const product = this.findProductById(productId);
        if (product) {
            // Здесь будет логика добавления в корзину
            console.log('Added to cart:', product);
            
            // Показываем уведомление
            this.showNotification(`${product.model} добавлен в корзину`);
        }
    }

    updateCrossMatches() {
        if (!this.selectedProduct) {
            this.clearCrossMatches();
            return;
        }

        const selectedProduct = this.findProductById(this.selectedProduct);
        if (!selectedProduct) {
            this.clearCrossMatches();
            return;
        }

        // Находим похожие продукты в других брендах
        this.crossMatches = this.findCrossMatches(selectedProduct);
        this.displayCrossMatches();
    }

    findProductById(productId) {
        for (const brandKey of Object.keys(this.equipmentData)) {
            for (const categoryKey of Object.keys(this.equipmentData[brandKey])) {
                const product = this.equipmentData[brandKey][categoryKey].find(p => p.id === productId);
                if (product) {
                    return { ...product, brand: brandKey, category: categoryKey };
                }
            }
        }
        return null;
    }

    findCrossMatches(selectedProduct) {
        const matches = {};
        const crossMatchConfig = this.equipmentStructure.cross_matching;
        
        if (!crossMatchConfig.enabled) return matches;

        const brands = Object.keys(this.equipmentStructure.brands);
        
        brands.forEach(brandKey => {
            if (brandKey === this.currentBrand) return;
            
            const brandProducts = this.equipmentData[brandKey][this.currentCategory] || [];
            const brandMatches = [];
            
            brandProducts.forEach(product => {
                const score = this.calculateMatchScore(selectedProduct, product);
                if (score > 50) { // Порог совпадения
                    brandMatches.push({ ...product, matchScore: score, brand: brandKey });
                }
            });
            
            // Сортируем по убыванию совпадения
            brandMatches.sort((a, b) => b.matchScore - a.matchScore);
            matches[brandKey] = brandMatches.slice(0, 3); // Топ 3 совпадения
        });
        
        return matches;
    }

    calculateMatchScore(selectedProduct, compareProduct) {
        let score = 0;
        const crossMatchConfig = this.equipmentStructure.cross_matching;
        const category = this.equipmentStructure.brands[this.currentBrand].categories[this.currentCategory];
        
        // Проверяем ключевые параметры
        category.filters.forEach(filter => {
            if (!filter.key_param) return;
            
            const selectedValue = selectedProduct[filter.name];
            const compareValue = compareProduct[filter.name];
            
            if (selectedValue === undefined || compareValue === undefined) return;
            
            if (filter.type === 'range') {
                const tolerance = filter.match_tolerance || 0;
                const diff = Math.abs(selectedValue - compareValue);
                
                if (diff === 0) {
                    score += crossMatchConfig.scoring.exact_match;
                } else if (diff <= tolerance) {
                    score += crossMatchConfig.scoring.within_tolerance;
                }
            } else if (filter.type === 'select') {
                if (selectedValue === compareValue) {
                    if (filter.name === 'type') {
                        score += crossMatchConfig.scoring.type_match;
                    } else {
                        score += crossMatchConfig.scoring.exact_match;
                    }
                }
            }
        });
        
        return score;
    }

    displayCrossMatches() {
        const crossMatchesContainer = document.getElementById('crossMatches');
        if (!crossMatchesContainer || Object.keys(this.crossMatches).length === 0) {
            this.clearCrossMatches();
            return;
        }

        let html = '<h3 class="cross-matches-title">Похожие товары в других брендах:</h3>';
        
        Object.entries(this.crossMatches).forEach(([brandKey, matches]) => {
            if (matches.length === 0) return;
            
            const brand = this.equipmentStructure.brands[brandKey];
            
            html += `
                <div class="cross-match-brand">
                    <h4 class="cross-match-brand-title" style="color: ${brand.color}">
                        ${brand.name}
                    </h4>
                    <div class="cross-match-products">
            `;
            
            matches.forEach(match => {
                html += `
                    <div class="cross-match-product" onclick="brandCatalog.switchToBrandProduct('${brandKey}', '${match.id}')">
                        <div class="cross-match-info">
                            <div class="cross-match-model">${match.model}</div>
                            <div class="cross-match-specs">
                                ${match.cooling_capacity} кВт | ${match.price_rub?.toLocaleString()} ₽
                            </div>
                            <div class="cross-match-score">Совпадение: ${match.matchScore}%</div>
                        </div>
                    </div>
                `;
            });
            
            html += '</div></div>';
        });
        
        crossMatchesContainer.innerHTML = html;
        crossMatchesContainer.style.display = 'block';
    }

    clearCrossMatches() {
        const crossMatchesContainer = document.getElementById('crossMatches');
        if (crossMatchesContainer) {
            crossMatchesContainer.innerHTML = '';
            crossMatchesContainer.style.display = 'none';
        }
    }

    switchToBrandProduct(brandKey, productId) {
        this.currentBrand = brandKey;
        this.updateURL();
        this.setupBrandTabs();
        this.setupCategoryTabs();
        this.setupFilters();
        this.displayProducts();
        
        // Выделяем товар после загрузки
        setTimeout(() => {
            this.selectProduct(productId);
        }, 100);
    }

    setupURLHandling() {
        // Читаем параметры из URL
        const urlParams = new URLSearchParams(window.location.search);
        const brand = urlParams.get('brand');
        const category = urlParams.get('category');
        
        if (brand && this.equipmentStructure.brands[brand]) {
            this.currentBrand = brand;
        }
        
        if (category && this.equipmentStructure.brands[this.currentBrand].categories[category]) {
            this.currentCategory = category;
        }
        
        // Обрабатываем изменения URL
        window.addEventListener('popstate', () => {
            this.handleURLChange();
        });
    }

    updateURL() {
        const url = new URL(window.location);
        url.searchParams.set('brand', this.currentBrand);
        url.searchParams.set('category', this.currentCategory);
        history.pushState(null, '', url);
    }

    handleURLChange() {
        const urlParams = new URLSearchParams(window.location.search);
        const brand = urlParams.get('brand');
        const category = urlParams.get('category');
        
        if (brand !== this.currentBrand || category !== this.currentCategory) {
            if (brand && this.equipmentStructure.brands[brand]) {
                this.currentBrand = brand;
            }
            
            if (category && this.equipmentStructure.brands[this.currentBrand].categories[category]) {
                this.currentCategory = category;
            }
            
            this.setupBrandTabs();
            this.setupCategoryTabs();
            this.setupFilters();
            this.displayProducts();
            this.clearCrossMatches();
        }
    }

    showNotification(message) {
        // Простое уведомление
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 1rem 2rem;
            border-radius: 4px;
            z-index: 10000;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Инициализация при загрузке страницы
let brandCatalog;
document.addEventListener('DOMContentLoaded', () => {
    brandCatalog = new BrandCatalog();
});