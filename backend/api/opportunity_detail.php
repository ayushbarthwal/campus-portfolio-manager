<?php
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

require_once 'auth_check.php';
require_once 'db.php';

$id = $_GET['id'] ?? '';
if (!$id) {
    http_response_code(400);
    echo json_encode(["error" => "Missing id"]);
    exit;
}

try {
    $doc = $db->opportunities->findOne(['_id' => new MongoDB\BSON\ObjectId($id)]);
    if (!$doc) {
        http_response_code(404);
        echo json_encode(["error" => "Not found"]);
        exit;
    }
    
    $doc['id'] = (string) $doc['_id'];
    unset($doc['_id']);
    
    if (isset($doc['required_skills']) && is_array($doc['required_skills'])) {
        $doc['required_skills'] = implode(',', (array)$doc['required_skills']);
    }
    
    echo json_encode(["success" => true, "opportunity" => $doc]);
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid ID"]);
}
