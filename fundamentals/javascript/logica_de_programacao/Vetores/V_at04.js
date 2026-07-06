// Enunciado: Crie um vetor notas com os valores [7, 5, 9, 4]. Utilize o método .filter() para gerar um novo vetor chamado notasAltas apenas com as notas maiores ou iguais a 7.

let notas = [7, 5, 9, 4];
let notasAltas = notas.filter(notas => notas >= 7);
console.log(notasAltas);