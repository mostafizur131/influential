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
                        <a href="#" class="btn btn-primary">Add to Cart</a>
                    </div>
                </div>`;
    productsDiv.appendChild(singleProduct);
  });
}
displayProducts();
