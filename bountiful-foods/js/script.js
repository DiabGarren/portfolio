const edited = document.querySelector("#edited");
if (edited == null) {} else {
    document.querySelector("#year").textContent = new Date().getFullYear();
    document.querySelector("#updated").textContent = document.lastModified;
}

const hamBtn = document.querySelector("#ham-menu");
const cross = document.querySelector("#cross-menu");

if (hamBtn == null) {} else {
    const displayNav = () => {
        const nav = document.querySelector("#nav-bar");
        nav.classList.toggle("hidden");
        hamBtn.classList.toggle("hidden");
        cross.classList.toggle("hidden");
    };
    hamBtn.addEventListener("click", displayNav);
    cross.addEventListener("click", displayNav);
}

const currMonth = new Date().getMonth() + 1;
const currDay = new Date().getDate();

let weather = document.querySelector("#weather");
if (weather == null) {} else {
    const url = "//api.openweathermap.org/data/2.5/forecast?lat=33.158089&lon=-117.350594&appid=d5897d892fdcc9e1e7610ad94239af0b&units=imperial";

    weatherFetch(url);
}

async function weatherFetch(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayWeather(data);

        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error(error);
    }
};

const displayWeather = (weatherData) => {
    const name = document.querySelector("#city");
    const weatherImg = document.querySelector("#weather-img");
    const weatherIcon = document.createElement("img");
    const weatherDesc = document.querySelector("#weather-desc");
    const temp = document.querySelector("#weather-temp");
    const forcast = document.querySelector("#weather-forcast");

    const city = weatherData.city.name;
    const days = weatherData.list;
    let disDay = 0;
    for (let i = 0; i < days.length; i++) {
        let year = days[i].dt_txt.substring(0, 4);
        let month = days[i].dt_txt.substring(5, 7);
        let day = days[i].dt_txt.substring(8, 10);
        let time = days[i].dt_txt.substring(11, 13);
        if (month == currMonth && day <= currDay + 3 && day != currDay && time == "12") {
            disDay++;
            let temp = days[i].main.temp;
            let high = days[i].main.temp_max;
            let low = days[i].main.temp_min;
            forcast.innerHTML += `<div id=day${disDay}><h2>${year}-${month}-${day}</h2>
            <p>Temp @ Noon: <b>${temp}&#8457</b><br>High / Low: ${high}&#8457 / ${low}&#8457</p></div>`;
        }
    }

    const iconSrc = `https://openweathermap.org/img/w/${days[0].weather[0].icon}.png`;
    const desc = days[0].weather[0].description;
    const windSpeed = days[0].wind.speed;
    const humidity = days[0].main.humidity;

    let newDesc = "";
    for (let i = 0; i < desc.length; i++) {
        if (desc[i - 1] == " " || i == 0) {
            newDesc += desc[i].toUpperCase();
        } else {
            newDesc += desc[i];
        }
    }
    weatherIcon.setAttribute("src", iconSrc);
    weatherIcon.setAttribute("alt", newDesc);

    name.textContent = city;

    temp.innerHTML = `<p>Temperature: ${days[0].main.temp.toFixed(0)}&#8457<br>Feels like: ${days[0].main.feels_like.toFixed(0)}&#8457<br>High / Low: ${days[0].main.temp_max.toFixed(0)}&#8457 / ${days[0].main.temp_min.toFixed(0)}&#8457</p>`;

    weatherImg.appendChild(weatherIcon);
    weatherDesc.innerHTML = `<p>Weather Condition: ${newDesc}<br>WindSpeed: ${windSpeed}mph<br>Humidity: ${humidity}%</p>`;
};


let order = document.querySelector("#orders");
if (order == null) {} else {
    url = "https://brotherblazzard.github.io/canvas-content/fruit.json";
    url2 = "json/fruit-images.json";

    orderFetch(url, url2);
}

