function renderMenu(items, containerId) {
  const container = document.getElementById(containerId);

  container.innerHTML += items
    .map(
      (item, index) => `
        <div class="menu-item">
          <div class="menu-item-header">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            
          </div>
          <div class="menu-add-price">
         <span>${item.price.toFixed(2)} €</span>
           <button onclick="addToCart('${containerId}', ${index})">
            Add 
          </button>
          </div>
        </div>
      `,
    )
    .join("");
}

function getBasketTemplate() {
  let html = "";

  if (cart.length === 0) {
    return '<p class="basket-empty">Nothing here yet.<br>Go Ahead and choose something delicious!</p>';
  }

  for (let i = 0; i < cart.length; i++) {
    html += `
      <div class="basket-item">
      <div class="basket-item-info">
        <span>${cart[i].name}</span>
        <div class="quantity-controls">
        <button onclick="removeFromBasket(${i})">🗑️</button>
          <span>${cart[i].quantity}</span>
          <button class="increase-quantity" onclick="increaseQuantity(${i})">+</button>
        </div>
      </div>
        <div>
          
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
