#include <iostream>

int main () {
    float numero, dobro, terca;

    std::cout << "Digite um numero: " << std::endl;
    std::cin >> numero;

    dobro = numero * 2;
    terca = numero / 3;

    std::cout << "O dobro de " << numero << " e " << dobro << std::endl << "A terca parte de " << numero << " e " << terca << std::endl; 

    return 0;
}