const alunos = [
    {nome: "Bruno", plano: "Silver", treinos: 12, emDia: true},
    {nome: "Camila", plano: "Gold", treinos: 16, emDia: false},
    {nome: "Diego", plano: "Platinum", treinos: 8, emDia: true},
    {nome: "Elena", plano: "Basic", treinos: 20, emDia: true}
];

alunos.forEach(aluno => {
    let pontosPorTreinos = 0;

    switch (aluno.plano) {
        case "Basic":
            pontosPorTreinos = 2;
        break;
        case "Silver":
            pontosPorTreinos = 3;
        break;
        case "Gold":
            pontosPorTreinos = 4;
        break;
        case "Platinum":
            pontosPorTreinos = 5;
        break;
    }
    let pontosTotais = aluno.treinos * pontosPorTreinos;

    if ( aluno.emDia == false) {
        pontosTotais = pontosTotais - 15
    }

    console.log(`Aluno: ${aluno.nome} (Plano: ${aluno.plano}) - Pontos Finais : ${pontosTotais}`)
})