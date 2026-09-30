algoritmo "semnome"
// Função :
// Autor :
// Data : 25/03/2026
// Seção de Declarações 
var
nota1, nota2, media : real
inicio
escreva("Qual a sua primeira nota?")
leia(nota1)
escreva("Qual a sua segunda nota?")
leia(nota2)
media <- (nota1 + nota2) / 2
escreval("A sua média é", media)

se (media <= 4.9) entao
   escreva("Você está REPROVADO!")
senao
     se (media >= 5.0) e (media <= 6.9) entao
        escreva("Você está de RECUPERAÇÃO!")
     senao
          escreva("Você está APROVADO!")
     fimse
fimse
fimalgoritmo
