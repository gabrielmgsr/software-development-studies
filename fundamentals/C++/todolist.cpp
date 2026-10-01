#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

struct Task {
    std::string description;
    bool completed;
};

class TodoList {
private:
    std::vector<Task> tasks;

public:
    void addTask(const std::string& desc) {
        tasks.push_back({desc, false});
        std::cout << "[+] Tarefa adicionada com sucesso!\n";
    }

    void listTasks() const {
        if (tasks.empty()) {
            std::cout << "\nNenhuma tarefa cadastrada.\n";
            return;
        }

        std::cout << "\n--- LISTA DE TAREFAS ---\n";
        for (size_t i = 0; i < tasks.size(); ++i) {
            std::cout << i + 1 << ". [" << (tasks[i].completed ? "X" : " ") << "] " 
                      << tasks[i].description << "\n";
        }
        std::cout << "------------------------\n";
    }

    void completeTask(size_t index) {
        if (index > 0 && index <= tasks.size()) {
            tasks[index - 1].completed = true;
            std::cout << "[+] Tarefa marcada como concluida!\n";
        } else {
            std::cout << "[-] Indice invalido!\n";
        }
    }

    void deleteTask(size_t index) {
        if (index > 0 && index <= tasks.size()) {
            tasks.erase(tasks.begin() + (index - 1));
            std::cout << "[+] Tarefa removida com sucesso!\n";
        } else {
            std::cout << "[-] Indice invalido!\n";
        }
    }
};

int main() {
    TodoList app;
    int choice = 0;

    do {
        std::cout << "\n=== TO-DO LIST ===\n";
        std::cout << "1. Adicionar Tarefa\n";
        std::cout << "2. Listar Tarefas\n";
        std::cout << "3. Concluir Tarefa\n";
        std::cout << "4. Remover Tarefa\n";
        std::cout << "5. Sair\n";
        std::cout << "Escolha uma opcao: ";
        
        if (!(std::cin >> choice)) {
            std::cin.clear();
            std::cin.ignore(10000, '\n');
            continue;
        }

        std::cin.ignore();

        if (choice == 1) {
            std::string desc;
            std::cout << "Digite a descricao da tarefa: ";
            std::getline(std::cin, desc);
            app.addTask(desc);
        } else if (choice == 2) {
            app.listTasks();
        } else if (choice == 3) {
            app.listTasks();
            size_t idx;
            std::cout << "Digite o numero da tarefa para concluir: ";
            std::cin >> idx;
            app.completeTask(idx);
        } else if (choice == 4) {
            app.listTasks();
            size_t idx;
            std::cout << "Digite o numero da tarefa para remover: ";
            std::cin >> idx;
            app.deleteTask(idx);
        } else if (choice == 5) {
            std::cout << "Saindo...\n";
        } else {
            std::cout << "Opcao invalida!\n";
        }

    } while (choice != 5);

    return 0;
}