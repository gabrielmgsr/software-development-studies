#include <iostream>
#include <string>

int main () {

    std::string nome;

    std::cout << "Qual é o seu nome? " << std::endl;
    std::getline(std::cin, nome);

    std::cout << "Olá " << nome << ", é um prazer te conhecer!";

}