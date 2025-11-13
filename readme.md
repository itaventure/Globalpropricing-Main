<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GlobalProPricing - Shopify App</title>
    
    <!-- Shopify App Bridge -->
    <script src="https://unpkg.com/@shopify/app-bridge"></script>
    
    <style>
        :root {
            --primary-color: #5c6ac4;
            --secondary-color: #202e78;
            --accent-color: #47c1bf;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        body {
            margin: 0;
            padding: 0;
            background: #f6f6f7;
        }
        
        .shopify-app-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .shopify-header {
            background: white;
            border-radius: 8px;
            padding: 25px;
            margin-bottom: 20px;
            border: 1px solid #e1e5e9;
            text-align: center;
        }
        
        .shopify-header h1 {
            color: #202e78;
            margin-bottom: 10px;
            font-size: 2.2em;
        }
        
        .shopify-header p {
            color: #637381;
            margin: 0;
            font-size: 1.1em;
        }
        
        .shopify-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin: 20px 0;
        }
        
        .shopify-stat-card {
            background: white;
            border: 1px solid #e1e5e9;
            border-radius: 8px;
            padding: 20px;
            text-align: center;
        }
        
        .shopify-tabs {
            display: flex;
            background: #f6f6f7;
            border-radius: 8px;
            padding: 4px;
            margin-bottom: 20px;
        }
        
        .shopify-tab {
            flex: 1;
            padding: 12px;
            border: none;
            background: none;
            cursor: pointer;
            border-radius: 6px;
            transition: all 0.3s ease;
        }
        
        .shopify-tab.active {
            background: white;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .shopify-content {
            background: white;
            border: 1px solid #e1e5e9;
            border-radius: 8px;
            padding: 25px;
        }
        
        .shopify-product-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 20px;
        }
        
        .shopify-product-card {
            border: 1px solid #e1e5e9;
            border-radius: 8px;
            padding: 20px;
            transition: transform 0.3s ease;
        }
        
        .shopify-product-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        
        .shopify-btn {
            background: var(--primary-color);
            color: white;
            border: none;
            padding: 10px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 500;
            transition: background 0.3s ease;
        }
        
        .shopify-btn:hover {
            background: var(--secondary-color);
        }
        
        /* Footer Styles */
        .shopify-footer {
            background: linear-gradient(135deg, #2c3e50, #34495e);
            color: white;
            padding: 40px 20px;
            margin-top: 50px;
            border-radius: 8px;
        }
        
        .shopify-footer a {
            color: white;
            text-decoration: none;
            transition: color 0.3s ease;
        }
        
        .shopify-footer a:hover {
            color: #47c1bf;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            .shopify-tabs {
                flex-direction: column;
            }
            
            .shopify-product-grid {
                grid-template-columns: 1fr;
            }
            
            .shopify-header h1 {
                font-size: 1.8em;
            }
        }
    </style>
