algoritmo "semnome"
// Função :
// Autor :
// Data : 02/03/2026
// Seção de Declarações 
var
velocidade,velocidade_multa : inteiro
inicio
escreva("Qual a velocidade do carro?")
leia(velocidade)

se (velocidade > 80) entao
escreva("MULTADO!")
velocidade_multa <- (velocidade - 80) * 5
escreval(velocidade_multa)

fimse
fimalgoritmo
