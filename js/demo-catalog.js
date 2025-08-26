// Demo Brand Catalog with embedded test data
class DemoBrandCatalog {
    constructor() {
        this.currentBrand = 'daikin';
        this.currentCategory = 'indoor_units';
        this.selectedProduct = null;
        this.selectedProducts = []; // Массив выбранных товаров для сравнения
        this.crossMatches = {};
        
        // Embedded test data instead of CSV loading
        this.equipmentStructure = {
            brands: {
                daikin: {
                    name: "Daikin",
                    logo: "assets/brands/daikin-logo.svg",
                    color: "#003DA5",
                    categories: {
                        indoor_units: {
                            name: "Внутренние блоки",
                            name_en: "Indoor Units",
                            filters: [
                                {
                                    name: "power",
                                    type: "range",
                                    unit: "кВт",
                                    min: 1.5,
                                    max: 15.0,
                                    step: 0.1,
                                    key_param: true,
                                    label: "Мощность"
                                },
                                {
                                    name: "cooling_capacity",
                                    type: "range",
                                    unit: "кВт",
                                    min: 2.0,
                                    max: 18.0,
                                    step: 0.1,
                                    key_param: true,
                                    match_tolerance: 0.2,
                                    label: "Мощность охлаждения"
                                },
                                {
                                    name: "heating_capacity",
                                    type: "range",
                                    unit: "кВт", 
                                    min: 2.0,
                                    max: 20.0,
                                    step: 0.1,
                                    key_param: true,
                                    match_tolerance: 0.2,
                                    label: "Мощность обогрева"
                                },
                                {
                                    name: "type",
                                    type: "select",
                                    options: ["wall", "ceiling", "floor", "cassette", "duct"],
                                    labels: {
                                        wall: "Настенный",
                                        ceiling: "Потолочный", 
                                        floor: "Напольный",
                                        cassette: "Кассетный",
                                        duct: "Канальный"
                                    },
                                    key_param: true,
                                    label: "Тип установки"
                                },
                                {
                                    name: "inverter",
                                    type: "boolean",
                                    label: "Инвертор",
                                    key_param: false
                                }
                            ]
                        }
                    }
                },
                mitsubishi: {
                    name: "Mitsubishi Electric",
                    logo: "assets/brands/mitsubishi-logo.svg",
                    color: "#E60012",
                    categories: {
                        indoor_units: {
                            name: "Внутренние блоки",
                            name_en: "Indoor Units",
                            filters: [
                                {
                                    name: "power",
                                    type: "range",
                                    unit: "кВт",
                                    min: 1.5,
                                    max: 15.0,
                                    step: 0.1,
                                    key_param: true,
                                    label: "Мощность"
                                },
                                {
                                    name: "cooling_capacity",
                                    type: "range",
                                    unit: "кВт",
                                    min: 2.0,
                                    max: 18.0,
                                    step: 0.1,
                                    key_param: true,
                                    match_tolerance: 0.2,
                                    label: "Мощность охлаждения"
                                },
                                {
                                    name: "heating_capacity",
                                    type: "range",
                                    unit: "кВт",
                                    min: 2.0,
                                    max: 20.0,
                                    step: 0.1,
                                    key_param: true,
                                    match_tolerance: 0.2,
                                    label: "Мощность обогрева"
                                },
                                {
                                    name: "type",
                                    type: "select",
                                    options: ["wall", "ceiling", "floor", "cassette", "duct"],
                                    labels: {
                                        wall: "Настенный",
                                        ceiling: "Потолочный",
                                        floor: "Напольный", 
                                        cassette: "Кассетный",
                                        duct: "Канальный"
                                    },
                                    key_param: true,
                                    label: "Тип установки"
                                },
                                {
                                    name: "inverter",
                                    type: "boolean",
                                    label: "Инвертор",
                                    key_param: false
                                }
                            ]
                        }
                    }
                },
                lg: {
                    name: "LG",
                    logo: "assets/brands/lg-logo.svg",
                    color: "#A50034",
                    categories: {
                        indoor_units: {
                            name: "Внутренние блоки",
                            name_en: "Indoor Units",
                            filters: [
                                {
                                    name: "power",
                                    type: "range",
                                    unit: "кВт",
                                    min: 1.8,
                                    max: 14.0,
                                    step: 0.1,
                                    key_param: true,
                                    label: "Мощность"
                                },
                                {
                                    name: "cooling_capacity",
                                    type: "range",
                                    unit: "кВт",
                                    min: 2.1,
                                    max: 16.5,
                                    step: 0.1,
                                    key_param: true,
                                    match_tolerance: 0.2,
                                    label: "Мощность охлаждения"
                                },
                                {
                                    name: "heating_capacity",
                                    type: "range",
                                    unit: "кВт",
                                    min: 2.2,
                                    max: 18.5,
                                    step: 0.1,
                                    key_param: true,
                                    match_tolerance: 0.2,
                                    label: "Мощность обогрева"
                                },
                                {
                                    name: "type",
                                    type: "select",
                                    options: ["wall", "ceiling", "floor", "cassette", "duct"],
                                    labels: {
                                        wall: "Настенный",
                                        ceiling: "Потолочный",
                                        floor: "Напольный",
                                        cassette: "Кассетный",
                                        duct: "Канальный"
                                    },
                                    key_param: true,
                                    label: "Тип установки"
                                },
                                {
                                    name: "inverter",
                                    type: "boolean",
                                    label: "Инвертор",
                                    key_param: false
                                }
                            ]
                        }
                    }
                }
            },
            cross_matching: {
                enabled: true,
                tolerance_multiplier: 1.1,
                priority_params: ["cooling_capacity", "heating_capacity", "power", "type"],
                scoring: {
                    exact_match: 100,
                    within_tolerance: 80,
                    type_match: 50,
                    brand_preference: 10
                }
            }
        };

        // Test equipment data
        this.equipmentData = {
            daikin: {
                indoor_units: [
                    {
                        id: "DAI_IU_001",
                        model: "FTXS25K",
                        series: "Sensira",
                        power: 2.5,
                        cooling_capacity: 2.5,
                        heating_capacity: 3.2,
                        airflow: 480,
                        noise_level: 19,
                        type: "wall",
                        inverter: true,
                        price_rub: 45000,
                        availability: "in_stock",
                        description: "Настенный внутренний блок Daikin Sensira 2.5 кВт",
                        image: "daikin-ftxs25k.jpg"
                    },
                    {
                        id: "DAI_IU_002",
                        model: "FTXS35K",
                        series: "Sensira",
                        power: 3.5,
                        cooling_capacity: 3.5,
                        heating_capacity: 4.2,
                        airflow: 600,
                        noise_level: 21,
                        type: "wall",
                        inverter: true,
                        price_rub: 52000,
                        availability: "in_stock",
                        description: "Настенный внутренний блок Daikin Sensira 3.5 кВт",
                        image: "daikin-ftxs35k.jpg"
                    },
                    {
                        id: "DAI_IU_003",
                        model: "FTXA35AW",
                        series: "Stylish",
                        power: 3.5,
                        cooling_capacity: 3.5,
                        heating_capacity: 4.2,
                        airflow: 540,
                        noise_level: 21,
                        type: "wall",
                        inverter: true,
                        price_rub: 89000,
                        availability: "in_stock",
                        description: "Настенный внутренний блок Daikin Stylish 3.5 кВт премиум",
                        image: "daikin-ftxa35aw.jpg"
                    },
                    {
                        id: "DAI_IU_004",
                        model: "FCQ35C",
                        series: "Sky Air",
                        power: 3.5,
                        cooling_capacity: 4.0,
                        heating_capacity: 4.5,
                        airflow: 650,
                        noise_level: 30,
                        type: "cassette",
                        inverter: false,
                        price_rub: 98000,
                        availability: "in_stock",
                        description: "Кассетный внутренний блок Daikin Sky Air 3.5 кВт",
                        image: "daikin-fcq35c.jpg"
                    }
                ]
            },
            mitsubishi: {
                indoor_units: [
                    {
                        id: "MIT_IU_001",
                        model: "MSZ-LN25VGW",
                        series: "Diamond",
                        power: 2.5,
                        cooling_capacity: 2.5,
                        heating_capacity: 3.2,
                        airflow: 450,
                        noise_level: 21,
                        type: "wall",
                        inverter: true,
                        price_rub: 47000,
                        availability: "in_stock",
                        description: "Настенный внутренний блок Mitsubishi Diamond 2.5 кВт",
                        image: "mitsubishi-msz-ln25vgw.jpg"
                    },
                    {
                        id: "MIT_IU_002",
                        model: "MSZ-LN35VGW",
                        series: "Diamond",
                        power: 3.5,
                        cooling_capacity: 3.5,
                        heating_capacity: 4.2,
                        airflow: 570,
                        noise_level: 23,
                        type: "wall",
                        inverter: true,
                        price_rub: 54000,
                        availability: "in_stock",
                        description: "Настенный внутренний блок Mitsubishi Diamond 3.5 кВт",
                        image: "mitsubishi-msz-ln35vgw.jpg"
                    },
                    {
                        id: "MIT_IU_003",
                        model: "MSZ-EF35VEW",
                        series: "Zubadan",
                        power: 3.5,
                        cooling_capacity: 3.5,
                        heating_capacity: 4.2,
                        airflow: 520,
                        noise_level: 21,
                        type: "wall",
                        inverter: true,
                        price_rub: 93000,
                        availability: "in_stock",
                        description: "Настенный внутренний блок Mitsubishi Zubadan 3.5 кВт для холодного климата",
                        image: "mitsubishi-msz-ef35vew.jpg"
                    },
                    {
                        id: "MIT_IU_004",
                        model: "PLZ-M35EA",
                        series: "City Multi",
                        power: 3.5,
                        cooling_capacity: 4.0,
                        heating_capacity: 4.5,
                        airflow: 620,
                        noise_level: 28,
                        type: "cassette",
                        inverter: false,
                        price_rub: 102000,
                        availability: "in_stock",
                        description: "Кассетный внутренний блок Mitsubishi City Multi 3.5 кВт",
                        image: "mitsubishi-plz-m35ea.jpg"
                    }
                ]
            },
            lg: {
                indoor_units: [
                    {
                        id: "LG_IU_001",
                        model: "S09ET",
                        series: "Standard Plus",
                        power: 2.6,
                        cooling_capacity: 2.6,
                        heating_capacity: 3.0,
                        airflow: 450,
                        noise_level: 22,
                        type: "wall",
                        inverter: true,
                        price_rub: 42000,
                        availability: "in_stock",
                        description: "Настенный внутренний блок LG Standard Plus 2.6 кВт",
                        image: "lg-s09et.jpg"
                    },
                    {
                        id: "LG_IU_002",
                        model: "S12ET",
                        series: "Standard Plus",
                        power: 3.5,
                        cooling_capacity: 3.5,
                        heating_capacity: 4.0,
                        airflow: 580,
                        noise_level: 24,
                        type: "wall",
                        inverter: true,
                        price_rub: 48000,
                        availability: "in_stock",
                        description: "Настенный внутренний блок LG Standard Plus 3.5 кВт",
                        image: "lg-s12et.jpg"
                    },
                    {
                        id: "LG_IU_003",
                        model: "A12FR",
                        series: "Artcool Gallery",
                        power: 3.5,
                        cooling_capacity: 3.5,
                        heating_capacity: 4.0,
                        airflow: 480,
                        noise_level: 24,
                        type: "wall",
                        inverter: true,
                        price_rub: 95000,
                        availability: "in_stock",
                        description: "Настенный внутренний блок LG Artcool Gallery 3.5 кВт",
                        image: "lg-a12fr.jpg"
                    },
                    {
                        id: "LG_IU_004",
                        model: "CT12F",
                        series: "Cassette",
                        power: 3.5,
                        cooling_capacity: 4.1,
                        heating_capacity: 4.8,
                        airflow: 610,
                        noise_level: 30,
                        type: "cassette",
                        inverter: false,
                        price_rub: 95000,
                        availability: "in_stock",
                        description: "Кассетный внутренний блок LG 3.5 кВт",
                        image: "lg-ct12f.jpg"
                    }
                ]
            }
        };
        
        this.init();
    }

