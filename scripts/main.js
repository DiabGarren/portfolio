const letters = ["#m", "#y", "#p", "#r", "#o", "#j", "#e", "#c", "#t", "#s"];
const positions = ["topleft", "topright", "botleft", "botright"];
const fillLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ".", "+", "!", "@", "#", "$", "%", "^", "&", "*"];

const wait = (milliseconds) => {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
};

function fillText(event) {
    let iterations = 0;

    const interval = setInterval(() => {
        event.target.innerText = event.target.innerText.split("")
            .map((letter, index) => {
                if (index < iterations) {
                    return event.target.dataset.value[index];
                }

                return fillLetters[Math.floor(Math.random() * fillLetters.length)]
            })
            .join("");

        if (iterations >= event.target.dataset.value.length) clearInterval(interval);

        iterations += 1 / 3;

    }, 30);
}

document.querySelector("#phone").onmouseover = event => {
    fillText(event);
}
document.querySelector("#email").onmouseover = event => {
    fillText(event);
}
document.querySelector("#transcript").onmouseover = event => {
    fillText(event);
}
document.querySelector("#resume").onmouseover = event => {
    fillText(event);
}
document.querySelector("#home").onmouseover = event => {
    fillText(event);
}

document.querySelector(".nav-btn").addEventListener("click", () => {
    document.querySelector(".nav-btn").classList.toggle("open");
    document.querySelector("#nav").classList.toggle("visible");
});

if (document.querySelector(letters[0]) != null) {

    function letterAction(event, action) {
        switch (event.target.classList.value) {
            case "letter":
            case "letter-inner":
                if (action == "next") {
                    switch (event.target.dataset.state) {
                        case "close":
                            event.target.dataset.state = "expand";
                            break;
                        case "expand":
                            event.target.dataset.state = "go";
                            if (event.target.parentNode.dataset.value != "") {
                                window.open(event.target.parentNode.dataset.value);
                            }
                            break;
                    }
                } else if (action == "prev") {
                    event.target.dataset.state = "close";
                }
            case "top-left":
            case "top-right":
            case "bot-left":
            case "bot-right":
                if (action == "next") {
                    switch (event.target.parentNode.dataset.state, event.target.parentNode.parentNode.dataset.state) {
                        case "close":
                            event.target.parentNode.dataset.state = "expand";
                            event.target.parentNode.parentNode.dataset.state = "expand";
                            break;
                        case "expand":
                            event.target.parentNode.dataset.state = "go";
                            event.target.parentNode.parentNode.dataset.state = "go";
                            break;
                    }
                } else if (action == "prev") {
                    event.target.parentNode.dataset.state = "close";
                    event.target.parentNode.parentNode.dataset.state = "close";
                }
                break;

            case "top-left-inner":
            case "top-right-inner":
            case "bot-left-inner":
            case "bot-right-inner":
                if (action == "next") {
                    switch (event.target.parentNode.parentNode.dataset.state, event.target.parentNode.parentNode.parentNode.dataset.state) {
                        case "close":
                            event.target.parentNode.parentNode.dataset.state = "expand";
                            event.target.parentNode.parentNode.parentNode.dataset.state = "expand";
                            break;
                        case "expand":
                            event.target.parentNode.parentNode.dataset.state = "go";
                            event.target.parentNode.parentNode.parentNode.dataset.state = "go";
                            break;
                    }
                } else if (action == "prev") {
                    event.target.parentNode.parentNode.dataset.state = "close";
                    event.target.parentNode.parentNode.parentNode.dataset.state = "close";
                }
                break;
        }
    }

    window.onmouseover = event => {
        letterAction(event, "next");
        window.onclick = event => {
            letterAction(event, "next");
        }
    }
    window.ontouchstart = event => {
        letterAction(event, "next");
    }

    window.onmouseout = event => {
        letterAction(event, "prev");
    }
    window.ontouchend = event => {
        letterAction(event, "prev");
    }

} 