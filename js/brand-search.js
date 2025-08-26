// Brand Search Integration for HVAC Platform
class BrandSearchCatalog {
    constructor() {
        this.currentBrand = 'daikin';
        this.currentCategory = 'indoor_units';
        this.selectedProducts = [];
        this.crossMatches = {};
        
        // Load equipment structure and data
        this.equipmentStructure = {
            brands: {
                daikin: {
                    name: "Daikin",
                    logo: "assets/brands/daikin-logo.svg",
                    color: "#003DA5"
                },
                mitsubishi: {
                    name: "Mitsubishi Electric", 
                    logo: "assets/brands/mitsubishi-logo.svg",
                    color: "#E60012"
                },
                lg: {
                    name: "LG",
                    logo: "assets/brands/lg-logo.svg", 
                    color: "#A50034"
                }
            },
            cross_matching: {
                enabled: true,
                key_parameters: ["cooling_capacity", "heating_capacity", "type"],
                tolerances: {
                    cooling_capacity: 0.2,
                    heating_capacity: 0.2
                }
            }
        };
        
        // Sample equipment data - in production this would be loaded from API/CSV
        this.equipmentData = {
            daikin: {
                indoor_units: [
                    {
                        id: "daikin_ftxs25k",
                        model: "FTXS25K",
                        series: "Sensira",
                        description: "Настенный кондиционер для небольших помещений",
                        type: "wall",
                        power: 2.5,
                        cooling_capacity: 2.5,
                        heating_capacity: 3.2,
                        inverter: true,
                        price_rub: 45000
                    },
                    {
                        id: "daikin_ftxs35k", 
                        model: "FTXS35K",
                        series: "Sensira",
                        description: "Настенный кондиционер средней мощности",
                        type: "wall",
                        power: 3.5,
                        cooling_capacity: 3.5,
                        heating_capacity: 4.0,
                        inverter: true,
                        price_rub: 52000
                    },
                    {
                        id: "daikin_ftxa35aw",
                        model: "FTXA35AW", 
                        series: "Stylish",
                        description: "Премиальный настенный кондиционер",
                        type: "wall",
                        power: 3.5,
                        cooling_capacity: 3.5,
                        heating_capacity: 4.2,
                        inverter: true,
                        price_rub: 68000
                    },
                    {
                        id: "daikin_fcq35c",
                        model: "FCQ35C",
                        series: "Cassette",
                        description: "Кассетный кондиционер для офисов",
                        type: "cassette", 
                        power: 3.5,
                        cooling_capacity: 3.5,
                        heating_capacity: 4.0,
                        inverter: true,
                        price_rub: 85000
                    }
                ]
            },
            mitsubishi: {
                indoor_units: [
                    {
                        id: "mitsubishi_msz_ln25vgw",
                        model: "MSZ-LN25VGW",
                        series: "Premium",
                        description: "Инверторный настенный блок",
                        type: "wall",
                        power: 2.5,
                        cooling_capacity: 2.5,
                        heating_capacity: 3.2,
                        inverter: true,
                        price_rub: 48000
                    },
                    {
                        id: "mitsubishi_msz_ln35vgw",
                        model: "MSZ-LN35VGW", 
                        series: "Premium",
                        description: "Инверторный настенный блок средней мощности",
                        type: "wall",
                        power: 3.5,
                        cooling_capacity: 3.5,
                        heating_capacity: 4.0,
                        inverter: true,
                        price_rub: 55000
                    },
                    {
                        id: "mitsubishi_msz_ef35vew",
                        model: "MSZ-EF35VEW",
                        series: "Kirigamine",
                        description: "Премиальная серия с Wi-Fi",
                        type: "wall", 
                        power: 3.5,
                        cooling_capacity: 3.5,
                        heating_capacity: 4.2,
                        inverter: true,
                        price_rub: 72000
                    },
                    {
                        id: "mitsubishi_plz_m35ea",
                        model: "PLZ-M35EA",
                        series: "Ceiling",
                        description: "Потолочный кондиционер",
                        type: "ceiling",
                        power: 3.5,
                        cooling_capacity: 3.5,
                        heating_capacity: 4.0,
                        inverter: true,
                        price_rub: 78000
                    }
                ]
            },
            lg: {
                indoor_units: [
                    {
                        id: "lg_s09et",
                        model: "S09ET",
                        series: "Standard",
                        description: "Базовая модель настенного типа",
                        type: "wall",
                        power: 2.5,
                        cooling_capacity: 2.6,
                        heating_capacity: 3.0,
                        inverter: true,
                        price_rub: 42000
                    },
                    {
                        id: "lg_s12et",
                        model: "S12ET",
                        series: "Standard", 
                        description: "Популярная модель средней мощности",
                        type: "wall",
                        power: 3.5,
                        cooling_capacity: 3.5,
                        heating_capacity: 3.8,
                        inverter: true,
                        price_rub: 49000
                    },
                    {
                        id: "lg_a12fr",
                        model: "A12FR",
                        series: "ArtCool",
                        description: "Дизайнерская серия премиум класса", 
                        type: "wall",
                        power: 3.5,
                        cooling_capacity: 3.5,
                        heating_capacity: 4.0,
                        inverter: true,
                        price_rub: 65000
                    },
                    {
                        id: "lg_ct12f",
                        model: "CT12F",
                        series: "Cassette",
                        description: "Кассетный блок для коммерческих помещений",
                        type: "cassette",
                        power: 3.5,
                        cooling_capacity: 3.5,
                        heating_capacity: 3.8,
                        inverter: true,
                        price_rub: 75000
                    }
                ]
            }
        };
        
        this.init();
    }
    
