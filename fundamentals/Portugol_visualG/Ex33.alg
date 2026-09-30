algoritmo "semnome"
// Função :
// Autor :
// Data : 30/03/2026
// Seção de Declarações 
var
ano : inteiro
casa_valor, salario, emprestimo_salario, valor_prestacao : real
inicio
escreva("Qual o valor da casa?")
leia(casa_valor)
escreva("Qual o seu salário?")
leia(salario)
escreva("Em qauntos anos deseja pagar a casa?")
leia(ano)

emprestimo_salario <- salario * 0.30
valor_prestacao <- casa_valor / (ano * 12)

se (valor_prestacao > emprestimo_salario) entao
   escreva("Empréstimo negado!")
senao
     escreva("Empréstimo aceito")
fimse
fimalgoritmo
