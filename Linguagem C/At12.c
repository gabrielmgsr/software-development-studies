#include <stdio.h>

int main(){
    double preco_produto, preco_desconto;

    printf("Qual o valor do produto?");
    scanf("%lf", &preco_produto);

    preco_desconto = preco_produto - (preco_produto * 0.05);

    printf("%.2lf", preco_desconto);

    return 0;
}