document.addEventListener("DOMContentLoaded", function () {
  const newsList = document.getElementById("newsList");

  fetchNews();

  async function fetchNews() {
    const apiUrl =
      "https://gnews.io/api/v4/top-headlines?country=us&token=e9bcf0462b200ea8ba9b9885092bf59a"; // Replace with your GNews API token

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      displayNews(data.articles);
    } catch (error) {
      console.error("Error fetching news:", error);
      newsList.innerHTML =
        "<p>Failed to fetch news. Please try again later.</p>";
    }
  }

  function displayNews(articles) {
    if (!articles || articles.length === 0) {
      newsList.innerHTML = "<p>No articles found.</p>";
      return;
    }

    newsList.innerHTML = "";
    articles.forEach((article) => {
      const articleElement = document.createElement("div");
      articleElement.classList.add("article");
      articleElement.innerHTML = `
              <h2>${article.title}</h2>
              <p>${article.description}</p>
              <a href="${article.url}" target="_blank">Read more</a>
          `;
      newsList.appendChild(articleElement);
    });
  }
});
