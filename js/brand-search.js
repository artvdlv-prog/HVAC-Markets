// Brand Search Integration for HVAC Platform - Exact Demo Logic
class BrandSearchCatalog {
    constructor() {
        this.currentBrand = 'daikin';
        this.currentCategory = 'indoor_units';
        this.selectedProduct = null;
        this.selectedProducts = []; // Array of selected products for comparison
        this.crossMatches = {};
        this.selectionOrder = 0; // Track selection order
        
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
                },
                panasonic: {
                    name: "Panasonic",
                    logo: "assets/brands/panasonic-logo.svg",
                    color: "#0C4DA0"
                },
                toshiba: {
                    name: "Toshiba",
                    logo: "assets/brands/toshiba-logo.svg",
                    color: "#FF0000"
                },
                fujitsu: {
                    name: "Fujitsu",
                    logo: "assets/brands/fujitsu-logo.svg",
                    color: "#C8102E"
                },
                carrier: {
                    name: "Carrier",
                    logo: "assets/brands/carrier-logo.svg",
                    color: "#0066CC"
                },
                york: {
                    name: "York",
                    logo: "assets/brands/york-logo.svg",
                    color: "#003C71"
                },
                trane: {
                    name: "Trane",
                    logo: "assets/brands/trane-logo.svg",
                    color: "#009639"
                },
                lennox: {
                    name: "Lennox",
                    logo: "assets/brands/lennox-logo.svg",
                    color: "#E4002B"
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
        this.attachToExistingTabs();
        this.addSelectionCounter();
        this.setupProductClickHandlers();
        this.updateURL();
        
        // Wait for products to be generated
        setTimeout(() => {
            this.injectProductCardStyling();
        }, 500);
    }
    
    injectProductCardStyling() {
        // Make product cards visually clickable
        document.querySelectorAll('.product-card').forEach(card => {
            if (!card.style.cursor) {
                card.style.cursor = 'pointer';
            }
        });
    }
    
    attachToExistingTabs() {
        // Attach event listeners to existing brand tabs
        document.addEventListener('click', (e) => {
            const clickedTab = e.target.closest('.brand-tab[data-brand]');
            if (clickedTab) {
                const brandKey = clickedTab.getAttribute('data-brand');
                if (this.equipmentStructure.brands[brandKey]) {
                    // Remove active class from all tabs
                    document.querySelectorAll('.brand-tab').forEach(tab => {
                        tab.classList.remove('active');
                    });
                    
                    // Add active class to clicked tab
                    clickedTab.classList.add('active');
                    
                    // Handle brand switch with delay to allow DOM update
                    setTimeout(() => {
                        this.handleBrandSwitch(brandKey);
                    }, 50);
                }
            }
        });
    }
    
