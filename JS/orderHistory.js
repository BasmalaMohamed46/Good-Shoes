document.addEventListener('DOMContentLoaded', function() {
    var orderHistoryDiv = document.getElementById('orderHistory');
    var orders = JSON.parse(localStorage.getItem('order'));

    if (orders && orders.length > 0) {
        var table = document.createElement('table');
        table.id = 'wishlist-table'; 
        table.classList.add('table');
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Product Image</th>
                    <th>Product Name</th>
                    <th>Product Price</th>
                    <th>Quantity</th>
                    <th>Color</th>
                    <th>Size</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;

        var tbody = table.querySelector('tbody');
        let currentOrderId = 1;
        let currentOrderItems = [];
        orders.forEach((order, index) => {
            for (const key in order) {
                const product = order[key];
                if (currentOrderItems.length === 0 || isSameCheckout(product, currentOrderItems[0])) {
                    currentOrderItems.push(product);
                } else {
                    addOrderRow(tbody, currentOrderId, currentOrderItems);
                    currentOrderId++;
                    currentOrderItems = [product];
                }
            }
        });

        // Add the last order
        if (currentOrderItems.length > 0) {
            addOrderRow(tbody, currentOrderId, currentOrderItems);
        }

        orderHistoryDiv.appendChild(table);
    } else {
        orderHistoryDiv.innerHTML = '<p>No orders found.</p>';
    }
});

function isSameCheckout(product1, product2) {
    return product1.name === product2.name && product1.imageUrl === product2.imageUrl &&
           product1.price.current.text === product2.price.current.text &&
           product1.selectedColor === product2.selectedColor && product1.selectedSize === product2.selectedSize;
}

function addOrderRow(tbody, orderId, products) {
    const totalQuantity = products.reduce((acc, curr) => acc + curr.quantity, 0);
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><img src="${products[0].imageUrl}" alt="${products[0].name}" style="max-width: 100px;"></td>
        <td>${products[0].name}</td>
        <td>${products[0].price.current.text}</td>
        <td>${totalQuantity}</td>
        <td>${products[0].selectedColor}</td>
        <td>${products[0].selectedSize}</td>
    `;
    tbody.appendChild(row);
}