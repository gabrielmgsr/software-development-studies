#include <stdio.h>

int main (){
    double salario, salario_aumento;

    printf("Qual o seu salario?");
    scanf("%lf", &salario);

    salario_aumento = salario + (salario * 0.15);
    printf("O salario atual e %.2lf e com o aumento de 15 porcento , fica R$%.2lf!", salario, salario_aumento);

    return 0;
}