    init() {
        this.setupBrandTabs();
        this.setupCategoryTabs();
        this.setupFilters();
        this.setupURLHandling();
        this.displayProducts();
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
                    <img src="${brand.logo}" alt="${brand.name}" class="brand-logo" onerror="this.style.display='none'">
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
        // Сохраняем исходно выбранные товары перед переключением
        const originalSelectedProducts = [...this.selectedProducts];
        
        this.currentBrand = brandKey;
        this.updateURL();
        this.setupBrandTabs();
        this.setupCategoryTabs();
        this.setupFilters();
        
        // Если были выбранные товары, найдем для них аналоги в новом бренде
        if (originalSelectedProducts.length > 0) {
            this.selectedProducts = this.findBrandAnalogs(originalSelectedProducts, brandKey);
            this.selectedProduct = this.selectedProducts.length > 0 ? this.selectedProducts[0] : null;
        }
        
        this.displayProducts();
        this.updateSelectionCounter();
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
        const products = this.equipmentData[this.currentBrand][this.currentCategory] || [];
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

        const currentLang = localStorage.getItem('preferredLanguage') || 'ru';
        const allProducts = this.getFilteredProducts();
        const hasAnalogs = this.selectedProducts.length > 0 && this.hasAnalogs();
        
        productsGrid.innerHTML = '';

        if (allProducts.length === 0) {
            productsGrid.innerHTML = `
                <div class="no-products">
                    <p>${currentLang === 'en' ? 'No products found' : 'Товары не найдены'}</p>
                    <p style="font-size: 0.9rem; color: #999; margin-top: 0.5rem;">
                        ${currentLang === 'en' ? 'Try changing filter settings' : 'Попробуйте изменить настройки фильтра'}
                    </p>
                </div>
            `;
            return;
        }

        // Добавляем информационный блок если есть аналоги
        if (hasAnalogs) {
            const selectedAnalogs = this.getSelectedProducts();
            const selectedCount = selectedAnalogs.length;
            const selectedWord = this.getSelectedWordForm(selectedCount);
            const brand = this.equipmentStructure.brands[this.currentBrand];
            
            const analogInfo = document.createElement('div');
            analogInfo.className = 'analog-info';
            analogInfo.innerHTML = `
                <div style="margin-bottom: 1rem; padding: 0.75rem 1rem; background: linear-gradient(135deg, ${brand.color}10, ${brand.color}05); border-radius: 8px; border-left: 4px solid ${brand.color};">
                    <span style="color: ${brand.color}; font-weight: 600; font-size: 0.95rem;">
                        🎯 ${selectedCount} ${selectedWord} поднято наверх как лучшие аналоги
                    </span>
                    <button onclick="demoCatalog.showAllProducts()" style="background: none; border: none; color: ${brand.color}; text-decoration: underline; cursor: pointer; margin-left: 1rem; font-size: 0.9rem;">
                        Сбросить выбор
                    </button>
                </div>
            `;
            productsGrid.appendChild(analogInfo);
        }

        // Разделяем товары на аналоги и остальные
        let analogProducts = [];
        let otherProducts = [];
        
        if (hasAnalogs) {
            const selectedAnalogs = this.getSelectedProducts();
            const selectedIds = selectedAnalogs.map(p => p.id);
            
            analogProducts = selectedAnalogs;
            otherProducts = allProducts.filter(product => !selectedIds.includes(product.id));
        } else {
            otherProducts = allProducts;
        }

        // Отображаем аналоги наверху (выделенными)
        analogProducts.forEach(product => {
            const productCard = this.createProductCard(product, true); // true = это аналог
            productCard.classList.add('analog-product'); 
            productsGrid.appendChild(productCard);
        });

        // Добавляем разделитель если есть аналоги
        if (analogProducts.length > 0 && otherProducts.length > 0) {
            const separator = document.createElement('div');
            separator.className = 'products-separator';
            separator.innerHTML = `
                <div style="border-top: 1px solid #ddd; margin: 1rem 0; position: relative;">
                    <span style="background: white; padding: 0 1rem; color: #666; font-size: 0.85rem; position: absolute; left: 50%; transform: translateX(-50%); top: -0.6rem;">
                        Остальные товары бренда
                    </span>
                </div>
            `;
            productsGrid.appendChild(separator);
        }

        // Отображаем остальные товары
        otherProducts.forEach(product => {
            const productCard = this.createProductCard(product, false);
            productsGrid.appendChild(productCard);
        });
    }

