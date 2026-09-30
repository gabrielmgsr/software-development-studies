Algoritmo "semnome"
// Disciplina  :  [Linguagem e Lógica de Programação] 
// Professor   : Antonio Carlos Nicolodi 
// Descrição   : Aqui você descreve o que o programa faz! (função)
// Autor(a)    : Nome do(a) aluno(a)
// Data atual  : 03/03/2026
Var
// Seção de Declarações das variáveis 
nome : caractere
n1, n2, soma : real

Inicio
escreva("Qual seu nome?")
leia(nome)
escreva("Digite a primeira nota:")
leia(n1)
escreva("Digite a segunda nota:")
leia(n2)

soma <- (n1 + n2) / 2

se (soma >= 7) entao
escreva("APROVADO!")
senao
escreva("REPROVADO!")
fimse


Fimalgoritmo