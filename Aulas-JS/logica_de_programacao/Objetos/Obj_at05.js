let usuarios = [
    {nome: "Marcos", email: "nome@gmail.com"},
    {nome: "Admin", email: "admin@gmail.com"}
]
let admin_usuarios = usuarios.filter(usuario => usuario.nome === "Admin");
console.log(admin_usuarios);