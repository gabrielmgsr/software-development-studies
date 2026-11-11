#include <iostream>

main () {

    double preco_produto, preco_promocional;

    std::cout << "Qual o valor do produto:" << std::endl;
    std::cin >> preco_produto;

    preco_promocional = (preco_produto - (preco_produto * 0.05));

    std::cout << "O preco promocional e:" << preco_promocional;
}