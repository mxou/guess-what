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
if (!empty($player_names)) {
    for ($i = 0; $i < count($player_names); $i++) {
        // var_dump(htmlspecialchars($player_names[$i]));
        // echo $i;
        // echo '<br>';
        $nbr_players = $i;
    }
} else {
    echo "Aucun joueur trouvé.";
}

if (isset($_POST['reset_session'])) {
    session_destroy();
    header('Location: player_count.php');
    exit;
}

// var_dump($nbr_players);

?>

<body class="tc">
    <div id="bubble-container"></div>
    <h1>Choix du theme</h1>
    <form action="pregame.php" method="get" class="theme_container">
        <button type="submit" name="theme" class="theme" value="films"> <img src="./assets/img/films.png"
                alt=""><span>Films</span></button>
        <button type="submit" name="theme" class="theme" value="acteurs"><img src="./assets/img/acteurs.png"
                alt=""><span>Acteurs</span></button>
        <button type="submit" name="theme" class="theme" value="musiques"><img src="./assets/img/musique.png"
                alt=""><span>Musique</span></button>
        <button type="submit" name="theme" class="theme" value="jeux"><img src="./assets/img/jeux.png"
                alt=""><span>Jeux</span></button>
    </form>
    <form method="post" action="">
        <button type="submit" name="reset_session" class="button count_page_btn">Retour</button>
    </form>
    <?php echo scripts(); ?>
</body>