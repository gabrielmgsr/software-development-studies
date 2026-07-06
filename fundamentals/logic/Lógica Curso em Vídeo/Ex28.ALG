Algoritmo "semnome"
// Disciplina  :  [Linguagem e Lógica de Programação] 
// Professor   : Antonio Carlos Nicolodi 
// Descrição   : Aqui você descreve o que o programa faz! (função)
// Autor(a)    : Nome do(a) aluno(a)
// Data atual  : 27/03/2026
Var
// Seção de Declarações das variáveis 
largura, comprimento, total : real

Inicio
escreva("Qual a largura do terreno?")
leia(largura)
escreva("Qual o comprimento do terreno?")
leia(comprimento)

total <- largura * comprimento
escreval("Área do terreno:", total)
se (total < 100) entao
   escreva("TERRENO POPULAR")
senao
     se (total >= 100) e (total <= 500) entao
        escreva("TERRENO MASTER")
     senao
          escreva("TERRENO VIP")
     fimse
fimse


Fimalgoritmo