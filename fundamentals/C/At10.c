#include <stdio.h>

int main () {
    float area, altura, largura, tinta;

    printf("Qual a Largura da parede:");
    scanf("%f", &largura);

    printf("Qual a altura da parede:");
    scanf("%f", &altura);

    area = altura * largura;
    tinta = area / 2;

    printf("A area ser pintada: %.2f\n", area);
    printf("A quantidade de tinta necessaria: %.2f", tinta);

    return 0;

}