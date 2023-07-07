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

import { products } from "./product.js";
import { addToCart, cart, displayCartElements } from "./cart.js";

// Display Products Dynamically
const productsDiv = document.getElementById("productsDiv");

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
        <button class="btn btn-primary addToCartBtn">Add to Cart</button>
      </div>
    </div>`;

  // Attach event listener to the "Add to Cart" button
  const addToCartBtn = singleProduct.querySelector(".addToCartBtn");
  addToCartBtn.addEventListener("click", () => {
    addToCart(product.id);
  });
  return singleProduct;
}

// Clear the cart array
document.getElementById("cleanCart").addEventListener("click", function () {
  cart.length = 0;
  displayCartElements();
});

displayProducts();
