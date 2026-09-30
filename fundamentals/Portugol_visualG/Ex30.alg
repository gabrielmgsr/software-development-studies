algoritmo "semnome"
// Função :
// Autor :
// Data : 28/03/2026
// Seção de Declarações 
var
a, b, c : inteiro
inicio
escreva("Digite um valor para lado A:")
leia(a)
escreva("Digite um valor para lado B:")
leia(b)
escreva("Digite um valor para lado C:")
leia(c)

se (a = b) e (a = c) entao
   escreva("Como todos os lados são iguais, logo forma triângulo: EQUILÁTERO!")
senao
     se (a = b) ou (a = c) ou (b = c) entao
        escreva("Como dois lados são iguais, logo forma triângulo: ISÓSCELES!")
     senao
          escreva("Como todos lados são diferentes, logo forma triângulo: ESCALENO!")
     fimse
   fimse
fimalgoritmo
