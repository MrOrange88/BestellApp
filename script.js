let cart = [];
let deliveryCosts = 5;

function init() {
  renderMenu(steaks, "steaks");
  renderMenu(sides, "sides");
  renderMenu(drinks, "drinks");
  renderBasket();
}

function renderMenu(items, containerId) {
  const container = document.getElementById(containerId);

  container.innerHTML += items
    .map((item, index) => getMenuItemTemplate(item, containerId, index))
    .join("");
}

function getBasketTemplate() {
  if (cart.length === 0) {
    return getEmptyBasketTemplate();
  }

  return getBasketItemsTemplate();
}

function getBasketItemsTemplate() {
  let html = "";

  for (let i = 0; i < cart.length; i++) {
    html += getBasketItemTemplate(cart[i], i);
  }

  return html;
}

function getMenus() {
  return { steaks, sides, drinks };
}

function addToCart(category, index) {
  const item = getMenus()[category][index];
  const cartItem = findCartItem(item.name);

  if (cartItem) {
    cartItem.quantity++;
  } else {
    addNewCartItem(item);
  }

  renderBasket();
}

function findCartItem(name) {
  return cart.find((item) => item.name === name);
}

function addNewCartItem(item) {
  cart.push({
    name: item.name,
    price: item.price,
    quantity: 1,
  });
}

function increaseQuantity(index) {
  cart[index].quantity++;
  renderBasket();
}

function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    removeCartItem(index);
  }

  renderBasket();
}

function removeCartItem(index) {
  cart.splice(index, 1);
}

function removeFromBasket(index) {
  removeCartItem(index);
  renderBasket();
}

function orderBasket() {
  cart = [];
  renderBasket();
  resetTotalPrice();
  closeBasketAfterOrder();
  openOrderModal();
}

function showOrderMessage() {
  document.getElementById("basket-items").innerHTML = getOrderMessageTemplate();
}

function resetTotalPrice() {
  document.getElementById("total-price").innerHTML = "0.00 €";
}

function renderBasket() {
  updateBasketItems();
  updateBasketPrices();
  updateOrderButton();
  updateBasketButton();

  const summary = document.getElementById("basket-summary");

  if (cart.length === 0) {
    summary.style.display = "none";
  } else {
    summary.style.display = "block";
  }
}

function updateBasketItems() {
  document.getElementById("basket-items").innerHTML = getBasketTemplate();
}

function updateBasketPrices() {
  const subtotal = getSubtotal();
  const total = getTotal(subtotal);

  updatePrice("subtotal-price", subtotal);
  updatePrice("total-price", total);
}

function getSubtotal() {
  let subtotal = 0;

  for (let i = 0; i < cart.length; i++) {
    subtotal += cart[i].price * cart[i].quantity;
  }

  return subtotal;
}

function getTotal(subtotal) {
  if (cart.length > 0) {
    return subtotal + deliveryCosts;
  }

  return subtotal;
}

function updatePrice(elementId, price) {
  document.getElementById(elementId).innerHTML = price.toFixed(2) + " €";
}

function updateOrderButton() {
  document.getElementById("order-button").disabled = cart.length === 0;
}

function openOrderModal() {
  const modal = document.getElementById("order-modal");

  modal.classList.add("show");

  setTimeout(() => {
    closeOrderModal();
  }, 3000);
}

function closeBasketAfterOrder() {
  const basket = document.getElementById("basket-content");

  basket.classList.remove("basket-open");

  document.body.classList.remove("no-scroll");
  document.documentElement.classList.remove("no-scroll");

  updateBasketButton();
}

function closeOrderModal() {
  document.getElementById("order-modal").classList.remove("show");
}

function toggleBasket() {
  const basket = document.getElementById("basket-content");

  basket.classList.toggle("basket-open");

  document.body.classList.toggle("no-scroll");
  document.documentElement.classList.toggle("no-scroll");

  updateBasketButton();
}

function updateBasketButton() {
  const amount = getCartAmount();
  const button = document.getElementById("basket-toggle-button");
  const text = getBasketButtonText(amount);

  button.innerHTML = text;
}

function getCartAmount() {
  let amount = 0;

  for (let i = 0; i < cart.length; i++) {
    amount += cart[i].quantity;
  }

  return amount;
}

function getBasketButtonText(amount) {
  const basket = document.getElementById("basket-content");

  if (basket.classList.contains("basket-open")) {
    return `🛒 Close basket (${amount})`;
  }

  return `🛒 Open basket (${amount})`;
}
