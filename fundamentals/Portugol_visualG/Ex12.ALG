Algoritmo "semnome"
// Disciplina  :  [Linguagem e Lógica de Programação] 
// Professor   : Antonio Carlos Nicolodi 
// Descrição   : Aqui você descreve o que o programa faz! (função)
// Autor(a)    : Nome do(a) aluno(a)
// Data atual  : 02/02/2026
Var
valor_produto, desconto, valor_total: real
nome_produto : caractere


Inicio
escreva("Qual o nome do produto?")
leia(nome_produto)
escreva("Qual o valor do produto?")
leia(valor_produto)
 desconto <- valor_produto * 0.05
 valor_total <- valor_produto - desconto
escreva(valor_total)



Fimalgoritmo