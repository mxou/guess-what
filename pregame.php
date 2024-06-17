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
$player_names = $_SESSION['player_names'] ?? [];
// var_dump($player_names, $theme);

?>

<body>
    <form action="game.php" method="get" class="theme_container">
        <div class="element_container pg">
            <h1><?php echo htmlspecialchars($theme); ?></h1>
            <div>
                <h2>60 secondes pour deviner </h2>
                <h2>Incliner vers le haut pour valider</h2>
                <h2>Vers le bas pour passer</h2>
                <h2>1 bonne réponse = 1 point</h2>
            </div>
            <input type="hidden" name="theme" value="<?php echo htmlspecialchars($theme); ?>">
            <div class="rulesbtn">
                <button class="button count_page_btn" type="submit">Commencer</button>
                <a class="button count_page_btn" href="./theme_choice.php">Retour</a>
            </div>
        </div>
    </form>
    <?php echo scripts(); ?>
</body>