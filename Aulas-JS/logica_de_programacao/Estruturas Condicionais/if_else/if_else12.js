const viajante = {
    nome: "Beatriz",
    tipoAssento: "primeiraClasse",
    destinoNacional: false
};

const destinos = [
    {pais: "Argentina", precoVooBase: 1200},
    {pais: "Portugal", precoVooBase: 4000},
    {pais: "Estados Unidos", precoVooBase: 3500},
    {pais: "Chile", precoVooBase: 1500}
]

destinos.forEach(destino => {
    let precoFinal = destino.precoVooBase
    // TIpos de assento
    if (viajante.tipoAssento == "primeiraClasse") {
        precoFinal = precoFinal + 2000
    } else if (viajante.tipoAssento == "executiva") {
        precoFinal = precoFinal + 800
    }
    // taxa de voo
    if (viajante.destinoNacional == false) {
        precoFinal = precoFinal + 300
    }

    console.log(`Destino: ${destino.pais} - preço para ${viajante.nome}: R$${precoFinal}`)
})