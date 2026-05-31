function calcularIdade(){
    const dataNascimento = document.getElementById('dataNascimento').value;

    if(!dataNascimento) {
        alert("Selecione a data de nascimento");
        return;
    }

    const nascimento = new Date(dataNascimento);
    const hoje = new Date;

    let idade = hoje.getFullYear() - nascimento.getFullYear();

    const mesAtual = hoje.getMonth();
    const nascMes = nascimento.getMonth();

    if (
        mesAtual < nascMes ||
        (mesAtual === nascMes &&
            hoje.getDate() < nascimento.getDate()
        )
    ) {
        idade--;
    }

    document.getElementById('resultado').textContent = `Você tem ${idade} anos.`;
}