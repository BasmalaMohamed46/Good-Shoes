import Cart from "./cart.js";
let productsContainer = document.getElementById("products");
document.addEventListener("DOMContentLoaded", function () {
const cartInstance = new Cart();
// ------------------------------------------ Show And Hide Dropdown Menu ------------------------------
function showDropdown(element) {
  element.querySelector(".dropdown-content").style.display = "block";
}

function hideDropdown(element) {
  element.querySelector(".dropdown-content").style.display = "none";
}

document.getElementById("dropdown").addEventListener("mouseover", function () {
  showDropdown(this);
});
document.getElementById("dropdown").addEventListener("mouseout", function () {
  hideDropdown(this);
});
// ---------------------------------------- Fetching Data From JSON File --------------------------------

async function fetchData() {
  const url = "../DATA/finalData.json";
  const response = await fetch(url);
  const data = await response.json();
  return data.products;
}
// ----------------------------------- Clear Function To Prevent Overriding Of Data -------------------------------------------------
function clearDiv() {
  
  const productsContainer = document.getElementById("products");
  productsContainer.innerHTML = "";
}

// ----------------------------------- Drawing Each Category In HTML File -------------------------------------------------

async function processCategory(gender) {
  clearDiv();
  const data = await fetchData();
  var products = data.filter((ele) => ele["gender"] === gender);
  drawPageContent(products, gender);
}
// ----------------------------------- draw page content -----------------------------------------------------------------
function addToCart(product) {
  console.log("Product added to cart:", product);
}

async function drawPageContent(products, gender = "search") {
  const mainContainer = document.createElement("div");
  mainContainer.classList.add("container-fluid");

  const row = document.createElement("div");
  row.classList.add("row");

  const productsContainer = document.getElementById("products");

  const filterDiv = document.getElementById("inner-box");
  filterDiv.innerHTML = `
    <div class="mb-3">
      <label for="min" class="form-label">Min Price</label>
      <input type="number" class="form-control" value="0" id="min">
    </div>
    <div class="mb-3">
      <label for="max" class="form-label">Max Price</label>
      <input type="number" class="form-control" value="0" id="max">
    </div>
    <div class="mb-3">
      <label for="gender" class="form-label">Gender</label>
      <select class="form-select" id="genderSelect">
        <option value="all">All</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="kids">Kids</option>
      </select>
    </div>
    <button class="btn btn-primary" id="filterBtn">Submit</button>
  `;

  document.getElementById("filterBtn").addEventListener("click", getFilteredPrice);

  const genderSelect = document.getElementById("genderSelect");
  genderSelect.value = gender;

  var headerDiv = document.createElement("div");
  var header = document.createElement("h4");
  header.classList.add("men-cat-header");
  headerDiv.classList.add("col-12");
  headerDiv.classList.add("men-cat-header");
  if (gender === "male" || gender === "female" || gender === "kids") {
    if (gender === "male") {
      header.textContent = "Men Department";
    } else if (gender === "female") {
      header.textContent = "Women Department";
    } else if (gender === "kids") {
      header.textContent = "Kids Department";
    }
  } else {
    header.textContent = "Search Results";
  }
  headerDiv.appendChild(header);
  productsContainer.appendChild(headerDiv);

  const productsRow = document.createElement("div");
  productsRow.classList.add("row");
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const col = document.createElement("div");
    col.classList.add("col-lg-6");
    col.classList.add("col-md-12");
    col.classList.add("mb-4");
    col.innerHTML = `
      <div class="card h-100">
        <div class="card-body d-flex flex-column justify-content-between">
         
          <div> 
            <img src="${product.imageUrl}" class="card-img-top img-fluid" alt="${product.name}" style="width: 100%; height: 400px;">
          </div>
          <div> 
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">${product.price.current.text}</p>
        </div>
        <div class="actions">
         <div class="button-container">
         <button class="add-to-cart">Add to Cart</button>
         </div>
         <i class="fa-solid fa-heart"></i>
         </div>
        </div>
      </div>
    `;
    productsRow.appendChild(col);

    const addToCartButton = col.querySelector(".add-to-cart");
    addToCartButton.setAttribute("data-bs-toggle", "modal");
    addToCartButton.setAttribute("data-bs-target", "#exampleModal");
    addToCartButton.addEventListener("click", function(event) {
      event.stopPropagation();
      const modalContent = `
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Add to Cart</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="modal-card h-100">
                    <div class="modal-card-body d-flex flex-column justify-content-between">
                        <div> 
                            <img src="${product.imageUrl}" class="card-img-top img-fluid" alt="${product.name}" style="width: 100%; height: 400px;">
                        </div>
                        <div> 
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">${product.price.current.text}</p>
                        </div>
                    </div>
                </div>

                <div id="productColors"></div>
                <div id="productSizes"></div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" id="confirmAddToCart">Add to Cart</button>
            </div>
        </div>
    </div>
`;




      const modal = document.createElement("div");
      modal.id = "exampleModal";
      modal.classList.add("modal", "fade");
      modal.innerHTML = modalContent;

      const confirmAddToCartButton = modal.querySelector("#confirmAddToCart");
      confirmAddToCartButton.addEventListener("click", function() {
        $('#exampleModal').modal('hide');
        event.preventDefault();
        window.location.href = "cart.html";
        cartInstance.addItem(product);
      });

      document.body.appendChild(modal);
      $('#exampleModal').modal('show');
      const colorsContainer = document.getElementById("productColors");
colorsContainer.innerHTML = "";
const colorsLabel = document.createElement("span");
colorsLabel.textContent = "Available Colors: ";
colorsContainer.appendChild(colorsLabel);

product.availableColors.forEach((color) => {
    const colorSquare = document.createElement("span");
    colorSquare.classList.add("color-square");
    colorSquare.style.backgroundColor = color.toLowerCase();
    colorsContainer.appendChild(colorSquare);
    colorSquare.addEventListener("click", function () {
        product.selectedColor = color;
        colorSquare.style.border = "3px solid black";
        colorSquare.style.boxShadow = "0 0 10px 0 grey";
        const otherColorSquares = Array.from(colorsContainer.children).filter((c) => c !== colorSquare);
        otherColorSquares.forEach((c) => {
            if (c.style.backgroundColor === "white") {
                c.style.border = "1px solid #ccc";
            } else {
                c.style.border = "none";
                c.style.boxShadow = "none";
            }
        });
    });
});

const sizesContainer = document.getElementById("productSizes");
sizesContainer.innerHTML = "";
const sizesLabel = document.createElement("span");
sizesLabel.textContent = "Available Sizes: ";
sizesContainer.appendChild(sizesLabel);

product.availableSizes.forEach((size) => {
    const sizeCircle = document.createElement("span");
    sizeCircle.classList.add("size-circle");
    sizeCircle.textContent = size;
    sizesContainer.appendChild(sizeCircle);
    sizeCircle.addEventListener("click", function () {
        product.selectedSize = size;
        sizeCircle.style.border = "3px solid black";
        sizeCircle.style.boxShadow = "0 0 10px 0 grey";
        const otherSizeCircles = Array.from(sizesContainer.children).filter((c) => c !== sizeCircle);
        otherSizeCircles.forEach((c) => {
            c.style.border = "none";
            c.style.boxShadow = "none";
        });
    });
});
    });

    col.addEventListener("click", function () {
      window.location.href = `productDetail.html?id=${product.id}`;
    });
  }
  productsContainer.appendChild(productsRow);

  mainContainer.appendChild(row);
  document.body.appendChild(mainContainer);
}


document.getElementById("men").addEventListener("click", function () {
  processCategory('male');
});
document.getElementById("women").addEventListener("click", function () {
  processCategory('female');
});
document.getElementById("kids").addEventListener("click", function () {
  processCategory('kids');
});

// ----------------------------------- search ------------------------------------------------------------------
async function search() {
  clearDiv();
  var input;
  input = document.getElementById("search").value;
  input = input.toLowerCase();
  const data = await fetchData();
  var products = data.filter((ele) =>
    ele["name"].toLowerCase().includes(input)
  );
  drawPageContent(products);
}
var searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", search);

// ----------------------------------- Add to Cart ---------------------------------------------------------------
// function addToCart(product) {
//   cartInstance.addItem(product);
// }
processCategory("male");
// });

//---------------------------------------  Draw page content after filteration -----------------------------------
async function getFilteredPrice() {
  clearDiv();
  // Get Inputs Values
  const minPrice = parseInt(document.getElementById("min").value);
  const maxPrice = parseInt(document.getElementById("max").value);
  if (minPrice > maxPrice) {
    alert("Please Enter A Valid Prices");
  }

  // Get gender from the select element
  const genderSelect = document.getElementById("genderSelect");
  const gender = genderSelect.value;

  const filteredProducts = await filterPrices(minPrice, maxPrice, gender);
  drawPageContent(filteredProducts, gender);
}

// -------------------------------------------------------- Filter By Price -----------------------------------

async function filterPrices(minPrice, maxPrice, gender) {
  let data = await fetchData();
  let filteredData = data.filter(
    (ele) =>
      ele.price.current.value >= minPrice && ele.price.current.value <= maxPrice
  );

  // Filter by gender if provided
  if (gender && gender !== "all") {
    filteredData = filteredData.filter((ele) => ele.gender === gender);
  }

  return filteredData;
}


});



// -------------------------------------------------------- Filter By Color -----------------------------------
// async function filterFunction(color) {
//   let data = await fetchData();
//   let colors = data.filter((ele) => ele.availableColors.includes(color));
//   console.log(colors);
// }
// filterFunction("black");


