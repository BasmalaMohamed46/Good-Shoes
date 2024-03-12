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