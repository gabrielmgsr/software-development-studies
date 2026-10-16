Algoritmo "semnome"
// Disciplina  :  [Linguagem e Lógica de Programação] 
// Professor   : Antonio Carlos Nicolodi 
// Descrição   : Aqui você descreve o que o programa faz! (função)
// Autor(a)    : Nome do(a) aluno(a)
// Data atual  : 04/03/2026
Var
// Seção de Declarações das variáveis 
sexo, nome : caractere
valor_compra, valor_desconto, valor_final : real

Inicio
// Seção de Comandos, procedimento, funções, operadores, etc... 
escreva("Qual o seu nome: ")
leia(nome)
escreva("Qual seu sexo (F/M): ")
leia(sexo)
escreva("Qual o valor da compra:")
leia(valor_compra)

se (sexo = "M") entao
valor_desconto <- valor_compra * 0.05
senao
se (sexo = "F") entao
valor_desconto <- valor_compra * 0.13
senao
escreva("Sexo Inválido")
valor_desconto <- 0
fimse
fimse

valor_final <- valor_compra - valor_desconto

escreval("Valor do desconto: ", valor_desconto)
escreva("Valor final: ", valor_final)
Fimalgoritmo