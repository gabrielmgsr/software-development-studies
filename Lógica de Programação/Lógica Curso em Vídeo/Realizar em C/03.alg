algoritmo "semnome"
// Função :
// Autor :
// Data : 23/02/2026
// Seção de Declarações 
var
a, m, imc : real
inicio
escreva("Massa (kg):")
leia(m)
escreva("ALtura (a):")
leia(a)
imc <- M / (a * a)
escreval("IMC : ", imc:5:2)
se (imc >= 18.5 ) e (imc < 25) entao
   escreva("Parabens! Voce esta no seu peso ideal.")
senao
     escreva("Voce nao esta na faixa de peso ideal")
fimse
fimalgoritmo
