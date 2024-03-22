function updateUserData(updatedUserData, emailChanged) {
    //retrieve users array from local storage
    let users = JSON.parse(localStorage.getItem('users')) || [];

    //find the user object with the current user's email
    const currentUserEmail = updatedUserData.email;
    const currentUserIndex = users.findIndex(user => user.email === currentUserEmail);

    if (currentUserIndex !== -1) {
        //if the user exists and the email has changed, update the email field in the users array
        if (emailChanged) {
            users[currentUserIndex].email = updatedUserData.email;
            localStorage.setItem('users', JSON.stringify(users));
            console.log("Users array updated successfully.");
        }
    } else {
        console.log("User not found in users array.");
    }

    //update currentUser object in local storage
    localStorage.setItem('currentUser', JSON.stringify(updatedUserData));
    console.log("Current user data updated successfully.");
}


document.addEventListener("DOMContentLoaded", function() {
    const saveProfileButton = document.getElementById('saveProfileButton');
    if (saveProfileButton) {
        saveProfileButton.addEventListener('click', handleProfileUpdateFormSubmission);
    }

    const profilePhotoInput = document.getElementById('profilePhotoInput');
    if (profilePhotoInput) {
        profilePhotoInput.addEventListener('change', handleProfilePhotoChange);
    }

    //populate form fields with existing user data from local storage
    populateFormWithUserData();
    displayProfilePhoto();
});

function displayProfilePhoto() {
    const profilePhoto = document.getElementById('profilePhoto');
    // const profilePhotoData = localStorage.getItem('profilePicture');
    const profilePhotoData = JSON.parse(localStorage.getItem('currentUser'));
    console.log("profilePhotoData");

    console.log(profilePhotoData);
    if (profilePhotoData) {
        profilePhoto.src = profilePhotoData.profilePicture || 'https://bootdey.com/img/Content/avatar/avatar7.png';

        profilePhoto.addEventListener('click', function() {
            document.getElementById('profilePhotoInput').click(); // Trigger file input click event
        });
    }
}

function handleProfileUpdateFormSubmission(event) {
    event.preventDefault();

    //retrieve updated user data from the form fields
    const updatedUserData = {
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('surName').value.trim(),
        email: document.getElementById('email').value.trim(),
        mobileNumber: document.getElementById('mobileNumber').value.trim(),
        addressLine1: document.getElementById('addressLine1').value.trim(),
        addressLine2: document.getElementById('addressLine2').value.trim(),
        postcode: document.getElementById('postcode').value.trim(),
        state: document.getElementById('state').value.trim(),
        area: document.getElementById('area').value.trim(),
        education: document.getElementById('education').value.trim(),
        country: document.getElementById('country').value.trim(),
        region: document.getElementById('region').value.trim(),
        profilePicture: document.getElementById("profilePhoto").src
    };

    //retrieve users array from local storage
    let users = JSON.parse(localStorage.getItem('users')) || [];

    //find the user object with the current user's email
    const currentUserEmail = JSON.parse(localStorage.getItem('currentUser')).email;
    const currentUserIndex = users.findIndex(user => user.email === currentUserEmail);
    
    if (currentUserIndex !== -1) {
        //if the user exists and the email has changed, update the email field in the users array
        if (updatedUserData.email !== currentUserEmail) {
            // updatedUserData.email = users[currentUserIndex].email;
            updatedUserData.isAdmin = users[currentUserIndex].isAdmin;
            updatedUserData.password = users[currentUserIndex].password;
            users[currentUserIndex] = updatedUserData;

            users.forEach(user => {
                if (user.email === currentUserEmail) {
                    user.email = updatedUserData.email;
                }
            });
            //save the updated users array back to local storage
            localStorage.setItem('users', JSON.stringify(users));
        }
    } else {
        console.log("User not found in users array.");
    }

    //update currentUser object in local storage
    localStorage.setItem('currentUser', JSON.stringify(updatedUserData));
    console.log("Current user data updated successfully.");
    window.location.href = "../HTML/userProfile.html";
}

function handleProfilePhotoChange(event) {
    const file = event.target.files[0];
    if (file) {
        //read the file data as a data URL
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            //save the data URL to localStorage only if it's not empty
            if (reader.result) {
                const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                currentUser.profilePicture = reader.result;
                localStorage.setItem('currentUser', JSON.stringify(currentUser));

                // localStorage.setItem('profilePicture', reader.result);
                //display the updated profile photo
                displayProfilePhoto();
            } 
        };
    }
}



function populateFormWithUserData() {
    const userDataString = localStorage.getItem('currentUser');

    console.log(userDataString);
    if (userDataString) {
        const userData = JSON.parse(userDataString);
      
        document.getElementById('firstName').value = userData.firstName;
        document.getElementById('surName').value = userData.lastName;
        document.getElementById('email').value = userData.email;
        document.getElementById('mobileNumber').value = userData.mobileNumber;
        document.getElementById('addressLine1').value = userData.addressLine1;
        document.getElementById('addressLine2').value = userData.addressLine2;
        document.getElementById('postcode').value = userData.postcode;
        document.getElementById('state').value = userData.state;
        document.getElementById('area').value = userData.area;
        document.getElementById('education').value = userData.education;
        document.getElementById('country').value = userData.country;
        document.getElementById('region').value = userData.region;
    }
}
