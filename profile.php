<?php
require_once "connect.php";

session_start();

if(!isset($_SESSION['email'])){
    header("Location: index.php");
    exit;
}
$query = "SELECT username FROM reciptary WHERE email='".$_SESSION['email']."'";
$res = mysqli_query($conn, $query) or die("Errore: ".mysqli_error());
$username = mysqli_fetch_assoc($res)['username'];
?>

<!DOCTYPE html>
<html>
  <head>
  <meta charset="utf-8">
  <title>Recipetary</title>
  <link rel="stylesheet" href="profile.css"/>
  <link href="https://fonts.googleapis.com/css2?family=Notable&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
  <script src="profile.js" defer="true"></script>
  </head>
<body>
<article>
<header>
  <nav class="navbar">
    <div class="logo">
      <span class="material-symbols-outlined">local_dining</span></i>
      <p>Recipetary!</p>
    </div>
    <ul class="nav-links">
      <div class="menu">
        <li><a href="homepage.php">Welcome <?php echo $username ?></a></li>
        <li id="active"><a href="logout.php">Log Out</a></li>
      </div>
    </ul>
   </nav>
</header>
<section id="FlexContainer">
 <div id="FlexHorizzontalContainer">
</div>
</section>
</article>

</body>

</html>