    init() {
        this.setupBrandTabs();
        this.displayProducts();
        this.updateURL();
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
            tab.innerHTML = `
                <div class="brand-logo" style="width: 24px; height: 24px; background: ${brand.color}; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.7rem; font-weight: 700;">
                    ${brand.name.charAt(0)}
                </div>
                <span>${brand.name}</span>
            `;
            
            tab.addEventListener('click', () => this.switchBrand(brandKey));
            brandTabsContainer.appendChild(tab);
        });
    }
    
    switchBrand(brandKey) {
        // Сохраняем исходно выбранные товары перед переключением
        const originalSelectedProducts = [...this.selectedProducts];
        
        this.currentBrand = brandKey;
        this.updateURL();
        this.setupBrandTabs();
        
        // Если были выбранные товары, найдем для них аналоги в новом бренде
        if (originalSelectedProducts.length > 0) {
            this.selectedProducts = this.findBrandAnalogs(originalSelectedProducts, brandKey);
        }
        
        this.displayProducts();
        this.updateCrossMatches();
    }
    
    displayProducts() {
        const productsGrid = document.getElementById('productsGrid');
        if (!productsGrid) return;
        
        const allProducts = this.getAllProducts();
        const hasAnalogs = this.selectedProducts.length > 0 && this.hasAnalogs();
        
        productsGrid.innerHTML = '';
        
        if (allProducts.length === 0) {
            productsGrid.innerHTML = `
                <div class="no-products" style="text-align: center; padding: 2rem; color: #666;">
                    <p>Товары не найдены</p>
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
                    <button onclick="brandSearch.showAllProducts()" style="background: none; border: none; color: ${brand.color}; text-decoration: underline; cursor: pointer; margin-left: 1rem; font-size: 0.9rem;">
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
    
    createProductCard(product, isAnalog = false) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.dataset.productId = product.id;
        
        const brand = this.equipmentStructure.brands[this.currentBrand];
        const priceDealer = product.price_rub || 0;
        const priceRetail = Math.round(priceDealer * 1.3);
        
        let specsText = `${product.description} • ${this.getTypeLabel(product.type)} • ${product.inverter ? 'Инвертор' : 'Обычный'}`;
        
        card.innerHTML = `
            <div class="product-image" title="Hover to enlarge">🌀</div>
            <div class="product-info">
                <div class="product-details">
                    <h4 class="product-title">${product.model}</h4>
                    <p class="product-specs">${specsText}</p>
                </div>
                
                <div class="product-capacity">
                    <div class="capacity-value">${product.cooling_capacity}k</div>
                    <div class="capacity-label">BTU/h</div>
                </div>
                
                <div class="product-stock">
                    ${isAnalog && product.score ? 
                        `<div class="match-score-display">
                            <div style="color: ${brand.color}; font-weight: 700; font-size: 1rem;">
                                ${Math.round(product.score)}%
                            </div>
                            <div style="font-size: 0.7rem; color: #666;">
                                совпадение
                            </div>
                        </div>` :
                        `<div class="availability-scale">
                            <span class="scale-dot active"></span>
                            <span class="scale-dot active"></span>
                            <span class="scale-dot active"></span>
                            <span class="scale-dot"></span>
                            <span class="scale-dot"></span>
                        </div>
                        <div class="availability-text">В наличии</div>`
                    }
                </div>
                
                <div class="product-price">
                    <div class="price-dealer">${priceDealer.toLocaleString()} ₽</div>
                    <div class="price-retail">${priceRetail.toLocaleString()} ₽</div>
                </div>
                
                <div class="product-actions">
                    <div class="product-action-icons">
                        <button class="action-icon" title="Add to cart">🛒</button>
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
    
    getAllProducts() {
        return this.equipmentData[this.currentBrand][this.currentCategory] || [];
    }
    
    hasAnalogs() {
        if (this.selectedProducts.length === 0) return false;
        
        const currentBrandProducts = this.getAllProducts();
        const currentBrandProductIds = currentBrandProducts.map(p => p.id);
        
        const hasExternalProducts = this.selectedProducts.some(productId => !currentBrandProductIds.includes(productId));
        const hasCurrentBrandProducts = this.selectedProducts.some(productId => currentBrandProductIds.includes(productId));
        
        return hasExternalProducts && hasCurrentBrandProducts;
    }
    
    getSelectedProducts() {
        const currentBrandProducts = this.getAllProducts();
        return currentBrandProducts.filter(product => this.selectedProducts.includes(product.id));
    }
    
    showAllProducts() {
        this.selectedProducts = [];
        this.clearCrossMatches();
        this.displayProducts();
    }
    
    selectProduct(productId) {
        const isCurrentlySelected = this.selectedProducts.includes(productId);
        
        if (isCurrentlySelected) {
            // Remove from selection
            this.selectedProducts = this.selectedProducts.filter(id => id !== productId);
        } else {
            // Add to selection
            this.selectedProducts.push(productId);
        }
        
        this.displayProducts();
        this.updateCrossMatches();
    }
    
    findBrandAnalogs(selectedProductIds, targetBrand) {
        if (targetBrand === this.currentBrand) return selectedProductIds;
        
        const selectedProducts = selectedProductIds.map(id => this.findProductById(id)).filter(p => p);
        const targetBrandProducts = this.equipmentData[targetBrand][this.currentCategory] || [];
        const selectedCount = selectedProducts.length;
        
        if (selectedCount === 0) return [];
        
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
        
        allCandidates.sort((a, b) => b.score - a.score);
        
        const analogs = [];
        const usedProductIds = new Set();
        
        for (const candidate of allCandidates) {
            if (analogs.length >= selectedCount) break;
            if (!usedProductIds.has(candidate.id)) {
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
    
    calculateMatchScore(product1, product2) {
        let score = 0;
        const config = this.equipmentStructure.cross_matching;
        
        // Exact cooling capacity match
        if (Math.abs(product1.cooling_capacity - product2.cooling_capacity) < 0.1) {
            score += 100;
        } else if (Math.abs(product1.cooling_capacity - product2.cooling_capacity) <= config.tolerances.cooling_capacity) {
            score += 80;
        }
        
        // Type match
        if (product1.type === product2.type) {
            score += 50;
        }
        
        // Inverter match
        if (product1.inverter === product2.inverter) {
            score += 10;
        }
        
        return Math.min(score, 100);
    }
    
    updateCrossMatches() {
        if (this.selectedProducts.length === 0) {
            this.clearCrossMatches();
            return;
        }
        
        const selectedProductsData = this.selectedProducts.map(id => this.findProductById(id)).filter(p => p);
        if (selectedProductsData.length === 0) return;
        
        this.crossMatches = this.findMultipleCrossMatches(selectedProductsData);
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
            
            selectedProducts.forEach(selectedProduct => {
                brandProducts.forEach(product => {
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
            
            allCandidates.sort((a, b) => b.score - a.score);
            
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
    
    clearCrossMatches() {
        this.crossMatches = {};
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
    
    getSelectedWordForm(count) {
        if (count === 1) return "товар";
        if (count >= 2 && count <= 4) return "товара"; 
        return "товаров";
    }
    
    updateURL() {
        const params = new URLSearchParams();
        params.set('brand', this.currentBrand);
        params.set('category', this.currentCategory);
        
        const newURL = `${window.location.pathname}?${params.toString()}`;
        window.history.pushState({}, '', newURL);
    }
}

// Initialize when page loads
let brandSearch;
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if we're on the search page and brand tabs exist
    if (document.getElementById('brandTabs')) {
        brandSearch = new BrandSearchCatalog();
    }
});