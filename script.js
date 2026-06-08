let cart = [];
let deliveryCosts = 5;

function init() {
  renderMenu(steaks, "steaks");
  renderMenu(sides, "sides");
  renderMenu(drinks, "drinks");
  renderBasket();
}

function addToCart(category, index) {
  const menus = { steaks, sides, drinks };
  const item = menus[category][index];

  let found = false;

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === item.name) {
      cart[i].quantity++;
      found = true;
    }
  }

  if (!found) {
    cart.push({
      name: item.name,
      price: item.price,
      quantity: 1,
    });
  }

  renderBasket();
}

function increaseQuantity(index) {
  cart[index].quantity++;
  renderBasket();
}

function removeFromBasket(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    cart.splice(index, 1);
  }

  renderBasket();
}

function orderBasket() {
  cart = [];
  renderBasket();

  document.getElementById("basket-items").innerHTML = `
    <div class="order-message">
      <p>
        Die Bestellung wird bearbeitet und schnellstmöglich geliefert.
        <br><br>
        Vielen Dank für Ihre Bestellung!
      </p>
    </div>
  `;

  document.getElementById("total-price").innerHTML = "0.00 €";
}

function renderBasket() {
  const basketItems = document.getElementById("basket-items");
  const subtotalPrice = document.getElementById("subtotal-price");
  const totalPrice = document.getElementById("total-price");
  const orderButton = document.getElementById("order-button");

  basketItems.innerHTML = getBasketTemplate();

  let subtotal = 0;

  for (let i = 0; i < cart.length; i++) {
    subtotal += cart[i].price * cart[i].quantity;
  }

  let total = subtotal;

  if (cart.length > 0) {
    total += deliveryCosts;
  }

  subtotalPrice.innerHTML = subtotal.toFixed(2) + " €";
  totalPrice.innerHTML = total.toFixed(2) + " €";

  orderButton.disabled = cart.length === 0;
}
function toggleBasket() {
  const basket = document.getElementById("basket-content");
  const button = document.getElementById("basket-toggle-button");

  basket.classList.toggle("basket-open");

  if (basket.classList.contains("basket-open")) {
    button.innerHTML = "Warenkorb schließen";
  } else {
    button.innerHTML = "Warenkorb öffnen";
  }
}
