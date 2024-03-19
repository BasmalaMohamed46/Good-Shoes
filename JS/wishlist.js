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
            wishlistBody.appendChild(row);
        });
    
        const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
        addToCartButtons.forEach((button, index) => {
            button.addEventListener("click", (event) => {
                event.preventDefault();
                window.location.href = "cart.html";
                const cartInstance = new Cart();    
                cartInstance.addItem(this.wishlistItems[index]);
            });
        });
    
        const removeButtons = document.querySelectorAll(".remove-btn");
        removeButtons.forEach((button,index) => {
            button.addEventListener("click", (event) => {
                event.preventDefault();
                this.removeItem(this.wishlistItems[index].id);
            });
        });       
    }            
}