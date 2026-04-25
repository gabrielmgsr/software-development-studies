const prompt = require('prompt-sync')();

const nome = prompt("Qual o seu nome: "); 
const salario = Number(prompt("Qual o seu salário: "));

console.log(`Nome do Funcionário: ${nome}\nSalário: ${salario}.`);
console.log(`O funcionário ${nome} tem um salário de R$${salario} em Junho.`);