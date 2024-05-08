document.addEventListener("DOMContentLoaded", function () {
  const itemNameInput = document.getElementById("itemName");
  const itemPriceInput = document.getElementById("itemPrice");
  const addItemBtn = document.getElementById("addItemBtn");
  const cartList = document.getElementById("cartList");
  const totalCostSpan = document.getElementById("totalCost");

  addItemBtn.addEventListener("click", addItemToCart);

  function addItemToCart() {
    const itemName = itemNameInput.value.trim();
    const itemPrice = parseFloat(itemPriceInput.value);

    if (itemName === "" || isNaN(itemPrice) || itemPrice <= 0) {
      alert("Please enter valid item name and price.");
      return;
    }

    const cartItem = createCartItem(itemName, itemPrice);
    cartList.appendChild(cartItem);

    updateTotalCost();

    itemNameInput.value = "";
    itemPriceInput.value = "";
  }

  function createCartItem(name, price) {
    const li = document.createElement("li");
    li.innerHTML = `${name}: $${price.toFixed(
      2
    )} <span class="remove-btn">Remove</span>`;

    const removeBtn = li.querySelector(".remove-btn");
    removeBtn.addEventListener("click", () => {
      li.remove();
      updateTotalCost();
    });

    return li;
  }

  function updateTotalCost() {
    const items = cartList.querySelectorAll("li");
    let totalCost = 0;

    items.forEach((item) => {
      const price = parseFloat(
        item.textContent.split(":")[1].replace("$", "").trim()
      );
      totalCost += price;
    });

    totalCostSpan.textContent = totalCost.toFixed(2);
  }
});
