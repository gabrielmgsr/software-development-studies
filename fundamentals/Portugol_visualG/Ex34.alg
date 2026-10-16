algoritmo "semnome"
// Função :
// Autor :
// Data : 31/03/2026
// Seção de Declarações 
var
peso : inteiro
altura, imc : real
inicio
escreval("-----Calculo de IMC-----")
escreva("Qual o seu peso?")
leia(peso)
escreva("Qual a sua altura(ex: 1.75, 1.80, 1.65)?")
leia(altura)

imc <- peso / (altura * altura)
escreval("O seu imc é:", imc:4:1)
se (imc < 18.5) entao
   escreva("Abaixo do peso!")
senao
     se (imc >= 18.5) e (imc < 25) entao
        escreva("Peso Ideal")
     senao
          se (imc >= 25) e (imc < 30) entao
             escreva("Sobrepeso")
          senao
               se (imc >= 30) e (imc <= 40) entao
                  escreva("Obesidade")
               senao
                    se (imc > 40) entao
                       escreva("Obesidade Mórbida")
                    fimse
               fimse
          fimse
     fimse
fimse

fimalgoritmo
