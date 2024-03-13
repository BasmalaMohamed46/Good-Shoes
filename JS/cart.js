
export default class Cart {
    constructor() {
        this.items = JSON.parse(sessionStorage.getItem('cartItems')) || [];
        if (window.location.href.includes('cart.html')) {
            this.displayCart();
            this.calcNumOfItems();
            this.calcSubTotal();
            this.calcShipping();
            this.calcTotal();
        }
    }

    addItem(product) {
        this.items.push(product);
        this.saveToSessionStorage();
        this.displayCart();
        this.calcNumOfItems();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToSessionStorage();
        this.displayCart();
        this.calcNumOfItems();
    }

    saveToSessionStorage() {
        sessionStorage.setItem('cartItems', JSON.stringify(this.items));
    }
    calcNumOfItems() {
        document.getElementById('num-items').innerHTML = this.items.length;
    }
    calcSubTotal(){
        var subTotal=0;
        this.items.forEach(item => {
            subTotal+=item.price.current.value;
        });
        document.getElementById('subtotal').innerHTML = subTotal + 'EGP';
        return subTotal;
    }
    calcShipping(){
        var shipping=0;
        this.items.forEach(item => {
            shipping+=item.price.current.value;
        });
        shipping=shipping*0.1;
        shipping=shipping.toFixed(2);
        document.getElementById('shipping').innerHTML = shipping + 'EGP';
        return shipping;
    }
    calcTotal(){
        var total=0;
        total=Number(this.calcSubTotal())+Number(this.calcShipping());
        document.getElementById('total').innerHTML = total + 'EGP';
        return total;
    }

    displayCart() {
        const cartContainer = document.getElementById('product-scroll');
        this.items.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('card', 'mb-3');
            card.style.maxWidth = '800px';
            card.innerHTML = `
                <div class="row g-0 align-items-center">
                    <div class="col-md-4">
                        <img src="${item.imageUrl}" class="img-fluid" alt="${item.name}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${item.name}</h5>
                            <p class="card-text">${item.description}</p>
                            <i id="remove" class="fa-solid fa-trash float-end fa-2x" onclick="removeItem(${item.id})"></i>
                            <p class="card-text">${item.price.current.text}EGP</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="input-group mb-3 quantity">
                                    <span class="input-group-text">Quantity</span>
                                    <input type="number" class="form-control" value="1">
                                    <button class="btn btn-outline-secondary" type="button" id="button-addon1">+</button>
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>`;
            cartContainer.appendChild(card);
        });
    }
}

const cart = new Cart();






