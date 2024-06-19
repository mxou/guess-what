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
$table = str_replace("s", "", $theme);
$player_names = $_SESSION['player_names'] ?? [];
// var_dump($player_names)


$sql = "SELECT * FROM $theme ORDER BY $table ASC";
$stmt = $pdo->query($sql);
$data = $stmt->fetchAll(PDO::FETCH_ASSOC);
// var_dump($data);

$theme_data = array_column($data, $table);
// var_dump($theme_data);

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['delete_player'])) {
    array_shift($player_names);
    
    $_SESSION['player_names'] = $player_names;
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
        <h2><span><?php echo htmlspecialchars($player_names[0]); ?></span> tu commences</h2>
        <p class="guess"></p>
        <p class="results"></p>
        <?php else: ?>
        <h2>Pas de joueurs trouvés</h2>
        <?php endif; ?>
        <p class="countdown">5</p>
        <p class="timer"></p>
        <!-- <?php echo '<img src="./assets/img/' . $theme . '.png" alt="" class="bg-game">' ?> -->

        <a href="theme_choice.php" id="accueil" class="button">Accueil</a>
        <?php if (count($_SESSION['player_names']) > 1): ?>
            <form method="post" action="">
                <button type="submit" name="delete_player" id="next" class="button">Joueur Suivant</button>
            </form>
        <?php else: 
            session_destroy();?>
            <div id="scoreScreen" class="button">Voir les résultats</div>
        <?php endif; ?>
    </div>
    <div id="results-screen">
        <h1>Tableau des scores :</h1>
        <div>

        </div>
        <a href="index.php" class="button">Accueil</a>
    </div>
    <div>
        <div id="t" style="display: none">Valeur gamma</div>
        <!-- <button id="requestPermissionButton">Request</button> -->
    </div>

    <script src="./assets/js/landscape.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
    <script>
    var theme_data = <?php echo json_encode($theme_data); ?>;
    </script>
</body>