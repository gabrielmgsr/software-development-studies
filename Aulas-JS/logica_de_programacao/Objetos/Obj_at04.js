let  carrinho = [
    {nome: "Tomate", preco: 9},
    {nome: "Tomate", preco: 10},
    {nome: "Tomate", preco: 10}
];
let total = 0;

carrinho.forEach(carrinho => {
    total = total + carrinho.preco
});

console.log("O total de compra é R$" + total);