#include <stdio.h>

int main () {
    char nome[50];
    float salario;

    printf("Nome do funcionario: \n");
    scanf(" %[^\n]", nome);

    printf("salario: \n");
    scanf("%f", &salario);

    printf("O funcionario %s tem um salario de R$%.4f em Junho.", nome, salario);

    return 0;
}