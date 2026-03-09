#include <stdio.h>

int main(){
    int dias_trabalhados, total;

    printf("Quantos dias trabalhou?");
    scanf("%d", &dias_trabalhados);
    total = (8 * 25) * dias_trabalhados;

    printf("O valor que recebera no total e R$%d", total);

    return 0;
}