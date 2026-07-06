#include <stdio.h>

int main (){
    int num1, num2;

    printf("digite um valor:");
    scanf("%d", &num1);

    printf("Digite outro valor:");
    scanf("%d", &num2);

    printf("A soma entre %d e %d e igual a %d.", num1, num2, num1 + num2);

    return 0;
}