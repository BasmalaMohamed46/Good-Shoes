//payment handling
var cash=document.getElementById('option-1');
var credit=document.getElementById('option-2');

credit.addEventListener('change', function() {
    if (this.checked) {
        document.getElementById("cname").disabled = false;
        document.getElementById("ccnum").disabled = false;
        document.getElementById("expyear").disabled = false;
        document.getElementById("cvv").disabled = false;
    }
});

cash.addEventListener('change', function() {
    if (this.checked) {
        document.getElementById("cname").disabled = true;
        document.getElementById("ccnum").disabled = true;
        document.getElementById("expyear").disabled = true;
        document.getElementById("cvv").disabled = true;
    }
});