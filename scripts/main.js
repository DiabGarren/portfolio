const letters = ["#m", "#y", "#p", "#r", "#o", "#j", "#e", "#c", "#t", "#s"];
const positions = ["topleft", "topright", "botleft", "botright"];
const fillLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ".", "+", "!", "@", "#", "$", "%", "^", "&", "*"];

const wait = (milliseconds) => {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
};

async function loadLetters(letterContainer) {
    let length = letterContainer.length - 1;

    while (true) {
        for (let i = 0; i < length; i += 2) {
            await wait(Math.floor(Math.random() * (100 - 50 + 1) + 50));
            for (let j = 0; j < positions.length; j++) {
                document.querySelector(letterContainer[i]).children[0].children[j].setAttribute("src", `images/letters/${letterContainer[i][1]}-${positions[j]}.webp`);
                await wait(Math.floor(Math.random() * (75 - 25 + 1) + 25));
                document.querySelector(letterContainer[length - i]).children[0].children[3 - j].setAttribute("src", `images/letters/${letterContainer[length - i][1]}-${positions[3 - j]}.webp`);
                await wait(Math.floor(Math.random() * (50 - 25 + 1) + 25));
            }
        }

        await wait(2 * 60_000);

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
    // document.querySelector()
    document.querySelector("#nav").classList.toggle("grid");
});

if(document.querySelector(letters[0]) != null) {
    loadLetters(letters);
} 