topBtn = document.getElementById('topBtn');
navBar = document.getElementById('primary-nav');

window.onscroll = function () {
    displayTopBtn();
};

if (topBtn != null) {
    topBtn.addEventListener('click', () => {
        document.body.scrollTop = 0; // For Safari 
        document.documentElement.scrollTop = 0;
    })
}

function displayTopBtn() {
    const topBtn = document.querySelector('#topBtn');
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        if (topBtn != null) {
            topBtn.style.display = "block"
        }topBtn
        navBar.classList.add("sticky");
    } else {
        if (topBtn != null) {
            topBtn.style.display = "none"
        }
        navBar.classList.remove("sticky");
    }
}


let currentPage = 1;
let lastPage = 31;

let pageImg = document.querySelector("#portfolio-page");
let prevBtn = document.querySelector("#prev");
let nextBtn = document.querySelector("#next");

if (pageImg == null) {} else {
    prevBtn.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            if (currentPage - 10 < 0) {
                pageImg.setAttribute("src", `images/2314994_Maeve Human_Complete Portfolio_pages-to-jpg-000${currentPage}.jpg`);
            } else {
                pageImg.setAttribute("src", `images/2314994_Maeve Human_Complete Portfolio_pages-to-jpg-00${currentPage}.jpg`);
            }
        }
        if (currentPage == 1){
            prevBtn.setAttribute("class", "hidden");
        }
        if (currentPage < 31) {
            nextBtn.removeAttribute("class");
        }
    });


    nextBtn.addEventListener("click", () => {
        if (currentPage < 31) {
            currentPage++;
            if (currentPage - 10 < 0) {
                pageImg.setAttribute("src", `images/2314994_Maeve Human_Complete Portfolio_pages-to-jpg-000${currentPage}.jpg`);
            } else {
                pageImg.setAttribute("src", `images/2314994_Maeve Human_Complete Portfolio_pages-to-jpg-00${currentPage}.jpg`);
            }
        }
        if (currentPage == 31) {
            nextBtn.setAttribute("class", "hidden");
        }
        if (currentPage > 1) {
            prevBtn.removeAttribute("class");
        }
    });
}