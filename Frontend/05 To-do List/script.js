function adicionar() {
    let input = document.getElementById("tarefa");
    let lista = document.getElementById("lista");
    

    let li = document.createElement("li");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    
    let texto = document.createElement("span");
    texto.textContent = input.value;

    let botao = document.createElement("button");
    botao.textContent = "X";

    botao.onclick = function(){
        li.remove();
    }
    checkbox.onclick = function(){
    if (checkbox.checked){
        texto.style.textDecoration = "line-through";
    } else{
        texto.style.textDecoration = "none";
    }
    }
    li.appendChild(checkbox);
    li.appendChild(texto);
    li.appendChild(botao);

    lista.appendChild(li);

    input.value = "";
}