window.addEventListener("load", event => {
    var swiperWrapper = document.querySelector('.swiper-wrapper');
    var team = [{
            name: "Basmala Mohamed",
            role: "Software Engineer",
            desc: "Alexandria University Bachelor's degree, Computer Science.",
            photo: "https://media.licdn.com/dms/image/D4D03AQGYBHGOoI1kYg/profile-displayphoto-shrink_800_800/0/1697733033173?e=1715817600&v=beta&t=iVRjMcjO5OlPU_u41S8OH7RicnoGYuKTkFOeHFzlq_0&h=300&w=300",
            fb: "https://www.facebook.com/basmala.zien?mibextid=JRoKGi",
            email: "basmala.mohamed.zain@gmail.com",
            linkedin: "https://www.linkedin.com/in/basmala-mohamed-9a123b23a/",
            github: "https://github.com/BasmalaMohamed46",
        },
        {
            name: "Zeinab Radwan",
            role: "Software Engineer",
            desc: "Alexandria University Bachelor's degree, Computer and Data Science.",
            photo: "https://media.licdn.com/dms/image/D4D03AQFzHpvN7JuoGw/profile-displayphoto-shrink_800_800/0/1710634077738?e=1716422400&v=beta&t=y0kTbhUC9z_4V2p81QkvoFJLU-MpmOMcMLKE7onpAoU&h=300&w=300",
            fb: "https://www.facebook.com/zeinab.abdo.9066?mibextid=JRoKGi",
            email: "zeinanabdo88@gmail.com",
            linkedin: "https://www.linkedin.com/in/zeinab-abdelghaffar/",
            github: "https://github.com/ZeinabAbdelghaffar",
        },
        {
            name: "Salma Yousry",
            role: "Software Engineer",
            desc: "Bachelor of Commerce - BCom, Management Information Systems.",
            photo: "https://media.licdn.com/dms/image/D4D03AQEJA62H3k-q8w/profile-displayphoto-shrink_800_800/0/1704263642644?e=1716422400&v=beta&t=paU1nPvWzUrDpE-05Ri9NmNfQ2HOxEwS804XkZiUBJ8&h=300&w=300",
            fb: "https://www.facebook.com/salma.yousri.77?mibextid=JRoKGi",
            email: "#",
            linkedin: "https://www.linkedin.com/in/salma-yousry-a59720246/",
            github: "https://github.com/SalmaYousry01",
        },
        {
            name: "Ahmed Kamal",
            role: "Software Engineer",
            desc: "Alexandria University Bachelor's degree, Computer and Data Science.",
            photo: "https://avatars.githubusercontent.com/u/111020957?v=4&h=300&w=300",
            fb: "https://www.facebook.com/AAhmeedKamaal?mibextid=JRoKGi",
            email: "#",
            linkedin: "https://www.linkedin.com/in/ahmed-kamal-4867aa240/",
            github: "https://github.com/AhmedKamal71",
        },
    ];
    var icons = [{
        ifb: "https://e7.pngegg.com/pngimages/88/724/png-clipart-computer-icons-facebook-inc-facebook-logo-facebook-icon.png",
        iEmail: "https://rafaelalucas.com/dailyui/6/assets/email.svg",
        iLinkedin: "https://rafaelalucas.com/dailyui/6/assets/linkedin.svg",
        igithub: "https://banner2.cleanpng.com/20180824/jtl/kisspng-computer-icons-logo-portable-network-graphics-clip-icons-for-free-iconza-circle-social-5b7fe46b0bac53.1999041115351082030478.jpg",
    }];
    var ifb = icons[0].ifb,
        iEmail = icons[0].iEmail,
        iLinkedin = icons[0].iLinkedin,
        igithub = icons[0].igithub;
    function addTeam() {
        for (let i = 0; i < team.length; i++) {
            var name = team[i].name,
                role = team[i].role,
                desc = team[i].desc,
                photo = team[i].photo,
                fb = team[i].fb,
                email = team[i].email,
                linkedin = team[i].linkedin,
                github = team[i].github;
            var template = `
                <div class="swiper-slide">
                    <div class="card">
                        <span class="bg"></span>
                        <span class="more"></span>
                        <figure class="photo"><img src="${photo}"></figure>
                        <article class="text">
                            <p class="name">${name}</p>
                            <p class="role">${role}</p> 
                            <p class="desc">${desc}</p> 
                        </article>                        
                        <div class="social">
                            <span class="pointer"></span>
                            <div class="icons">
                                <a class="icon" href="${fb}" target="_blank" data-index="0"><img src="${ifb}"></a>
                                <a class="icon" href="${email}" target="_blank" data-index="1"><img src="${iEmail}"></a>
                                <a class="icon" href="${linkedin}" target="_blank" data-index="2"><img src="${iLinkedin}"></a>
                                <a class="icon" href="${github}" target="_blank" data-index="3"><img src="${igithub}"></a>
                            </div>
                        </div>
                    </div>
                </div>`;
            swiperWrapper.insertAdjacentHTML('beforeend', template);
        }
    };
    addTeam();
    var mySwiper = new Swiper(".swiper-container", {
        direction: "horizontal",
        loop: true,
        centeredSlides: false,
        speed: 800,
        slidesPerView: 3,
        spaceBetween: 40,
        threshold: 5,
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        breakpoints: {
            1180: {
                slidesPerView: 2,
                spaceBetween: 40,
                centeredSlides: false,
            },
            799: {
                slidesPerView: 1,
                spaceBetween: 20,
                centeredSlides: true,
                loop: true,
            },
        }
    });
    var btnShow = document.querySelectorAll('.more');
    btnShow.forEach(function (el) {
        el.addEventListener('click', showMore);
    });
    function showMore(event) {
        var card = event.target.closest(".swiper-slide");
        if (card.classList.contains('show-more')) {
            card.classList.remove('show-more');
        } else {
            card.classList.add('show-more')
        }
    }
    var icon = document.querySelectorAll('.icon');
    icon.forEach(function (el) {
        el.addEventListener("mouseenter", followCursor);

    });
    function followCursor(event) {
        var pointer = event.currentTarget.closest(".swiper-slide").querySelector('.pointer'),
            index = event.currentTarget.dataset.index,
            sizeIcon = (60 * index) + 25;
        pointer.style.transform = `translateX(${sizeIcon}px)`;
    }
});