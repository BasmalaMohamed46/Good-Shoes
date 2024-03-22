document.addEventListener("DOMContentLoaded", function() {
    new FormValidator("loginContainer", "signUpContainer");
  });
  
      //this function used to switch between signup and login forms
      class FormToggler {
          constructor(loginContainerId, signUpContainerId) {
              this.loginContainer = document.getElementById(loginContainerId);
              this.signUpContainer = document.getElementById(signUpContainerId);
          }
  
          toggleForm() {
              if (this.loginContainer.classList.contains("d-none")) {
                  this.loginContainer.classList.remove("d-none");
                  this.signUpContainer.classList.add("d-none");
              } else {
                  this.loginContainer.classList.add("d-none");
                  this.signUpContainer.classList.remove("d-none");
              }
          }
      }
  
      //function to toggle password visibility
      class PasswordToggler {
          constructor(passwordInputId, eyeIconId) {
              this.passwordInput = document.getElementById(passwordInputId);
              this.eyeIcon = document.getElementById(eyeIconId);
              this.setupEventListeners();
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
      
      //this function save data user entered in the signUp page in the browser local storage
      //and checks whether user exists in the array of objects that contains users made signUp before whenever user make login
      class AuthManager{
          constructor(){
              //if there is no users, it returns an empty array 
              //and if there are users stored it will retuen array of objects with these users data
              this.users = JSON.parse(localStorage.getItem('users')) || [];
          }
  
  
          signUp(user){
              const signUpEmailError = document.getElementById("signupEmailError");
              //check if the email already exists
              const existingUser = this.users.find(u => u.email === user.email);
          
              //if the email already exists, show an error message and return false
              if (existingUser) {
                  signUpEmailError.textContent = "Email already exists, Please choose a different email!";
                  signUpEmailError.style.display = "block";
                  //indicate failure in creating the account
                  return false; 
              }
          
              //if the email does not exist, proceed with the signup process
              this.users.push(user);
              localStorage.setItem('users', JSON.stringify(this.users));
              console.log("Signup successful");
  
              //to store the user data with a unique key in local storage
              localStorage.setItem('currentUser', JSON.stringify(user));
              return true;
          
          }
          
  
          //to check whether the user email or password exists in our local storage or not
          login(email,password){
              //find method to iterate over users array of objects to check for email and password
              const user = this.users.find(user => user.email === email && user.password === password);
              //if user does not exist
              if(user){
                  localStorage.setItem('currentUser', JSON.stringify(user));
                  window.location.href = "../HTML/landing.html";
                  return true;
              }else{
                  //show this error message to the user
                  const loginEmailError = document.getElementById("loginError");
                  loginEmailError.textContent = "Incorrect Email or Password, Please try again!";
                  loginEmailError.style.display = "block";
  
                   //this part for making the input fields of email and password empty
                   const email = document.getElementById("loginInputEmail");
                   const password = document.getElementById("loginInputPassword");
                   email.value = '';
                   password.value = '';
                   return;
              }
              
          }
      }
  
      const authManager = new AuthManager();
      
      //this method for make validations over signUp and login forms
      class FormValidator {
          constructor(loginFormId, signupFormId) {
              this.loginForm = document.getElementById(loginFormId);
              this.signupForm = document.getElementById(signupFormId);
              this.setupEventListeners();
              //populate login form fields if "Remember Me" session is set
              this.populateLoginForm(); 
          }
      
  
          setupEventListeners() {
              this.loginForm.addEventListener("submit", (event) => {
                  //prevent form submission if validation fails
                  event.preventDefault(); 
                  if(!this.validateLoginForm()) {
                      return;
                  } else {
                      //save login credentials if submit is clicked
                      const emailInput = this.loginForm.querySelector("#loginInputEmail")
                      const email = emailInput.value.trim();
                      sessionStorage.setItem("rememberedEmail", email);
  
                  }
  
                  const email = this.loginForm.querySelector("#loginInputEmail").value.trim();
                  const password = this.loginForm.querySelector("#loginInputPassword").value.trim();
                  authManager.login(email,password);
              });
          
              this.signupForm.addEventListener("submit", (event) => {
                      //prevent form submission if validation fails
                      event.preventDefault(); 
                  if (!this.validateSignupForm()) {
                      return;
                  } 
  
                  //retrieve user details from the form
                  const firstName = this.signupForm.querySelector("#FirstName").value.trim();
                  const lastName = this.signupForm.querySelector("#LastName").value.trim();
                  const email = this.signupForm.querySelector("#InputEmail").value.trim();
                  const password = this.signupForm.querySelector("#signupInputPassword").value.trim();
                  const isAdmin = this.signupForm.querySelector("#isAdmin").value;
  
                 
                  //register the user
                  const success = authManager.signUp({ firstName, lastName, email, password, isAdmin});
                  if (success) {
                      window.location.href = "../HTML/landing.html";
                  }
              });
          }
      
           //retrieve remembered login credentials from session storage
          populateLoginForm() {
              const rememberedEmail = sessionStorage.getItem("rememberedEmail");
              if (rememberedEmail) {
                  const emailInput = this.loginForm.querySelector("#loginInputEmail");
                  emailInput.value = rememberedEmail;
              }
          }
      
          validateLoginForm() {
              const email = this.loginForm.querySelector("#loginInputEmail").value;
              const password = this.loginForm.querySelector("#loginInputPassword").value;
              const submit = this.loginForm.querySelector("submit");
      
              if (!email && submit) {
                  this.showError("loginEmailError", "Please enter your email");
                  return false;
              }else{
                  this.hideError("loginEmailError");
              }
  
              if (!password && submit) {
                  this.showError("loginPasswordError", "Please enter your password");
                  return false;
              }else{
                  this.hideError("loginPasswordError");
              }
      
              //if all validations pass, return true
              return true;
          }
      
          validateSignupForm() {
              //Validation logic for signup form inputs
              const firstName = this.signupForm.querySelector("#FirstName").value;
              const lastName = this.signupForm.querySelector("#LastName").value;
              const email = this.signupForm.querySelector("#InputEmail").value;
              const password = this.signupForm.querySelector("#signupInputPassword").value;
              const confirmPassword = this.signupForm.querySelector("#signupConfirmPassword").value;
      
              if (!firstName) {
                  this.showError("signupFirstNameError", "Please enter your first name!");
                  return false;
              }else{
                  this.hideError("signupFirstNameError");
              }
  
              if (!lastName) {
                  this.showError("signupLastNameError", "Please enter your last name!");
                  return false;
              }else{
                  this.hideError("signupLastNameError");
              }
  
              if (!email) {
                  this.showError("signupEmailError", "Please enter your email!");
                  return false;
              }else{
                  this.hideError("signupEmailError");
              }
  
              if (!password) {
                  this.showError("signupPasswordError", "Please enter your password!");
                  return false;
              }else{
                  this.hideError("signupPasswordError");
              }
              
              if (!confirmPassword) {
                  this.showError("signupConfirmPasswordError", "Please confirm your password!");
                  return false;
              }else{
                  this.hideError("signupConfirmPasswordError");
              }
  
              if (password !== confirmPassword) {
                  this.showError("signupConfirmPasswordError", "Passwords do not match!");
                  return false;
              }else{
                  this.hideError("signupConfirmPasswordError");
              }
      
              //if all validations pass, return true
              return true;
          }
      
          showError(elementId, message) {
              const errorElement = document.getElementById(elementId);
               //Set the error message text
              errorElement.textContent = message;
              //Show the error message
              errorElement.style.display = 'block'; 
          }
      
          hideError(elementId) {
              const errorElement = document.getElementById(elementId);
              //Clear the error message text
              errorElement.textContent = ''; 
              //Hide the error message
              errorElement.style.display = 'none';
          }
      }
      