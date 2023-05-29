<?php
require_once "connect.php";

session_start();

if(isset($_SESSION["email"])){
    header("Location: homepage.php");
    exit;
}
if(!empty($_POST['username']) && !empty($_POST["email"]) && !empty($_POST["password"])){
  $email = mysqli_real_escape_string($conn, $_POST['email']); 
  $username = mysqli_real_escape_string($conn, $_POST['username']);
  $query = "SELECT * FROM reciptary WHERE email= '".$email."'";
  $res = mysqli_query($conn, $query) or die("Errore: ".mysqli_error($conn));
  $query2 = "SELECT * FROM reciptary WHERE username='".$username."'";
  $res2 = mysqli_query($conn, $query2) or die("Errore: ".mysqli_error($conn));
  if(mysqli_num_rows($res)>0 && mysqli_num_rows($res2)>0){
   if(mysqli_num_rows($res2) > 0){
    $entry = mysqli_fetch_assoc($res);
    if(password_verify($_POST['password'], $entry['password'])){
      $_SESSION['email'] = $_POST['email'];
      header("Location: homepage.php");
      mysqli_free_result($res);
      mysqli_free_result($res2);
      mysqli_close($conn);
      exit;
    }
    $error = "Password Incorrect";
   }
  }
  $error = "Email or Username not Found";
}else if(isset($_POST['username']) or isset($_POST['password'])){
    $error = "Fill all inputs";
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
  <script src="login.js" defer="true"></script>
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
  
 echo "<div id='error'><h2>".$error."</h2></div>";
}         
?>
 <form name='login_form' method='post' >
    <label><input type='text' placeholder='Username' name='username' <?php if(isset($_POST['username'])) echo "value=".$_POST['username']?> ></label>
    <label><input type='text' placeholder='Email' name='email' <?php if(isset($_POST['email'])) echo "value=".$_POST['email']?>></label>
    <label><input type='password' placeholder='Password' name='password' <?php if(isset($_POST['password'])) echo "value=".$_POST['password']?>></label>
    <label><input type='submit' value="Sign In"></label>
    <label><h2 id="register"><a href="register.php">No profile? Sign up!</a></h2></label>
 </form>
</div>

</article>

</body>

</html>