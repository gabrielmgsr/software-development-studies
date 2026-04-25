const prompt = require('prompt-sync')();

const n1 = Number(prompt('Nota 1:'));
const n2 = Number(prompt('Nota 2:'));
const media = (n1 + n2) / 2

console.log(`A média entre ${n1} e ${n2} é igual a ${media}`);

