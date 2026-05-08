let estoque = ["Teclado", "Mouse", "Monitor", "Fone"];
console.log(estoque.includes("Monitor"));


let precos = [10, 15, 70, 125, 9, 49];
let promocao = precos.filter(precos => precos < 50);
console.log(promocao);


let precos = [10, 20, 30];
let total = 0;
precos.forEach(preco => {
    console.log("O preço é R$ " + preco);
    total = total + preco;
});
console.log("O valor total da compra é: R$" + total);


let notas = [7, 5, 9, 4];
let notasAltas = notas.filter(notas => notas >= 7);
console.log(notasAltas);

let notas = [7, 5, 9, 4];
let soma = 0;
notas.forEach(nota => {
    soma = soma + nota;
});
console.log("A soma total das notas é: " + soma);