#include <stdio.h>
#include <math.h>

int main () {
    float delta, a, b, c;
    // double b;

    printf("Digite o valor para A:");
    scanf("%f", &a);
    printf("Digite o valor para B:");
    scanf("%f", &b);
    printf("Digite o valor para C:");
    scanf("%f", &c);

    // delta = pow(b, 2) - (4 * a * c);
    delta = (b * b) - (4 * a * c);
    printf("Valor de Delta: %f", delta);


    return 0;
}