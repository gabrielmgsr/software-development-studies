Algoritmo "semnome"
// Disciplina  :  [Linguagem e Lógica de Programação] 
// Professor   : Antonio Carlos Nicolodi 
// Descrição   : Aqui você descreve o que o programa faz! (função)
// Autor(a)    : Nome do(a) aluno(a)
// Data atual  : 05/03/2026
Var
// Seção de Declarações das variáveis 
a, b, c : inteiro

Inicio
// Seção de Comandos, procedimento, funções, operadores, etc... 
escreva("Digite número para A?")
leia(a)
escreva("Digite número para B?")
leia(b)
escreva("Digite número para C?")
leia(c)

se (a < b + c) e (b < a + c) e (c < a + b) entao
escreva("Formar triângulo")
senao
escreva("não")
fimse
Fimalgoritmo