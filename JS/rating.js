let stars = document.getElementsByClassName("star");
let output = document.getElementById("output");


function setRating(n) {
    removeStars(); 
    for (let i = 0; i < n; i++) {
        if (n == 1) cls = "one";
        else if (n == 2) cls = "two";
        else if (n == 3) cls = "three";
        else if (n == 4) cls = "four";
        else if (n == 5) cls = "five";
        stars[i].className = "star " + cls;
    }
    output.innerText = "Rating is: " + n + "/5";
}

function removeStars() {
    for (let i = 0; i < stars.length; i++) {
        stars[i].className = "star";
    }
}