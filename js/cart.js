import { products } from "./product.js";
export const cart = [];

// Add to cart function
export function addToCart(id) {
  const cartProduct = products.find((item) => item.id === id);

  if (!cartProduct) {
    alert("Invalid product ID: " + id);
    return;
  }

  const isDuplicate = cart.some((item) => item.id === cartProduct.id);

  if (!isDuplicate) {
    cart.push({ ...cartProduct, quantity: 1 });
    displayCartElements();
  } else {
    alert("Product already exists in the cart.");
  }
}

// Display Cart Items into the cart section
export function displayCartElements() {
  const cartItem = document.getElementById("cartItem");
  cartItem.innerHTML = ""; // Clear existing content

  if (cart.length === 0) {
    const p = document.createElement("p");
    p.classList.add("fs-3", "text-dark");
    p.innerText = "Cart is empty";
    cartItem.appendChild(p);
  } else {
    cart.forEach((item) => {
      const cartProduct = createCartItemElement(item);
      cartItem.appendChild(cartProduct);
    });
  }
  updateCartBadge();
  calculateSubTotal();
  shippingCost();
  calculateTotal();
}

function createCartItemElement(item) {
  const cartProduct = document.createElement("div");
  cartProduct.innerHTML = `
    <hr class="my-2">
    <div class=" d-flex justify-content-between align-items-center">
     
        <figure>
          <img src="${item.image}" class="cartImgW rounded-3" alt="${
    item.name
  }">
        </figure>
     
      <div>
        <h6 class="text-black">${item.name}</h6>
        <h6 class="text-warning mb-0">Rating: ${item.ratings}</h6>
      </div>
      <div class="d-flex">
        <button class="btn text-dark px-2 decrease-quantity-btn">
          <i class="bi bi-dash"></i>
        </button>
        <input id="quantity-${item.id}" min="0" name="quantity" value="${
    item.quantity
  }" type="number" class="form-control cartInputBoxW">
        <button class="btn text-dark px-2 increase-quantity-btn">
          <i class="bi bi-plus"></i>
        </button>
      </div>
      <div>
        <h6 id="price-${item.id}" class="mb-0 fs-5">$${(
    item.price * item.quantity
  ).toFixed(2)}</h6>
      </div>
      <div class="text-end">
        <button class="btn btn-link text-danger remove-item-btn"><i class="bi bi-trash"></i></button>
      </div>
    </div>`;

  // Attach event listeners
  const decreaseQuantityBtn = cartProduct.querySelector(
    ".decrease-quantity-btn"
  );
  const increaseQuantityBtn = cartProduct.querySelector(
    ".increase-quantity-btn"
  );
  const removeItemBtn = cartProduct.querySelector(".remove-item-btn");

  decreaseQuantityBtn.addEventListener("click", () => {
    decreaseQuantity(item.id);
  });

  increaseQuantityBtn.addEventListener("click", () => {
    increaseQuantity(item.id);
  });

  removeItemBtn.addEventListener("click", () => {
    removeItemFromCart(item.id);
  });

  return cartProduct;
}

// Remove Individual Item
function removeItemFromCart(id) {
  const index = cart.findIndex((item) => item.id === id);
  if (index !== -1) {
    cart.splice(index, 1); // Remove the item from the cart array
    displayCartElements();
  } else {
    alert("Invalid product ID: " + id);
  }
}

// Increase Quantity of individual product
function increaseQuantity(id) {
  const quantityInput = document.getElementById(`quantity-${id}`);
  const quantity = parseFloat(quantityInput.value);
  quantityInput.value = quantity + 1;
  updateCartItem(id, quantity + 1);
}

// Decrease Quantity of individual product
function decreaseQuantity(id) {
  const quantityInput = document.getElementById(`quantity-${id}`);
  const quantity = parseFloat(quantityInput.value);
  if (quantity > 1) {
    quantityInput.value = quantity - 1;
    updateCartItem(id, quantity - 1);
  }
}

// Update Cart item after increasing or decreasing the item quantity
function updateCartItem(id, quantity) {
  const product = cart.find((item) => item.id === id);

  if (!product) {
    alert("Invalid product ID: " + id);
    return;
  }

  if (isNaN(quantity)) {
    alert("Invalid quantity: " + quantity);
    return;
  }

  product.quantity = parseInt(quantity);
  const priceElement = document.getElementById(`price-${id}`);
  priceElement.innerText = "$" + (product.price * product.quantity).toFixed(2);

  calculateSubTotal();
  calculateTotal();
}

// Calculate sub-total of all items from the cart
function calculateSubTotal() {
  const subTotalElement = document.getElementById("subTotal");
  const subTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  subTotalElement.innerText = subTotal === 0 ? "00" : subTotal.toFixed(2);
}

// Calculate Total Cost
let promoCode = null;
document.getElementById("promoCodeBtn").addEventListener("click", () => {
  const getPromoCode = document.getElementById("promoCode").value;
  if (getPromoCode === "TAHSIN") {
    promoCode = getPromoCode;
    calculateTotal();
  } else if (getPromoCode !== "TAHSIN") {
    alert("Invalid promo code. Please try again.");
  }
});

function calculateTotal() {
  const totalElement = document.getElementById("total");
  const subTotalElement = document.getElementById("subTotal");
  const subTotal = parseFloat(subTotalElement.innerText);
  const shippingElement = document.getElementById("shippingCost");
  const shipping = parseFloat(shippingElement.innerText);

  let total = subTotal + shipping;

  if (promoCode === "TAHSIN") {
    const discount = 0.05 * subTotal;
    total = subTotal - discount + shipping;
  }

  totalElement.innerText = total === 0 ? "00" : total.toFixed(2);
}

// Update Cart Badge
function updateCartBadge() {
  const cartItems = cart.length;
  const cartBadge = document.getElementById("cartBadge");
  cartBadge.innerText = cartItems > 0 ? cartItems : 0;
}
updateCartBadge();

// Shipping Cost Calculation
function shippingCost() {
  const shippingElement = document.getElementById("shippingCost");
  const cartLength = cart.length === 0 ? 1 : cart.length;
  const total = cartLength * 10;
  shippingElement.innerText = cart.length === 0 ? "00" : total;
}
