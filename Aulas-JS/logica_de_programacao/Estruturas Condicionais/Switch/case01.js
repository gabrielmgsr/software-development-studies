const funcionarios = [
    { nome: "Camila", cargo: "Estagiario", salario: 1500 },
    { nome: "Rodrigo", cargo: "Junior", salario: 3500 },
    { nome: "Amanda", cargo: "Pleno", salario: 6000 },
    { nome: "Fabio", cargo: "Senior", salario: 10000 },
    { nome: "Larissa", cargo: "Diretor", salario: 15000 }
];

funcionarios.forEach(funcionario => {
    let aumento = 0;

    switch (funcionario.cargo) {
        case "Estagiario":
            aumento = 300
        break;
        case "Junior":
            aumento = 500
        break;
        case "Pleno":
            aumento = 800
        break;
        case "Senior":
            aumento = 1200
        break;
        default:
            aumento = 2000
        break;
    }
    let salarioFinal = funcionario.salario + aumento;

    console.log(`Funcionario: ${funcionario.nome} (${funcionario.cargo}) - Novo Salário: R$ ${salarioFinal}`)
})