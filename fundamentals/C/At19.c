#include <stdio.h>

int main(){
    float n1, n2, media;

    printf("Qual a primeira nota?");
    scanf("%f", &n1);
    printf("Qual a segunda nota?");
    scanf("%f", &n2);
    media = (n1 + n2) / 2;

    if (media >= 7){
        printf("Aprovado");
    }
    else{
        printf("Reprovado");
    }

    return 0;
}