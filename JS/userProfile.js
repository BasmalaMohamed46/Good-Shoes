function displayUserData(userData) {
    const profileNameElement = document.getElementById('profileFullName');
    const profileEmailElement = document.getElementById('profileEmail');
    const profileName = document.getElementById('name');
    const profilePhoneNumber = document.getElementById('mobileNumber');
    const profileAddress = document.getElementById('addressLine1');
    const profilePhoto = document.getElementById('profilePhoto');


    if (!userData) {
        console.log("User data not found");
        return;
    }
    console.log("User Data:", userData);

    profileNameElement.textContent = userData.firstName + ' ' + userData.lastName;
    profileEmailElement.textContent = userData.email;
    profileName.textContent = userData.firstName + ' ' + userData.lastName;
    profilePhoneNumber.textContent = userData.mobileNumber;
    profileAddress.textContent = userData.addressLine1;
    
    
    console.log(userData);
    if (userData.profilePicture) {
        profilePhoto.src = userData.profilePicture;
    } 
    else {

        //if there's no profile picture, display a default avatar
        profilePhoto.src = 'https://bootdey.com/img/Content/avatar/avatar7.png';
        // profilePhoto.src = profilePhotoData;

    }
}

document.addEventListener("DOMContentLoaded", function() {
    //retrieve user data from local storage
    const userDataString = localStorage.getItem('currentUser');
    if (userDataString) {
        const userData = JSON.parse(userDataString);
        //populate profile page elements with user data

        displayUserData(userData);
    } else {
        console.log("User data not found");
    }
});


document.getElementById('logoutButton').addEventListener('click', function() {
    //clear the current user data from local storage
    localStorage.removeItem('currentUser');
    window.location.href = '../HTML/login_register.html';
});