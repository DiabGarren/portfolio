let greeting = "hello there";
let welcome = "welcome to my project portfolio"
let hintText = "click a letter to view a project";
let clear = "cls";

const terminal = document.querySelector("#terminal");
if (terminal == null) {} else {
    const wait = (milliseconds) => {
        return new Promise(resolve => {
            setTimeout(resolve, milliseconds);
        });
    };

    async function typeTerminal() {
        while (true){
            await wait(2000);
            for (let i = 0; i < greeting.length; i++) {
                terminal.innerHTML += greeting[i];
    
                await wait(Math.floor(Math.random() * (275 - 75 + 1) + 75));
            }
    
            terminal.innerHTML += "<br>garren-diab>";
            await wait(1500);

            for (let i = 0; i < welcome.length; i++) {
                terminal.innerHTML += welcome[i];
    
                await wait(Math.floor(Math.random() * (275 - 75 + 1) + 75));
            }
    
            terminal.innerHTML += "<br>garren-diab>";
            await wait(3000);
    
            for (let i = 0; i < hintText.length; i++) {
                terminal.innerHTML += hintText[i];
    
                await wait(Math.floor(Math.random() * (275 - 75 + 1) + 75));
            }
    
            terminal.innerHTML += "<br>garren-diab>";
            await wait(5000);
    
            for (let i = 0; i < clear.length; i++) {
                terminal.innerHTML += clear[i];
    
                await wait(Math.floor(Math.random() * (275 - 75 + 1) + 75));
            }
    
            await wait(3000);
            terminal.innerHTML = "garren-diab>";
        }
    };
    typeTerminal();

}

const letterM = document.querySelector("#m-letter");
const explode = () => {
    let datalist = letterM.children[0].getAttribute("index");
    if (letterM.children[0].getAttribute("index") == "0") {
        // letterM.children[0].getAttribute("datalist") = "1";
        console.log("true");
    } else {
        letterM.children[0].getAttribute("datalist") = "0";
    }
};
letterM.addEventListener("click", explode);
