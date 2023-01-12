let welcome = "hello there"
let hintText = "try clicking one of the letters";
let clear = "cls"

const terminal = document.querySelector("#terminal");
if (terminal == null) {} else {
    const wait = (milliseconds) => {
        return new Promise(resolve => {
            setTimeout(resolve, milliseconds);
        });
    };

    async function typeTerminal() {
        while (true){
            await wait(1000);
            for (let i = 0; i < welcome.length; i++) {
                terminal.innerHTML += welcome[i];
    
                await wait(Math.floor(Math.random() * (500 - 200 + 1) + 200));
            }
    
            terminal.innerHTML += "<br>garren-diab>";
            await wait(1500);
    
            for (let i = 0; i < hintText.length; i++) {
                terminal.innerHTML += hintText[i];
    
                await wait(Math.floor(Math.random() * (500 - 200 + 1) + 200));
            }
    
            terminal.innerHTML += "<br>garren-diab>";
            await wait(5000);
    
            for (let i = 0; i < clear.length; i++) {
                terminal.innerHTML += clear[i];
    
                await wait(Math.floor(Math.random() * (500 - 200 + 1) + 200));
            }
    
            await wait(500);
            terminal.innerHTML = "garren-diab>";
        }
    };
    typeTerminal();

}