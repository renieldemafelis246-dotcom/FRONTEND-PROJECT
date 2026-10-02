// Currency Converter - Static Exchange Rates (for demonstration)
// In a real application, you would fetch from an API like exchangerate.host or similar

// Static exchange rates relative to 1 USD (as of a recent date for demonstration)
const exchangeRates = {
    USD: 1.0,
    PHP: 58.20,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 149.50,
    KRW: 1320.00,
    CAD: 1.35,
    AUD: 1.52,
    SGD: 1.35,
    CNY: 7.25
};

// DOM Elements
const amountInput = document.getElementById('amount');
const fromCurrencySelect = document.getElementById('from-currency');
const toCurrencySelect = document.getElementById('to-currency');
const convertBtn = document.getElementById('convert-btn');
const swapBtn = document.getElementById('swap-btn');
const resultSection = document.getElementById('result-section');
const exchangeRateText = document.getElementById('exchange-rate-text');
const conversionResultText = document.getElementById('conversion-result-text');
const loadingIndicator = document.getElementById('loading-indicator');
const errorMessageDiv = document.getElementById('error-message');
const amountErrorDiv = document.getElementById('amount-error');

// Initialize: set default currencies (FROM: USD, TO: PHP)
fromCurrencySelect.value = 'USD';
toCurrencySelect.value = 'PHP';

// Function to validate amount input
function validateAmount() {
    const amount = parseFloat(amountInput.value);
    amountErrorDiv.textContent = '';

    if (amountInput.value === '') {
        amountErrorDiv.textContent = 'Please enter an amount';
        return false;
    }

    if (isNaN(amount)) {
        amountErrorDiv.textContent = 'Please enter a valid number';
        return false;
    }

    if (amount <= 0) {
        amountErrorDiv.textContent = 'Amount must be greater than zero';
        return false;
    }

    return true;
}

// Function to fetch exchange rates (simulated with static data)
function fetchExchangeRates() {
    return new Promise((resolve) => {
        // Simulate network delay
        setTimeout(() => {
            resolve(exchangeRates);
        }, 500);
    });
}

// Function to convert currency
function convertCurrency(amount, fromCurrency, toCurrency, rates) {
    // Convert from source currency to USD
    const amountInUSD = amount / rates[fromCurrency];
    // Convert from USD to target currency
    const convertedAmount = amountInUSD * rates[toCurrency];
    return convertedAmount;
}

// Function to format currency number
function formatCurrency(number, currency) {
    // Define currency symbols
    const symbols = {
        USD: '$',
        PHP: '₱',
        EUR: '€',
        GBP: '£',
        JPY: '¥',
        KRW: '₩',
        CAD: '$',
        AUD: '$',
        SGD: '$',
        CNY: '¥'
    };

    // Format number with commas and 2 decimal places (except for JPY and KRW which typically don't use cents)
    const formattedNumber = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: currency === 'JPY' || currency === 'KRW' ? 0 : 2,
        maximumFractionDigits: currency === 'JPY' || currency === 'KRW' ? 0 : 2
    }).format(number);

    return `${symbols[currency]}${formattedNumber} ${currency}`;
}

// Function to update exchange rate display
function updateExchangeRateDisplay(fromCurrency, toCurrency, rates) {
    const rate = 1 / rates[fromCurrency] * rates[toCurrency]; // 1 unit of fromCurrency = X units of toCurrency
    exchangeRateText.textContent = `1 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency}`;
}

// Function to update conversion result
function updateConversionResult() {
    // Hide error messages
    errorMessageDiv.classList.add('hidden');
    amountErrorDiv.textContent = '';

    // Validate input
    if (!validateAmount()) {
        resultSection.classList.add('hidden');
        return;
    }

    const amount = parseFloat(amountInput.value);
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    // Show loading indicator
    loadingIndicator.classList.remove('hidden');
    resultSection.classList.add('hidden');

    // Fetch rates and then convert
    fetchExchangeRates()
        .then(rates => {
            // Hide loading indicator
            loadingIndicator.classList.add('hidden');

            // Perform conversion
            const convertedAmount = convertCurrency(amount, fromCurrency, toCurrency, rates);

            // Update exchange rate display
            updateExchangeRateDisplay(fromCurrency, toCurrency, rates);

            // Update conversion result
            const formattedOriginal = formatCurrency(amount, fromCurrency);
            const formattedConverted = formatCurrency(convertedAmount, toCurrency);
            conversionResultText.textContent = `${formattedOriginal} = ${formattedConverted}`;

            // Show result section
            resultSection.classList.remove('hidden');
        })
        .catch(error => {
            console.error('Error fetching exchange rates:', error);
            loadingIndicator.classList.add('hidden');
            errorMessageDiv.textContent = 'Failed to fetch exchange rates. Please try again later.';
            errorMessageDiv.classList.remove('hidden');
        });
}

// Event Listeners
convertBtn.addEventListener('click', updateConversionResult);

// Swap currencies
swapBtn.addEventListener('click', () => {
    const temp = fromCurrencySelect.value;
    fromCurrencySelect.value = toCurrencySelect.value;
    toCurrencySelect.value = temp;

    // If there's already an amount, recalculate
    if (amountInput.value !== '' && !amountErrorDiv.textContent) {
        updateConversionResult();
    }
});

// Convert on Enter key press in amount input
amountInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        updateConversionResult();
    }
});

// Convert when currency selection changes (if amount is entered)
fromCurrencySelect.addEventListener('change', () => {
    if (amountInput.value !== '' && !amountErrorDiv.textContent) {
        updateConversionResult();
    }
});

toCurrencySelect.addEventListener('change', () => {
    if (amountInput.value !== '' && !amountErrorDiv.textContent) {
        updateConversionResult();
    }
});

// Real-time validation as user types
amountInput.addEventListener('input', () => {
    // Clear error on input
    amountErrorDiv.textContent = '';
    // Hide result section while typing (optional)
    resultSection.classList.add('hidden');
});

// Initial conversion on page load (if we want to show a default)
// We'll wait for user interaction instead