    createProductCard(product, showingAnalogs = false) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.dataset.productId = product.id;
        
        const brand = this.equipmentStructure.brands[this.currentBrand];
        
        const priceDealer = product.price_rub || 0;
        const priceRetail = Math.round(priceDealer * 1.3);
        
        let specsText = `${product.description} • ${this.getTypeLabel(product.type)} • ${product.inverter ? 'Инвертор' : 'Обычный'}`;
        
        card.innerHTML = `
            <div class="product-image">🌀</div>
            <div class="product-info">
                <div class="product-details">
                    <h4 class="product-title">${product.model}</h4>
                    <div class="product-specs">${specsText}</div>
                </div>
                
                <div class="product-capacity">
                    <div class="capacity-value">${product.cooling_capacity}</div>
                    <div class="capacity-label">кВт</div>
                </div>
                
                <div class="product-availability">
                    ${showingAnalogs && product.score ? 
                        `<div class="match-score-display">
                            <div class="match-score-value" style="color: ${brand.color}; font-weight: 700; font-size: 1.1rem;">
                                ${Math.round(product.score)}%
                            </div>
                            <div class="match-score-label" style="font-size: 0.75rem; color: #666;">
                                совпадение
                            </div>
                        </div>` :
                        `<div class="availability-scale">
                            <div class="availability-dot active"></div>
                            <div class="availability-dot active"></div>
                            <div class="availability-dot active"></div>
                            <div class="availability-dot"></div>
                            <div class="availability-dot"></div>
                        </div>
                        <div class="availability-text">В наличии</div>`
                    }
                </div>
                
                <div class="product-pricing">
                    <div class="price-dealer">${priceDealer.toLocaleString()} ₽</div>
                    <div class="price-retail">${priceRetail.toLocaleString()} ₽</div>
                </div>
                
                <div class="product-actions">
                    <button class="btn-icon btn-sm" title="Добавить в корзину" onclick="demoCatalog.addToCart('${product.id}'); event.stopPropagation();">🛒</button>
                </div>
            </div>
        `;
        
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.product-actions')) {
                this.selectProduct(product.id);
                this.updateCardSelectionDisplay();
            }
        });
        
        return card;
    }

    getTypeLabel(type) {
        const labels = {
            wall: "Настенный",
            ceiling: "Потолочный",
            floor: "Напольный",
            cassette: "Кассетный",
            duct: "Канальный"
        };
        return labels[type] || type;
    }

    selectProduct(productId, isToggle = true) {
        const selectedCard = document.querySelector(`[data-product-id="${productId}"]`);
        const isCurrentlySelected = this.selectedProducts.includes(productId);
        
        if (isToggle && isCurrentlySelected) {
            // Убираем из выбранных
            this.selectedProducts = this.selectedProducts.filter(id => id !== productId);
            if (selectedCard) {
                selectedCard.classList.remove('selected');
            }
        } else if (!isCurrentlySelected) {
            // Добавляем к выбранным
            this.selectedProducts.push(productId);
            if (selectedCard) {
                selectedCard.classList.add('selected');
            }
        }
        
        // Обновляем основной выбранный товар (последний выбранный)
        this.selectedProduct = this.selectedProducts.length > 0 ? this.selectedProducts[this.selectedProducts.length - 1] : null;
        
        this.updateSelectionCounter();
        this.updateCardSelectionDisplay();
        this.updateCrossMatches();
    }

    selectForComparison(productId) {
        this.selectProduct(productId);
    }

    updateSelectionCounter() {
        const counterElement = document.getElementById('selectionCounter');
        if (counterElement) {
            const count = this.selectedProducts.length;
            if (count > 0) {
                const wordForm = this.getSelectedWordForm(count);
                counterElement.innerHTML = `🎯 Выбрано для сравнения: <strong>${count} ${wordForm}</strong>`;
                counterElement.classList.add('show');
                counterElement.style.display = 'block';
            } else {
                counterElement.classList.remove('show');
                counterElement.style.display = 'none';
            }
        }
    }

    updateCardSelectionDisplay() {
        // Обновляем отображение номеров выбранных товаров
        document.querySelectorAll('.product-card').forEach(card => {
            const productId = card.dataset.productId;
            const selectionIndex = this.selectedProducts.indexOf(productId);
            
            if (selectionIndex >= 0) {
                card.setAttribute('data-selection-order', selectionIndex + 1);
            } else {
                card.removeAttribute('data-selection-order');
            }
        });
    }

    addToCart(productId) {
        const product = this.findProductById(productId);
        if (product) {
            console.log('Added to cart:', product);
            this.showNotification(`${product.model} добавлен в корзину`);
            
            // Update cart badge
            const cartBadge = document.getElementById('cartBadge');
            if (cartBadge) {
                let currentCount = parseInt(cartBadge.textContent) || 0;
                cartBadge.textContent = currentCount + 1;
            }
        }
    }

    updateCrossMatches() {
        if (this.selectedProducts.length === 0) {
            this.clearCrossMatches();
            return;
        }

        // Получаем все выбранные продукты
        const selectedProductsData = this.selectedProducts.map(id => this.findProductById(id)).filter(p => p);
        
        if (selectedProductsData.length === 0) {
            this.clearCrossMatches();
            return;
        }

        // Находим аналоги для каждого выбранного товара
        this.crossMatches = this.findMultipleCrossMatches(selectedProductsData);
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

    // Находит аналоги выбранных товаров в конкретном бренде
    findBrandAnalogs(selectedProductIds, targetBrand) {
        if (targetBrand === this.currentBrand) return selectedProductIds;
        
        const selectedProducts = selectedProductIds.map(id => this.findProductById(id)).filter(p => p);
        const targetBrandProducts = this.equipmentData[targetBrand][this.currentCategory] || [];
        const selectedCount = selectedProducts.length;
        
        if (selectedCount === 0) return [];
        
        // Находим всех кандидатов для всех выбранных товаров
        const allCandidates = [];
        
        selectedProducts.forEach(selectedProduct => {
            targetBrandProducts.forEach(product => {
                const score = this.calculateMatchScore(selectedProduct, product);
                if (score > 50) {
                    allCandidates.push({
                        ...product,
                        score,
                        matchedWith: selectedProduct.id
                    });
                }
            });
        });
        
        // Сортируем по убыванию score и берем нужное количество уникальных товаров
        allCandidates.sort((a, b) => b.score - a.score);
        
        const analogs = [];
        const usedProductIds = new Set();
        
        for (const candidate of allCandidates) {
            if (analogs.length >= selectedCount) break;
            if (!usedProductIds.has(candidate.id)) {
                // Сохраняем аналоги с информацией о score в equipmentData
                const targetProduct = targetBrandProducts.find(p => p.id === candidate.id);
                if (targetProduct) {
                    targetProduct.score = candidate.score;
                }
                
                analogs.push(candidate.id);
                usedProductIds.add(candidate.id);
            }
        }
        
        return analogs;
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

    findMultipleCrossMatches(selectedProducts) {
        const matches = {};
        const crossMatchConfig = this.equipmentStructure.cross_matching;
        
        if (!crossMatchConfig.enabled) return matches;

        const brands = Object.keys(this.equipmentStructure.brands);
        const selectedCount = selectedProducts.length;
        
        brands.forEach(brandKey => {
            if (brandKey === this.currentBrand) return;
            
            const brandProducts = this.equipmentData[brandKey][this.currentCategory] || [];
            const allCandidates = [];
            
            // Для каждого выбранного товара находим лучшие совпадения
            selectedProducts.forEach(selectedProduct => {
                brandProducts.forEach(product => {
                    const score = this.calculateMatchScore(selectedProduct, product);
                    if (score > 50) {
                        allCandidates.push({ 
                            ...product, 
                            matchScore: score, 
                            brand: brandKey,
                            matchedWith: selectedProduct.id
                        });
                    }
                });
            });
            
            // Сортируем по убыванию совпадения
            allCandidates.sort((a, b) => b.matchScore - a.matchScore);
            
            // Берем ровно столько аналогов, сколько выбрано товаров
            // Избегаем дубликатов товаров
            const uniqueMatches = [];
            const usedProductIds = new Set();
            
            for (const candidate of allCandidates) {
                if (uniqueMatches.length >= selectedCount) break;
                if (!usedProductIds.has(candidate.id)) {
                    uniqueMatches.push(candidate);
                    usedProductIds.add(candidate.id);
                }
            }
            
            matches[brandKey] = uniqueMatches;
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
        
        return Math.min(score, 100); // Максимальный score 100%
    }

    displayCrossMatches() {
        // Новая логика: аналоги показываются в основном списке товаров
        // Никаких отдельных блоков снизу
        
        // Старый вариант отображения (оставим для совместимости, но скрываем)
        const crossMatchesContainer = document.getElementById('crossMatches');
        if (!crossMatchesContainer) return;
        
        // Всегда скрываем старые блоки
        this.clearCrossMatches();
        return;

        const selectedCount = this.selectedProducts.length;
        const selectedWord = this.getSelectedWordForm(selectedCount);
        
        let html = `<h3 class="cross-matches-title">🔄 Аналоги для ${selectedCount} ${selectedWord} в других брендах:</h3>`;
        
        Object.entries(this.crossMatches).forEach(([brandKey, matches]) => {
            if (matches.length === 0) return;
            
            const brand = this.equipmentStructure.brands[brandKey];
            
            html += `
                <div class="cross-match-brand">
                    <h4 class="cross-match-brand-title" style="color: ${brand.color}">
                        ${brand.name} (${matches.length} ${this.getSelectedWordForm(matches.length)})
                    </h4>
                    <div class="cross-match-products">
            `;
            
            matches.forEach((match, index) => {
                const matchNumber = index + 1;
                html += `
                    <div class="cross-match-product" onclick="demoCatalog.switchToBrandProduct('${brandKey}', '${match.id}')">
                        <div class="cross-match-info">
                            <div class="cross-match-header">
                                <span class="cross-match-number">#${matchNumber}</span>
                                <div class="cross-match-model">${match.model}</div>
                            </div>
                            <div class="cross-match-specs">
                                ${match.cooling_capacity} кВт охл. | ${match.heating_capacity} кВт обогр.
                            </div>
                            <div class="cross-match-specs">
                                ${match.price_rub?.toLocaleString()} ₽
                            </div>
                            <div class="cross-match-score">Совпадение: ${Math.round(match.matchScore)}%</div>
                            ${match.matchedWith ? `<div class="cross-match-origin">Аналог для: ${this.getProductModelById(match.matchedWith)}</div>` : ''}
                        </div>
                    </div>
                `;
            });
            
            html += '</div></div>';
        });
        
        crossMatchesContainer.innerHTML = html;
        crossMatchesContainer.style.display = 'block';
    }

    getSelectedWordForm(count) {
        if (count % 10 === 1 && count % 100 !== 11) return 'товара';
        if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) return 'товаров';
        return 'товаров';
    }

    getProductModelById(productId) {
        const product = this.findProductById(productId);
        return product ? product.model : 'Unknown';
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
        const notification = document.createElement('div');
        notification.className = 'notification show';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Проверяет, есть ли аналоги (выбранные товары из другого бренда)
    hasAnalogs() {
        if (this.selectedProducts.length === 0) return false;
        
        // Проверяем есть ли хотя бы один выбранный товар из другого бренда
        const currentBrandProducts = this.equipmentData[this.currentBrand][this.currentCategory] || [];
        const currentBrandProductIds = currentBrandProducts.map(p => p.id);
        
        // Если все выбранные товары принадлежат текущему бренду - это не аналоги
        const hasExternalProducts = this.selectedProducts.some(productId => !currentBrandProductIds.includes(productId));
        // Если есть товары текущего бренда среди выбранных - это аналоги
        const hasCurrentBrandProducts = this.selectedProducts.some(productId => currentBrandProductIds.includes(productId));
        
        console.log('hasAnalogs check:', {
            selectedProducts: this.selectedProducts,
            currentBrand: this.currentBrand,
            hasExternalProducts,
            hasCurrentBrandProducts,
            result: hasExternalProducts && hasCurrentBrandProducts
        });
        
        return hasExternalProducts && hasCurrentBrandProducts;
    }

    // Возвращает выбранные товары текущего бренда
    getSelectedProducts() {
        const currentBrandProducts = this.equipmentData[this.currentBrand][this.currentCategory] || [];
        const selectedBrandProducts = currentBrandProducts.filter(product => this.selectedProducts.includes(product.id));
        
        console.log('getSelectedProducts:', {
            currentBrand: this.currentBrand,
            selectedProducts: this.selectedProducts,
            currentBrandProducts: currentBrandProducts.length,
            selectedBrandProducts: selectedBrandProducts.length,
            result: selectedBrandProducts.map(p => ({id: p.id, model: p.model, score: p.score}))
        });
        
        return selectedBrandProducts;
    }

    // Показать все товары бренда (сбросить фильтрацию аналогов)
    showAllProducts() {
        this.selectedProducts = [];
        this.selectedProduct = null;
        this.clearCrossMatches();
        this.displayProducts();
        this.updateSelectionCounter();
    }

    displayCrossBrandProducts() {
        const crossBrandContainer = document.getElementById('crossBrandProducts');
        if (!crossBrandContainer) return;

        // Всегда скрываем блоки других брендов - они будут показываться в табах
        crossBrandContainer.style.display = 'none';
        return;
        crossBrandContainer.innerHTML = '';

        const selectedCount = this.selectedProducts.length;
        const selectedWord = this.getSelectedWordForm(selectedCount);

        // Добавляем заголовок для блоков других брендов
        const headerHtml = `
            <div style="margin: 2rem 0 1rem 0; padding: 1rem; background: linear-gradient(135deg, #f8f9fa, #e9ecef); border-radius: 8px; border-left: 4px solid var(--signature-blue);">
                <h3 style="margin: 0; color: var(--signature-blue); font-size: 1.2rem;">
                    🔄 Аналогичные товары в других брендах (${selectedCount} ${selectedWord})
                </h3>
                <p style="margin: 0.5rem 0 0 0; color: #666; font-size: 0.9rem;">
                    Найдены лучшие соответствия по техническим параметрам
                </p>
            </div>
        `;
        crossBrandContainer.insertAdjacentHTML('beforeend', headerHtml);

        // Отображаем товары других брендов в виде списков
        Object.entries(this.crossMatches).forEach(([brandKey, matches]) => {
            if (matches.length === 0) return;

            const brand = this.equipmentStructure.brands[brandKey];
            
            const brandBlockHtml = `
                <div style="margin-bottom: 2rem;">
                    <div class="list-header" style="background: linear-gradient(135deg, ${brand.color}15, ${brand.color}05);">
                        <div class="header-cell"></div>
                        <div class="header-cell" style="color: ${brand.color}; font-weight: 700;">${brand.name} - ${matches.length} ${this.getSelectedWordForm(matches.length)}</div>
                        <div class="header-cell">Мощность</div>
                        <div class="header-cell">Наличие</div>
                        <div class="header-cell">Цены</div>
                        <div class="header-cell">Действия</div>
                    </div>
                    <div class="cross-brand-products-list" data-brand="${brandKey}">
                        <!-- Products will be added here -->
                    </div>
                </div>
            `;
            
            crossBrandContainer.insertAdjacentHTML('beforeend', brandBlockHtml);
            
            // Добавляем товары в список
            const productsList = crossBrandContainer.querySelector(`.cross-brand-products-list[data-brand="${brandKey}"]`);
            matches.forEach((match, index) => {
                const productCard = this.createCrossBrandProductCard(match, brandKey, index + 1);
                productsList.appendChild(productCard);
            });
        });
    }

    createCrossBrandProductCard(product, brandKey, matchNumber) {
        const card = document.createElement('div');
        card.className = 'product-card cross-brand-product';
        card.dataset.productId = product.id;
        card.dataset.brand = brandKey;

        const brand = this.equipmentStructure.brands[brandKey];
        const priceDealer = product.price_rub || 0;
        const priceRetail = Math.round(priceDealer * 1.3);

        card.innerHTML = `
            <div class="product-image">🌀</div>
            <div class="product-info">
                <div class="product-details">
                    <h4 class="product-title">${product.model}</h4>
                    <div class="product-specs">
                        ${product.description} • ${this.getTypeLabel(product.type)} • 
                        <span style="color: ${brand.color}; font-weight: 600;">
                            ${Math.round(product.score)}% совпадение
                        </span>
                    </div>
                </div>
                
                <div class="product-capacity">
                    <div class="capacity-value">${product.cooling_capacity}</div>
                    <div class="capacity-label">кВт</div>
                </div>
                
                <div class="product-availability">
                    <div class="availability-scale">
                        <div class="availability-dot active"></div>
                        <div class="availability-dot active"></div>
                        <div class="availability-dot active"></div>
                        <div class="availability-dot"></div>
                        <div class="availability-dot"></div>
                    </div>
                    <div class="availability-text">В наличии</div>
                </div>
                
                <div class="product-pricing">
                    <div class="price-dealer">${priceDealer.toLocaleString()} ₽</div>
                    <div class="price-retail">${priceRetail.toLocaleString()} ₽</div>
                </div>
                
                <div class="product-actions">
                    <button class="btn-icon btn-sm" title="Перейти к этому товару" onclick="demoCatalog.switchToBrandProduct('${brandKey}', '${product.id}'); event.stopPropagation();" style="background: ${brand.color}; color: white; border-color: ${brand.color};">
                        →
                    </button>
                </div>
            </div>
        `;

        return card;
    }

    switchToBrandProduct(brandKey, productId) {
        // Переключаемся на бренд и выделяем товар
        this.switchBrand(brandKey);
        
        // Небольшая задержка для обновления интерфейса
        setTimeout(() => {
            const productElement = document.querySelector(`[data-product-id="${productId}"]`);
            if (productElement) {
                productElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Временно подсветим товар
                productElement.style.background = 'rgba(20, 100, 244, 0.1)';
                setTimeout(() => {
                    productElement.style.background = '';
                }, 2000);
            }
        }, 300);
    }
}

// Инициализация при загрузке страницы
let demoCatalog;
document.addEventListener('DOMContentLoaded', () => {
    demoCatalog = new DemoBrandCatalog();
});