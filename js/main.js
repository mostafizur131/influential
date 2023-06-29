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
    discount: 10,
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
    discount: 10,
  },
  {
    id: "004",
    name: "Photoshoot set",
    image: "../images/lights.png",
    price: 820.4,
    ratings: 4.99,
    discount: 10,
  },
  {
    id: "005",
    name: "Light Setup",
    image: "../images/setup.png",
    price: 1200.0,
    ratings: 4.99,
    discount: 15,
  },
  {
    id: "006",
    name: "Drone",
    image: "../images/drone.png",
    price: 980.25,
    ratings: 4.99,
    discount: 10,
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
    const singleProduct = document.createElement("div");
    singleProduct.classList.add("col");
    singleProduct.innerHTML = `<div class="card">
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
    productsDiv.appendChild(singleProduct);
  });
}

// Add to cart function

function addToCart(id) {
  const cartProduct = products.find((item) => item.id === id);

  // Check if the product already exists in the cart
  const isDuplicate = cart.some((item) => item.id === cartProduct.id);

  if (!isDuplicate) {
    cart.push(cartProduct);
    displayCartElements();
  } else {
    alert("Product already exists in the cart.");
  }
}

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
      const cartProduct = document.createElement("div");
      cartProduct.innerHTML = `
        <hr class="my-4">
        <div class="mb-4 d-flex justify-content-between align-items-center">
          <div class="">
            <img src="${item.image}" class="cartImgW rounded-3" alt="${item.name}">
          </div>
          <div class="">
            <h6 class="text-muted">${item.name}</h6>
            <h6 class="text-black mb-0">Discount: ${item.discount}%</h6>
          </div>
          <div class="d-flex">
            <button class="btn text-dark px-2" onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
              <i class="bi bi-dash"></i>
            </button>
    
            <input id="form1" min="0" name="quantity" value="1" type="number" class="form-control cartInputBoxW" />
    
            <button class="btn text-dark px-2" onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
              <i class="bi bi-plus"></i>
            </button>
          </div>
          <div class="">
            <h6 class="mb-0 fs-5">$${item.price}</h6>
          </div>
          <div class="text-end">
            <a href="#!" class="text-danger"><i class="bi bi-trash"></i></a>
          </div>
        </div>`;
      cartItem.appendChild(cartProduct);
    });
  }
  updateCartBadge();
}

document.getElementById("cleanCart").addEventListener("click", function () {
  cart.length = 0; // Clear the cart array
  displayCartElements();
});

function updateCartBadge() {
  const cartItems = cart.length;
  const cartBadge = document.getElementById("cartBadge");
  cartBadge.innerText = cartItems > 0 ? cartItems : 0;
}
updateCartBadge();

displayProducts();
