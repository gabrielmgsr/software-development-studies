// Crie um vetor de precos com os valores [20, 50, 30]. Use um forEach para somar todos os valores em uma variável total e, no final, exiba: "O valor total é R$ ...".

let precos = [20, 50, 30];
let total = 0;

precos.forEach(precos => {
    total = total + precos;
});
console.log("O valor total é: R$" + total);