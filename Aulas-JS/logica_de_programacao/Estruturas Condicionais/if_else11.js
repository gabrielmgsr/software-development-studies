const pet = {
    nome: "Thor",
    especie: "cachorro",
    porte: "grande",     // Pode ser: pequeno, medio, grande
    temCupom: true       // Se tem cupom de desconto de R$ 5
};

const servicos = [
    { nome: "Banho", precoBase: 40 },
    { nome: "Tosa", precoBase: 50 },
    { nome: "Corte de Unha", precoBase: 15 },
    { nome: "Hotelzinho (Diária)", precoBase: 80 }
];

servicos.forEach(servicos => {
    let precoFinal = servicos.precoBase
    // calculos de porte
    if (pet.porte == "grande"){
        precoFinal = precoFinal + 20;
    } else if (pet.porte == "medio"){
        precoFinal = precoFinal + 10;
    }
    // calculos de descontos
    if (pet.temCupom == true && precoFinal > 20){
        precoFinal = precoFinal - 5;
    }
    console.log(`Serviço: ${servicos.nome} - Preço para ${pet.nome}: R$${precoFinal}`)
})