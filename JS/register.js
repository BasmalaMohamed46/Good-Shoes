document.addEventListener("DOMContentLoaded", function() {
    var inputField = document.querySelectorAll("input"),
        inputWrapper = document.querySelectorAll(".input-wrapper"),
        modal = document.querySelector(".modal"),
        btnClose = document.querySelector(".btn-close"),
        btnSign = document.querySelector(".sign"),
        daily = document.querySelector(".daily");

    btnSign.addEventListener("click", openModal);
    btnClose.addEventListener("click", closeModal);

    inputField.forEach(function(el) {
        el.addEventListener("focus", animeInput);
        el.addEventListener("focusout", removeAnimeInput);
    });

    function openModal() {
        modal.classList.add("open");
    }

    function closeModal() {
        modal.classList.add("close");
        setTimeout(function() {
            modal.classList.remove("open");
            modal.classList.remove("close");
        }, 1500);
    }

    function animeInput(event) {
        event.target.closest(".input-wrapper").classList.add("active");
    }

    function removeAnimeInput(event) {
        if (event.target.value == "") {
            event.target.closest(".input-wrapper").classList.remove("active");
        }
    }
    
});