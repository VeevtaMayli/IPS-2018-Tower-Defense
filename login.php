<?php
require_once('inc/common.inc.php');
header("Content-Type: application/json");

$username = $_POST['login'] ?? '';
$password = $_POST['password'] ?? '';

if (empty($username) || empty($password)) {
    echo json_encode(ERR_NO_PARAM);
    return;
}

$existingGamers = getFieldByKnownField($username, 'name');

if (empty($existingGamers)) {
    echo json_encode(ERR_USER_NOT_EXISTS);
    return;
}

if (checkPassword($username, $password)) {
    saveToSession('username', $username);
    echo json_encode(ERR_NONE);
    exit();
} else {
    echo json_encode(ERR_INCORRECT_PASS);
}