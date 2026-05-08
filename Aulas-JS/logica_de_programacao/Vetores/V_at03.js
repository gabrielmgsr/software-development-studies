// Enunciado: Crie um vetor com os valores [10, 20, 30]. Utilize o método forEach para:
// Exibir cada preço individualmente no console com a mensagem "O preço é R$ ...".
// Somar todos esses valores em uma variável total e exibir o resultado final da compra.

let precos = [10, 20, 30];
let total = 0;
precos.forEach(preco => {
    console.log("O preço é R$ " + preco);
    total = total + preco;
});
console.log("O valor total da compra é: R$" + total);