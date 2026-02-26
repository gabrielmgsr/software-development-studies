algoritmo "semnome"
// Função :
// Autor :
// Data : 25/02/2026
// Seção de Declarações 
var
   d, valor : inteiro
inicio
      escreval("------------------------")
      escreVal("   CRIANCA ESPERANCA    ")
      escreval("------------------------")
      escreval("Muito obrogado por ajudar")
      escreval("[1] para doar R$10")
      escreval("[2] para doar R$10")
      escreval("[3] para doar R$10")
      escreval("[4] para doar outros valores")
      escreval("[5] para cancelar")
      leia (d)
      escolha d
              caso 1
                   valor <- 10
              caso 2
                   valor <- 25
              caso 3
                   valor <- 50
              caso 4
                   escreva ("Qual o valor da doação? R$", valor)
                   leia(valor)
              caso 5
                   valor <- 0
      fimescolha
      escreval("----------------------")
      escreval("SUA DOACAO FOI DE R$", valor)
      escreval("MUITO OBRIGADO!")
      escreval("----------------------")
      
                   

              
      
fimalgoritmo
