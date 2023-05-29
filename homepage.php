<?php
session_start();

if(!isset($_SESSION['email'])){
  header('Location: login.php');
  exit;
}

?>

<!DOCTYPE html>
<html>
 <head>
    <meta charset="utf-8">
    <title>Recipetary</title>
    <link rel="stylesheet" href="homepage.css"/>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
    <link href="https://fonts.googleapis.com/css2?family=Notable&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="script.js" defer="true"></script>
 </head>
<body>
 <article>
  <header>
  <nav class="navbar">
    <div class="logo">
      <span class="material-symbols-outlined">local_dining</span>
      <p>Recipetary!</p>
    </div>
    <ul class="nav-links">
      <div class="menu">
        <li>
          <select id="SearchValue">
             <option value="dishes" selected>Dishes</option>
             <option value="cocktails">Cocktails</option>
          </select>
        </li>
        <li id="dishesOptions">
          <select id="CousineValue">
            <option value="italian">Italian</option>
            <option value="french">French</option>
            <option value="japanese" >Japanese</option>
            <option value="indian" >Indian</option>
            <option value="" selected>Global</option>
          </select>
        </li>
          <form>
           <input id="ricetta"  type="text" placeholder="Search a Food recipe">
           <input type="submit" id="submit" value="Search">
          </form>
        <li>
        <div class="dropdown">
         <button class="dropbtn"><span class="material-symbols-outlined">account_circle</span></button>
         <div class="dropdown-content">
          <a href="profile.php">Favorites Recipes</a>
          <a href="logout.php">Logout</a>
         </div>
        </div>
        </li>
      </div>   
    </ul>
   </nav>
  </header>
  <section id="FlexContainer">
   <div class="FlexItem">
    <h1>About Us</h1>
    <img src="images/recipeAboutUs.jpg">
    <p>Welcome to our food recipe website! We are a team of passionate food enthusiasts who love exploring new flavors, 
      experimenting with different ingredients, and sharing our culinary knowledge with the world. Our goal is to provide
      you with a wide range of delicious and diverse recipes that cater to all types of tastes and preferences. 
      From comfort food classics to exotic international dishes, we believe that food is an art form that should be celebrated and enjoyed by everyone.
      At our core, we are committed to using fresh, high-quality ingredients and promoting sustainable and ethical food practices.
      We believe that cooking at home is not only healthier and more cost-effective than eating out, but it also allows you to have 
      complete control over the ingredients you use and the flavors you create. Whether you're a novice cook or a seasoned pro, 
      our user-friendly interface and step-by-step instructions make it easy for you to whip up a tasty meal in no time. 
      Join us on our culinary journey and discover the joy of cooking from scratch!</p>
   </div>
   <div class="FlexItem">
    <h1>Instructions: </h1>
    <div class="imgText">
    <img src="images/1.png">
    <p>Use the search bar to search for recipes. There are two options: Food recipes and Cocktail recipes</p>
    <img src="images/2.png">
    <p>It will give you the best result, but you can still select other results on the "Other recipes" container, where images of them will be shown</p>
   </div>
  </div>
  </section>
  <section id="FlexResultContainer" class="hidden">
    <div class="FlexItem">
    </div>
  </section> 
  <footer>
    <div id="footer">
    <p> Autore: <a href="https://t.me/thejokercard01">Giacomo Ciaramella</a></p>
    <p>Email: <a href="#">ciaramella_giacomo@libero.it</a></p>
  </div>
  </footer>

 </article>
</body>
</html>
