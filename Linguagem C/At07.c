#include <stdio.h>

int main(){
    float num;

    printf("Digite um numero:");
    scanf("%f", &num);

    printf("O dobro de %.1f e %.1f\n", num, num * 2);
    printf("O terco parte de %.1f e %.5f", num, num/3);

    return 0;
}