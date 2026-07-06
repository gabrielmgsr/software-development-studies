const prompt = require('prompt-sync')();

const n1 = Number(prompt('Digite um valor:'));
const n2 = Number(prompt('Digite outro valor:'));
const soma = n1 + n2;

console.log(`A soma entre ${n1} e ${n2} é igual a ${soma}`)
