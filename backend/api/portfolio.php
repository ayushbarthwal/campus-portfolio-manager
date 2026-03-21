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

$userId = $_SESSION['userId'];

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $portfolio = $db->portfolios->findOne(['userId' => $userId]);
    
    if (!$portfolio) {
        $emptyPortfolio = [
            "userId" => $userId,
            "skills" => [],
            "projects" => [],
            "certifications" => []
        ];
        echo json_encode(["success" => true, "portfolio" => $emptyPortfolio]);
        exit;
    }
    
    $portfolio['id'] = (string) $portfolio['_id'];
    unset($portfolio['_id']);
    
    if (isset($portfolio['skills'])) $portfolio['skills'] = (array) $portfolio['skills'];
    if (isset($portfolio['projects'])) $portfolio['projects'] = (array) $portfolio['projects'];
    if (isset($portfolio['certifications'])) $portfolio['certifications'] = (array) $portfolio['certifications'];
    
    // Add user details if requested
    $user = $db->users->findOne(['_id' => new MongoDB\BSON\ObjectId($userId)]);
    if ($user) {
        $portfolio['name'] = $user['name'];
        $portfolio['email'] = $user['email'];
    }
    
    echo json_encode(["success" => true, "portfolio" => $portfolio]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $portfolio = $db->portfolios->findOne(['userId' => $userId]);
    if (!$portfolio) {
        $db->portfolios->insertOne([
            'userId' => $userId,
            'skills' => [],
            'projects' => [],
            'certifications' => []
        ]);
    }
    echo json_encode(["success" => true]);
    exit;
}
