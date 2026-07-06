const prompt = require('prompt-sync')();

const n = Number(prompt('Digite um número:'));

console.log(`O dobro de ${n} é ${n * 2}\nA terça parte de ${n} é ${(n / 3).toFixed(2)}`);