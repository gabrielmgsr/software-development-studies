function gerar (){
    let input1 = document.getElementById("min");
    let input2 = document.getElementById("max");
    let resultado = document.getElementById("numeros");
    let numero = 0;
    
    let min = Number(input1.value);
    let max = Number(input2.value);

    numero = Math.floor(Math.random() * (max - min + 1)) + min;
    resultado.textContent = numero;
}