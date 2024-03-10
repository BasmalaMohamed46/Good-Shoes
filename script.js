// function showDropdown(element) {
//   element.querySelector(".dropdown-content").style.display = "block";
// }

// function hideDropdown(element) {
//   element.querySelector(".dropdown-content").style.display = "none";
// }

// function handleRating(rating) {
//   const stars = document.querySelectorAll('input[type="radio"]');
//   stars.forEach((star, index) => {
//     star.checked = index < rating;
//   });
// }

// async function getData() {
//   const url = "data.json";
//   let dataJson = await fetch(url);
//   let data = await dataJson.json();
//   return data;
// }

// async function Category(category) {
//   let output;
//   data = await getData();
//   if (category === "Men") {
//     output = await data["Men"];
//   } else if (category === "Women") {
//     output = await data["Women"];
//   }
//   return output;
// }

// async function processCategory() {
//   let data = await Category("Men");
//   var productsObjects = [];
//   var productsName = [];
//   var prodductsPrice = [];
//   var prodductsDesc = [];
//   Object.entries(data).forEach(([key, value]) => {
//     productsObjects.push(value);
//   });
//   for (let i of productsObjects) {
//     productsName.push(i.name);
//     prodductsPrice.push(i.price);
//     prodductsDesc.push(i.description);
//   }
//   console.log(productsObjects);
//   console.log(productsName);
//   console.log(prodductsPrice);
//   console.log(prodductsDesc);
// }
// processCategory();

async function fetchData() {
  const url = "db.json";
  const response = await fetch(url);
  const data = await response.json();
  return data.products;
}

async function processCategory() {
  const products = await fetchData();
  const ids = products.map((product) => product.id);
  const names = products.map((product) => product.name);
  const descriptions = products.map((product) => product.description);
  const genders = products.map((product) => product.gender);
  const categories = products.map((product) => product.category);
  const ratings = products.map((product) => product.rating);
  const isInStocks = products.map((product) => product.isInStock);
  const prices = products.map((product) => product.price.current.text);
  const imageUrls = products.map((product) => product.imageUrl);

  console.log("Ids:", ids.length);
  console.log("Names:", names.length);
  console.log("Descriptions:", descriptions.length);
  console.log("Genders:", genders.length);
  console.log("Categories:", categories.length);
  console.log("Ratings:", ratings.length);
  console.log("Is In Stock:", isInStocks.length);
  console.log("Prices:", prices.length);
  console.log("Image URLs:", imageUrls);
}
processCategory();
