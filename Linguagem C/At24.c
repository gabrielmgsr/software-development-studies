#include <stdio.h>

int main(){
    int km;
    float km_percorreu;

    printf("Quantos KM percorreu?");
    scanf("%d", &km);

    if(km <= 200){
        km_percorreu = km * 0.50;
    }
    else{
        km_percorreu = km * 0.45;
    }

    printf("Voce percorreu %d e no total para eh %.2f", km, km_percorreu);

    return 0;
}