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
        <?php else: ?>
            <h2>Pas de joueurs trouvés</h2>
        <?php endif; ?>
    </div>
    <script src="./assets/js/landscape.js"></script>
</body>
