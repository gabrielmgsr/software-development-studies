#include <stdio.h>

int main(){

    int dias_aluguel, km_aluguel;
    float carro_dia, km_rodou, total_aluguel;

    printf("Quantos dias ficou com o carro?");
    scanf("%d", &dias_aluguel);
    printf("Quantos km rodou?");
    scanf("%d", &km_aluguel);

    // carro_dia = dias_aluguel * 90;
    // km_rodou = km_aluguel * 0.20;
    // total_aluguel = dias_aluguel + km_aluguel;

    total_aluguel = (dias_aluguel * 90) + (km_aluguel * 0.20);
    
    printf("O carro rodou %d dias e %d km.\nTotal entre deu R$%.2f.", dias_aluguel, km_aluguel, total_aluguel);

    return 0;
}