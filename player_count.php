<?php
session_start();

if (isset($_POST['players'])) {
    $_SESSION['players'] = $_POST['players'];
    header('Location: usernames.php');
    exit;
}
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
        <h1>Combien de joueurs ?</h1>
        <form action="" method="post" id="playerForm">
            <div class="count">
            <div class="add_remove_btn remove_btn" id="removeBtn">
                <div></div>
            </div> <!--Diminuer le nombre de joueurs--> 
            <input type="hidden" name="players" id="playersInput" value="3"> <!--Nombre de joueurs--> 
            <span class="button count_page_btn count_btn" id="countBtn">3</span> <!--Nombre de joueurs--> 
            <div class="add_remove_btn add_btn" id="addBtn">
                <div></div>
                <div></div>
            </div> <!--Augmenter le nombre de joueurs--> 
        </div>
            <button class="button count_page_btn" type="submit">Continuer</button>
        </form>
        <a href="./index.php" class="button count_page_btn">Retour</a>
    </div>
    <?php echo scripts(); ?>
</body>
