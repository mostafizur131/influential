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
  },
  {
    id: "002",
    name: "Green Screen",
    image: "../images/single-light.png",
    price: 25.48,
    ratings: 4.99,
  },
  {
    id: "003",
    name: "Vlogging Camera",
    image: "../images/camera.png",
    price: 1800.0,
    ratings: 4.99,
  },
  {
    id: "004",
    name: "Photoshoot set",
    image: "../images/lights.png",
    price: 820.4,
    ratings: 4.99,
  },
  {
    id: "005",
    name: "Light Setup",
    image: "../images/setup.png",
    price: 1200.0,
    ratings: 4.99,
  },
  {
    id: "006",
    name: "Drone",
    image: "../images/drone.png",
    price: 980.25,
    ratings: 4.99,
  },
  {
    id: "007",
    name: "Airbuds",
    image: "../images/airpod.png",
    price: 100.25,
    ratings: 4.99,
  },
  {
    id: "008",
    name: "Microphone",
    image: "../images/mic.png",
    price: 120.25,
    ratings: 4.99,
  },
  {
    id: "009",
    name: "Flex Tripod",
    image: "../images/tripod.png",
    price: 50.48,
    ratings: 4.99,
  },
];

// Display Products Dynamically

const productsDiv = document.getElementById("productsDiv");
function displayProducts() {
  products.map((product) => {
    const singleProduct = document.createElement("div");
    singleProduct.classList.add("col");
    singleProduct.innerHTML = `<div class="card">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
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
displayProducts();

// Add to cart function
const cart = [];
const newCart = new Set(...cart);
function addToCart(id) {
  const cartProduct = products.find((item) => item.id === id);
  cart.push(cartProduct);
  displayCartElements();
}
function displayCartElements() {
  const cartItem = document.getElementById("cartItem");
  if (cart.length === 0) {
    const p = document.createElement("p");
    p.classList.add("fs-3", "text-dark");
    p.innerText = "Cart is empty";
    cartItem.appendChild(p);
  } else {
    cart.map((item) => {
      cartItem.innerHTML = `<div class="card rounded-3 mb-4">
        <div class="card-body p-4">
            <div class="row d-flex justify-content-between align-items-center">
                <div class="col-md-2 col-lg-2 col-xl-2">
                    <img src="${item.image}"
                        class="img-thumbnail rounded-3" alt="${item.name}">
                </div>
                <div class="col-md-3 col-lg-3 col-xl-3">
                    <p class="lead fw-normal mb-2">${item.name}</p>
                    <p>Ratings : ${item.ratings} </p>
                </div>
                <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                    <button class="btn btn-link px-2"
                        onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                        <i class="bi bi-dash"></i>
                    </button>
    
                    <input id="form1" min="0" name="quantity" value="2" type="number"
                        class="form-control form-control-sm" />
    
                    <button class="btn btn-link px-2"
                        onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                        <i class="bi bi-plus"></i>
                    </button>
                </div>
                <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                    <h5 class="mb-0">$499.00</h5>
                </div>
                <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                    <a href="#!" class="text-danger"><i class="bi bi-trash fa-lg"></i></a>
                </div>
            </div>
        </div>
    </div>`;
    });
  }
}

displayCartElements();
