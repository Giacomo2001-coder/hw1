<?php 
$host = "localhost";
$user = "root";
$password = "";
$db = "reciptary";
$conn = mysqli_connect($host, $user, $password, $db);
if (mysqli_connect_errno()) {
    echo "Connessione Fallita: " . mysqli_connect_error();
    exit();
  }
?>