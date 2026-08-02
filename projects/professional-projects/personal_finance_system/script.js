// SIDEBAR

const botao = document.querySelector(".menu-button");
const sidebar = document.querySelector(".sidebar");

botao.addEventListener("click", () => {
    sidebar.classList.toggle("fechada");

})