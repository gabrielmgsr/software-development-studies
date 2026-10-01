#include <string>
#include <iostream>

int main () {
    std::string nome;
    float salario;

    std::cout << "Nome do Funcionário: " << std::endl;
    std::getline(std::cin, nome);
    std::cout << "Salário: " << std::endl;
    std::cin >> salario;

    std::cout << "O funcionário " << nome << " tem um salario de R$" << salario << " em Junho";
}