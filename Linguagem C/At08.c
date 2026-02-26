#include <stdio.h>

int main () {
    float metros;

    printf("Digite uma distancia em metros:");
    scanf("%f", &metros);
    printf("A distancia de %fm corresponde a:\n");
    printf("%.5fKm\t %4.1fdm \n%.4fHm\t %5.1fcm \n%2.3fDam\t %5.1fmm", (metros / 1000), (metros * 10), (metros / 100), (metros * 100), (metros /10), (metros * 1000));

    return 0;
}