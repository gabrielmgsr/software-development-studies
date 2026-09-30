algoritmo "pintura_parede"

var
   largura, altura, area, tinta: real

inicio

   escreva("Digite a largura da parede (m): ")
   leia(largura)

   escreva("Digite a altura da parede (m): ")
   leia(altura)

   area <- largura * altura
   tinta <- area / 2

   escreval("Área a ser pintada: ", area:0:2, " m²")
   escreval("Quantidade de tinta necessária: ", tinta:0:2, " litros")

fimalgoritmo
