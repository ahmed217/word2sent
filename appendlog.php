<?php
$logstr = $_POST['logstr']."\r\n";
$logfile =$_POST['logfile'];

file_put_contents($logfile, $logstr, FILE_APPEND);
echo $logstr;
?>
