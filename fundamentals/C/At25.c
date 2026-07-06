#include <stdio.h>

int main(){
    int a, b, c;

    printf("Qual o valor do lado 1?");
    scanf("%d", &a);
    printf("Qual o valor do lado 2?");
    scanf("%d", &b);
    printf("Qual o valor do lado 3?");
    scanf("%d", &c);

    if ((a < b + c) && (b < a + c) && (c < a + b)){
        printf("Forma um triangulo!");
    }
    else{
        printf("Nao forma triangulo!");
    }
    return 0;
}