const prompt = require('prompt-sync')();

let nota = Number(prompt("Qual a sua nota? "))

if (nota >= 9) {
    console.log("Conceito A - Excelente")
} else if (nota >= 7 && nota < 8.9) {
    console.log("Conceito B - Bom")
} else if (nota >= 5 && nota <= 6.9) {
    console.log("Conceito C - Recuperação")
} else {
    console.log("Conceito F - Reprovado")
}