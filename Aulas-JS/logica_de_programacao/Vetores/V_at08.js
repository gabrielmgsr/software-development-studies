//  Crie um vetor notas = [5, 8, 10, 4, 7]. Use o .filter() para criar um novo vetor chamado aprovados apenas com notas maiores que 7.

let notas = [5, 8, 10, 4, 7];

let notasAprovados = notas.filter(notas => notas >= 7);
console.log(notas);
console.log(notasAprovados);