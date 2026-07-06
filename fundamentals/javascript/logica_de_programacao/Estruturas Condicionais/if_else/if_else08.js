let pedidos = [
    {cliente: "Amanda", valor: 600, vip: true},
    {cliente: "Ricardo", valor: 400, vip: false},
    {cliente: "Patricia", valor: 700, vip: false},
    {cliente: "Marcos", valor: 300, vip: true}
];

pedidos.forEach(pedido =>{
    if (pedido.vip == true){
        console.log(`Pedido de ${pedido.cliente}: Processamento prioritário liberado!`)
    } else if (pedido.vip == false && pedido.valor >= 500){
        console.log(`Pedido de ${pedido.cliente}: Ganhou cupom de desconto para próxima compra!`)
    } else{
        console.log(`Pedido de ${pedido.cliente}: Procesamento padrão`)
    }
})