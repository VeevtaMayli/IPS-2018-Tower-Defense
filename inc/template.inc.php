<?php

function getView($templateName, $vars) {
    $loader = new Twig_Loader_Filesystem(TEMPLATE_DIR);
    $twig   = new Twig_Environment($loader);
    return $twig->render($templateName, $vars);
}