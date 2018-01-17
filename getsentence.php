<?php
require_once 'settings.php';

function my_filter($var){
    return $var[0] != '#';
}


//read file skipping the comments
$f_contents = array_filter(file($sentences),'my_filter');
//now fix the index 
$f_contents = array_values($f_contents); 
$line = $f_contents[rand(0, count($f_contents) - 1)];
echo $line;
?>
