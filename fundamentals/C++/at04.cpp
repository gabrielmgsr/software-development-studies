#include <iostream>

int main () {
    int v1, v2, total;

    std::cout << "Digite um valor: " << std::endl;
    std::cin >> v1;
    std::cout << "Digite outro valor: " << std::endl;
    std::cin >> v2;

    total = v1 + v2;

    std::cout << "a soma entre " << v1 << " e " << v2 << " é igual a " << total;
}