Algoritmo "semnome"
// Disciplina  :  [Linguagem e Lógica de Programação] 
// Professor   : Antonio Carlos Nicolodi 
// Descrição   : Aqui você descreve o que o programa faz! (função)
// Autor(a)    : Nome do(a) aluno(a)
// Data atual  : 03/02/2026
Var
dia : inteiro
km, valor_km, valor_dia, valor_total : real



Inicio
escreva("quantos dias usou o carro?")
leia(dia)

escreva("Quantos km percorreu:?")
leia(km)

valor_dia <- 90 * dia

valor_km <- 0.20 * km

valor_total <- valor_dia + valor_km

escreval("Você usou o carro por",dia,", e rodou por",km,"km e no total ficou R$",valor_total)


Fimalgoritmo