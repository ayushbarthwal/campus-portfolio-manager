<?php
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

require_once 'db.php';

$data = json_decode(file_get_contents('php://input'), true);
if (!$data) $data = $_POST;

if (empty($data['email']) || empty($data['password'])) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Email and password required"]);
    exit;
}

$user = $db->users->findOne(['email' => $data['email']]);
if (!$user) {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Invalid credentials"]);
    exit;
}

if (!password_verify($data['password'], $user['password'])) {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Invalid credentials"]);
    exit;
}

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
$_SESSION['userId'] = (string) $user['_id'];
$_SESSION['role'] = $user['role'];

echo json_encode([
    "success" => true,
    "user" => [
        "id" => (string) $user['_id'],
        "name" => $user['name'],
        "email" => $user['email'],
        "role" => $user['role']
    ]
]);
