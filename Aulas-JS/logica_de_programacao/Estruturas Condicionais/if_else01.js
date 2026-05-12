const prompt = require('prompt-sync')();

let valorVendas = Number(prompt("Qual o seu valor total de vendas no mês?"))

if (valorVendas > 10000){
    console.log("Desempenho Excelente! Bônus de 10%");
} else if (valorVendas >= 5000 && valorVendas <= 10000) {
    console.log("Bom desempenho! Bônus de 5%")
} else {
    console.log("Desempenho Regular. Sem bônus este mês")
}
