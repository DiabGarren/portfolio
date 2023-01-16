const messages = ["hello there", "this is my project portfolio", "click a letter to begin"];
const terminal = document.querySelector("#terminal");

const wait = (milliseconds) => {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
};

async function typeTerminal() {
    while (true) {
        await wait(2000);

        for (let j = 0; j < messages.length; j++) {

            for (let i = 0; i < messages[j].length; i++) {
                terminal.innerHTML += messages[j][i];

                await wait(Math.floor(Math.random() * (275 - 75 + 1) + 75));
            }
            await wait(1500);

            for (let i = terminal.innerHTML.length; i > 13; i--) {
                terminal.innerHTML = terminal.innerHTML.substring(0, i);

                await wait(Math.floor(Math.random() * (100 - 45 + 1) + 45));
            }
        }
    }
};

let letters = ["#m-letter", "#y-letter", "#p-letter", "#r-letter", "#o-letter", "#j-letter", "#e-letter", "#c-letter", "#t-letter", "#s-letter"];
let positions = ["topleft", "topright", "botleft", "botright"];

async function loadLetters(letterContainer) {
    let length = letterContainer.length - 1;
    
    while (true) {
        for (let i = 0; i < length; i += 2) {
            await wait(Math.floor(Math.random() * (100 - 50 + 1) + 50));
            for (let j = 0; j < positions.length; j++) {
                document.querySelector(letterContainer[i]).children[0].children[j].setAttribute("src", `images/${letterContainer[i][1]}-${positions[j]}.webp`);
                await wait(Math.floor(Math.random() * (75 - 25 + 1) + 25));
                document.querySelector(letterContainer[length - i]).children[0].children[3 - j].setAttribute("src", `images/${letterContainer[length - i][1]}-${positions[3-j]}.webp`);
                await wait(Math.floor(Math.random() * (50 - 25 + 1) + 25));
            }
        }

        await wait(120*1000);
        
        for (let i = 0; i < length; i += 2) {
            await wait(250);
            for (let j = 0; j < positions.length; j++) {
                document.querySelector(letterContainer[i]).children[0].children[j].setAttribute("src", `images/placeholder.webp`);
                await wait(Math.floor(Math.random() * (75 - 25 + 1) + 25));
                document.querySelector(letterContainer[length - i]).children[0].children[3 - j].setAttribute("src", `images/placeholder.webp`);
                await wait(Math.floor(Math.random() * (100 - 50 + 1) + 50));
            }
        }

        await wait(750);
    }

};

async function explode(e, dest) {
    for (let i = 0; i < letters.length; i++) {
        let letter = document.querySelector(letters[i]).children[0];
        if (letter == e) {
            if (e.getAttribute("index") == "0") {
                switch (dest) {
                    case "m":
                        e.setAttribute("style", "background-image: url('images/maeve-human-portfolio-thumbnail.webp')");
                        console.log("true")
                        break;
                }
                e.setAttribute("index", "1");
            } else {
                if (e.getAttribute("index") == "1") {
                    e.setAttribute("style", "background-image: url('images/maeve-human-portfolio.webp')");
                    e.setAttribute("index", "2");

                    await wait(1200);
                    if (dest == "m") {
                        window.location.href = "maeve-human-portfolio/";
                    }
                    await wait(300);
                    e.setAttribute("index", "0");
                }
            }
        } else {
            if (letter.getAttribute("index") != "0") {
                letter.setAttribute("index", "0");
                letter.setAttribute("style", "background-image: ");
            }
        }

    }

};


async function explodeHandler(e) {
    let letter = e.target.parentNode;
    if (e.target.classList.contains("letter-inner")) {
        letter = e.target;
    }

    let dest = letter.parentNode.getAttribute("id")[0];
    explode(letter, dest);
};

document.querySelector("#m-letter").addEventListener("click", explodeHandler);
document.querySelector("#y-letter").addEventListener("click", explodeHandler);
document.querySelector("#p-letter").addEventListener("click", explodeHandler);
document.querySelector("#r-letter").addEventListener("click", explodeHandler);
document.querySelector("#o-letter").addEventListener("click", explodeHandler);
document.querySelector("#j-letter").addEventListener("click", explodeHandler);
document.querySelector("#e-letter").addEventListener("click", explodeHandler);
document.querySelector("#c-letter").addEventListener("click", explodeHandler);
document.querySelector("#t-letter").addEventListener("click", explodeHandler);
document.querySelector("#s-letter").addEventListener("click", explodeHandler);

window.addEventListener("click", (e) => {
    switch (e.target.className) {
        case "letter-inner":
        case "top-left":
        case "top-right":
        case "bot-left":
        case "bot-right":
            break;
        default:
            for (let i = 0; i < letters.length; i++) {
                document.querySelector(letters[i]).children[0].setAttribute("index", "0");
                document.querySelector(letters[i]).children[0].setAttribute("style", "background-image: ");
            }
            break;
    }
});

typeTerminal();

loadLetters(letters);