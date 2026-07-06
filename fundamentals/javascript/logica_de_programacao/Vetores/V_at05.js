// Enunciado: Utilizando o mesmo vetor de notas, crie uma variável soma inicializada em 0. Use o forEach para percorrer o array, somar cada nota ao valor total e exibir a soma final no console.

let notas = [7, 5, 9, 4];
let soma = 0;
notas.forEach(nota => {
    soma = soma + nota;
});
console.log("A soma total das notas é: " + soma);