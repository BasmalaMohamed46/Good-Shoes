document.addEventListener("DOMContentLoaded", function() {
    new FormValidator("signUpContainer");
    const passwordTogglerSignup = new PasswordToggler('signupInputPassword', 'signup-eye-icon');
    const confirmPasswordTogglerSignup = new PasswordToggler('signupConfirmPassword', 'signup-confirm-eye-icon');
});

class FormToggler {
    constructor(signUpContainerId) {
        this.signUpContainer = document.getElementById(signUpContainerId);
    }
    toggleForm() {
        if (this.signUpContainer.classList.contains("d-none")) {
            this.signUpContainer.classList.remove("d-none");
        } else {
            this.signUpContainer.classList.add("d-none");
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
    signUp(user) {
        const signUpEmailError = document.getElementById("signupEmailError");
        const existingUser = this.users.find(u => u.email === user.email);
        if (existingUser) {
            signUpEmailError.textContent = "Email already exists, Please choose a different email!";
            signUpEmailError.style.display = "block";
            return false;
        }
        this.users.push(user);
        localStorage.setItem('users', JSON.stringify(this.users));
        console.log("Signup successful");
        localStorage.setItem('currentUser', JSON.stringify(user));
        return true;
    }
}
const authManager = new AuthManager();

class FormValidator {
    constructor(signupFormId) {
        this.signupForm = document.getElementById(signupFormId);
        this.setupEventListeners();
    }
    setupEventListeners() {
        this.signupForm.addEventListener("submit", (event) => {
            event.preventDefault();
            if (!this.validateSignupForm()) {
                return;
            }
            const firstName = this.signupForm.querySelector("#FirstName").value.trim();
            const lastName = this.signupForm.querySelector("#LastName").value.trim();
            const email = this.signupForm.querySelector("#InputEmail").value.trim();
            const password = this.signupForm.querySelector("#signupInputPassword").value.trim();
            const isAdmin = this.signupForm.querySelector("#isAdmin").value;
            const success = authManager.signUp({ firstName, lastName, email, password, isAdmin });
            if (success) {
                window.location.href = "landing.html";
            }
        });
    }
    validateSignupForm() {
        const firstName = this.signupForm.querySelector("#FirstName").value;
        const lastName = this.signupForm.querySelector("#LastName").value;
        const email = this.signupForm.querySelector("#InputEmail").value;
        const password = this.signupForm.querySelector("#signupInputPassword").value;
        const confirmPassword = this.signupForm.querySelector("#signupConfirmPassword").value;
        if (!firstName) {
            this.showError("signupFirstNameError", "Please enter your first name!");
            return false;
        } else {
            this.hideError("signupFirstNameError");
        }
        if (!lastName) {
            this.showError("signupLastNameError", "Please enter your last name!");
            return false;
        } else {
            this.hideError("signupLastNameError");
        }
        if (!email) {
            this.showError("signupEmailError", "Please enter your email!");
            return false;
        } else {
            this.hideError("signupEmailError");
        }
        if (!password) {
            this.showError("signupPasswordError", "Please enter your password!");
            return false;
        } else {
            this.hideError("signupPasswordError");
        }
        if (!confirmPassword) {
            this.showError("signupConfirmPasswordError", "Please confirm your password!");
            return false;
        } else {
            this.hideError("signupConfirmPasswordError");
        }
        if (password !== confirmPassword) {
            this.showError("signupConfirmPasswordError", "Passwords do not match!");
            return false;
        } else {
            this.hideError("signupConfirmPasswordError");
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
const formToggler = new FormToggler('signUpContainer');
var firstName="admin";
      var lastName="admin";
      var email="admin@gmail.com";
      var password="admiN@1234";
      var isAdmin=true;
      authManager.signUp({ firstName, lastName, email, password, isAdmin});