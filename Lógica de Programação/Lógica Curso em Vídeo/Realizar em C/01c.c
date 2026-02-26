#include <stdio.h>

int main() {
    int nasc, atual, idade;

    printf("Em que ano voce nasceu?");
    scanf("%d", &nasc);
    printf("Em que ano estamos?");
    scanf("%d", &atual);
    idade = atual - nasc;
    printf("Em %d voce tera %d anos", atual, idade);
    if (idade >= 21){
        printf(" E voce ja tera atingido a maioridade.");
    }

    return 0;
}