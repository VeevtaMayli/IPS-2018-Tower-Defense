<?php
require_once('inc/common.inc.php');
header("Content-Type: application/json");

$name = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

$isChanged = false;

$currentName = getFromSession('username');


if (($currentName === $name) && ($password === '')) {
    return;
}

if ($currentName !== $name) {
    changeName($currentName, $name);
    saveToSession('username', $name);
    $isChanged = true;
}

if ($password !== '') {

    $hash = password_hash($password, PASSWORD_DEFAULT);
    changePassword($name, $hash);
    $isChanged = true;
}

if ($isChanged) {
    echo json_encode(ERR_NONE);
    exit();
}
