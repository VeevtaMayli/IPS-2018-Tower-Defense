<?php
require_once("inc/common.inc.php");

$vars = getTopDefenders();

echo getView('records.twig', $vars);