#include <stdio.h>

int main(){
    int idade, total;

    printf("Qual a sua idade?");
    scanf("%d", &idade);

    if (idade >= 18){
        total = idade - 18;
        printf("Voce tem %d idade e ja se passaram %d anos desde o alistamento.", idade, total);
    }
    else{
        total = 18 - idade;
        printf("Voce tem %d idade e faltam %d anos para o alistamento ", idade, total);
    }
    return 0;
}