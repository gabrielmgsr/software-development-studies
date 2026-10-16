#include <iostream>


int main() {

    double a, b, c;
    std::cout << "Digite os valores de a, b, e c: ";
    std::cin >> a >> b >> c;

    double delta = (b * b) - (4 * a * c);

    std::cout << "O valor de delta eh: " << delta << std::endl;

    return 0;
}