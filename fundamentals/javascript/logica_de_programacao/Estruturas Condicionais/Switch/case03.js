const avioes = [
    { voo: "AZ-102", combustivelMinutos: 45, tipo: "Comercial" },
    { voo: "EMERG-911", combustivelMinutos: 120, tipo: "Emergencia" }, // Prioridade máxima por tipo!
    { voo: "PT-BRY", combustivelMinutos: 15, tipo: "Particular" },    // Crítico por combustível!
    { voo: "AF-447", combustivelMinutos: 80, tipo: "Carga" },
    { voo: "VIP-001", combustivelMinutos: 50, tipo: "Presidencial" }  // Tipo especial!
];

avioes.forEach(avioes => {
    let status = ""
    
    switch (true) {
    case (avioes.tipo == "Emergencia" || avioes.combustivelMinutos <= 20):
        status = "POUSO IMEDIATO - PISTA EXCLUSIVA"
    break;
    case (avioes.tipo == "Presidencial" || avioes.tipo == "Militar"):
        status = "Prioridade VIP - Aguardar liberação rápida"
    break;
    case (avioes.combustivelMinutos <= 50):
        status = "Alerta - Entrar em rota de aproximação"
    break;
    default:
        status = "Normal - Manter órbita de espera"
    break;
}

console.log(`Voo: ${avioes.voo} | Status: ${status}`);
})
