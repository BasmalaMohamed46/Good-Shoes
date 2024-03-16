class Product {
    constructor(id, name, description, stock, gender, category, brandName, imageUrl, availableSizes , availableColors , price) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.stock = stock;
        this.gender = gender;
        this.category = category;
        this.brandName = brandName;
        this.imageUrl = imageUrl;
        this.availableSizes = availableSizes;
        this.availableColors = availableColors;
        this.price = price;
        this.rating = 0;
        this.totalReviews = 0;
        
    }

    displayDetails() {
        console.log(`
            ID: ${this.id}
            Name: ${this.name}
            Description: ${this.description}
            Stock: ${this.stock}
            Gender: ${this.gender}
            Category: ${this.category}
            Brand: ${this.brandName}
            Image URL: ${this.imageUrl}
            Available Sizes: ${this.availableSizes.join(", ")}
            Available Colors: ${this.availableColors.join(", ")}
            Price: $${this.price.toFixed(2)}
            Rating: ${this.rating}
            Total Reviews: ${this.totalReviews}

        `);
    }
}

let products = [];
if (localStorage.getItem("products")) {
    products = JSON.parse(localStorage.getItem("products"));
}

const productList = document.getElementById("product-list");
const productIdInput = document.getElementById("product-id");
const productNameInput = document.getElementById("product-name");
const productDescriptionInput = document.getElementById("product-description");
const productStockInput = document.getElementById("product-stock");
const productGenderInput = document.getElementById("product-gender");
const productCategoryInput = document.getElementById("product-category");
const productBrandInput = document.getElementById("product-brand");
const productImageInput = document.getElementById("product-image");
const productSizesInput = document.getElementById("product-sizes");
const productPriceInput = document.getElementById("product-price");
const productColorsInput = document.getElementById("product-colors");
const submitProductBtn = document.getElementById("submit-product-btn");
const addProductBtn = document.getElementById("add-product-btn");
const addProductForm = document.getElementById("add-product-form");


function saveProductsToLocalStorage() {
    localStorage.setItem("products", JSON.stringify(products));
}


function displayProducts() {
    productList.innerHTML = "";
    products.forEach(product => {
        const productItem = document.createElement("div");
        productItem.innerHTML = `
            <h3>Name: ${product.name}</h3>
            <p>ID: ${product.id}</p>
            <p>Description: ${product.description}</p>
            <p>Stock: ${product.stock}</p>
            <p>Gender: ${product.gender}</p>
            <p>Category: ${product.category}</p>
            <p>Brand: ${product.brandName}</p>
            <img src="${product.imageUrl}" alt="Product Image" style="max-width: 300px;">
            <p>Available Sizes: ${product.availableSizes.join(", ")}</p>
            <p>Available Colors:" ${product.availableColors.join('", "')}"</p>
            <p>Price: $${product.price.toFixed(2)}</p>
            <p>Rating: ${product.rating}</p>
            <p>Total Reviews: ${product.totalReviews}</p>
        `;
        productList.appendChild(productItem);
    });
}

submitProductBtn.addEventListener("click", () => {
    const productId = parseInt(productIdInput.value);
    const productName = productNameInput.value;
    const productDescription = productDescriptionInput.value;
    const productStock = parseInt(productStockInput.value);
    const productGender = productGenderInput.value;
    const productBrand = productBrandInput.value;
    const productImage = productImageInput.value;
    const productSizes = productSizesInput.value.split(",").map(size => size.trim());
    const productColors = productColorsInput.value.split(",").map(color => color.trim());
    const productPrice = parseFloat(productPriceInput.value);
    

    if (!isNaN(productId) && productName && productDescription && !isNaN(productStock) && productGender && productBrand && productImage && productSizes.length > 0  && productColors.length > 0 && !isNaN(productPrice)) {
        const newProduct = new Product(
            productId,
            productName,
            productDescription,
            productStock,
            productGender,
            "Shoes", 
            productBrand,
            productImage,
            productSizes,
            productColors,
            productPrice
            
        );
        products.push(newProduct);
        displayProducts();
        productIdInput.value = "";
        productNameInput.value = "";
        productDescriptionInput.value = "";
        productStockInput.value = "";
        productGenderInput.value = "";
        productBrandInput.value = "";
        productImageInput.value = "";
        productSizesInput.value = "";
        productColorsInput.value = "";
        productPriceInput.value = "";
        addProductForm.style.display = "none";
    } else {
        alert("Please enter valid product details.");
    }
});

addProductBtn.addEventListener("click", () => {
    addProductForm.style.display = "block";
});

displayProducts();









