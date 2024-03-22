var loggedInUser=sessionStorage.getItem("rememberedEmail");
var allUsers = JSON.parse(localStorage.getItem("users"));
var user = allUsers.find(user => user.email === loggedInUser);
console.log(user);
if(loggedInUser==null || user.isAdmin=='false'){
    window.location.href = "login_register.html";
}
else{
    
document.addEventListener("DOMContentLoaded", function() {
    const productForm = document.getElementById("productForm");
    const productTableBody = document.getElementById("productBody");
    let productIdToUpdate = null; 
    
    async function fetchData() {
        const url = "../DATA/finalData.json";
        const response = await fetch(url);
        const data = await response.json();
        return data.products;
    }
    var allProducts = fetchData();
    fetchData().then(data => {
        localStorage.setItem("allproducts", JSON.stringify(data));
        loadProducts();
    });

    loadProducts();

    productForm.addEventListener("submit",  function(event) {
        event.preventDefault();
        
        const productName = document.getElementById("productName").value;
        const productDescription = document.getElementById("productDescription").value;
        const productGender = document.getElementById("productGender").value;
        const productCategory = document.getElementById("productCategory").value;
        const productSizes = Array.from(document.getElementById("productSizes").selectedOptions).map(option => option.value);
        const productColors = Array.from(document.getElementById("productColors").selectedOptions).map(option => option.value);
        const productRating = parseFloat(document.getElementById("productRating").value);
        const productReviewCount = parseInt(document.getElementById("productReviewCount").value);
        const productPrice = parseFloat(document.getElementById("productPrice").value);
        var priceObject = {
            current: {
                value: productPrice,
                text: "$" + productPrice
            }
        };

        if (productIdToUpdate !== null) {
            updateProduct(productIdToUpdate, {
                name: productName,
                description: productDescription,
                gender: productGender,
                category: productCategory,
                availableSizes: productSizes,
                availableColors: productColors,
                rating: productRating,
                totalReviewCount: productReviewCount,
                price: priceObject
            });
            productIdToUpdate = null; 
        } else {
            var allProducts = JSON.parse(localStorage.getItem("allproducts"));
            var maxId = 0;
            varprodId=allProducts.forEach(product => {
                if (product.id > maxId) {
                    maxId = product.id;
                }
            }
            );
            const productId = maxId + 1;
            const product = {
                id: productId,
                name: productName,
                description: productDescription,
                gender: productGender,
                category: productCategory,
                availableSizes: productSizes,
                availableColors: productColors,
                rating: productRating,
                totalReviewCount: productReviewCount,
                price: priceObject
            };
            addProduct(product);
        }

        productForm.reset();
        loadProducts();
    });

    function loadProducts() {
        productTableBody.innerHTML = "";

        const products = JSON.parse(localStorage.getItem("allproducts")) || [];
        products.forEach(product => {
            addProductToTable(product);
        });
    }

    function addProductToTable(product) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.description}</td>
            <td>${product.gender}</td>
            <td>${product.category}</td>
            <td>${Array.isArray(product.availableSizes) ? product.availableSizes.join(", ") : ""}</td>
            <td>${Array.isArray(product.availableColors) ? product.availableColors.join(", ") : ""}</td>
            <td>${product.rating}</td>
            <td>${product.totalReviewCount}</td>
            <td>${product.price.current.value}</td>
            <td>
                <button class="btn btn-danger del-btn" data-id="${product.id}">Delete</button>
                <button class="btn btn-primary update-btn" data-id="${product.id}">Update</button>
            </td>
        `;
        productTableBody.appendChild(row);
    }

    function addProduct(product) {
        let products = JSON.parse(localStorage.getItem("allproducts")) || [];
        products.push(product);
        localStorage.setItem("allproducts", JSON.stringify(products));
    }

    function updateProduct(productId, updatedProduct) {
        let products = JSON.parse(localStorage.getItem("allproducts")) || [];
        const index = products.findIndex(product => product.id === parseInt(productId));
        if (index !== -1) {
            products[index] = { ...products[index], ...updatedProduct };
            localStorage.setItem("allproducts", JSON.stringify(products));
        }
    }

    productTableBody.addEventListener("click", function(event) {
        if (event.target.classList.contains("del-btn")) {
            const productId = event.target.getAttribute("data-id");
            deleteProduct(productId);
        } else if (event.target.classList.contains("update-btn")) {
            const productId = event.target.getAttribute("data-id");
            updateProductForm(productId);
        }
    });

    function deleteProduct(productId) {
        let products = JSON.parse(localStorage.getItem("allproducts")) || [];
        products = products.filter(product => product.id !== parseInt(productId));
        localStorage.setItem("allproducts", JSON.stringify(products));
        loadProducts(); 
    }

    function updateProductForm(productId) {
        let products = JSON.parse(localStorage.getItem("allproducts")) || [];
        const productToUpdate = products.find(product => product.id === parseInt(productId));
        if (productToUpdate) {
            document.getElementById("productName").value = productToUpdate.name;
            document.getElementById("productDescription").value = productToUpdate.description;
            document.getElementById("productGender").value = productToUpdate.gender;
            document.getElementById("productCategory").value = productToUpdate.category;

            const productSizesSelect = document.getElementById("productSizes");
            Array.from(productSizesSelect.options).forEach(option => {
                option.selected = productToUpdate.availableSizes.includes(option.value);
            });

            const productColorsSelect = document.getElementById("productColors");
            Array.from(productColorsSelect.options).forEach(option => {
                option.selected = productToUpdate.availableColors.includes(option.value);
            });

            document.getElementById("productRating").value = productToUpdate.rating;
            document.getElementById("productReviewCount").value = productToUpdate.totalReviewCount;
            document.getElementById("productPrice").value = productToUpdate.price.current.value;

            productIdToUpdate = productId;
        } else {
            console.log("Product not found for update");
        }
    }
});
}
