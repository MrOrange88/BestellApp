function renderMenu(items, containerId) {
  const container = document.getElementById(containerId);

  container.innerHTML += items
    .map(
      (item, index) => `
        <div class="menu-item">
          <div class="menu-item-header">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <span>${item.price.toFixed(2)} €</span>
          </div>

          <button onclick="addToCart('${containerId}', ${index})">
            +
          </button>
        </div>
      `,
    )
    .join("");
}

function getBasketTemplate() {
  let html = "";

  if (cart.length === 0) {
    return "<p>Dein Warenkorb ist leer.</p>";
  }

  for (let i = 0; i < cart.length; i++) {
    html += `
      <div class="basket-item">
        <span>${cart[i].name}</span>

        <div>
        <div>
          <button onclick="removeFromBasket(${i})">-</button>
          <span>${cart[i].quantity}</span>
          <button onclick="increaseQuantity(${i})">+</button>
        </div>
          <span>
            ${(cart[i].price * cart[i].quantity).toFixed(2)} €
          </span>
        
        </div>
      </div>
    `;
  }

  return html;
}
