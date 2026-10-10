#include <iostream>

int main () {
    float dolares, reais;

    std::cout << "Quantos reais voce tem na carteira?" << std::endl;
    std::cin >> reais;

    dolares = reais / 3.45;

    std::cout << "Fazendo a conversao de R$" << reais << " para dolares fica U$" << dolares << std::endl;

    return 0;

}