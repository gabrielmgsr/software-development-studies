#include <stdio.h>

int main(){
    int ano_nascimento;

    printf("Em qaul ano voce nasceu?");
    scanf("%d", &ano_nascimento);

    if (ano_nascimento >= 18){
        printf("Pode votar!");
    }
    else{
        printf("Nao pode votar");
    }
    
    return 0;
}