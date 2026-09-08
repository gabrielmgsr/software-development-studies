// SIDEBAR

const botao = document.querySelector(".menu-button");
const sidebar = document.querySelector(".sidebar");

botao.addEventListener("click", () => {
    sidebar.classList.toggle("fechada");

})

const inputMes = document.getElementById('seletor-mes');
const titulo = document.getElementById('titulo-financeiro');
const tituloBase = "Visão Geral Financeira";

inputMes.addEventListener('change', (e) => {
    const val = e.target.value;

    if (val) {
        const data = new Date(`${val}-02T00:00:00`);

        const nomeMes = data.toLocaleDateString('pt-BR', { month: 'long'});

        const Mesformatado = nomeMes.charAt(0).toUpperCase() + nomeMes.slice(1);
        titulo.textContent = `${tituloBase} - ${Mesformatado}`;
    } else {
        titulo.textContent = tituloBase;
    }
})