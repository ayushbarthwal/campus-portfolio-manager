<?php
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

require_once 'auth_check.php';
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $cursor = $db->opportunities->find();
    $opportunities = [];
    foreach ($cursor as $doc) {
        $doc['id'] = (string) $doc['_id'];
        if (isset($doc['required_skills']) && is_array($doc['required_skills']) && !is_object($doc['required_skills'])) {
           $doc['required_skills'] = implode(',', (array)$doc['required_skills']);
        }
        unset($doc['_id']);
        $opportunities[] = $doc;
    }
    echo json_encode(["success" => true, "opportunities" => $opportunities]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($_SESSION['role'] === 'student') {
        http_response_code(403);
        echo json_encode(["error" => "Forbidden"]);
        exit;
    }

    $data = json_decode(file_get_contents('php://input'), true);
    if (!$data) $data = $_POST;

    $skills_array = [];
    if (!empty($data['required_skills'])) {
        $skills_array = array_values(array_filter(array_map('trim', explode(',', $data['required_skills']))));
    }

    $db->opportunities->insertOne([
        'title' => $data['title'] ?? '',
        'type' => $data['type'] ?? '',
        'deadline' => $data['deadline'] ?? '',
        'description' => $data['description'] ?? '',
        'required_skills' => $skills_array,
        'postedBy' => $_SESSION['userId'],
        'createdAt' => new MongoDB\BSON\UTCDateTime()
    ]);

    echo json_encode(["success" => true]);
    exit;
}
