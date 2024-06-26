<?php
session_start();
if (!isset($_GET['theme'])) {
    header('Location: theme_choice.php');
    exit;
}

include('./assets/php/functions.php'); 
require('./assets/bdd/local.php');
echo head('TITRE'); 

$theme = $_GET['theme'];
$table = substr($theme, 0, -1);
$player_names = $_SESSION['player_names'] ?? [];

if (!isset($_SESSION['current_player_index'])) {
    $_SESSION['current_player_index'] = 0;
}

$current_player_index = $_SESSION['current_player_index'];
$current_player = $player_names[$current_player_index] ?? '';

$sql = "SELECT * FROM $theme ORDER BY $table ASC";
$stmt = $pdo->query($sql);
$data = $stmt->fetchAll(PDO::FETCH_ASSOC);
$theme_data = array_column($data, $table);

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['next_player'])) {
    $_SESSION['current_player_index']++;

    if ($_SESSION['current_player_index'] >= count($player_names)) {
        $_SESSION['current_player_index'] = 0;
    }
    header('Location: game.php?theme=' . urlencode($theme));
    exit;
}

?>

<head>
    <link rel="stylesheet" href="./assets/styles/landscape.css">
</head>

<body>
    <div class="orientation_warning">
        <h3>Retourne ton téléphone !</h3>
        <img src="./assets/img/cell-phone-svgrepo-com.svg" alt="Téléphone portable">
    </div>
    <div class="elements_container">
        <h1><?php echo htmlspecialchars($theme); ?></h1>

        <?php if (!empty($player_names)): ?>
        <h2><span><?php echo htmlspecialchars($current_player); ?></span> à ton tour</h2>
        <p class="guess"></p>
        <p class="results"></p>
        <?php else: ?>
        <h2>Pas de joueurs trouvés</h2>
        <?php endif; ?>

        <p class="countdown">5</p>
        <p class="timer"></p>

        <a href="theme_choice.php" id="accueil" class="button">Accueil</a>
        
        <?php if ($_SESSION['current_player_index'] >= count($player_names) - 1) { ?>
        <div id="scoreScreen" class="button">Voir les résultats</div>
        <?php $_SESSION['current_player_index'] = 0; ?>
    <?php }  else { ?>
        <form method="post" action="">
        <button type="submit" name="next_player" id="next" class="button">Joueur Suivant</button>
    </form> 
    <?php } ?>
    </div>
    <div id="results-screen">
        <h1>Tableau des scores :</h1>
        <div>

        </div>
        <a href="theme_choice.php" class="button">Accueil</a>
    </div>
    <div>
        <div id="t" style="display: none">Valeur gamma</div>
    </div>

    <script src="./assets/js/landscape.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
    <script>
    var theme_data = <?php echo json_encode($theme_data); ?>;
    </script>
</body>