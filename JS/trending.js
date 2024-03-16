fetch('trending.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('trending-products').innerHTML = data;
});