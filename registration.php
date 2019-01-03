<?php
require_once('inc/common.inc.php');
header('Content-Type: text/json');

$username = $_POST['login'] ?? '';
$password = $_POST['password'] ?? '';

$existingGamers = getFieldByKnownField($username, 'name');

if (!empty($existingGamers)) {
    echo json_encode(ERR_USER_EXISTS);
    return;
}
$hash = password_hash($password, PASSWORD_DEFAULT);
registerUser($username, $hash);
saveToSession('username', $username);

echo json_encode(['name' => $username], JSON_UNESCAPED_UNICODE);
