algoritmo "semnome"
// Função :
// Autor :
// Data : 28/03/2026
// Seção de Declarações 
var
nome : caractere
salario, novo_salario : real
tempo : inteiro

inicio
escreva("Qual o seu nome?")
leia(nome)
escreva("Quanto é o seu salário?")
leia(salario)
escreva("Quantos anos de empresa?")
leia(tempo)

escreval("Seu nome: ", nome, " e o seu salário atual é R$", salario:4:2," e atualmente você tem ",tempo,"anos de empresa.")

se(tempo <= 3) entao
         escreval("Até 3 anos de empresa: aumento de 3%")
         novo_salario <- salario + (salario * 0.03)
senao
     se(tempo < 10) entao
              escreval("entre 3 e 10 anos: aumento de 12.5%")
              novo_salario <- salario + (salario * 0.125)
     senao
          escreval("10 anos ou mais: aumento de 20%")
          novo_salario <- salario + (salario * 0.20)
     fimse
fimse
escreva("Com o reajuste salarial, o seu salário fica R$", novo_salario:4:2)
fimalgoritmo

