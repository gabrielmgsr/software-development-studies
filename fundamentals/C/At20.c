#include <stdio.h>

int main(){
    int n1;

    printf("Digite um numero para saber se e par ou impar?");
    scanf("%d", &n1);

    if (n1 % 2 == 0){
        printf("Par");
    }
    else {
        printf("Impar");
    }

    return 0;
}