let greeting = "hello there";
let welcome = "this is my project portfolio"
let hintText = "click a letter to begin";
let clear = "cls";

const messages = ["hello there", "this is my project portfolio", "click a letter to begin"];

const terminal = document.querySelector("#terminal");
if (terminal == null) {} else {
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
    typeTerminal();

}

let letters = ["#m-letter", "#y-letter", "#p-letter", "#r-letter", "#o-letter", "#j-letter", "#e-letter", "#c-letter", "#t-letter", "#s-letter"];

const explode = (e) => {
    for (let i = 0; i < letters.length; i++) {
        let letter = document.querySelector(letters[i]).children[0];
        if (letter == e) {
            if (e.getAttribute("index") == "0") {
                e.setAttribute("index", "1");
            } else {
                if (e.getAttribute("index") == "1") {
                    e.setAttribute("index", "2");
                }
            }
        } else {
            if (letter.getAttribute("index") != "0") {
                letter.setAttribute("index", "0");
            }
        }

    }

};


async function explodeHandler(e) {
    let letter = e.target.parentNode;
    if (e.target.classList.contains("letter-inner")) {
        letter = e.target;
    }
    explode(letter);
}


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