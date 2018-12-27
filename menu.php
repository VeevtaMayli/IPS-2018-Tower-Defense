<?php
require_once("inc/common.inc.php");

$vars = ['username' => '$username'];

echo getView('menu.twig', $vars);