#include <iostream>

int main () {
    float area, largura, altura, litrosDeTintas;

    std::cout << "Qual a largura da sua parede?" << std::endl;
    std::cin >> largura;

    std::cout << "Qual a altura da sua parede?" << std::endl;
    std::cin >> altura;

    area = largura * altura;

    litrosDeTintas = area / 2;

    std::cout << "A area para ser pintada no seu quarto e de " << area << " e como cada litro de tinta pinta 2 metros quadrados, entao precisara de " << litrosDeTintas << " litros de tinta" << std::endl;

    return 0;
}