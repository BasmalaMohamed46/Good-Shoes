import Cart from "./cart.js";

export default class Wishlist {
    constructor() {
        this.wishlistItems = JSON.parse(localStorage.getItem("wishlistItems")) || [];
        if (window.location.href.includes('wishList.html')) {
            this.loadWishlistItems();
            this.createWishlistCard();
            this.updateItemsCount();
        }
    }

    loadWishlistItems() {
        this.wishlistItems = JSON.parse(localStorage.getItem("wishlistItems")) || [];
    }

    initialize() {
        if (window.location.href.includes('wishList.html')) {
            this.createWishlistCard();
            this.updateItemsCount();
        }
    }

    addItem(product) {
        if (!this.isInWishlist(product.id)) {
            this.wishlistItems.push(product);
            this.saveWishlist();
            this.createWishlistCard();
            this.updateItemsCount();
        }
    }

    removeItem(id) {
        this.wishlistItems = this.wishlistItems.filter((item) => item.id !== id);
        this.saveWishlist();
        this.createWishlistCard();
        this.updateItemsCount();
    }

    isInWishlist(id) {
        return this.wishlistItems.some((item) => item.id === id);
    }

    saveWishlist() {
        localStorage.setItem("wishlistItems", JSON.stringify(this.wishlistItems));
    }

    updateItemsCount() {
        const totalItems = this.wishlistItems.length;
        document.getElementById('num-of-items').innerHTML = totalItems;
    }
 
    createWishlistCard() {
        const wishlistBody = document.getElementById('wishlist-body');
        wishlistBody.innerHTML = '';
        this.wishlistItems.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${item.imageUrl}" alt="${item.name}" style="max-width: 100px;"></td>
                <td>${item.name}</td>
                <td>${item.description}</td>
                <td>${item.price.current.text}</td>
                <td>
                    <button class="add-to-cart-btn" data-item-id="${item.id}"><i class="fas fa-shopping-cart"></i> Add to Cart</button>
                    <button class="remove-btn" data-item-id="${item.id}">Remove from Wishlist</button>
                </td>
            `;
        
        const addToCartButton = row.querySelector(".add-to-cart-btn");
        addToCartButton.setAttribute("data-bs-toggle", "modal");
        addToCartButton.setAttribute("data-bs-target", "#exampleModal");
        addToCartButton.addEventListener("click", function(event) {
            event.stopPropagation();
           const  modalContent = `
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
                                      <img id="mImg" class="card-img-top img-fluid" style="width: 100%; height: 400px;">
                                  </div>
                                  <div> 
                                      <h5 class="card-title" id="mTitle"></h5>
                                      <p class="card-text" id="mPrice"></p>
                                  </div>
                              </div>
                          </div>
  
                              <div id="productColors"></div>
                              <div id="productSizes"></div>
                          </div>
                          <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                              <button type="button" class="btn btn-primary " id="confirmAddToCart" >Add to Cart</button>
                          </div>
                      </div>
                  </div>
  `;
                
  
            const modal = document.createElement("div");
            modal.id = "exampleModal";
            modal.classList.add("modal", "fade");
            modal.innerHTML = modalContent;
  
            $(document).ready(function() {
                $('#exampleModal').on('hidden.bs.modal', function (e) {
                    $(this).remove();
                });
              });
  
            document.body.appendChild(modal);
            
            $('#exampleModal').modal('show');
            var mImg = document.getElementById("mImg");
            var mTitle = document.getElementById("mTitle");
            var mPrice = document.getElementById("mPrice");
            mImg.src = item.imageUrl;
            mTitle.textContent = item.name;
            mPrice.textContent = item.price.current.text;
            const confirmAddToCartButton = document.querySelector("#confirmAddToCart");
            confirmAddToCartButton.addEventListener("click", function() {
                $('#exampleModal').modal('hide');
                
                window.location.href = "cart.html";
                const cartInstance = new Cart();
                cartInstance.addItem(item);
                
                
                
            });
            const colorsContainer = document.getElementById("productColors");
            colorsContainer.innerHTML = "";
            const colorsLabel = document.createElement("span");
            colorsLabel.textContent = "Available Colors: ";
            colorsContainer.appendChild(colorsLabel);

            item.availableColors.forEach((color) => {
                const colorSquare = document.createElement("span");
                colorSquare.classList.add("color-square");
                colorSquare.style.backgroundColor = color.toLowerCase();
                colorsContainer.appendChild(colorSquare);
                colorSquare.addEventListener("click", function () {
                    item.selectedColor = color;
                    console.log(item.selectedColor);
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

            item.availableSizes.forEach((size) => {
                const sizeCircle = document.createElement("span");
                sizeCircle.classList.add("size-circle");
                sizeCircle.textContent = size;
                sizesContainer.appendChild(sizeCircle);
                sizeCircle.addEventListener("click", function () {
                    item.selectedSize = size;
                    console.log(item.selectedSize);
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
                wishlistBody.appendChild(row);
        });
    
        // const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
        // addToCartButtons.forEach((button, index) => {
        //     button.addEventListener("click", (event) => {
        //         event.preventDefault();
        //         window.location.href = "cart.html";
        //         const cartInstance = new Cart();    
        //         cartInstance.addItem(this.wishlistItems[index]);
        //     });
        // });
        
        const removeButtons = document.querySelectorAll(".remove-btn");
        removeButtons.forEach((button,index) => {
            button.addEventListener("click", (event) => {
                event.preventDefault();
                this.removeItem(this.wishlistItems[index].id);
            });
        });       
    }            
}