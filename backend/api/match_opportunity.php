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
    echo json_encode(["error" => "Missing id query param"]);
    exit;
}

$userId = $_SESSION['userId'];

$portfolio = $db->portfolios->findOne(['userId' => $userId]);
$studentSkills = [];
if ($portfolio && isset($portfolio['skills'])) {
    $studentSkills = array_map('strtolower', array_map('trim', (array)$portfolio['skills']));
}

try {
    $opportunity = $db->opportunities->findOne(['_id' => new MongoDB\BSON\ObjectId($id)]);
    if (!$opportunity) {
        http_response_code(404);
        echo json_encode(["error" => "Opportunity not found"]);
        exit;
    }
    
    $reqSkills = is_array($opportunity['required_skills']) ? (array)$opportunity['required_skills'] : [];
    
    $matched = [];
    $missing = [];
    $readiness_percent = 100;
    
    if (count($reqSkills) > 0) {
        foreach ($reqSkills as $req) {
            $reqLower = strtolower(trim($req));
            if (in_array($reqLower, $studentSkills)) {
                $matched[] = $req;
            } else {
                $missing[] = $req;
            }
        }
        $readiness_percent = round((count($matched) / count($reqSkills)) * 100);
    }
    
    echo json_encode([
        "success" => true,
        "matched" => $matched,
        "missing" => $missing,
        "readiness_percent" => $readiness_percent
    ]);
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid ID"]);
}
