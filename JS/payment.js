var cash = document.getElementById('cash');
var credit = document.getElementById('credit');
var fname = document.getElementById('fname');
var adr = document.getElementById('adr');
var city = document.getElementById('city');
var state = document.getElementById('state');
var zip = document.getElementById('zip');
var cname = document.getElementById('cname');
var ccnum = document.getElementById('ccnum');
var expyear = document.getElementById('expyear');
var cvv = document.getElementById('cvv');

document.getElementById('credit').addEventListener('change', function() {
    var creditCardForm = document.getElementById('creditCardForm');
    if (this.checked) {
        creditCardForm.style.display = 'block';
        var inputs = creditCardForm.querySelectorAll('input');
            inputs.forEach(function(input) {
                input.disabled = false;
            });
    }
});
document.getElementById('cash').addEventListener('change', function() {
    var creditCardForm = document.getElementById('creditCardForm');
    if (this.checked) {
        creditCardForm.style.display = 'none';
    }
});

var loggedInUser = sessionStorage.getItem('rememberedEmail');

var users = JSON.parse(localStorage.getItem('users'));
function placeOrder() {
    var fnameVal = fname.value.trim();
    var adrVal = adr.value.trim();
    var cityVal = city.value.trim();
    var stateVal = state.value.trim();
    var zipVal = zip.value.trim();
    var cnameVal = cname.value.trim();
    var ccnumVal = ccnum.value.trim();
    var expyearVal = expyear.value.trim();
    var cvvVal = cvv.value.trim();

    if (users != null) {
        if (loggedInUser != null) {
            for (const user of users) {
                if (user.email == loggedInUser) {
                    user.fname = fnameVal;
                    user.adr = adrVal;
                    user.city = cityVal;
                    user.state = stateVal;
                    user.zip = zipVal;
                    user.cname = cnameVal;
                    user.ccnum = ccnumVal;
                    user.expyear = expyearVal;
                    user.cvv = cvvVal;
                }
            }
            localStorage.setItem('users', JSON.stringify(users));
        }
    }
    
}

function validateForm() {
    var fnameVal = fname.value.trim();
    var adrVal = adr.value.trim();
    var cityVal = city.value.trim();
    var stateVal = state.value.trim();
    var zipVal = zip.value.trim();
    var cnameVal = cname.value.trim();
    var ccnumVal = ccnum.value.trim();
    var expyearVal = expyear.value.trim();
    var cvvVal = cvv.value.trim();
    const fnameError = document.getElementById('fnameError');
    const adrError = document.getElementById('adrError');
    const cityError = document.getElementById('cityError');
    const stateError = document.getElementById('stateError');
    const zipError = document.getElementById('zipError');
    const ccnumError = document.getElementById('ccnumError');
    const cnameError = document.getElementById('cnameError');
    const expyearError = document.getElementById('expyearError');
    const cvvError = document.getElementById('cvvError');

    fnameError.innerHTML = '';
    adrError.innerHTML  = '';
    cityError.innerHTML  = '';
    stateError.innerHTML  = '';
    zipError.innerHTML  = '';
    ccnumError.innerHTML  = '';
    cnameError.innerHTML  = '';
    expyearError.innerHTML  = '';
    cvvError.innerHTML  = '';

    let isValid = true;

    if (fnameVal === '') {
        fnameError.classList.remove('d-none');
        fnameError.innerHTML  = 'Full Name is required';
        isValid = false;
    }
    else{
        fnameError.classList.add('d-none');
    }

    if (adrVal === '') {
        adrError.classList.remove('d-none');
        adrError.innerHTML  = 'Address is required';
        isValid = false;
    }
    else{
        adrError.classList.add('d-none');
    }
    if (cityVal === '') {
        cityError.classList.remove('d-none');
        cityError.innerHTML  = 'City is required';
        isValid = false;
    }
    else{
        cityError.classList.add('d-none');
    }
    if (stateVal === '') {
        stateError.classList.remove('d-none');
        stateError.innerHTML  = 'State is required';
        isValid = false;
    }
    else{
        stateError.classList.add('d-none');
    }

    if (zipVal === '') {
        zipError.classList.remove('d-none');
        zipError.innerHTML  = 'Zip is required';
        isValid = false;
    } else if (!isValidZip(zipVal)) {
        zipError.classList.remove('d-none');
        zipError.innerHTML  = 'Invalid zip format';
        isValid = false;
    }
    else{
        zipError.classList.add('d-none');
    }



    if (credit.checked) {
        if (ccnumVal === '') {
            ccnumError.classList.remove('d-none');
            ccnumError.innerHTML  = 'Credit Card Number is required';
            isValid = false;
        } else if (!isValidCreditCard(ccnumVal)) {
            ccnumError.classList.remove('d-none');
            ccnumError.innerHTML  = 'Invalid credit card number format';
            isValid = false;
        }
        else{
            ccnumError.classList.add('d-none');
        }
        if (cnameVal === '') {
            cnameError.classList.remove('d-none');
            cnameError.innerHTML  = 'Name on Card is required';
            isValid = false;
        }
        else{
            cnameError.classList.add('d-none');
        }

        if (expyearVal === '') {
            expyearError.classList.remove('d-none');
            expyearError.innerHTML  = 'Expiration Year is required';
            isValid = false;
        }
        else{
            expyearError.classList.add('d-none');
        }

        if (cvvVal === '') {
            cvvError.classList.remove('d-none');
            cvvError.innerHTML  = 'CVV is required';
            isValid = false;
        }
        else{
            cvvError.classList.add('d-none');
        }
    }

    return isValid;
}


function isValidZip(zip) {
    const regex = /^\d{6}$/;
    return regex.test(zip);
}

function isValidCreditCard(ccnum) {
    const regex = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
    return regex.test(ccnum);
}
var checkoutBtn=document.getElementById('order');
checkoutBtn.addEventListener('click',function(){
    placeOrder();
    if(validateForm()){
        window.location.href = 'allproducts.html';
    }
});
