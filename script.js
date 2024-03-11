// ------------------------------------------ Show And Hide Dropdown Menu ------------------------------
function showDropdown(element) {
  element.querySelector(".dropdown-content").style.display = "block";
}

function hideDropdown(element) {
  element.querySelector(".dropdown-content").style.display = "none";
}
// ---------------------------------------- Fetching Data From JSON File --------------------------------

async function fetchData() {
  const url = "db.json";
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

  for (let name of namesBeforeSlicing) {
    names.push(name.split(" ").slice(0, 3).join(" ")); // take the first three words
  }

  let container = document.getElementsByClassName("container")[1];
  var headerDiv = document.createElement("div");
  let header = document.createElement("h4");
  headerDiv.classList.add("col-12");
  headerDiv.classList.add("men-cat-header");
  if (gender === "male") {
    header.textContent = "Men Department";
  } else {
    header.textContent = "Women Department";
  }
  // Create a row for every three products
  for (let i = 0; i < ids.length; i += 3) {
    const row = document.createElement("div");
    row.classList.add("row");

    // Create three columns in the row
    for (let j = i; j < i + 3 && j < ids.length; j++) {
      const col = document.createElement("div");
      col.classList.add("col-lg-4");
      col.classList.add("col-12");
      col.classList.add("product-col");
      col.innerHTML = `
        <img src="${imageUrls[j]}" alt="${names[j]}">
        <h2>${names[j]}</h2>
        <p>ID: ${ids[j]}</p>
        <p>Rating: ${ratings[j]}</p>
        <p>Price: ${prices[j]}</p>
      `;
      row.appendChild(col);
    }
    container.appendChild(row);
  }

  headerDiv.appendChild(header);
  container.appendChild(headerDiv[0]);
  document.body.appendChild(container);
}
console.log("script.js is loaded");
processCategory("male");