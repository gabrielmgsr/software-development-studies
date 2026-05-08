let produtos = [
    { nome: "Teclado Gamer", preco: 150.00 },
    { nome: "Mouse Óptico", preco: 80.00 },
    { nome: "Monitor 24'", preco: 900.00 }
];

console.log(produtos)

produtos.forEach(item => {
    console.log("Produto: " + item.nome);
});