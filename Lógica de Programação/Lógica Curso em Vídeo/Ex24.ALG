Algoritmo "semnome"
// Disciplina  :  [Linguagem e Lógica de Programação] 
// Professor   : Antonio Carlos Nicolodi 
// Descrição   : Aqui você descreve o que o programa faz! (função)
// Autor(a)    : Nome do(a) aluno(a)
// Data atual  : 05/03/2026
Var
// Seção de Declarações das variáveis 
percorrer_km, valor : real

Inicio
// Seção de Comandos, procedimento, funções, operadores, etc... 
escreva("Qual a distância  vai percorrer(km)?")
leia(percorrer_km)

se (percorrer_km <= 200) entao
valor <- 0.50 * percorrer_km
senao
valor <- 0.45 * percorrer_km
fimse

escreva("Você percorreu ",percorrer_km,"km e total do pagamento será: R$",valor)

Fimalgoritmo