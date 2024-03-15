// ------------------------------------------ Show And Hide Dropdown Menu ------------------------------
function showDropdown(element) {
  element.querySelector(".dropdown-content").style.display = "block";
}

function hideDropdown(element) {
  element.querySelector(".dropdown-content").style.display = "none";
}
// ---------------------------------------- Fetching Data From JSON File --------------------------------

async function fetchData() {
  const url = "../DATA/finalData.json";
  const response = await fetch(url);
  const data = await response.json();
  return data.products;
}
// ----------------------------------- Clear Function To Prevent Overriding Of Data -------------------------------------------------
function clearDiv() {
  var myDiv = document.getElementsByClassName("container")[1];
  myDiv.innerHTML = "";
}

// ----------------------------------- Drawing Each Category In HTML File -------------------------------------------------
async function processCategory(gender) {
  clearDiv();
  const data = await fetchData();
  var products = data.filter((ele) => ele["gender"] === gender);

  const ids = products.map((product) => product.id);
  const namesBeforeSlicing = products.map((product) => product.name);
  const ratings = products.map((product) => product.rating);
  const prices = products.map((product) => product.price.current.text);
  const imageUrls = products.map((product) => product.imageUrl);
  var names = [];

  // take the first three words from product name
  for (let name of namesBeforeSlicing) {
    names.push(name.split(" ").slice(0, 3).join(" "));
  }

  // Make Category Header-Name Dynamic
  var headerDiv = document.createElement("div");
  var header = document.createElement("h4");
  header.classList.add("men-cat-header");
  headerDiv.classList.add("col-12");
  headerDiv.classList.add("men-cat-header");
  if (gender === "male") {
    header.textContent = "Men Department";
  } else if (gender === "female") {
    header.textContent = "Women Department";
  } else if (gender === "kids") {
    header.textContent = "Kids Department";
  }

  let container = document.getElementsByClassName("container")[1];
  // Create a row for every three products
  for (let i = 0; i < ids.length; i += 3) {
    const row = document.createElement("div");
    row.classList.add("row");

    // Create three columns in the row
    for (let j = i; j < i + 3 && j < ids.length; j++) {
      const col = document.createElement("div");
      col.classList.add("col-lg-3");
      col.classList.add("col-12");
      col.classList.add("product-col");
      col.innerHTML = `
        <img src="${imageUrls[j]}" alt="${names[j]}" width="314px" height="500px">
        <h4 class="product-name">${names[j]}</h4>
        <p>Rating: ${ratings[j]}</p>
        <p>Price: ${prices[j]}</p>
        <button class="add-to-cart-btn"><i class="fas fa-shopping-cart"> </i> Add </button>
      `;
      row.appendChild(col);
    }
    container.appendChild(row);
  }

  headerDiv.appendChild(header);
  container.insertBefore(headerDiv, container.firstChild);
  document.body.appendChild(container);

  // Add event listeners to all "Add to Cart" buttons
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
  addToCartButtons.forEach((button, index) => {
    button.addEventListener("click", () => addToCart(products[index]));
  });
}

processCategory("male");
// -------------------------------------------------------- Filter By Price -----------------------------------

async function filterPrices(minPrice, maxPrice) {
  let data = await fetchData();
  let prices = data.filter(
    (ele) =>
      ele.price.current.value >= minPrice && ele.price.current.value <= maxPrice
  );
  console.log(prices);
}
filterPrices(200, 300);

// -------------------------------------------------------- Filter By Color -----------------------------------

async function filterFunction(color) {
  let data = await fetchData();
  let colors = data.filter((ele) => ele.availableColors.includes(color));
  console.log(colors);
}
filterFunction("black");
