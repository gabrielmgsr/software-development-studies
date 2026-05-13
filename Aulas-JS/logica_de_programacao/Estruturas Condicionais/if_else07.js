const prompt = require('prompt-sync')();

let tempoMinutos = Number(prompt('Quantos minutos ficou parado no estacionamento? '))

if (tempoMinutos <= 15) {
    console.log(`Você ficou ${tempoMinutos} minutos, logo não pagará nada!`)
} else if (tempoMinutos >= 16 && tempoMinutos <= 60) {
     console.log(`Você ficou ${tempoMinutos} minutos, logo pagará R$10,00!`)
} else if ( tempoMinutos >= 61 && tempoMinutos <= 120) {
    console.log(`Você ficou ${tempoMinutos} minutos, logo pagará R$20,00!`)
} else{
    console.log(`Você ficou ${tempoMinutos} minutos, logo pagará R$30,00 + R$5,00 por hora adicional!`)
}