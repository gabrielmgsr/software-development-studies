#include <stdio.h>

int main (){
    float nota1, nota2;

    printf("nota 1:");
    scanf("%f", &nota1);

    printf("Nota 2:");
    scanf("%f", &nota2);

    printf("A media entre %f e %f e igual a %f", nota1, nota2, (nota1 + nota2 / 2));

    return 0;
}