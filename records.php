<?php
require_once("inc/common.inc.php");

$vars = ['records' => [[
    'position' => 1,
    'username' => 'Defender',
    'date' => '1970-01-01',
    'score' => 12345
]]];

echo getView('records.twig', $vars);