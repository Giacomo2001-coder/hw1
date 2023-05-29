<?php
   require_once "connect.php";

   if(!isset($_SESSION['email'])){
    exit;
   }
   header('Content-Type: application/json');

   $email = mysqli_real_escape_string($conn, $_SESSION['email']);
   
   $query = "SELECT * from favorites WHERE email='$email'";
   $res = mysqli_query($conn, $query) or die("Errore:".mysqli_error());

   $itemsList = array();
   while($entry = mysqli_fetch_assoc($res)){
    $itemsList[] = array('recipe' => json_decode($entry['content']));
   }
   echo json_encode($itemsList);
   exit;
?>
