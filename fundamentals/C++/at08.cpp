#include <iostream>
#include <iomanip>

int main() {
    float m, km, hm, dam, dm, cm, mm;

    std::cout << "Digite uma distancia em metros:" << std::endl;
    std::cin >> m;

    km = m / 1000;
    hm = m / 100;
    dam = m / 10;
    dm = m * 10;
    cm = m * 100;
    mm = m * 1000;

    std::cout << "A distancia de " << m << " Corresponde a: " << std::endl;
    std::cout << std::left << std::setw(30) << (std::to_string(km) + "km") << (std::to_string(dm) + "dm") << std::endl; 
    std::cout << std::left << std::setw(30) << (std::to_string(hm) + "hm") << (std::to_string(cm) + "cm") << std::endl; 
    std::cout << std::left << std::setw(30) << (std::to_string(dam) + "dam") << (std::to_string(mm) + "mm") << std::endl; 

    return 0;

}