document.addEventListener("DOMContentLoaded", function() {
    new FormValidator("loginContainer");
    const passwordToggler = new PasswordToggler('loginInputPassword', 'login-eye');
});

class FormToggler {
    constructor(loginContainerId) {
        this.loginContainer = document.getElementById(loginContainerId);
    }
    toggleForm() {
        if (this.loginContainer.classList.contains("d-none")) {
            this.loginContainer.classList.remove("d-none");
        } else {
            this.loginContainer.classList.add("d-none");
        }
    }
}

class PasswordToggler {
    constructor(passwordInputId, eyeIconId) {
        this.passwordInput = document.getElementById(passwordInputId);
        this.eyeIcon = document.getElementById(eyeIconId);
        if (this.eyeIcon) {
            this.setupEventListeners();
        }
    }
    setupEventListeners() {
        this.eyeIcon.addEventListener('click', () => {
            this.togglePasswordVisibility();
        });
    }
    togglePasswordVisibility() {
        if (this.passwordInput.type === 'password') {
            this.passwordInput.type = 'text';
            this.eyeIcon.classList.remove('bi-eye-slash');
            this.eyeIcon.classList.add('bi-eye');
        } else {
            this.passwordInput.type = 'password';
            this.eyeIcon.classList.remove('bi-eye');
            this.eyeIcon.classList.add('bi-eye-slash');
        }
    }
}

class AuthManager {
    constructor() {
       this.users = JSON.parse(localStorage.getItem('users')) || [];
    }
    login(email, password) {
        const user = this.users.find(user => user.email === email && user.password === password);
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            window.location.href = "../HTML/landing.html";
            return true;
        } else {
            const loginEmailError = document.getElementById("loginError");
            loginEmailError.textContent = "Incorrect Email or Password, Please try again!";
            loginEmailError.style.display = "block";
            const email = document.getElementById("loginInputEmail");
            const password = document.getElementById("loginInputPassword");
            email.value = '';
            password.value = '';
            return;
        }
    }
}
const authManager = new AuthManager();

class FormValidator {
    constructor(loginFormId) {
        this.loginForm = document.getElementById(loginFormId);
        this.setupEventListeners();
        this.populateLoginForm();
    }
    setupEventListeners() {
        this.loginForm.addEventListener("submit", (event) => {
            event.preventDefault();
            if (!this.validateLoginForm()) {
                return;
            } else {
                const emailInput = this.loginForm.querySelector("#loginInputEmail")
                const email = emailInput.value.trim();
                if (localStorage.getItem('currentUser')) {
                    sessionStorage.setItem("rememberedEmail", email);
                }
            }
            const email = this.loginForm.querySelector("#loginInputEmail").value.trim();
            const password = this.loginForm.querySelector("#loginInputPassword").value.trim();
            authManager.login(email, password);
        });
    }    
    populateLoginForm() {
        const rememberedEmail = sessionStorage.getItem("rememberedEmail");
        const currentUser = localStorage.getItem("currentUser");
    
        if (rememberedEmail && currentUser !== null) {
            const emailInput = this.loginForm.querySelector("#loginInputEmail");
            emailInput.value = rememberedEmail;
        }
    }    
    validateLoginForm() {
        const email = this.loginForm.querySelector("#loginInputEmail").value;
        const password = this.loginForm.querySelector("#loginInputPassword").value;
        if (!email) {
            this.showError("loginEmailError", "Please enter your email");
            return false;
        } else {
            this.hideError("loginEmailError");
        }
        if (!password) {
            this.showError("loginPasswordError", "Please enter your password");
            return false;
        } else {
            this.hideError("loginPasswordError");
        }
        return true;
    }
    showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    hideError(elementId) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
}
const formToggler = new FormToggler('loginContainer');