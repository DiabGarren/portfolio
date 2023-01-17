const messages = ["hello there", "this is my project portfolio", "click a letter to begin"];
const terminal = document.querySelector("#terminal");

const letters = ["#m-letter", "#y-letter", "#p-letter", "#r-letter", "#o-letter", "#j-letter", "#e-letter", "#c-letter", "#t-letter", "#s-letter"];
const positions = ["topleft", "topright", "botleft", "botright"];

const sites = ["maeve-human-portfolio", "bountiful-foods", "chamber"]
let site = null;

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

        await wait(120 * 1000);

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
    const width = window.innerWidth;
    let size = "";
    if (width < 1025) {
        size = "-small";
    }

    for (let i = 0; i < letters.length; i++) {
        let letter = document.querySelector(letters[i]);

        if (letter.getAttribute("id") == e.getAttribute("id")) {
            switch (dest) {
                case "m":
                    site = 0;
                    break;
                case "y":
                    site = 1;
                    break;
                case "p":
                    site = 2;
                    break;
                default:
                    return;
            }
            if (e.children[0].getAttribute("index") == "0") {
                e.children[0].setAttribute("style", `background-image: url('images/${sites[site]}-thumbnail${size}.webp')`);
                e.children[0].setAttribute("index", "1");
            } else {
                if (e.children[0].getAttribute("index") == "1") {

                    if (site != null) {
                        e.children[0].setAttribute("style", `background-image: url('images/${sites[site]}${size}.webp')`);
                    }
                    e.children[0].setAttribute("index", "2");

                    await wait(1200);
                    window.location.href = `${sites[site]}/`;

                    await wait(300);
                    e.children[0].setAttribute("index", "0");
                    e.children[0].removeAttribute("style");
                }
            }
        } else {
            if (letter.children[0].getAttribute("index") != "0") {
                letter.children[0].setAttribute("index", "0");
                letter.children[0].removeAttribute("style");
            }
        }

    }

};


async function explodeHandler(e) {
    let letter = e;
    let dest = letter.getAttribute("id")[0];
    explode(letter, dest);
};

window.addEventListener("click", (e) => {
    switch (e.target.className) {
        case "letter-inner":
            explodeHandler(e.target.parentNode);
            break;
        case "top-left":
        case "top-right":
        case "bot-left":
        case "bot-right":
            explodeHandler(e.target.parentNode.parentNode);
            break;
        default:
            for (let i = 0; i < letters.length; i++) {
                document.querySelector(letters[i]).children[0].setAttribute("index", "0");
                document.querySelector(letters[i]).children[0].removeAttribute("style");
            }
            break;
    }
});

typeTerminal();

loadLetters(letters);