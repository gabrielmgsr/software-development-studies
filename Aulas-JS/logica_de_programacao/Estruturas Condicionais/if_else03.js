const prompt =  require('prompt-sync')();

let peso = Number(prompt("Digite o seu peso:"))
let altura = Number(prompt("Digite a sua altura:"))

let imc = peso/(altura * altura)

if (imc < 18.5) {
    console.log(`IMC = ${imc.toFixed(2)}: Abaixo do peso`)
} else if (imc > 18.5 && imc < 24.9){
    console.log(`IMC = ${imc.toFixed(2)}: Peso normal`)
} else if (imc > 25 && imc < 29.9){
    console.log(`IMC = ${imc.toFixed(2)}: Sobrepeso`)
} else {
    console.log(`IMC = ${imc.toFixed(2)}: Obesidade`)
}