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

if (empty($data['name']) || empty($data['email']) || empty($data['password']) || empty($data['role'])) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "All fields are required"]);
    exit;
}

$allowed_roles = ['student', 'faculty', 'admin'];
if (!in_array($data['role'], $allowed_roles)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid role"]);
    exit;
}

$existingUser = $db->users->findOne(['email' => $data['email']]);
if ($existingUser) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Email already exists"]);
    exit;
}

$hashedPassword = password_hash($data['password'], PASSWORD_BCRYPT);

$db->users->insertOne([
    'name' => $data['name'],
    'email' => $data['email'],
    'password' => $hashedPassword,
    'role' => $data['role'],
    'createdAt' => new MongoDB\BSON\UTCDateTime()
]);

echo json_encode(["success" => true, "message" => "Registered successfully"]);
