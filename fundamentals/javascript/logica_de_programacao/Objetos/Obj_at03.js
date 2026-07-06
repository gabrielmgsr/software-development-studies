let livros = [
    {titulo: "Lógica de Programação", valor: 49.90},
    {titulo: "Entendeno Algoritmos", valor: 49.00},
    {titulo: "Como Ser Um Programador Melhor", valor: 78.99}
];
let valorMenor = livros.filter(valor => valor.valor < 50);
console.log(valorMenor);