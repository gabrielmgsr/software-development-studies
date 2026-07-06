let salario = [
    {nome: "Marcos", salario: 2000},
    {nome: "Gabriel", salario: 4000},
    {nome: "Lucas", salario: 2000},
    {nome: "Italo", salario: 2000}
]
let salarioTotal = 0;

salario.forEach(salario =>{
    salarioTotal = salario.salario + salarioTotal;
});

console.log(`O salario total que irei gastar para pagar todos os funcionarios será de R$${salarioTotal}.`);