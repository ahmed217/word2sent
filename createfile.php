<?php
require_once 'settings.php';

$age = $_POST['age'];
$edu = $_POST['edu'];
$lan = $_POST['lan'];

$age = sprintf('%02s',$age);
$logfilename = time().'_'.$age.'_'.$edu.'_'.$lan.'.txt';
$file = $logdir.$logfilename;
if (!is_file($file))
	$fh = fopen($file, 'w') or die("Can't create file");
echo $file;
?>
