// Control Cart
const openCart = document.getElementById("openCart");
const cartBody = document.getElementById("cartBody");
const closeCart = document.getElementById("closeCart");
openCart.addEventListener("click", () => {
  cartBody.classList.add("active");
});
closeCart.addEventListener("click", () => {
  cartBody.classList.remove("active");
});

const products = [
  {
    id: "001",
    name: "Action Camrea",
    image: "../images/action.png",
    price: 380.0,
    ratings: 4.99,
    discount: 5,
  },
  {
    id: "002",
    name: "Green Screen",
    image: "../images/single-light.png",
    price: 25.48,
    ratings: 4.99,
    discount: 5,
  },
  {
    id: "003",
    name: "Vlogging Camera",
    image: "../images/camera.png",
    price: 1800.0,
    ratings: 4.99,
    discount: 5,
  },
  {
    id: "004",
    name: "Photoshoot set",
    image: "../images/lights.png",
    price: 820.4,
    ratings: 4.99,
    discount: 5,
  },
  {
    id: "005",
    name: "Light Setup",
    image: "../images/setup.png",
    price: 1200.0,
    ratings: 4.99,
    discount: 5,
  },
  {
    id: "006",
    name: "Drone",
    image: "../images/drone.png",
    price: 980.25,
    ratings: 4.99,
    discount: 5,
  },
  {
    id: "007",
    name: "Airbuds",
    image: "../images/airpod.png",
    price: 100.25,
    ratings: 4.99,
    discount: 5,
  },
  {
    id: "008",
    name: "Microphone",
    image: "../images/mic.png",
    price: 120.25,
    ratings: 4.99,
    discount: 5,
  },
  {
    id: "009",
    name: "Flex Tripod",
    image: "../images/tripod.png",
    price: 50.48,
    ratings: 4.99,
    discount: 5,
  },
];

// Display Products Dynamically
const productsDiv = document.getElementById("productsDiv");
const cart = [];

function displayProducts() {
  products.forEach((product) => {
    const singleProduct = createProductElement(product);
    productsDiv.appendChild(singleProduct);
  });
}

function createProductElement(product) {
  const singleProduct = document.createElement("div");
  singleProduct.classList.add("col");
  singleProduct.innerHTML = `
    <div class="card">
      <div class="position-relative">
        <img src="${product.image}" class="card-img-top" alt="${product.name}">
        <span class="position-absolute top-0 end-0 translate-middle badge rounded-pill bg-danger border border-light">Discount: ${product.discount}%</span>
      </div>
      <div class="card-body">
        <h5 class="card-title fs-4 fw-bold">${product.name}</h5>
        <p class="fs-3 fw-bold">$<span>${product.price}</span></p>
        <div class="stars d-flex">
          <ul class="list-unstyled list-inline me-2">
            <li class="list-inline-item text-warning p-0 m-0"><i class="bi bi-star-fill"></i></li>
            <li class="list-inline-item text-warning p-0 m-0"><i class="bi bi-star-fill"></i></li>
            <li class="list-inline-item text-warning p-0 m-0"><i class="bi bi-star-fill"></i></li>
            <li class="list-inline-item text-warning p-0 m-0"><i class="bi bi-star-fill"></i></li>
            <li class="list-inline-item text-warning p-0 m-0"><i class="bi bi-star-half"></i></li>
          </ul>
          <span class="fw-bold p-0 m-0">${product.ratings}</span>
        </div>
        <button class="btn btn-primary" onclick='addToCart("${product.id}")'>Add to Cart</button>
      </div>
    </div>`;
  return singleProduct;
}

// Add to cart function

function addToCart(id) {
  const cartProduct = products.find((item) => item.id === id);

  if (!cartProduct) {
    alert("Invalid product ID:", id);
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
function displayCartElements() {
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
    <hr class="my-4">
    <div class="mb-4 d-flex justify-content-between align-items-center">
      <div class="">
        <img src="${item.image}" class="cartImgW rounded-3" alt="${item.name}">
      </div>
      <div class="">
        <h6 class="text-black">${item.name}</h6>
        <h6 class="text-warning mb-0">Rating: ${item.ratings}</h6>
      </div>
      <div class="d-flex">
        <button class="btn text-dark px-2" onclick="decreaseQuantity('${
          item.id
        }')">
          <i class="bi bi-dash"></i>
        </button>
        <input id="quantity-${item.id}" min="0" name="quantity" value="${
    item.quantity
  }" type="number" class="form-control cartInputBoxW" onchange="updateCartItem('${
    item.id
  }', this.value)"/>
        <button class="btn text-dark px-2" onclick="increaseQuantity('${
          item.id
        }')">
          <i class="bi bi-plus"></i>
        </button>
      </div>
      <div class="">
        <h6 id="price-${item.id}" class="mb-0 fs-5">$${(
    item.price * item.quantity
  ).toFixed(2)}</h6>
      </div>
      <div class="text-end" onclick="removeItemFromCart('${item.id}')">
        <a href="#!" class="text-danger"><i class="bi bi-trash"></i></a>
      </div>
    </div>`;
  return cartProduct;
}

// Remove Individual Item
function removeItemFromCart(id) {
  const index = cart.findIndex((item) => item.id === id);
  if (index !== -1) {
    cart.splice(index, 1); // Remove the item from the cart array
    displayCartElements();
  } else {
    alert("Invalid product ID:", id);
  }
}
// Clear the cart array
document.getElementById("cleanCart").addEventListener("click", function () {
  cart.length = 0;
  displayCartElements();
});

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
  quantityInput.value = quantity - 1;
  updateCartItem(id, quantity - 1);
}

// Update Cart item after increasing or decreasing the item quantity
function updateCartItem(id, quantity) {
  const product = cart.find((item) => item.id === id);

  if (!product) {
    alert("Invalid product ID:", id);
    return;
  }

  if (isNaN(quantity)) {
    alert("Invalid quantity:", quantity);
    return;
  }

  product.quantity = parseInt(quantity);
  const priceElement = document.getElementById(`price-${id}`);
  priceElement.innerText = `$${(product.price * product.quantity).toFixed(2)}`;

  calculateSubTotal();
  calculateTotal();
}

// Calculate sub-total of all item from the cart
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
  const getPromoCode = document.getElementById("promoCode");
  promoCode = getPromoCode.value;
  calculateTotal();
});
function calculateTotal() {
  const totalElement = document.getElementById("total");
  const subTotalElement = document.getElementById("subTotal");
  const subTotal = parseFloat(subTotalElement.innerText);
  const shippingElement = document.getElementById("shippingCost");
  const shipping = parseFloat(shippingElement.innerText);

  let total = null;

  if (promoCode === "TAHSIN") {
    const discount = 0.05 * subTotal;
    total = subTotal - discount + shipping;
  } else {
    total = subTotal + shipping;
  }

  totalElement.innerText = total == 0 ? "00" : total.toFixed(2);
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

displayProducts();
