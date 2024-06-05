<?php

session_start();
if (!isset($_SESSION['players'])) {
    header('Location: player_count.php');
    exit;
}
$players = $_SESSION['players'];

include('./assets/php/functions.php'); 
echo head('TITRE'); 
?>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" href="assets/img/Guess_what192.png" />
  <link rel="stylesheet" href="./assets/styles/main.css">
  <title>$title</title>
</head>
<body>
    <div class="element_container">
        <h1>Noms des joueurs</h1>
        <div class="usernames_container">
            <form action="theme_choice.php" method="post"> <!-- Modifiez l'action en fonction de votre page suivante -->
                <?php 
                for ($i = 1; $i <= $players; $i++) {
                    echo '<div class="username_entry">';
                    // echo '<label for="player' . $i . '">Joueur ' . $i . ':</label>';
                    echo '<input placeholder="Joueur ' . $i . '" type="text" id="player' . $i . '" name="player' . $i . '" required>';
                    echo '</div>';
                }
                ?>
                <button type="submit" class="button">Continuer</button>
            </form>
        </div>
        <a href="./player_count.php" class="button count_page_btn">Retour</a>
    </div>
    <!-- <?php echo scripts(); ?> -->
</body>