async function orderFetch(url, url2) {
    try {
        const response = await fetch(url);
        const response2 = await fetch(url2);
        if (response.ok) {
            const data = await response.json();
            const images = await response2.json();
            displayOrder(data, images);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error(error);
    }
};

const displayOrder = (fruitData, fruitImages) => {
    let orders = window.localStorage.getItem("fruitList");
    const orderContainer = document.querySelector("#orders");
    if (orders == null) {
        orderContainer.classList.toggle("hidden");
    } else {
        const orderList = orders.split(",")
        for (let i = 1; i <= orderList.length; i++) {
            const order = document.querySelector(`#order${i}`);
            const orderImage = document.querySelector(`#order${i}-img`);
            const img = document.createElement("img");
            const orderName = document.querySelector(`#order${i}-name`);
            const orderCarb = document.querySelector(`#order${i}-carb`);
            const orderProtein = document.querySelector(`#order${i}-protein`);
            const orderFat = document.querySelector(`#order${i}-fat`);
            const orderCal = document.querySelector(`#order${i}-cal`);
            const orderSugar = document.querySelector(`#order${i}-sugar`);

            let pos = 0;
            for (let j = 0; j < fruitData.length; j++) {
                if (fruitData[j].name == orderList[i - 1]) {
                    pos = j;
                    break;
                }
            }

            order.classList.toggle("hidden");

            orderName.innerHTML = `<h2>${fruitData[pos].name}</h2>`;
            orderCarb.innerHTML = `<p>carbohydrates:</p><p>${fruitData[pos].nutritions.carbohydrates}g</p>`;
            orderProtein.innerHTML = `<p>Protein:</p><p>${fruitData[pos].nutritions.protein}g</p>`;
            orderFat.innerHTML = `<p>Fat:</p><p>${fruitData[pos].nutritions.fat}g</p>`;
            orderCal.innerHTML = `<p>Calories:</p><p>${fruitData[pos].nutritions.calories}</p>`;
            orderSugar.innerHTML = `<p>Sugar:</p><p>${fruitData[pos].nutritions.sugar}g</p>`;

            img.setAttribute("src", `${fruitImages[pos].image}`);
            img.setAttribute("alt", orderName.textContent);

            orderImage.innerHTML = "";
            orderImage.appendChild(img);
        }
    }
};

let form = document.querySelector("#form");
if (form == null) {} else {
    url = "https://brotherblazzard.github.io/canvas-content/fruit.json";

    fruitFetch(url);
}

async function fruitFetch(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayFruit(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error(error);
    }
};

const displayFruit = (fruitData) => {
    let fruit1 = document.querySelector("#fruit1");
    let fruit2 = document.querySelector("#fruit2");
    let fruit3 = document.querySelector("#fruit3");
    for (let i = 0; i < fruitData.length; i++) {
        fruit1.innerHTML += `<option value="${fruitData[i].name}">${fruitData[i].name}</option>`;
        fruit2.innerHTML += `<option value="${fruitData[i].name}">${fruitData[i].name}</option>`;
        fruit3.innerHTML += `<option value="${fruitData[i].name}">${fruitData[i].name}</option>`;
    }
}

const submitForm = () => {
    const firstName = document.querySelector("#first-name").value;
    document.querySelector("#confirm-name").textContent = firstName;
    window.localStorage.setItem('fruitList', `${fruit1.value},${fruit2.value},${fruit3.value}`);
    form.classList.toggle("hidden");
    document.querySelector("#confirm").classList.toggle("hidden");
}
const headingName = ["B", "o", "u", "n", "t", "i", "f", "u", "l", " ", "F", "o", "o", "d", "s"];

const heading = document.querySelector("#heading");
if (heading == null) {} else {
    const wait = (milliseconds) => {
        return new Promise(resolve => {
            setTimeout(resolve, milliseconds);
        });
    };
    async function displayName() {
        for (let i = 0; i < headingName.length; i++) {
            heading.textContent += headingName[i];

            await wait(Math.floor(Math.random() * (500 - 200 + 1) + 200));
        }
    };
    displayName();
}