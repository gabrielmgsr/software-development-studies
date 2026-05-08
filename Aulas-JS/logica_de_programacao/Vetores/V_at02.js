// Enunciado: Dado um vetor de precos numéricos, utilize o método .filter() para criar um novo vetor chamado promocao que contenha apenas os valores menores que 50. Ao final, exiba a nova lista.

let precos = [10, 15, 70, 125, 9, 49];
let promocao = precos.filter(precos => precos < 50);
console.log(promocao);