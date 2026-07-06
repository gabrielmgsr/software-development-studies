let estoque = [
    {nome: "bateria de moto", quantidade: 12},
    {nome: "Fone de Ouvido", quantidade: 15},
    {nome: "JBL", quantidade: 7},
    {nome: "Hot Wheels", quantidade: 4},
    {nome: "bateria de carro", quantidade: 25},
    {nome: "Controle de XBOX", quantidade: 2}
];

let produtosCriticos = estoque.filter(estoque => estoque.quantidade <10 );

produtosCriticos.forEach(estoque =>{
    console.log(`ALERTA: O produto ${estoque.nome} tem apenas ${estoque.quantidade} unidades!`)
})