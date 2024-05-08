document.addEventListener("DOMContentLoaded", function () {
  const fromCurrencySelect = document.getElementById("fromCurrency");
  const toCurrencySelect = document.getElementById("toCurrency");
  const amountInput = document.getElementById("amount");
  const convertBtn = document.getElementById("convertBtn");
  const resultDiv = document.getElementById("result");

  convertBtn.addEventListener("click", convertCurrency);

  fetchCurrencies();

  async function fetchCurrencies() {
    try {
      const response = await fetch(
        "https://api.exchangerate-api.com/v4/latest/USD"
      );
      const data = await response.json();
      const currencies = Object.keys(data.rates);

      currencies.forEach((currency) => {
        const option = document.createElement("option");
        option.textContent = currency;
        option.value = currency;
        fromCurrencySelect.appendChild(option);
      });

      currencies.forEach((currency) => {
        const option = document.createElement("option");
        option.textContent = currency;
        option.value = currency;
        toCurrencySelect.appendChild(option);
      });
    } catch (error) {
      console.error("Error fetching currencies:", error);
    }
  }

  async function convertCurrency() {
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;
    const amount = amountInput.value;

    try {
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
      );
      const data = await response.json();
      const exchangeRate = data.rates[toCurrency];
      const convertedAmount = (amount * exchangeRate).toFixed(2);
      resultDiv.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    } catch (error) {
      console.error("Error converting currency:", error);
    }
  }
});
