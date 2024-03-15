import Cart from './cart.js';
document.addEventListener('DOMContentLoaded', function() {
const cartInstance = new Cart();
async function fetchProductData(id) {
  const url = "../DATA/finalData.json";
  const response = await fetch(url);
  const data = await response.json();
  const product = data.products.find((p) => p.id == id);
  return product;
}

function populateProductDetails(product) {
  document.getElementById("productImage").src = product.imageUrl;
  document.getElementById("productName").textContent = product.name;
  document.getElementById("productDescription").textContent = product.description;
  document.getElementById("productPrice").textContent = `Price: ${product.price.current.text}`;
  document.getElementById("productRating").textContent = `Rating: ${product.rating}`;
  document.getElementById("productReviews").textContent = `Total Reviews: ${product.totalReviewCount}`;

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
    colorSquare.addEventListener("click", function() {
      product.selectedColor = color;
      colorSquare.style.border = "3px solid #9eff6d";
      const otherColorSquares = Array.from(colorsContainer.children).filter((c) => c !== colorSquare);
      otherColorSquares.forEach((c) => {
        if(c.style.backgroundColor === "white"){
          c.style.border = "1px solid #ccc";
        }
        else{
          c.style.border = "none";
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
    sizeCircle.addEventListener("click", function() {
      product.selectedSize = size;
      sizeCircle.style.border = "3px solid #9eff6d";
      const otherSizeCircles = Array.from(sizesContainer.children).filter((c) => c !== sizeCircle);
      otherSizeCircles.forEach((c) =>{ 
        c.style.border = "none";
      } );


    });
  });

  // Populate additional images
  const additionalImagesContainer = document.getElementById("additionalImages");
  additionalImagesContainer.innerHTML = "";
  product.additionalImageUrls.forEach((imageUrl) => {
    const img = document.createElement("img");
    img.src = imageUrl;
    img.classList.add("additional-image");
    img.addEventListener("click", function() {
      document.getElementById("productImage").src = imageUrl;
    });
    additionalImagesContainer.appendChild(img);
  });
  var addToCartBtn=document.getElementById("addToCart");
  addToCartBtn.addEventListener("click",function(){
    window.location.href = "cart.html";
    cartInstance.addItem(product);
  });
}

// Get the product ID from the URL query parameter
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get('id');

// Fetch and populate product details
fetchProductData(productId).then((product) => {
  populateProductDetails(product);
});
});