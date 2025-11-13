// Website Configuration
const CONFIG = {
    appName: "GlobalProPricing",
    countries: [
        { code: 'US', name: 'United States', flag: '🇺🇸', currency: 'USD' },
        { code: 'PK', name: 'Pakistan', flag: '🇵🇰', currency: 'PKR' },
        { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP' },
        { code: 'CA', name: 'Canada', flag: '🇨🇦', currency: 'CAD' },
        { code: 'AU', name: 'Australia', flag: '🇦🇺', currency: 'AUD' }
    ]
};

// Application State
let AppState = {
    user: {
        plan: 'trial',
        trialEndDate: null,
        isTrialActive: false
    },
    products: []
};

// Initialize Application
function initializeApp() {
    loadUserData();
    renderCountries();
    updateUI();
}

// Load/Save Data
function loadUserData() {
    const saved = localStorage.getItem('globalpropricing');
    if (saved) {
        AppState = JSON.parse(saved);
    }
}

function saveUserData() {
    localStorage.setItem('globalpropricing', JSON.stringify(AppState));
}

// Free Trial
function startFreeTrial() {
    AppState.user.isTrialActive = true;
    AppState.user.plan = 'trial';
    
    const trialEnd = new Date();
    trialEnd.setDate(trialEnd.getDate() + 15);
    AppState.user.trialEndDate = trialEnd;
    
    saveUserData();
    
    document.getElementById('freeTrialSection').style.display = 'none';
    document.getElementById('mainApp').style.display = 'block';
    
    alert('🎉 Free trial started! Enjoy 15 days of premium features.');
    updateUI();
}

function showPaidPlans() {
    document.getElementById('paidPlans').style.display = 'block';
    document.querySelector('.show-paid-plans').style.display = 'none';
}

// Tab Management
function openTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.getElementById(tabName + 'Tab').classList.add('active');
    event.currentTarget.classList.add('active');
}

// Product Management
function addProduct() {
    const name = document.getElementById('productName').value;
    const price = document.getElementById('basePrice').value;
    const weight = document.getElementById('productWeight').value;

    if (!name || !price || !weight) {
        alert('Please fill all fields');
        return;
    }

    const product = {
        id: Date.now(),
        name: name,
        basePrice: parseFloat(price),
        weight: parseFloat(weight),
        countryPrices: {}
    };

    AppState.products.push(product);
    saveUserData();
    renderProducts();
    
    document.getElementById('productName').value = '';
    document.getElementById('basePrice').value = '';
    document.getElementById('productWeight').value = '';
    
    alert('Product added successfully!');
}

function renderProducts() {
    const container = document.getElementById('productsContainer');
    const calcProduct = document.getElementById('calcProduct');
    
    if (AppState.products.length === 0) {
        container.innerHTML = '<p>No products added yet.</p>';
        calcProduct.innerHTML = '<option value="">-- Choose Product --</option>';
        return;
    }

    container.innerHTML = AppState.products.map(product => `
        <div style="padding: 15px; border-bottom: 1px solid #ecf0f1;">
            <h4>${product.name}</h4>
            <p>Price: $${product.basePrice} | Weight: ${product.weight}kg</p>
            <button onclick="deleteProduct(${product.id})">Delete</button>
        </div>
    `).join('');

    calcProduct.innerHTML = '<option value="">-- Choose Product --</option>' +
        AppState.products.map(product => `
            <option value="${product.id}">${product.name}</option>
        `).join('');
}

function deleteProduct(productId) {
    AppState.products = AppState.products.filter(p => p.id !== productId);
    saveUserData();
    renderProducts();
    alert('Product deleted!');
}

// Country Pricing
function renderCountries() {
    const container = document.getElementById('countryPricingGrid');
    const countrySelect = document.getElementById('calcCountry');
    
    container.innerHTML = CONFIG.countries.map(country => `
        <div class="country-card">
            <div style="display: flex; align-items: center; margin-bottom: 15px;">
                <span style="font-size: 2em; margin-right: 10px;">${country.flag}</span>
                <span style="font-weight: bold;">${country.name}</span>
            </div>
            <div>
                ${AppState.products.map(product => `
                    <div style="margin-bottom: 10px;">
                        <label>${product.name}</label>
                        <input type="number" 
                               value="${product.countryPrices?.[country.code] || ''}"
                               placeholder="Enter price"
                               onchange="updateCountryPrice(${product.id}, '${country.code}', this.value)"
                               style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 5px;">
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');

    countrySelect.innerHTML = CONFIG.countries.map(country => `
        <option value="${country.code}">${country.flag} ${country.name}</option>
    `).join('');
}

function updateCountryPrice(productId, countryCode, price) {
    const product = AppState.products.find(p => p.id === productId);
    if (product) {
        product.countryPrices[countryCode] = parseFloat(price);
        saveUserData();
    }
}

function saveAllPrices() {
    saveUserData();
    alert('All prices saved successfully!');
}

// Shipping Calculator
function calculateShipping() {
    const productId = document.getElementById('calcProduct').value;
    const country = document.getElementById('calcCountry').value;
    const method = document.getElementById('calcMethod').value;

    if (!productId || !country || !method) {
        alert('Please select all options');
        return;
    }

    const product = AppState.products.find(p => p.id == productId);
    if (!product) return;

    let shippingCost = product.weight * (method === 'express' ? 10 : 5);
    const productPrice = product.countryPrices[country] || product.basePrice;
    const total = productPrice + shippingCost;

    document.getElementById('calcResult').innerHTML = `
        <h4>Shipping Calculation</h4>
        <p>Product: $${productPrice}</p>
        <p>Shipping: $${shippingCost}</p>
        <p><strong>Total: $${total}</strong></p>
    `;
}

// Payment Modal
function showPaymentModal() {
    document.getElementById('paymentModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('paymentModal').style.display = 'none';
}

// Update UI
function updateUI() {
    if (AppState.user.trialEndDate) {
        document.getElementById('trialEndDate').textContent = 
            new Date(AppState.user.trialEndDate).toLocaleDateString();
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', initializeApp);

// Close modal on outside click
window.onclick = function(event) {
    if (event.target === document.getElementById('paymentModal')) {
        closeModal();
    }
}