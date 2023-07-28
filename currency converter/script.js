const fromCurrencySelect = document.getElementById('fromCurrency');
const toCurrencySelect = document.getElementById('toCurrency');
const amountInput = document.getElementById('amount');
const convertBtn = document.getElementById('convertBtn');
const resultDiv = document.getElementById('result');

// Fetch available currencies from the ExchangeRate-API
fetch('https://api.exchangerate-api.com/v4/latest/USD')
    .then(response => response.json())
    .then(data => {
        const currencies = Object.keys(data.rates);
        currencies.forEach(currency => {
            const option1 = document.createElement('option');
            option1.textContent = currency;
            fromCurrencySelect.appendChild(option1);

            const option2 = document.createElement('option');
            option2.textContent = currency;
            toCurrencySelect.appendChild(option2);
        });
    });

// Event listener for the convert button
convertBtn.addEventListener('click', () => {
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;
    const amount = parseFloat(amountInput.value);

    // Make sure the user enters a valid amount
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount.');
        return;
    }

    // Fetch exchange rates for the selected currencies
    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
        .then(response => response.json())
        .then(data => {
            const exchangeRate = data.rates[toCurrency];
            const convertedAmount = (amount * exchangeRate).toFixed(2);
            resultDiv.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
        })
        .catch(error => {
            console.error('Error fetching exchange rates:', error);
            alert('An error occurred while fetching exchange rates. Please try again later.');
        });
});