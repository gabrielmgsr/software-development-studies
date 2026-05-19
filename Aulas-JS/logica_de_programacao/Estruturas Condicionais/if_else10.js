const cliente = {
    nome: "Lucas",
    idade: 17,       
    estudante: true  
};

const sessoes = [
    { filme: "Vingadores", tipo: "3D", precoBase: 40 },
    { filme: "Rei Leão", tipo: "Normal", precoBase: 30 },
    { filme: "Avatar", tipo: "3D", precoBase: 50 },
    { filme: "Dune", tipo: "Normal", precoBase: 35 }
];

sessoes.forEach( sessoes => {

    let precoFinal = sessoes.precoBase
    // sessão de 3D
    if(sessoes.tipo == "3D") {
        precoFinal = 10 + precoFinal;
    }
    //  Desconto Meia-entrada
    if (cliente.estudante == true || cliente.idade < 18) {
        precoFinal = precoFinal / 2;
    }

    console.log(`Filme: ${sessoes.filme} (${sessoes.tipo}) - Preço para ${cliente.name}: R$${precoFinal}`)
})
