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
$player_names = $_SESSION['player_names'] ?? [];

$sql = "SELECT * FROM $theme ORDER BY `film` ASC";
$stmt = $pdo->query($sql);
$data = $stmt->fetchAll(PDO::FETCH_ASSOC);
// var_dump($data);

$theme_data = array_column($data, 'film');
// var_dump($theme_data);

?>

<head>
    <link rel="stylesheet" href="./assets/styles/landscape.css">
</head>

<body>
    <div class="orientation_warning">non</div>
    <div class="elements_container">
        <h1><?php echo htmlspecialchars($theme); ?></h1>
        <?php if (!empty($player_names)): ?>
        <h2><?php echo htmlspecialchars($player_names[0]); ?> tu commences</h2>
        <p class="guess"></p>
        <?php else: ?>
        <h2>Pas de joueurs trouvés</h2>
        <?php endif; ?>
        <p class="countdown">5</p>
    </div>
    <button class="next-film-btn">Film suivant</button>


    <table>
        <tr>
            <td>Tilt Left/Right [gamma]</td>
            <td id="doTiltLR"></td>
        </tr>
        <tr>
            <td>Tilt Front/Back [beta]</td>
            <td id="doTiltFB"></td>
        </tr>
        <tr>
            <td>Direction [alpha]</td>
            <td id="doDirection"></td>
        </tr>
    </table>


    <script src="./assets/js/landscape.js"></script>
    <script>
    var theme_data = <?php echo json_encode($theme_data); ?>;
    </script>
</body>