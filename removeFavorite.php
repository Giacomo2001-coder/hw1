<?php
require_once "connect.php";

if(!isset($_SESSION['email'])){
    exit;
}

$email = mysqli_real_escape_string($conn, $_SESSION['email']);

if(isset($_POST['id'])){
    $id = mysqli_real_escape_string($conn, $_POST['id']);
  $query = "DELETE FROM favorites WHERE id='$id'";
  if(mysqli_query($conn, $query)){
    echo json_decode(array("verify" => true));
    exit;
  }
}
echo json_decode(array("verify" => false));
mysqli_close($conn);

?>