<?php
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

require_once 'auth_check.php';
require_once 'db.php';

$data = json_decode(file_get_contents('php://input'), true);
if (!$data)
    $data = $_POST;

if (!isset($data['skills']) || !is_array($data['skills'])) {
    http_response_code(400);
    echo json_encode(["error" => "Skills array missing"]);
    exit;
}

$userId = $_SESSION['userId'];

$portfolio = $db->portfolios->findOne(['userId' => $userId]);
if (!$portfolio) {
    $db->portfolios->insertOne([
        'userId' => $userId,
        'skills' => [],
        'projects' => [],
        'certifications' => []
    ]);
}

try {
    $db->portfolios->updateOne(
        ['userId' => $userId],
        ['$set' => ['skills' => array_values($data['skills'])]]
    );
    echo json_encode(["success" => true]);
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(["error" => "Update failed"]);
}