</head>
<body>
    <div class="shopify-app-container">
        <!-- Header - Logo Section Removed -->
        <div class="shopify-header">
            <h1>GlobalProPricing</h1>
            <p>Multi-Country Pricing for Shopify</p>
        </div>

        <!-- Stats -->
        <div class="shopify-stats">
            <div class="shopify-stat-card">
                <div style="font-size: 2em; color: var(--primary-color);">📦</div>
                <h3 id="shopifyTotalProducts">0</h3>
                <p>Shopify Products</p>
            </div>
            <div class="shopify-stat-card">
                <div style="font-size: 2em; color: var(--accent-color);">🌍</div>
                <h3 id="shopifyActiveCountries">0</h3>
                <p>Countries Active</p>
            </div>
            <div class="shopify-stat-card">
                <div style="font-size: 2em; color: #50b83c;">💰</div>
                <h3 id="shopifyRevenue">$0</h3>
                <p>Estimated Revenue</p>
            </div>
        </div>

        <!-- Tabs -->
        <div class="shopify-tabs">
            <button class="shopify-tab active" onclick="openShopifyTab('products')">Products</button>
            <button class="shopify-tab" onclick="openShopifyTab('pricing')">Pricing</button>
            <button class="shopify-tab" onclick="openShopifyTab('settings')">Settings</button>
        </div>

        <!-- Content -->
        <div class="shopify-content">
            <!-- Products Tab -->
            <div id="shopifyProductsTab">
                <h2 style="color: #202e78; margin-bottom: 20px;">Your Shopify Products</h2>
                <div id="shopifyProductsList" class="shopify-product-grid">
                    <p>Loading products from your Shopify store...</p>
                </div>
            </div>

            <!-- Pricing Tab -->
            <div id="shopifyPricingTab" style="display: none;">
                <h2 style="color: #202e78; margin-bottom: 20px;">Multi-Country Pricing</h2>
                <div id="shopifyPricingGrid">
                    <p>Select a product to set country-specific pricing.</p>
                </div>
            </div>

            <!-- Settings Tab -->
            <div id="shopifySettingsTab" style="display: none;">
                <h2 style="color: #202e78; margin-bottom: 20px;">App Settings</h2>
                <div class="settings-section">
                    <h3 style="color: #5c6ac4; margin-bottom: 15px;">Store Configuration</h3>
                    <div style="background: #f9fafb; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
                        <p><strong>Store:</strong> your-store.myshopify.com</p>
                        <p><strong>Status:</strong> <span style="color: #50b83c;">Connected</span></p>
                        <p><strong>Last Sync:</strong> Just now</p>
                    </div>
                    
                    <h3 style="color: #5c6ac4; margin-bottom: 15px;">Pricing Rules</h3>
                    <div style="background: #f9fafb; padding: 20px; border-radius: 6px;">
                        <p>Configure your global pricing strategies and rules here.</p>
                        <button class="shopify-btn" style="margin-top: 15px;">Configure Rules</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer Section -->
        <div class="shopify-footer">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; margin-bottom: 30px;">
                <!-- Company Info -->
                <div>
                    <h3 style="color: #47c1bf; margin-bottom: 15px;">🌍 GlobalProPricing</h3>
                    <p>Multi-Country Pricing Solution for Shopify Stores. Expand your business globally with smart pricing.</p>
                </div>
                
                <!-- Quick Links -->
                <div>
                    <h4 style="color: #47c1bf; margin-bottom: 15px;">Quick Links</h4>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        <a href="../1-Website-App/index.html" style="color: white; text-decoration: none;">
                            🌐 Main Website
                        </a>
                        <a href="../5-Support/customer-support.html" style="color: white; text-decoration: none;">
                            📞 Customer Support
                        </a>
                        <a href="../5-Support/privacy-policy.html" style="color: white; text-decoration: none;">
                            🔒 Privacy Policy
                        </a>
                        <a href="../3-Admin-Panel/admin-panel.html" style="color: white; text-decoration: none;">
                            ⚙️ Admin Panel
                        </a>
                    </div>
                </div>
                
                <!-- Contact Info -->
                <div>
                    <h4 style="color: #47c1bf; margin-bottom: 15px;">Contact Us</h4>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        <p>📧 support@globalpropricing.com</p>
                        <p>📱 +92 300 1234567</p>
                        <p>🕐 9AM - 6PM (PST)</p>
                    </div>
                </div>
            </div>
            
            <!-- Copyright -->
            <div style="text-align: center; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1);">
                <p>&copy; 2024 GlobalProPricing. All rights reserved.</p>
            </div>
        </div>
    </div>

    <script>
        // Shopify App Code
        class ShopifyGlobalProPricing {
            constructor() {
                this.products = [];
                this.currentTab = 'products';
            }

            async init() {
                try {
                    // Initialize Shopify App Bridge
                    const AppBridge = window['app-bridge'];
                    this.app = AppBridge.default({
                        apiKey: 'YOUR_API_KEY',
                        host: new URLSearchParams(window.location.search).get('host'),
                        forceRedirect: true
                    });

                    // Simulate loading products
                    await this.loadProducts();
                    
                } catch (error) {
                    console.error('Shopify app init failed:', error);
                }
            }

            async loadProducts() {
                // Simulate API call
                setTimeout(() => {
                    this.products = [
                        { id: 1, title: 'Wireless Headphones', variants: [{ price: '29.99' }], image: '🎧' },
                        { id: 2, title: 'Smart Watch', variants: [{ price: '49.99' }], image: '⌚' },
                        { id: 3, title: 'Laptop Backpack', variants: [{ price: '39.99' }], image: '🎒' },
                        { id: 4, title: 'Phone Case', variants: [{ price: '19.99' }], image: '📱' }
                    ];
                    this.renderProducts();
                }, 1000);
            }

            renderProducts() {
                const container = document.getElementById('shopifyProductsList');
                if (!container) return;

                container.innerHTML = this.products.map(product => `
                    <div class="shopify-product-card">
                        <div style="font-size: 3em; text-align: center; margin-bottom: 15px;">${product.image}</div>
                        <h4 style="margin: 0 0 10px 0; color: #202e78;">${product.title}</h4>
                        <p style="margin: 0 0 15px 0; color: #637381;">$${product.variants[0]?.price || '0.00'}</p>
                        <button class="shopify-btn" onclick="shopifyApp.setupPricing(${product.id})" style="width: 100%;">
                            Set Country Prices
                        </button>
                    </div>
                `).join('');

                document.getElementById('shopifyTotalProducts').textContent = this.products.length;
                document.getElementById('shopifyActiveCountries').textContent = '5';
                document.getElementById('shopifyRevenue').textContent = '$' + (this.products.length * 89.97).toFixed(2);
            }

            setupPricing(productId) {
                this.openTab('pricing');
                const product = this.products.find(p => p.id === productId);
                if (product) {
                    document.getElementById('shopifyPricingGrid').innerHTML = `
                        <div style="background: #f9fafb; padding: 25px; border-radius: 8px;">
                            <h3 style="color: #5c6ac4; margin-bottom: 20px;">Pricing for: ${product.title}</h3>
                            <div style="display: grid; gap: 15px;">
                                <div style="display: flex; justify-content: space-between; padding: 10px; background: white; border-radius: 6px;">
                                    <span>🇺🇸 United States</span>
                                    <input type="number" value="${product.variants[0].price}" style="width: 100px; padding: 5px; border: 1px solid #e1e5e9; border-radius: 4px;">
                                </div>
                                <div style="display: flex; justify-content: space-between; padding: 10px; background: white; border-radius: 6px;">
                                    <span>🇵🇰 Pakistan</span>
                                    <input type="number" value="${(parseFloat(product.variants[0].price) * 280).toFixed(2)}" style="width: 100px; padding: 5px; border: 1px solid #e1e5e9; border-radius: 4px;">
                                </div>
                                <div style="display: flex; justify-content: space-between; padding: 10px; background: white; border-radius: 6px;">
                                    <span>🇬🇧 United Kingdom</span>
                                    <input type="number" value="${(parseFloat(product.variants[0].price) * 0.8).toFixed(2)}" style="width: 100px; padding: 5px; border: 1px solid #e1e5e9; border-radius: 4px;">
                                </div>
                            </div>
                            <button class="shopify-btn" style="margin-top: 20px; width: 100%;">Save Prices</button>
                        </div>
                    `;
                }
            }

            openTab(tabName) {
                this.currentTab = tabName;
                
                // Update tabs
                document.querySelectorAll('.shopify-tab').forEach(btn => {
                    btn.classList.remove('active');
                });
                
                document.querySelector(`.shopify-tab:nth-child(${['products', 'pricing', 'settings'].indexOf(tabName) + 1})`).classList.add('active');
                
                // Update content
                document.getElementById('shopifyProductsTab').style.display = 'none';
                document.getElementById('shopifyPricingTab').style.display = 'none';
                document.getElementById('shopifySettingsTab').style.display = 'none';
                
                document.getElementById('shopify' + tabName.charAt(0).toUpperCase() + tabName.slice(1) + 'Tab').style.display = 'block';
            }
        }

        // Global functions for HTML onclick
        function openShopifyTab(tabName) {
            shopifyApp.openTab(tabName);
        }

        // Initialize
        const shopifyApp = new ShopifyGlobalProPricing();
        document.addEventListener('DOMContentLoaded', function() {
            shopifyApp.init();
        });
    </script>
    ## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
</body>
</html>