const date = new Date;
const year = date.getFullYear();
const now = new Date();
const fulldate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full"
}).format(
    now
);

if (document.getElementById("year").innerHTML == null) {} else {
    document.getElementById("year").innerHTML = year;
    document.getElementById("updated").innerHTML = `Last updated ${document.lastModified}`;
    document.getElementById("date").innerHTML = fulldate;
}

const toggleMenu = () => {
    document.getElementById("primary_nav").classList.toggle("open");
    if (hamBtn.innerHTML == "☰" || hamBtn.innerHTML == "&#9776;") {
        hamBtn.innerHTML = "X";
    } else {
        hamBtn.innerHTML = "☰";
    }
}

const hamBtn = document.querySelector("#ham_btn");
hamBtn.addEventListener("click", toggleMenu);

const meeting = document.querySelector("#event");
if (meeting == null) {} else {
    if (now.getDay() == 1 || now.getDay() == 2) {
        meeting.innerHTML = "<h2>Wednesday Meeting!</h2><p>🤝🏼 Come join us for the chamber meet and greet Wednesday at 7:00 p.m.</p>"
    }
}

let temp = document.querySelector("#temp");
if (temp == null) {} else {
    const url = "//api.openweathermap.org/data/2.5/weather?id=936374&appid=d5897d892fdcc9e1e7610ad94239af0b&units=metric";

    apiFetch(url);
}

async function apiFetch(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error(error);
    }
}

const displayResults = (weatherData) => {
    const weatherIcon = document.querySelector("#weather-icon");
    const weatherDesc = document.querySelector("#weather-desc");
    const windSpeed = document.querySelector("#wind-speed");
    const windChill = document.querySelector("#wind-chill");

    const iconSrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    const desc = weatherData.weather[0].description;

    let newDesc = "";
    for (let i = 0; i < desc.length; i++) {
        if (desc[i-1] == " " || i == 0) {
            newDesc += desc[i].toUpperCase();
        } else {
            newDesc += desc[i];
        }
    }

    temp.textContent = weatherData.main.temp.toFixed(0);
    windSpeed.textContent = weatherData.wind.speed;
    weatherIcon.setAttribute("src", iconSrc);
    weatherIcon.setAttribute("alt", newDesc);
    weatherDesc.textContent = newDesc;

    const calcWindChill = (temp, windSpeed) => {
        if (temp > 10 || windSpeed < 4.8) {
            return "N/A";
        } else {
            temp = (temp * 9 / 5) + 32;
            windSpeed = windSpeed / 1.609

            let windChill = 35.75 + 0.6215 * temp - 35.75 * windSpeed ** 0.16 + 0.4275 * temp * windSpeed ** 0.16
            windChill = (windChill - 32) * 5 / 9;
            return `${windChill.toFixed(2)}°C`;
        }
    }
    windChill.textContent = calcWindChill(temp.textContent, windSpeed.textContent);
};


let imagesToLoad = document.querySelectorAll("img[data-src]");
if (imagesToLoad == null) {} else {
    const loadImages = (image) => {
        image.setAttribute("src", image.getAttribute("data-src"));
        image.onload = () => {
            image.removeAttribute("data-src");
        };
    };

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((items, observer) => {
            items.forEach((item) => {
                if (item.isIntersecting) {
                    loadImages(item.target);
                    observer.unobserve(item.target);
                }
            });
        });

        imagesToLoad.forEach((img) => {
            observer.observe(img);
        });

    } else {
        imagesToLoad.forEach((img) => {
            loadImages(img);
        });
    }
}

const visit = document.querySelector("#visit");
if (visit == null) {} else {
    let lastVisit = window.localStorage.getItem("lastVisitTime");

    if (lastVisit == null) {
        visit.textContent = "This is your first visit!";
    } else {
        visit.textContent = `${Math.round((Date.now() - lastVisit) / 86400000)} days`;
    }

    let visitTime = Date.now();

    localStorage.setItem("lastVisitTime", visitTime);
}

const formDate = document.querySelector("#form-date");
if (formDate == null) {} else {
    formDate.value = Date.now();
}

const displayBusinesses = (business) => {
    if (business.name == null) {} else {
        let card = document.createElement("section");
        let name = document.createElement("h2");
        let address = document.createElement("p");
        let phone = document.createElement("p");
        let link = document.createElement("a");
        let imgDiv = document.createElement("div");
        let img = document.createElement("img");

        name.textContent = business.name;

        address.textContent = business.address

        phone.textContent = business.phone;

        link.setAttribute("href", business.link);
        link.setAttribute("target", "_blank");
        link.textContent = business.link;
        
        imgDiv.className = `img-box ${business.background}`;

        img.setAttribute("src", business.imageurl);
        img.setAttribute("alt", business.name);
        img.setAttribute("loading", "lazy");

        imgDiv.appendChild(img);

        card.setAttribute("class", business.row);
        card.appendChild(imgDiv);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(link);

        document.querySelector("div.business-cards").appendChild(card);
    }
};

const cardView = () => {
    bussinessCards.removeAttribute("id");
};

const listView = () => {
    bussinessCards.setAttribute("id", "list");
};


let spotlightCards = document.querySelector(".spotlight");
const displaySpotlight = (business) => {
    if (business.name == null) {} else {
        let card = document.createElement("article");
        let name = document.createElement("h2");
        let img = document.createElement("img");
        let info = document.createElement("p");
        let link = document.createElement("a");

        name.textContent = business.name;

        img.setAttribute("src", business.imageurl);
        img.setAttribute("alt", business.name);
        img.setAttribute("loading", "lazy");
        img.className = `img-spotlight ${business.background}`;

        link.setAttribute("href", `${business.link}`);
        link.setAttribute("target", "_blank");
        link.textContent = business.link;
        
        info.innerHTML = `${business.address}<br>`;
        info.appendChild(link);
        info.innerHTML += `<br>${business.phone}`;

        card.className = "card";
        card.appendChild(name);
        card.appendChild(img);
        card.appendChild(info);

        spotlightCards.appendChild(card);
    }
}

let bussinessCards = document.querySelector(".business-cards");
if (bussinessCards == null && spotlightCards == null) {} else {
    let businessInfo = [];

    const getBusinessInfo = async () => {
        const response = await fetch("json/data.json");
        businessInfo = await response.json();

        if (bussinessCards == null) {
            for (let i = 0; i < 2; i++) {
                displaySpotlight(businessInfo[i]);
            }
        } else {
            businessInfo.forEach(displayBusinesses);
        }
    }
    getBusinessInfo();

    if (bussinessCards == null) {} else {
        const cardBtn = document.querySelector("#card-btn");
        cardBtn.addEventListener("click", cardView);
    
        const listBtn = document.querySelector("#list-btn");
        listBtn.addEventListener("click", listView);
    }
}