const prompt = require('prompt-sync')();

let saldoConta = Number(prompt("Qual o valor do seu saldo? "))
let valorSaque = Number(prompt("Qual o valor do seu saque? "))
let novoValor = 0

if (valorSaque > saldoConta) {
    console.log("Saldo Insuficiente")
} else if (valorSaque <= 0) {
    console.log("Valor de saque inválido")
} else {
    novoValor = saldoConta - valorSaque
    console.log(`Saque realizada com sucesso! Novo saldo: R$ ${novoValor}`)
}