let funcionarios = [
    {nome: "Julio", setor: "Sistema"},
    {nome: "Marcos", setor: "externo"}
];

let maiusculoFuncionarios = funcionarios.map(nome =>{
    return{
        nome: nome.nome.toUpperCase(),
        setor: nome.setor
    };
});
console.log("Lista Original:", funcionarios);
console.log("Lista para Crachás:", maiusculoFuncionarios);  