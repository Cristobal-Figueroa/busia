<?php
// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

// Verificar si es una solicitud OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// URL del archivo de datos GPS
$url = 'https://govia.cl/busIA/gps_data.txt';

// Obtener el contenido del archivo
$content = file_get_contents($url);

// Verificar si se pudo obtener el contenido
if ($content === false) {
    http_response_code(500);
    echo json_encode(['error' => 'No se pudo obtener los datos del GPS']);
    exit;
}

// Establecer el tipo de contenido como texto plano
header('Content-Type: text/plain');

// Devolver el contenido
echo $content;
?>
