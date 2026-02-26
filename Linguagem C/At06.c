#include <stdio.h>

int main (){
    int num;

    printf("Digite um numero:");
    scanf("%d", &num);

    printf("O antecessor de %d e %d\n", num, num - 1);
    printf("O sucessor de %d e %d",num, num + 1);

    return 0;
}