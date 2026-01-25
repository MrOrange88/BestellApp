function renderMenu(items, containerId) {
  const container = document.getElementById(containerId);

  container.innerHTML = items
    .map(
      (item) => `
      <div class="menu-item">
        <div class="menu-item-header">
          <h3>${item.name}</h3>
          <p class="description">${item.description}</p>
        <span class="price">${item.price.toFixed(2)} €</span>
         </div>
        <button 
          class="add-to-cart"
          onclick='addToCart(${JSON.stringify(item)})'
        >
          + 
        </button>
      </div>
    `
    )
    .join("");
}

renderMenu(steaks, "steaks");
renderMenu(sides, "sides");
renderMenu(drinks, "drinks");
