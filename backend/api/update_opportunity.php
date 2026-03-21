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

if ($_SESSION['role'] === 'student') {
    http_response_code(403);
    echo json_encode(["error" => "Forbidden"]);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
if (!$data) $data = $_POST;

if (empty($data['id'])) {
    http_response_code(400);
    echo json_encode(["error" => "Missing id"]);
    exit;
}

$updateFields = [];
$allowedFields = ['title', 'type', 'deadline', 'description'];
foreach ($allowedFields as $field) {
    if (isset($data[$field])) {
        $updateFields[$field] = $data[$field];
    }
}

if (isset($data['required_skills'])) {
    $skills_array = array_values(array_filter(array_map('trim', explode(',', $data['required_skills']))));
    $updateFields['required_skills'] = $skills_array;
}

if (!empty($updateFields)) {
    try {
        $db->opportunities->updateOne(
            ['_id' => new MongoDB\BSON\ObjectId($data['id'])],
            ['$set' => $updateFields]
        );
        echo json_encode(["success" => true]);
    } catch (Exception $e) {
        http_response_code(400);
        echo json_encode(["error" => "Update failed"]);
    }
} else {
    echo json_encode(["success" => true]);
}
