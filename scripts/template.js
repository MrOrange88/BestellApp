function getMenuItemTemplate(item, containerId, index) {
  return `
    <div class="menu-item-container">
      <div class="menu-item">
        <div class="menu-item-header">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
        </div>

        <div class="menu-add-price">
          <span>${item.price.toFixed(2)} €</span>
          <button class="add-to-cart" onclick="addToCart('${containerId}', ${index})">
            Add
          </button>
        </div>
      </div>
    </div>
  `;
}

function getBasketItemTemplate(item, index) {
  return `
    <div class="basket-item">
      <div class="basket-item-info">
        <span>${item.name}</span>

        <div class="quantity-controls">
          <button onclick="decreaseQuantity(${index})">-</button>
          <span>${item.quantity}</span>
          <button onclick="increaseQuantity(${index})">+</button>
        </div>
      </div>

      <div class="basket-item-price">
        <button onclick="removeFromBasket(${index})">X</button>
        <span>${(item.price * item.quantity).toFixed(2)} €</span>
      </div>
    </div>
  `;
}

function getEmptyBasketTemplate() {
  return `
    <p class="basket-empty">
      Nothing here yet.
      <br>
      Go ahead and choose something delicious!
    </p>
    <img src="assets/img/basket.png" alt="Empty Basket" class="empty-basket-image">
  `;
}

function getOrderMessageTemplate() {
  return `
    <div class="order-message">
      <p>
        Your order is being prepared and will be delivered as soon as possible.
        <br><br>
        Thank you for your order!
      </p>
    </div>
  `;
}
function getSectionHeaderTemplate(title) {
  return `
    <div class="header-section-dishes">
      <div class="content-width">
        <h3>${title}</h3>
      </div>
    </div>
  `;
}
