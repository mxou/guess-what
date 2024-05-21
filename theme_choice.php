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
var_dump($player_names);
?>

<body>
    <h1>Choix du theme</h1>
        <form action="pregame.php" method="get" class="theme_container">
            <button type="submit" name="theme" class="theme button" value="films">Films</button>
            <button type="submit" name="theme" class="theme button" value="acteurs">Acteurs</button>
            <button type="submit" name="theme" class="theme button" value="musique">Musique</button>
            <button type="submit" name="theme" class="theme button" value="jeux">Jeux</button>
        </form>
</body>
