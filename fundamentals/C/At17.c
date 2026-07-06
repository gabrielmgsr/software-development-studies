#include <stdio.h>

int main(){
    int velo_radar;
    float total;

    printf("Qual velocidade que passou no radar?");
    scanf("%d", &velo_radar);

    if (velo_radar > 80){
        total = (velo_radar - 80) * 5;
        printf("Voce ultrapassou o limite da via. O valor de R$%.2f", total);
    }
    else{
        printf("Não foi multado");
    }
    return 0;
}