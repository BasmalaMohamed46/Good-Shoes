class Cart {
    constructor() {
        this.items = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    }

    addItem(product) {
        this.items.push(product);
        this.saveToSessionStorage();
        this.displayCart();
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

    calculateTotal() {
        // Logic to calculate total price of items in cart
    }
    calcNumOfItems() {
        document.getElementById('num-items').innerHTML = this.items.length;
    }

    displayCart() {
        const cartContainer = document.getElementById('product-scroll');
        cartContainer.innerHTML = '';
        this.items.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('card', 'mb-3');
            card.style.maxWidth = '800px';
            card.innerHTML = `
                <div class="row g-0 align-items-center">
                    <div class="col-md-4">
                        <img src="${item.image}" class="img-fluid" alt="${item.name}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${item.name}</h5>
                            <p class="card-text">${item.description}</p>
                            <i id="remove" class="fa-solid fa-trash float-end fa-2x" onclick="removeItem(${item.id})"></i>
                            <p class="card-text">${item.price}EGP</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="input-group mb-3 quantity">
                                    <span class="input-group-text">Quantity</span>
                                    <input type="number" class="form-control" value="${item.quantity}">
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
console.log('cart.js');
function removeItem(productId) {
    cart.removeItem(productId);
}
const cart = new Cart();

const product = {
    id: 1,
    name: 'Iphone 11 pro',
    description: 'Size: 256GB, Color - Navy Blue',
    price: '20,000',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIskXiis51E9dy9AuCWVRoGU_4sUYlwfjJUbFWRyESxA&s',
    quantity: 1
};

cart.addItem(product);

const product2 = {
    id: 2,
    name: 'Iphone 11 pro',
    description: 'Size: 256GB, Color - Navy Blue',
    price: '20,000',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIskXiis51E9dy9AuCWVRoGU_4sUYlwfjJUbFWRyESxA&s',
    quantity: 1
};

cart.addItem(product2);
cart.calcNumOfItems();