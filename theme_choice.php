<?php
session_start();
if (!isset($_SESSION['players'])) {
    header('Location: player_count.php');
    exit;
}

require('./assets/bdd/local.php');
include('./assets/php/functions.php'); 
echo head('TITRE'); 

$player_names = sessionPlayers();
// var_dump($player_names);

?>

<body class="tc">
<div id="bubble-container"></div>
    <h1>Choix du theme</h1>
    <form action="pregame.php" method="get" class="theme_container">
        <button type="submit" name="theme" class="theme" value="films"> <img src="./assets/img/films.png" alt=""><span>Films</span></button>
        <button type="submit" name="theme" class="theme" value="acteurs"><img src="./assets/img/acteurs.png" alt=""><span>Acteurs</span></button>
        <button type="submit" name="theme" class="theme" value="musique"><img src="./assets/img/musique.png" alt=""><span>Musique</span></button>
        <button type="submit" name="theme" class="theme" value="jeux"><img src="./assets/img/jeux.png" alt=""><span>Jeux</span></button>
    </form>
    <a href="./player_count.php" class="button count_page_btn">Retour</a>
    <?php echo scripts(); ?>
</body>