let espectadores = [
    {nome: "Marcos", idade: 19, temIngresso: true},
    {nome: "Matheus", idade: 4, temIngresso: true},
    {nome: "Ricardo", idade: 20, temIngresso: false},
    {nome: "Julio", idade: 25, temIngresso: true},
];

espectadores.forEach(espectadores => {
    if (!espectadores.temIngresso) {
        console.log(`Olá ${espectadores.nome}, você precisa comprar um ingresso primeiro.`)
    } else if(espectadores.temIngresso && espectadores.idade < 16){
        console.log(`Olá ${espectadores.nome}, acesso negado: Idade mínima é 16 anos.`)
    } else {
        console.log(`Olá ${espectadores.nome}, acesso liberado! Bom filme. `)
    }
})