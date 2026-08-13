const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Permite que seu painel frontend converse com este servidor
app.use(express.json());

// SEGREDO: Seus tokens ficam aqui no servidor, protegidos do usuário final
const GLPI_CONFIG = {
    url: 'https://glpi.maracaju.ms.gov.br/apirest.php',
    appToken: 'yNgcl0KBQ5nn4XkubA4x03anhGNYrTnMUNnVBmVY',
    userToken: 'unjb29Hw95wPnCbWvmM2iJMuuZUr1jPZS8Y3f5ym' // Recomenda-se usar variáveis de ambiente (ex: process.env.GLPI_USER_TOKEN)
};

// Rota única no seu backend que o painel vai consultar
app.get('/api/glpi-metrics', async (req, res) => {
    let sessionToken = null;

    try {
        // 1. Iniciar sessão no GLPI
        const initResponse = await fetch(`${GLPI_CONFIG.url}/initSession`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'App-Token': GLPI_CONFIG.appToken,
                'Authorization': `user_token ${GLPI_CONFIG.userToken}`
            }
        });
        const initData = await initResponse.json();
        sessionToken = initData.session_token;

        if (!sessionToken) {
            return res.status(500).json({ error: 'Falha ao autenticar com o GLPI' });
        }

        const headers = { 
            'Session-Token': sessionToken, 
            'App-Token': GLPI_CONFIG.appToken,
            'Content-Type': 'application/json'
        };

        // 2. Buscar métricas em paralelo para maior velocidade
        const today = new Date().toISOString().split('T')[0];
        
        const [resOpenToday, resOpenTotal, resClosedTotal] = await Promise.all([
            fetch(`${GLPI_CONFIG.url}/search/Ticket?criteria[0][field]=15&criteria[0][searchtype]=equals&criteria[0][value]=${today}&is_deleted=0`, { headers }),
            fetch(`${GLPI_CONFIG.url}/search/Ticket?criteria[0][field]=12&criteria[0][searchtype]=equals&criteria[0][value]=notclosed&is_deleted=0`, { headers }),
            fetch(`${GLPI_CONFIG.url}/search/Ticket?criteria[0][field]=12&criteria[0][searchtype]=equals&criteria[0][value]=old&is_deleted=0`, { headers })
        ]);

        const dataOpenToday = await resOpenToday.json();
        const dataOpenTotal = await resOpenTotal.json();
        const dataClosedTotal = await resClosedTotal.json();

        // 3. Encerrar a sessão no GLPI imediatamente após o uso
        await fetch(`${GLPI_CONFIG.url}/killSession`, { headers });

        // 4. Retornar apenas os números limpos para o frontend
        res.json({
            openToday: dataOpenToday.totalcount || 0,
            openTotal: dataOpenTotal.totalcount || 0,
            closedTotal: dataClosedTotal.totalcount || 0
        });

    } catch (error) {
        console.error('Erro na comunicação com o GLPI:', error);
        
        // Tenta matar a sessão caso tenha falhado no meio do caminho
        if (sessionToken) {
            try {
                await fetch(`${GLPI_CONFIG.url}/killSession`, {
                    headers: { 'Session-Token': sessionToken, 'App-Token': GLPI_CONFIG.appToken }
                });
            } catch (e) { /* ignora erro de encerramento */ }
        }

        res.status(500).json({ error: 'Erro interno ao buscar dados do GLPI' });
    }
});

app.listen(3000, () => {
    console.log('Servidor proxy rodando na porta 3000');
});

