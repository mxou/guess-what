<?php
// Function pour appeler le head HTML 
function head(string $title = ''): string
{
    return  <<<HTML_HEAD
<!DOCTYPE html>
<html lang="fr">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" href="assets/img/Guesswhatalpha@2X.png" />
  <link rel="stylesheet" href="./assets/styles/main.css">
  <title>$title</title>
</head>

HTML_HEAD;
}
// Function pour appeler le head HTML 
function scripts() {
  return <<< SCRIPTS
  <script src="./assets/js/front.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
SCRIPTS;
} 

// Function pour afficher le noms des joueurs stockés dans la variable de session
function showPlayers($player_names) {
    $output_players = '<ul>';
    foreach ($player_names as $index => $name) {
        $output_players .= '<li>Joueur ' . ($index + 1) . ': ' . htmlspecialchars($name) . '</li>';
    }
    $output_players .= '</ul>';
    return $output_players;
}

// Function pour afficher les films dans la BDD 
function showFilms($pdo) {
    $sql = "SELECT * FROM themes";  
    $stmt = $pdo->query($sql);

    $output_films = "<h2>Films :</h2><ul>";
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $output_films .= "<li>" . htmlspecialchars($row['films']) . "</li>";
    }
    $output_films .= "</ul>";

    return $output_films;
}

// Function pour afficher les acteurs dans la BDD 
function showActeurs($pdo) {
    $sql = "SELECT * FROM themes";  
    $stmt = $pdo->query($sql);

    $output_acteurs = "<h2>Acteurs :</h2><ul>";
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $output_acteurs .= "<li>" . htmlspecialchars($row['acteurs']) . "</li>";
    }
    $output_acteurs .= "</ul>";

    return $output_acteurs;
}

function sessionPlayers() {
    if (!isset($_SESSION['player_names'])) {
        $players = $_SESSION['players'];
        $player_names = [];

        for ($i = 1; $i <= $players; $i++) {
            if (isset($_POST['player' . $i])) {
                $player_names[] = htmlspecialchars($_POST['player' . $i]);
            }
        }

        // Stocker les noms des joueurs dans la session
        $_SESSION['player_names'] = $player_names;
    } else {
        $player_names = $_SESSION['player_names'];
    }

    return $player_names;
}


?>