Algoritmo "semnome"
// Disciplina  :  [Linguagem e Lógica de Programação] 
// Professor   : Antonio Carlos Nicolodi 
// Descrição   : Aqui você descreve o que o programa faz! (função)
// Autor(a)    : Nome do(a) aluno(a)
// Data atual  : 04/03/2026
Var
// Seção de Declarações das variáveis 
idade, idade_calculo : inteiro

Inicio
// Seção de Comandos, procedimento, funções, operadores, etc... 
escreva("Qual a sua idade? ")
leia(idade)

se (idade < 18) entao
idade_calculo <- 18 - idade
escreva("Faltam", idade_calculo," anos para se alistar")
senao
idade_calculo <- idade - 18
escreva("Já se passaram", idade_calculo," anos do alistamento")
fimse

Fimalgoritmo