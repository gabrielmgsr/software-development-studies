<?php
// Permitir requisições do seu frontend (CORS)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Configurações da API do GLPI[cite: 8]
$glpi_config = [
    'url'       => 'https://glpi.maracaju.ms.gov.br/apirest.php',
    'appToken'  => 'BZlHMjHLKnT1NPIkmWPzn3v5OPIfiKp5CeypYliH',
    'userToken' => 'unjb29Hw95wPnCbWvmM2iJMuuZUr1jPZS8Y3f5ym' // Mantenha seguro no backend
];

$session_token = null;

try {
    // 1. Iniciar sessão no GLPI[cite: 8]
    $init_ch = curl_init("{$glpi_config['url']}/initSession");
    curl_setopt($init_ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($init_ch, CURLOPT_SSL_VERIFYPEER, false); // Ajuste se necessário para produção
    curl_setopt($init_ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'App-Token: ' . $glpi_config['appToken'],
        'Authorization: user_token ' . $glpi_config['userToken']
    ]);

    $init_response = curl_exec($init_ch);
    $http_code = curl_getinfo($init_ch, CURLINFO_HTTP_CODE);
    curl_close($init_ch);

    if ($http_code !== 200) {
        throw new Exception('Falha ao conectar com a API do GLPI');
    }

    $init_data = json_decode($init_response, true);
    $session_token = $init_data['session_token'] ?? null;

    if (!$session_token) {
        echo json_encode(['error' => 'Falha ao autenticar com o GLPI']);
        exit;
    }

    $headers = [
        'Content-Type: application/json',
        'Session-Token: ' . $session_token,
        'App-Token: ' . $glpi_config['appToken']
    ];

    $today = date('Y-m-d');

    // Função auxiliar para requisições GET paralelas/simultâneas usando cURL Multi ou chamadas sequenciais seguras
    function fetchGlpiSearch($url, $headers) {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        $response = curl_exec($ch);
        curl_close($ch);
        return json_decode($response, true);
    }

    // 2. Buscar métricas (Chamados abertos hoje, total em aberto e fechados)[cite: 8]
    $urlOpenToday  = "{$glpi_config['url']}/search/Ticket?criteria[0][field]=15&criteria[0][searchtype]=equals&criteria[0][value]={$today}&is_deleted=0";
    $urlOpenTotal  = "{$glpi_config['url']}/search/Ticket?criteria[0][field]=12&criteria[0][searchtype]=equals&criteria[0][value]=notclosed&is_deleted=0";
    $urlClosedTotal= "{$glpi_config['url']}/search/Ticket?criteria[0][field]=12&criteria[0][searchtype]=equals&criteria[0][value]=old&is_deleted=0";

    $dataOpenToday   = fetchGlpiSearch($urlOpenToday, $headers);
    $dataOpenTotal   = fetchGlpiSearch($urlOpenTotal, $headers);
    $dataClosedTotal = fetchGlpiSearch($urlClosedTotal, $headers);

    // 3. Encerrar a sessão no GLPI imediatamente[cite: 8]
    $kill_ch = curl_init("{$glpi_config['url']}/killSession");
    curl_setopt($kill_ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($kill_ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($kill_ch, CURLOPT_HTTPHEADER, $headers);
    curl_exec($kill_ch);
    curl_close($kill_ch);

    // 4. Retornar os dados limpos em JSON para o seu frontend[cite: 8]
    echo json_encode([
        'openToday'   => $dataOpenToday['totalcount'] ?? 0,
        'openTotal'   => $dataOpenTotal['totalcount'] ?? 0,
        'closedTotal' => $dataClosedTotal['totalcount'] ?? 0
    ]);

} catch (Exception $error) {
    // Tenta matar a sessão caso ocorra erro no meio do processo
    if ($session_token) {
        $kill_ch = curl_init("{$glpi_config['url']}/killSession");
        curl_setopt($kill_ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($kill_ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($kill_ch, CURLOPT_HTTPHEADER, [
            'Session-Token: ' . $session_token,
            'App-Token: ' . $glpi_config['appToken']
        ]);
        curl_exec($kill_ch);
        curl_close($kill_ch);
    }

    http_response_code(500);
    echo json_encode(['error' => $error->getMessage()]);
}
?>