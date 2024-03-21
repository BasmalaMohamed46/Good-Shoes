export default class Cart {
    constructor() {
        this.items = JSON.parse(sessionStorage.getItem('cartItems')) || [];
        if (window.location.href.includes('cart.html')) {
            this.displayCart();
            this.calcNumOfItems();
            this.calcSubTotal();
            this.calcShipping();
            this.calcTotal();
            this.addPromoCodes();
            this.assignCheckoutButton();
            this.assignPromoCode();

        }
        
    }

    addItem(product) {
        const existingItemIndex = this.items.findIndex(item => item.hasOwnProperty(product.id));
        if (existingItemIndex !== -1) {
            this.items[existingItemIndex][product.id].quantity = (this.items[existingItemIndex][product.id].quantity || 1) + 1;
        } else {
            const newItem = {};
            newItem[product.id] = { ...product, quantity: 1 };
            this.items.push(newItem);
        }
        this.saveToSessionStorage();
        this.displayCart();
        this.calcNumOfItems();
    }
    removeItem(productId) {
        this.items = this.items.filter(item => !item.hasOwnProperty(productId));
        this.saveToSessionStorage();
        this.displayCart();
        this.calcNumOfItems();
        this.calcSubTotal();
        this.calcShipping();
        this.calcTotal();
        this.addPromoCodes();
    }
    

    saveToSessionStorage() {
        sessionStorage.setItem('cartItems', JSON.stringify(this.items));
    }

    calcNumOfItems() {
        let totalItems = 0;
        this.items.forEach(item => {
            for (const key in item) {
                totalItems += Number(item[key].quantity) || 1;
            }
        });
        document.getElementById('num-items').innerHTML = totalItems;
    }

    calcSubTotal() {
        const subTotal = this.items.reduce((total, item) => {
            for (const key in item) {
                return total + (item[key].price.current.value * (item[key].quantity || 1));
            }
        }, 0);
        document.getElementById('subtotal').innerHTML = subTotal.toFixed(2) + 'EGP';
        return subTotal;
    }

    calcShipping() {
        const shipping = this.calcSubTotal() * 0.1;
        document.getElementById('shipping').innerHTML = shipping.toFixed(2) + 'EGP';
        return shipping;
    }

    calcTotal() {
        const total = this.calcSubTotal() + this.calcShipping();
        document.getElementById('total').innerHTML = total.toFixed(2) + 'EGP';
        return total;
    }

    increaseQuantity(itemId) {
        const quantityInput = document.getElementById('quantity-' + itemId);
        quantityInput.value = parseInt(quantityInput.value) + 1;
        this.updateCartItemQuantity(itemId, quantityInput.value);
    }
    decreaseQuantity(itemId) {
        const quantityInput = document.getElementById('quantity-' + itemId);
        if (parseInt(quantityInput.value) > 1) {
            quantityInput.value = parseInt(quantityInput.value) - 1;
            this.updateCartItemQuantity(itemId, quantityInput.value);
        }
    }

    updateCartItemQuantity(itemId, quantity) {
        const existingItemIndex = this.items.findIndex(item => item.hasOwnProperty(itemId));
        if (existingItemIndex !== -1) {
            const key = Object.keys(this.items[existingItemIndex])[0];
            this.items[existingItemIndex][key].quantity = quantity;
            this.saveToSessionStorage();
            this.calcNumOfItems();
            this.calcSubTotal();
            this.calcShipping();
            this.calcTotal();
        }
    }
    checkout() {
        var total = document.getElementById('total').innerHTML;
        sessionStorage.setItem('total', total);
        window.location.href = 'payment.html';
    }
    assignCheckoutButton() {
        const checkoutButton = document.getElementById('Checkout');
        checkoutButton.addEventListener('click', () => {
            this.checkout();
        });
    }

    addPromoCodes(){
        var promoCodes={
            "10OFF":0.1,
            "20OFF":0.2,
            "30OFF":0.3,
            "40OFF":0.4,
            "50OFF":0.5
        };
        localStorage.setItem('promoCodes',JSON.stringify(promoCodes));
    }
    checkPromoCode(){
        var promoCodes=JSON.parse(localStorage.getItem('promoCodes'));
        var promoCode=document.getElementById('promoCode').value;
        if(promoCodes.hasOwnProperty(promoCode)){
            var discount=this.calcTotal()*promoCodes[promoCode];
            document.getElementById('discount').innerHTML=discount.toFixed(2)+'EGP';
            document.getElementById('total').innerHTML=(this.calcTotal()-discount).toFixed(2)+'EGP';
        }
        else{
            document.getElementById('discount').innerHTML='0.00EGP';
            document.getElementById('total').innerHTML=this.calcTotal().toFixed(2)+'EGP';
        }

    }
    assignPromoCode(){
        var promoCodeButton=document.getElementById('apply');
        promoCodeButton.addEventListener('click',()=>{
            this.checkPromoCode();
        });
    }
    clearCart(){
        this.items=[];
        this.saveToSessionStorage();
        this.displayCart();
        this.calcNumOfItems();
        this.calcSubTotal();
        this.calcShipping();
        this.calcTotal();
    }

    displayCart() {
        const cartContainer = document.getElementById('product-scroll');
        cartContainer.innerHTML = '';
        this.items.forEach(item => {
            for (const key in item) {
                const card = document.createElement('div');
                card.classList.add('card', 'mb-3');
                card.style.maxWidth = '800px';
                card.innerHTML = `
                    <div class="row g-0 align-items-center">
                        <div class="col-md-4">
                            <img src="${item[key].imageUrl}" class="img-fluid" alt="${item[key].name}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${item[key].name}</h5>
                                <p class="card-text">Color:  <span class="dot" style="background-color:${item[key].selectedColor.toLowerCase()}"></span> </p>
                                <p class="card-text">Size:  <span class="dot2">${item[key].selectedSize}</span> </p>
                                <i class="fa-solid fa-trash float-end fa-2x remove" data-item-id="${key}"></i>
                                <p class="card-text">${item[key].price.current.text}EGP</p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="input-group mb-3 quantity" style="width: 200px;">
                                        <span class="input-group-text">Quantity</span>
                                        <input type="number" class="form-control no-spinners" id="quantity-${key}" value="${item[key].quantity || 1}" min="1">
                                        <button class="btn btn-outline-secondary increase-quantity" data-item-id="${key}" type="button">+</button>
                                        <button class="btn btn-outline-secondary decrease-quantity" data-item-id="${key}" type="button">-</button>
                                    </div>
                                </div> 
                            </div>
                        </div>
                    </div>`;
                cartContainer.appendChild(card);
            }
        });
    
        const removeButtons = document.querySelectorAll('.remove');
        removeButtons.forEach(button => {
            button.addEventListener('click', event => {
                const itemId = event.target.dataset.itemId;
                this.removeItem(itemId);
            });
        });
    
        const increaseButtons = document.querySelectorAll('.increase-quantity');
        increaseButtons.forEach(button => {
            button.addEventListener('click', event => {
                const itemId = event.target.dataset.itemId;
                this.increaseQuantity(itemId);
            });
        });
        const decreaseButtons = document.querySelectorAll('.decrease-quantity');
        decreaseButtons.forEach(button => {
            button.addEventListener('click', event => {
                const itemId = event.target.dataset.itemId;
                this.decreaseQuantity(itemId);
            });
        });

    }
}  

const cart = new Cart();