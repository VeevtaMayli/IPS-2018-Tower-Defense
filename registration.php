<?php
require_once('inc/common.inc.php');
header('Content-Type: text/json');

$username = $_POST['login'] ?? '';
$password = $_POST['password'] ?? '';

$existingGamers = getInfoByName($username);

if (!empty($existingGamers)) {
    echo json_encode(ERR_USER_EXISTS);
    return;
}
$hash = password_hash($password, PASSWORD_DEFAULT);
registerUser($username, $hash);

echo json_encode(['name' => $username], JSON_UNESCAPED_UNICODE);

//echo json_encode(['success' => 1]);

//echo 2;






