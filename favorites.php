<?php
require_once "connect.php";

session_start();

if(!isset($_SESSION['email'])){
    exit;
}
$email = $_SESSION['email'];
$id = mysqli_real_escape_string($conn, $_POST['id']);
$title = mysqli_real_escape_string($conn, $_POST['name']);
$img = mysqli_real_escape_string($conn, $_POST['img']);
$type = mysqli_real_escape_string($conn, $_POST['type']);

if(!empty($id) && !empty($title) && !empty($img) && !empty($type))
add_to_favorites();
header('Content-Type: application/json');
function add_to_favorites(){
    global $conn;
    if(isAlreadySaved()){
        echo json_encode(array('verify' => true));
        exit;
    }
    if(add()){
        echo json_encode(array('verify' => true));
        exit;
    }

    mysqli_close($conn);
    echo json_encode(array('verify' => false));

    
}

function isAlreadySaved(){
    global $conn, $email, $id, $type;
    $query = "SELECT * FROM favorites WHERE email='$email' AND id='$id' AND type='$type'";
    $res = mysqli_query($conn, $query) or die("Errore: ".mysqli_error());
    if(mysqli_num_rows($res) > 0){
        return true;
    }

}


function add(){
    global $conn, $email, $id, $title, $img, $type;
    $query = "INSERT INTO favorites(id,email,title,img,type, recipe) VALUES ('$id', '$email', '$title', '$img', '$type', JSON_OBJECT('id', '$id', 'email', '$email', 'title', '$title', 'img', '$img', 'type', '$type'))";
    if(mysqli_query($conn, $query) or die("Errore: ".mysqli_error())){
        return true;
    }
    return false;
}
?>