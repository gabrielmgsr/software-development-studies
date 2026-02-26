#include <stdio.h>

int main (){
    float reais;

    printf("Quantos reais tem na carteira?");
    scanf("%f", &reais);
    printf("Com R$%f da para comprar U$%.2f.", reais, reais / 5.24);

    return 0;
}