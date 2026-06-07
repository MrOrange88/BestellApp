let cart = [];

function init() {
  renderMenu(steaks, "steaks");
  renderMenu(sides, "sides");
  renderMenu(drinks, "drinks");

  renderBasket();
}

function addToCart(category, index) {
  const menus = {
    steaks,
    sides,
    drinks,
  };

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

function removeFromBasket(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    cart.splice(index, 1);
  }

  renderBasket();
}
function increaseQuantity(index) {
  cart[index].quantity++;
  renderBasket();
}
function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    cart.splice(index, 1);
  }

  renderBasket();
}

function renderBasket() {
  const basketItems = document.getElementById("basket-items");
  const totalPrice = document.getElementById("total-price");

  basketItems.innerHTML = getBasketTemplate();

  let total = 0;

  for (let i = 0; i < cart.length; i++) {
    total += cart[i].price * cart[i].quantity;
  }

  totalPrice.innerHTML = total.toFixed(2) + " €";
}