    setupProductClickHandlers() {
        // Hook into existing product selection
        const originalToggleProductSelection = window.toggleProductSelection;
        
        if (originalToggleProductSelection) {
            window.toggleProductSelection = (productId) => {
                // Call original function first
                originalToggleProductSelection(productId);
                
                // Then handle our cross-brand logic
                const product = sampleProducts?.find(p => p.id === productId);
                if (product) {
                    this.handleProductToggle(productId, product);
                }
            };
        }
        
        // Also set up direct click handling for product cards
        document.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            if (productCard && !e.target.closest('.product-actions')) {
                const productId = parseInt(productCard.dataset.productId);
                if (productId) {
                    this.handleProductCardClick(productId, productCard);
                }
            }
        });
    }
    
    handleProductToggle(productId, product) {
        console.log('Handling product toggle for:', productId, product);
        
        // Find in our selection by ID or by matching product data
        const existingIndex = this.selectedProducts.findIndex(p => 
            p.id === productId || 
            (p.model === product.model && p.brand === product.brand)
        );
        
        if (existingIndex >= 0) {
            // Deselect product
            console.log('Deselecting product:', this.selectedProducts[existingIndex]);
            this.selectedProducts.splice(existingIndex, 1);
        } else {
            // Select product - add to our tracking with detailed info
            this.selectionOrder++;
            const selectedProduct = {
                ...product,
                id: productId,
                originalBrand: this.currentBrand, // Remember which brand this was selected from
                model: product.model || this.extractModelFromTitle(product.title),
                capacity: product.capacity || this.extractCapacityFromTitle(product.title),
                type: product.type || this.extractTypeFromTitle(product.title),
                selectionOrder: this.selectedProducts.length + 1
            };
            
            console.log('Selecting product:', selectedProduct);
            this.selectedProducts.push(selectedProduct);
        }
        
        console.log('Current selected products:', this.selectedProducts);
        this.updateSelectionCounter();
        this.showCrossBrandAnalogs();
    }
    
    handleProductCardClick(productId, element) {
        // Toggle visual selection styling
        const isSelected = element.classList.contains('selected');
        
        if (isSelected) {
            element.classList.remove('selected');
            element.removeAttribute('data-selection-order');
        } else {
            element.classList.add('selected');
            element.setAttribute('data-selection-order', this.selectedProducts.length + 1);
        }
        
        // Call the original toggle function if it exists
        if (window.toggleProductSelection) {
            window.toggleProductSelection(productId);
        }
    }
    
    findProductByIdOrModel(identifier) {
        // Find product in current brand's data
        const brandData = this.equipmentData[this.currentBrand];
        if (!brandData || !brandData[this.currentCategory]) return null;
        
        return brandData[this.currentCategory].find(product => 
            product.model === identifier || product.id === identifier
        );
    }
    
    addSelectionCounter() {
        // We don't need a visible counter, just create a hidden element for compatibility
        if (!document.getElementById('selectionCounter')) {
            const counter = document.createElement('div');
            counter.id = 'selectionCounter';
            counter.className = 'selection-counter';
            counter.style.display = 'none';
            document.body.appendChild(counter);
        }
    }
    
    updateSelectionCounter() {
        const counter = document.getElementById('selectionCounter');
        if (counter) {
            // Always hide the counter - we don't want to show messages
            counter.classList.remove('show');
            counter.style.display = 'none';
        }
        
        // Update selection button badge
        this.updateSelectionButton();
        
        // Show/hide selection panel
        this.updateSelectionPanel();
    }
    
    updateSelectionPanel() {
        const selectedPanel = document.getElementById('selectedPanel');
        const selectedCount = document.getElementById('selectedCount');
        
        if (!selectedPanel) return;
        
        const hasSelection = this.selectedProducts.length > 0;
        
        if (hasSelection) {
            selectedPanel.classList.add('active');
            
            // Update count text
            if (selectedCount) {
                const count = this.selectedProducts.length;
                const word = count === 1 ? 'товар' : count >= 2 && count <= 4 ? 'товара' : 'товаров';
                selectedCount.textContent = `${count} ${word} выбрано`;
            }
        } else {
            selectedPanel.classList.remove('active');
        }
        
        console.log(`Selection panel ${hasSelection ? 'shown' : 'hidden'}: ${this.selectedProducts.length} items`);
    }
    
    updateSelectionButton() {
        const selectionButton = document.getElementById('selectionButton');
        const selectionBadge = document.getElementById('selectionBadge');
        
        if (!selectionButton || !selectionBadge) return;
        
        const selectedCount = this.selectedProducts.length;
        
        // Update badge number
        selectionBadge.textContent = selectedCount;
        
        // Update badge styling
        selectionBadge.classList.remove('zero', 'active');
        if (selectedCount === 0) {
            selectionBadge.classList.add('zero');
        } else {
            selectionBadge.classList.add('active');
            
            // Pulse animation for badge
            selectionBadge.style.animation = 'none';
            setTimeout(() => {
                selectionBadge.style.animation = 'pulse-badge 0.5s ease';
            }, 10);
        }
        
        // Update total price calculation
        this.updateTotalPrice();
        
        console.log(`Updated selection button: ${selectedCount} items selected`);
    }
    
    updateTotalPrice() {
        const selectedTotalElement = document.getElementById('selectedTotal');
        if (!selectedTotalElement) return;
        
        if (this.selectedProducts.length === 0) {
            selectedTotalElement.textContent = '$0';
            return;
        }
        
        // Calculate total price for selected products
        let totalPrice = 0;
        const currentBrandProducts = window.allBrandProducts?.[this.currentBrand] || [];
        
        // If we're showing analogs, calculate price based on current brand's analog products
        if (this.selectedProducts.length > 0 && this.selectedProducts[0].originalBrand !== this.currentBrand) {
            // Find analog matches to calculate their prices
            const matches = this.findMultipleCrossMatches(this.selectedProducts);
            const currentBrandMatches = matches[this.currentBrand] || [];
            
            totalPrice = currentBrandMatches.reduce((sum, match) => {
                return sum + (match.price || 0);
            }, 0);
            
            console.log(`Calculating analog prices for ${this.currentBrand}:`, currentBrandMatches.map(m => `${m.model}: $${m.price}`));
        } else {
            // Calculate price for originally selected products
            totalPrice = this.selectedProducts.reduce((sum, product) => {
                return sum + (product.price || 0);
            }, 0);
            
            console.log(`Calculating original prices:`, this.selectedProducts.map(p => `${p.model || p.title}: $${p.price}`));
        }
        
        // Format and display price
        const formattedPrice = this.formatPrice(totalPrice);
        selectedTotalElement.textContent = formattedPrice;
        
        console.log(`Updated total price for ${this.currentBrand}: ${formattedPrice}`);
    }
    
    formatPrice(price) {
        if (price === 0) return '$0';
        
        // Format price with commas and currency symbol
        const currentCurrency = window.currentCurrency || 'usd';
        const exchangeRates = window.exchangeRates || { usd: 1, rub: 75.50, eur: 0.85 };
        
        let convertedPrice = price;
        let symbol = '$';
        
        switch(currentCurrency) {
            case 'rub':
                convertedPrice = price * exchangeRates.rub;
                symbol = '₽';
                break;
            case 'eur':
                convertedPrice = price * exchangeRates.eur;
                symbol = '€';
                break;
            default:
                convertedPrice = price;
                symbol = '$';
        }
        
        return `${symbol}${Math.round(convertedPrice).toLocaleString()}`;
    }
    
    handleBrandSwitch(brandKey) {
        console.log(`Switching to brand: ${brandKey} with ${this.selectedProducts.length} selected products`);
        const previousBrand = this.currentBrand;
        this.currentBrand = brandKey;
        
        // Update URL
        const url = new URL(window.location);
        url.searchParams.set('brand', brandKey);
        window.history.replaceState({}, '', url);
        
        // Wait for new products to be generated for this brand
        setTimeout(() => {
            // If products are selected, show analogs for this brand
            if (this.selectedProducts.length > 0) {
                console.log('Showing analogs for brand switch from', previousBrand, 'to', brandKey);
                this.showCrossBrandAnalogs();
            }
            
            // Re-inject styling for new product cards
            this.injectProductCardStyling();
            
            // Update price calculation for new brand
            this.updateTotalPrice();
        }, 200);
        
        // Update selection counter and price immediately
        this.updateSelectionCounter();
    }
    
    showCrossBrandAnalogs() {
        console.log('=== SHOWING CROSS-BRAND ANALOGS ===');
        console.log('Selected products:', this.selectedProducts);
        console.log('Current brand:', this.currentBrand);
        
        if (this.selectedProducts.length === 0) {
            console.log('No products selected, skipping analog search');
            return;
        }
        
        // Find cross-brand matches
        const matches = this.findMultipleCrossMatches(this.selectedProducts);
        console.log('Cross-brand matches found:', matches);
        
        // Clear previous analog highlighting
        document.querySelectorAll('.product-card').forEach(item => {
            item.classList.remove('analog-product', 'selected');
            item.removeAttribute('data-selection-order');
            
            // Clear checkmark highlighting (but keep original selections)
            const selectButton = item.querySelector('.btn-select');
            if (selectButton && !this.isProductOriginallySelected(item)) {
                selectButton.classList.remove('selected');
            }
            
            // Remove compatibility display
            const compatibilityDisplay = item.querySelector('.compatibility-percentage');
            if (compatibilityDisplay) {
                compatibilityDisplay.remove();
            }
        });
        
        // For current brand, show analog highlighting and move to top
        if (matches[this.currentBrand] && matches[this.currentBrand].length > 0) {
            console.log(`Found ${matches[this.currentBrand].length} analogs for ${this.currentBrand}`);
            this.moveAnalogsToTop(matches[this.currentBrand]);
        } else {
            console.log(`No analogs found for ${this.currentBrand}`);
        }
    }
    
    moveAnalogsToTop(analogMatches) {
        const productsGrid = document.getElementById('productsGrid');
        if (!productsGrid) {
            console.log('Products grid not found');
            return;
        }
        
        console.log('=== MOVING ANALOGS TO TOP ===');
        console.log('Analog matches to highlight:', analogMatches);
        
        const analogCards = [];
        const regularCards = [];
        
        // Get all current product cards
        const allCards = Array.from(document.querySelectorAll('.product-card'));
        console.log(`Found ${allCards.length} product cards to check`);
        
        // Find analog cards and regular cards
        allCards.forEach((card, cardIndex) => {
            const titleElement = card.querySelector('.product-title');
            if (!titleElement) {
                console.log(`Card ${cardIndex} has no title element`);
                regularCards.push(card);
                return;
            }
            
            const cardTitle = titleElement.textContent.trim();
            console.log(`Checking card ${cardIndex}: "${cardTitle}"`);
            
            // Check if this card matches any of our analogs
            let matchedAnalog = null;
            let matchIndex = -1;
            
            for (let i = 0; i < analogMatches.length; i++) {
                const match = analogMatches[i];
                console.log(`  Comparing with analog ${i}: ${match.model} / ${match.title}`);
                
                // Check multiple matching criteria
                const modelMatch = cardTitle.includes(match.model);
                const titleMatch = cardTitle === match.title;
                const partialTitleMatch = match.title && cardTitle.includes(match.title.split(' ')[1]); // Match by second word (usually model)
                
                if (modelMatch || titleMatch || partialTitleMatch) {
                    console.log(`    MATCH FOUND! ${modelMatch ? 'model' : titleMatch ? 'title' : 'partial'}`);
                    matchedAnalog = match;
                    matchIndex = i;
                    break;
                }
            }
            
            if (matchedAnalog) {
                console.log(`Card "${cardTitle}" is an analog match`);
                
                // Add analog styling and selection order
                card.classList.add('analog-product', 'selected');
                card.setAttribute('data-selection-order', matchIndex + 1);
                
                // Highlight the checkmark as selected
                const selectButton = card.querySelector('.btn-select');
                if (selectButton) {
                    selectButton.classList.add('selected');
                }
                
                // Add compatibility percentage under checkmark
                this.addCompatibilityDisplay(card, matchedAnalog.score);
                
                analogCards.push(card);
            } else {
                console.log(`Card "${cardTitle}" is not an analog`);
                regularCards.push(card);
            }
        });
        
        console.log(`Found ${analogCards.length} analog cards, ${regularCards.length} regular cards`);
        
        // Only proceed if we found analog cards
        if (analogCards.length === 0) {
            console.log('No analog cards found, skipping reordering');
            return;
        }
        
        // Clear the grid and re-add analog cards first, then regular cards
        productsGrid.innerHTML = '';
        
        // Add analog cards at the top
        analogCards.forEach((card, index) => {
            console.log(`Adding analog card ${index + 1} to top:`, card.querySelector('.product-title').textContent);
            productsGrid.appendChild(card);
        });
        
        // Add a visual separator if there are both analogs and regular cards
        if (analogCards.length > 0 && regularCards.length > 0) {
            const separator = document.createElement('div');
            separator.className = 'analog-separator';
            separator.style.cssText = `
                width: 100%;
                height: 2px;
                background: linear-gradient(90deg, transparent, var(--signature-blue), transparent);
                margin: 1rem 0;
                position: relative;
            `;
            separator.innerHTML = `
                <div style="position: absolute; top: -10px; left: 50%; transform: translateX(-50%); background: white; padding: 0 1rem; color: var(--signature-blue); font-size: 0.8rem; font-weight: 600;">
                    ↑ Найденные аналоги (${analogCards.length})
                </div>
            `;
            productsGrid.appendChild(separator);
        }
        
        // Add regular cards below
        regularCards.forEach((card, index) => {
            productsGrid.appendChild(card);
        });
        
        console.log(`SUCCESS: Moved ${analogCards.length} analogs to top, ${regularCards.length} regular products below`);
    }
    
    addCompatibilityDisplay(card, compatibilityScore) {
        // Remove any existing compatibility display
        const existingDisplay = card.querySelector('.compatibility-percentage');
        if (existingDisplay) {
            existingDisplay.remove();
        }
        
        // Find the product actions area (where the checkmark is)
        const productActions = card.querySelector('.product-actions');
        const selectButton = card.querySelector('.btn-select');
        
        if (productActions && selectButton && compatibilityScore) {
            // Create compatibility percentage display
            const compatibilityElement = document.createElement('div');
            compatibilityElement.className = 'compatibility-percentage';
            compatibilityElement.textContent = Math.round(compatibilityScore) + '%';
            
            // Position it under the checkmark
            productActions.appendChild(compatibilityElement);
            
            console.log(`Added compatibility display: ${Math.round(compatibilityScore)}%`);
        }
    }
    
    isProductOriginallySelected(productCard) {
        // Check if this product card corresponds to an originally selected product
        const titleElement = productCard.querySelector('.product-title');
        if (!titleElement) return false;
        
        const cardTitle = titleElement.textContent.trim();
        
        // Check if this card matches any of our originally selected products for the current brand
        return this.selectedProducts.some(selectedProduct => {
            if (selectedProduct.originalBrand !== this.currentBrand) return false;
            
            const modelMatch = cardTitle.includes(selectedProduct.model);
            const titleMatch = cardTitle === selectedProduct.title;
            return modelMatch || titleMatch;
        });
    }
    
    findMultipleCrossMatches(selectedProducts) {
        const matches = {};
        const selectedCount = selectedProducts.length;
        
        if (selectedCount === 0) {
            console.log('No selected products for cross-matching');
            return matches;
        }
        
        console.log(`Finding cross-matches for ${selectedCount} products:`, selectedProducts);
        
        // Get all brand products from the main page database
        const allBrandProducts = window.allBrandProducts || {};
        console.log('Available brand databases:', Object.keys(allBrandProducts));
        
        // For the current brand only, find the best analogs
        const brandKey = this.currentBrand;
        const brandProducts = allBrandProducts[brandKey] || [];
        
        console.log(`Looking for analogs in ${brandKey}, available products:`, brandProducts.length);
        
        if (brandProducts.length === 0) {
            console.log(`No products available for brand ${brandKey}`);
            return matches;
        }
        
        const allCandidates = [];
        
        // Find all potential matches for each selected product
        selectedProducts.forEach((selectedProduct, selectedIndex) => {
            console.log(`Finding matches for selected product ${selectedIndex + 1}:`, selectedProduct);
            
            brandProducts.forEach(product => {
                // Don't match products from the same original brand
                if (selectedProduct.originalBrand === brandKey) {
                    return;
                }
                
                const score = this.calculateProductMatchScore(selectedProduct, product);
                console.log(`  Comparing with ${product.model}: score = ${score}`);
                
                if (score > 30) { // Lower threshold for better variety
                    allCandidates.push({
                        ...product,
                        title: product.title,
                        model: product.model,
                        score,
                        matchedWith: selectedProduct.id,
                        selectedIndex: selectedIndex // Track which selected product this matches
                    });
                }
            });
        });
        
        console.log(`Found ${allCandidates.length} potential candidates`);
        
        // Sort by score (best matches first)
        allCandidates.sort((a, b) => b.score - a.score);
        
        // Select the best unique matches, ensuring we get exactly selectedCount items
        const uniqueMatches = [];
        const usedProductModels = new Set();
        
        // First pass: get the best match for each selected product
        for (let selectedIndex = 0; selectedIndex < selectedCount; selectedIndex++) {
            const candidatesForThisSelection = allCandidates.filter(c => 
                c.selectedIndex === selectedIndex && 
                !usedProductModels.has(c.model)
            );
            
            if (candidatesForThisSelection.length > 0) {
                const bestMatch = candidatesForThisSelection[0];
                uniqueMatches.push(bestMatch);
                usedProductModels.add(bestMatch.model);
                console.log(`Best match for selection ${selectedIndex + 1}: ${bestMatch.model} (${bestMatch.score}%)`);
            }
        }
        
        // Second pass: if we don't have enough matches, fill with remaining best candidates
        if (uniqueMatches.length < selectedCount) {
            const remainingCandidates = allCandidates.filter(c => 
                !usedProductModels.has(c.model)
            );
            
            for (const candidate of remainingCandidates) {
                if (uniqueMatches.length >= selectedCount) break;
                uniqueMatches.push(candidate);
                usedProductModels.add(candidate.model);
                console.log(`Additional match: ${candidate.model} (${candidate.score}%)`);
            }
        }
        
        matches[brandKey] = uniqueMatches;
        console.log(`Final matches for ${brandKey}:`, uniqueMatches.map(m => `${m.model} (${m.score}%)`));
        
        return matches;
    }
    
    calculateProductMatchScore(product1, product2) {
        let score = 0;
        
        // Capacity match (highest priority)
        if (product1.capacity && product2.capacity) {
            const capacityDiff = Math.abs(product1.capacity - product2.capacity);
            if (capacityDiff === 0) {
                score += 50; // Exact match
            } else if (capacityDiff <= 1000) {
                score += 40; // Very close match
            } else if (capacityDiff <= 3000) {
                score += 25; // Close match
            }
        }
        
        // Type match (split, cassette, floor, ceiling)
        if (product1.type && product2.type && product1.type === product2.type) {
            score += 30;
        }
        
        // Price similarity (closer prices get higher scores)
        if (product1.price && product2.price) {
            const priceDiff = Math.abs(product1.price - product2.price);
            const avgPrice = (product1.price + product2.price) / 2;
            const priceRatio = priceDiff / avgPrice;
            
            if (priceRatio < 0.1) {
                score += 20; // Very similar price
            } else if (priceRatio < 0.3) {
                score += 10; // Similar price
            }
        }
        
        // Energy class match from specs
        const energy1 = this.extractEnergyClassFromTitle(product1.specs || product1.title || '');
        const energy2 = this.extractEnergyClassFromTitle(product2.specs || product2.title || '');
        if (energy1 === energy2) {
            score += 15;
        }
        
        return Math.max(score, 0);
    }
    
    extractModelFromTitle(title) {
        // Extract model name from title (e.g., "Daikin FTXS25K Split System" -> "FTXS25K")
        const match = title.match(/([A-Z0-9-]+)\s+(?:Split|Cassette|Floor|Wall|Ceiling)/i);
        return match ? match[1] : title.split(' ')[1] || title;
    }
    
    calculateMatchScoreFromTitle(title1, title2) {
        let score = 0;
        
        // Extract capacity information
        const capacity1 = this.extractCapacityFromTitle(title1);
        const capacity2 = this.extractCapacityFromTitle(title2);
        
        // Extract energy class
        const energy1 = this.extractEnergyClassFromTitle(title1);
        const energy2 = this.extractEnergyClassFromTitle(title2);
        
        // Capacity match (highest priority)
        if (capacity1 && capacity2) {
            if (Math.abs(capacity1 - capacity2) < 1000) {
                score += 50; // Exact capacity match
            } else if (Math.abs(capacity1 - capacity2) < 3000) {
                score += 30; // Close capacity match
            }
        }
        
        // Energy class match
        if (energy1 === energy2) {
            score += 20;
        }
        
        // Type match (split, cassette, etc.)
        const type1 = this.extractTypeFromTitle(title1);
        const type2 = this.extractTypeFromTitle(title2);
        if (type1 === type2) {
            score += 20;
        }
        
        // Brand penalty (avoid same brand matches)
        const brand1 = this.extractBrandFromTitle(title1);
        const brand2 = this.extractBrandFromTitle(title2);
        if (brand1 === brand2) {
            score -= 20;
        }
        
        return Math.max(score, 0);
    }
    
    extractCapacityFromTitle(title) {
        const match = title.match(/(\d+),?(\d+)?\s*BTU/i);
        if (match) {
            return parseInt(match[1] + (match[2] || '000'));
        }
        return null;
    }
    
    extractEnergyClassFromTitle(title) {
        const match = title.match(/A\+{0,2}/i);
        return match ? match[0] : null;
    }
    
    extractTypeFromTitle(title) {
        const types = ['split', 'cassette', 'floor', 'wall', 'ceiling'];
        for (const type of types) {
            if (title.toLowerCase().includes(type)) {
                return type;
            }
        }
        return 'split'; // default
    }
    
    extractBrandFromTitle(title) {
        const brands = ['daikin', 'mitsubishi', 'lg', 'panasonic', 'toshiba', 'fujitsu'];
        for (const brand of brands) {
            if (title.toLowerCase().includes(brand)) {
                return brand;
            }
        }
        return null;
    }
    
    calculateMatchScore(product1, product2) {
        let score = 0;
        const config = this.equipmentStructure.cross_matching;
        
        // Exact cooling capacity match (highest priority)
        if (Math.abs(product1.cooling_capacity - product2.cooling_capacity) < 0.1) {
            score += 40;
        } else if (Math.abs(product1.cooling_capacity - product2.cooling_capacity) <= config.tolerances.cooling_capacity) {
            score += 30;
        }
        
        // Heating capacity match
        if (Math.abs(product1.heating_capacity - product2.heating_capacity) < 0.1) {
            score += 25;
        } else if (Math.abs(product1.heating_capacity - product2.heating_capacity) <= config.tolerances.heating_capacity) {
            score += 20;
        }
        
        // Type match (important for installation)
        if (product1.type === product2.type) {
            score += 20;
        }
        
        // Power match
        if (Math.abs(product1.power - product2.power) < 0.1) {
            score += 10;
        }
        
        // Inverter match
        if (product1.inverter === product2.inverter) {
            score += 5;
        }
        
        return Math.min(score, 100);
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
    const brandTabs = document.querySelectorAll('.brand-tab[data-brand]');
    if (brandTabs.length > 0) {
        brandSearch = new BrandSearchCatalog();
        console.log('Brand search catalog initialized');
    }
});

// Global function to show notification (used by demo)
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}