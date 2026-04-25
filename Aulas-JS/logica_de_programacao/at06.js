const prompt = require('prompt-sync')();

const n = Number(prompt('Digite um número:'));


console.log(`O antecessor de ${n} é ${n - 1}\nO sucessor de ${n} é ${n + 1}`);