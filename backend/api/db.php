<?php

$autoloadPath = __DIR__ . '/../vendor/autoload.php';
if (file_exists($autoloadPath)) {
    require_once $autoloadPath;
} else {
    http_response_code(500);
    echo json_encode(["error" => "Composer dependencies not installed. Please run 'composer require mongodb/mongodb' in the backend folder."]);
    exit;
}

$client = new MongoDB\Client("mongodb://localhost:27017");
$db = $client->smartcampus;
