document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  const recipeList = document.getElementById("recipeList");

  searchBtn.addEventListener("click", searchRecipes);

  async function searchRecipes() {
    const query = searchInput.value.trim();
    if (query === "") {
      alert("Please enter a search query.");
      return;
    }

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      const data = await response.json();
      displayRecipes(data.meals);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      recipeList.innerHTML =
        "<p>Failed to fetch recipes. Please try again later.</p>";
    }
  }

  function displayRecipes(recipes) {
    if (!recipes || recipes.length === 0) {
      recipeList.innerHTML =
        "<p>No recipes found. Please try another search.</p>";
      return;
    }

    recipeList.innerHTML = "";
    recipes.forEach((recipe) => {
      const recipeElement = document.createElement("div");
      recipeElement.classList.add("recipe");
      recipeElement.innerHTML = `
              <h2>${recipe.strMeal}</h2>
              <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
              <p>Category: ${recipe.strCategory}</p>
              <a href="${recipe.strYoutube}" target="_blank">View Recipe</a>
          `;
      recipeList.appendChild(recipeElement);
    });
  }
});
