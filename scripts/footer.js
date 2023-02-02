const fillLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", 
"Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", 
"8", "9", "0", ".", "+", "!", "@", "#", "$", "%", "^", "&", "*"];

function fillText(event) {
    let iterations = 0;

    const interval = setInterval(() => {
        event.target.innerText = event.target.innerText.split("")
        .map((letter, index) => {
            if(index < iterations) {
                return event.target.dataset.value[index];
            }

            return fillLetters[Math.floor(Math.random() * fillLetters.length)]
        })
        .join("");

        if(iterations >= event.target.dataset.value.length) clearInterval(interval);

        iterations += 1/3;

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
