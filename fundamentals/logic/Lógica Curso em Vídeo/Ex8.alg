algoritmo "semnome"
// Função :
// Autor :
// Data : 01/02/2026
// Seção de Declarações 
var
m, km, hm, dam, dm, cm, mm : real
inicio
escreva("Digite uma distância em metros:")
leia(m)
escreval("A distância de",m, "corresponde a:")
km <- m / 1000
hm <- m / 100
dam <- m / 10
dm <- m * 10
cm <- m * 1000
mm <- m * 1000
escreva(km,"km")
escreval(hm,"hm")
escreval(dam,"dam")
escreval(dm,"dm")
escreval(cm,"cm")
escreval(mm:7:1,"mm")
fimalgoritmo
