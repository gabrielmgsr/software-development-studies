const prompt = require('prompt-sync')();

let valorCompra = Number(prompt("Qual o valor da sua compra?"));
let ehVip = prompt("Você é VIP? (Digite sim ou nao)");

if (ehVip == "sim"){
    console.log("Frete Grátis para Clientes VIP!")
} else if (valorCompra >= 200) {
    console.log("Frete Grátis atingido por valor!")
} else {
    console.log("Frete fixo de R$20,00")
}