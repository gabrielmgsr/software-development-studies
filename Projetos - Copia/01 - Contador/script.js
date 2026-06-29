let number = document.getElementById("numero");
let button1 = document.getElementById("mais");
let button2 = document.getElementById("menos");
let button3 = document.getElementById("reset");
let contador = 0;

button1.addEventListener("click", () => {
    contador++;
    number.textContent = contador;
})
button2.addEventListener("click", () =>{
    contador--;
    number.textContent = contador;
})
button3.addEventListener("click", () =>{
    contador = 0;
    number.textContent = contador;
})

