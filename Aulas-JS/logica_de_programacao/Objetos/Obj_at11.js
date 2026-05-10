let clientes = [
    {nome: "Felipe Costa", email: "felipecosta94@gmail.com", isVip: true},
    {nome: "Amanda Lima", email: "amandalima.dev22@gmail.com", isVip: false},
    {nome: "Bruno Martins", email: "brunomartinsx01@gmail.com", isVip: true},
    {nome: "Juliana Souza", email: "julisouza.contato@gmail.com", isVip: true},
]

let clientesVIP = clientes.filter(vip => vip.isVip === true);

let listaVIP = clientesVIP.map(vip => vip.email);

console.log(listaVIP);