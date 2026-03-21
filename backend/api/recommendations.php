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

$userId = $_SESSION['userId'];

$portfolio = $db->portfolios->findOne(['userId' => $userId]);
$studentSkills = [];
if ($portfolio && isset($portfolio['skills'])) {
    $studentSkills = array_map('strtolower', array_map('trim', (array) $portfolio['skills']));
}

$cursor = $db->opportunities->find();
$recommendations = [];

foreach ($cursor as $doc) {
    $doc['id'] = (string) $doc['_id'];
    unset($doc['_id']);

    $reqSkills = is_array($doc['required_skills']) ? (array) $doc['required_skills'] : [];

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

    $doc['readiness_percent'] = $readiness_percent;
    $recommendations[] = $doc;
}

usort($recommendations, function ($a, $b) {
    return $b['readiness_percent'] <=> $a['readiness_percent'];
});

echo json_encode(["success" => true, "recommendations" => $recommendations]);
