<?php
session_start();
if (!isset($_GET['theme'])) {
    header('Location: theme_choice.php');
    exit;
}

include('./assets/php/functions.php'); 
require('./assets/bdd/local.php');
echo head('TITRE'); 

// Récupération du thème sélectionné
$theme = $_GET['theme'];

?>

<head>
    <link rel="stylesheet" href="./assets/css/landscape.css">
</head>

<body>
    <div class="orientation_warning">non</div>
    <div class="elements_container">
        <h1><?php echo htmlspecialchars($theme); ?></h1>
        <h2><?php echo showPlayers($player_names[1]); ?> tu commences</h2>
        <a class="button count_page_btn" href="./game.php">Commencer</a>

    </div>
</body>