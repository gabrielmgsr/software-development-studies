let alunos = [
    {nome: "Marcos", nota: 8},
    {nome: "Gabriel", nota: 4},
    {nome: "Santiago", nota: 3},
    {nome: "Rodrigues", nota: 9}
];

let baixaNota = alunos.filter(notas => notas.nota < 5);

baixaNota.forEach(aluno => {
    console.log(`O aluno ${aluno.nome} precisa de recuperação`);
});
