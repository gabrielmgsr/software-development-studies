#include <stdio.h>

int main(){

    char nome[50], sexo;
    int valor_compra;
    float desconto, total;

    printf("Qual o seu nome?");
    scanf("%s", nome);
    printf("Qual o seu sexo(F/M)?");
    scanf(" %c", &sexo);
    printf("Qual o valor da sua compra?");
    scanf("%d", &valor_compra);

    if (sexo == 'M'){
        desconto = (valor_compra * 0.05);
    }
    else{
        desconto = (valor_compra * 0.13);
    }
    total = valor_compra - desconto;

    printf("Seu nome e %s, e do sexo %c e com o desconto ficou: %.2f\n",nome, sexo, total);
    return 0;
}