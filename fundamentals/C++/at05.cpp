#include <iostream>

int main () {
    float n1, n2, total;

    std::cout << "nota 1: " << std::endl;
    std::cin >> n1;
    std::cout << "Nota 2: " << std::endl;
    std::cin >> n2;

    total = ((n1 + n2) / 2);

    std::cout << "A media entre " << n1 << " e " << n2 << " é igual a " << total;
}