<?php
require_once("inc/common.inc.php");

$score = $_POST['score'] ?? 0;
$username = getFromSession('username');
recordScore($username, $score);

function recordScore($name, $score)
{
    $userId = getFieldByKnownField($name, 'user_id')[0]['user_id'];
    $query = "INSERT INTO " . RECORD_TABLE . " (user_id, record_date, scores) 
    VALUES ('" . dbQuote($userId) . "', '" . date("Y-m-d") . "', '" . dbQuote($score) .  "');";
    dbQuery($query);
    return dbGetLastInsertId();
}
