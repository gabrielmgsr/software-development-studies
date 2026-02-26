algoritmo "semnome"
// Função :
// Autor :
// Data : 23/02/2026
// Seção de Declarações 
var
   nasc, atual, idade: inteiro
inicio
      escreva("Em que ano voce nasceu?")
      leia(nasc)
      escreva("Em que ano estamos?")
      leia(atual)
      idade <- atual - nasc
      escreval("Em ", atual, " voce tera ", idade," anos.")
      se (idade >= 21) entao
         Escreval (" E voce ja tera atingido a maioridade")
      Fimse

fimalgoritmo
