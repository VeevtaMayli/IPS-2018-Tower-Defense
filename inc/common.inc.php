<?php
header('Content-Type: text/html; charset = utf-8');

chdir(dirname(__FILE__));
define('ROOT_DIR', dirname(dirname(__FILE__) . "../"));
define('TEMPLATE_DIR', ROOT_DIR . '/template');

require_once('config.inc.php');
require_once('database.inc.php');
require_once("../vendor/autoload.php");
require_once("template.inc.php");
require_once("error.inc.php");
require_once("user.inc.php");
require_once("session.inc.php");

dbInitialConnect();
startSession();