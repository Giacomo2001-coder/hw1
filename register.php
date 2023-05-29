<?php
require_once 'connect.php';

 session_start();
 //Verifico l'esistenza di una sessione
 if(isset($_SESSION['email'])){
    header('Location: homepage.php');
    exit;
 }

  //Verifica l'esistenza di dati POST
  if (!empty($_POST["username"]) && !empty($_POST["email"]) && !empty($_POST["password"]) && !empty($_POST["confirmPassword"]))
{

  $error = array();
  
  //Verifico se l'username rispetta il pattern stabilito
  $pattern = "/^[A-Za-z][A-Za-z0-9]*([._][A-Za-z0-9]+)?$/";
  if(!preg_match($pattern, $_POST['username'])) {
      $error[] = "Invalid Username";
  } else {
      //Verifico se l'username è già presente nel database

      $username = mysqli_real_escape_string($conn, $_POST['username']);
      $query = "SELECT username FROM reciptary WHERE username = '$username'";
      $res = mysqli_query($conn, $query) or die("Errore: ".mysqli_error($conn));
      if (mysqli_num_rows($res) > 0) {
        $error[] = "This username is already used";
      }
  }
  //Verifico se la password ha più di 8 caratteri
  if (strlen($_POST["password"]) < 8) {
      $error[] = "Insufficient password length";
  } 
  //Verifico se le password compaciano
  if (strcmp($_POST["password"], $_POST["confirmPassword"]) != 0) {
      $error[] = "The passwords aren't the same";
  }
  //Verifico se l'email è valida
  if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
      $error[] = "Invalid email";
  } else {
      $email = mysqli_real_escape_string($conn, strtolower($_POST['email']));
      $res = mysqli_query($conn, "SELECT email FROM reciptary WHERE email = '$email'") or die("Errore: ".mysqli_error($conn));
      if (mysqli_num_rows($res) > 0) {
          $error[] = "This email is already used";
      }
  }
   //Registro nel database
   if (count($error) == 0) {
    $password = mysqli_real_escape_string($conn, $_POST['password']);
   
    $cost = [
        'cost' => 9,
    ];

    $password = password_hash($password, PASSWORD_BCRYPT, $cost);

    $query = "INSERT INTO reciptary(username, email, password) VALUES('$username', '$email', '$password')";
    
    if (mysqli_query($conn, $query)) {
        $_SESSION["email"] = $_POST["email"];
        mysqli_close($conn);
        header("Location: homepage.php");
        exit;
    } else {
        $error[] = "Connection Error";
    } 
}

mysqli_close($conn);
}
elseif (!empty($_POST['username'])){
 $error[] = "Fill all the inputs";
}

?>

<!DOCTYPE html>
<html>
  <head>
  <meta charset="utf-8">
  <title>Recipetary</title>
  <link rel="stylesheet" href="login.css"/>
  <link href="https://fonts.googleapis.com/css2?family=Notable&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
  <script src="register.js" defer="true"></script>
  </head>
<body>
<article>
<div id="title">
<span class="material-symbols-outlined">local_dining</span>
<h1 id="title">Recipetary</h1>
</div>
<div id="flexContainer">
<span class="material-symbols-outlined">account_circle</span>
<?php
if (isset($error)) {
  echo "<div id='error'>";
  foreach($error as $err){
    echo "<h2>".$err."</h2>";
  }
  echo "</div>";
}             
?>
 <form name='register_form' method='post'>
    <label><input type='text' placeholder='Username' name='username' <?php if(isset($_POST['username'])) echo "value=".$_POST['username']?> ></label>
    <label><input type='text' placeholder='Email' name='email' <?php if(isset($_POST['email'])) echo "value=".$_POST['email']?>></label>
    <label><input type='password' placeholder='Password' name='password' <?php if(isset($_POST['password'])) echo "value=".$_POST['password']?>></label>
    <label><input type='password' placeholder='Confirm Password' name='confirmPassword' <?php if(isset($_POST['confirmPassword'])) echo "value=".$_POST['confirmPassword']?>></label>
    <label><input type='submit' value="Sign Up"></label>
    <label><h2 id="register"><a href="login.php">Already a User? Sign In!</a></h2></label>
 </form>
</div>

</article>

</body>

</html>