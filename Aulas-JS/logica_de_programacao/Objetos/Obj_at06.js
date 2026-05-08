let produtosLoja = [
    {nome: "Fz25", preco: 28900.20},
    {nome: "Memoria RAM", preco: 350},
    {nome: "SSD", preco: 450},
    {nome: "Fonte", preco: 550},
    {nome: "Monitor", preco: 650}
]

let listaNova = produtosLoja.map(item => {
    return{
        nome: item.nome,
        preco: item.preco + 5
    };
});
console.log(listaNova);