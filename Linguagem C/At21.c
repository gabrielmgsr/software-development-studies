#include <stdio.h>

int main(){
    int n;

    printf("Digite um numero?");
    scanf("%d", &n);

    if (n % 4 == 0)
    {
        printf("Bissexto");
    }
    else{
        printf("Nao");
    }
    return 0;
}