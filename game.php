<?php
require_once("inc/common.inc.php");

$vars = ['gameContainer' => 'game-container'];

echo getView('game.twig', $vars);