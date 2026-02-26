#include <stdio.h>

int main (){
    float p, a, imc;

    printf("Digite seu peso: ");
    scanf("%f", &p);
    printf("Digite seu altura: ");
    scanf("%f", &a);
    imc = p / (a * a);
    if (imc < 18.5){
        printf("ABAIXO DO PESO!");
    }
    else if (imc >= 18.5 && imc < 25){
        printf("PESO NORMAL!");
    }
    else if (imc >= 25 && imc < 30){
        printf("SOBREPESO!");
    }
    else if (imc >= 30 && imc < 35){
        printf("OBESIDADE GRAU 1");
    }
    else if (imc >= 35 && imc < 40 ){
        printf("OBESIDADE GRAU 2");
    }
    else {
        printf("OBESIDADE GRAU 3");
    }

    return 0;

}