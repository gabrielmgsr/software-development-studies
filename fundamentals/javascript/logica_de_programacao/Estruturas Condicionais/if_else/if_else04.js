const prompt = require('prompt-sync')();

let usuario = prompt("Qual o seu usuario?")
let chaveMestre = prompt("Você possui a chave mestre?(sim/não)")
let temChaveMestre = (chaveMestre === "sim")

if (usuario === "admin" && temChaveMestre) {
    console.log("Acesso total do sitema");
} else if (usuario === "admin" && !temChaveMestre) {
    console.log("Acesso Administrativo Limitado");
} else if (usuario === "") {
    console.log("POr favor, digite seu usuario");
} else {
    console.log("Acesso de Usuário Comum");
}