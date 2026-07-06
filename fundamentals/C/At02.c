#include <stdio.h>
#include <locale.h>

int main (){
    setlocale(LC_ALL, "Portuguese");

    char nome[50];

    printf("Qual e o seu nome?");
    scanf("%s", nome);
    printf("Ola %s, é um prazer te conhecer!");
    
    return 0;
}