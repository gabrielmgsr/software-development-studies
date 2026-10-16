#include <iostream>

int main () {
    int numero, ant, suc;

    std::cout << "Digite um numero: " << std::endl;
    std::cin >> numero;

    ant = numero - 1;
    suc = numero + 1;

    std::cout << "O antecessor de " << numero << " é " << ant << std::endl << "O sucessor de " << numero << " é " << suc;

    return 0;
}