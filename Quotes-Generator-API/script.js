document.addEventListener("DOMContentLoaded", function () {
  const quoteText = document.getElementById("quoteText");
  const authorText = document.getElementById("authorText");
  const newQuoteBtn = document.getElementById("newQuoteBtn");

  newQuoteBtn.addEventListener("click", fetchQuote);

  fetchQuote();

  async function fetchQuote() {
    try {
      const response = await fetch("https://api.quotable.io/random");
      const data = await response.json();
      quoteText.textContent = data.content;
      authorText.textContent = `- ${data.author}`;
    } catch (error) {
      console.error("Error fetching quote:", error);
      quoteText.textContent = "Failed to fetch quote. Please try again later.";
      authorText.textContent = "";
    }
  }
});
