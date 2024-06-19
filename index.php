<?php
include('./assets/php/functions.php'); 
echo head('Accueil'); ?>

<head>
</head>

<body>
    <div id="bubble-container"></div>
    <div class="element_container">
        <img src="./assets/img/Guesswhatalpha@2x.png" alt="Logo de l'appli" id="Logo_main_page" />
        <div class="buttons_container">
            <a href="./player_count.php" class="button buttonIndex">JOUER</a>
            <button class="button buttonIndex" id="requestPermissionButton">Request</button>
        </div>
    </div>
    <div id="gandalf">
        <img src="./assets/img/Guesswhatalpha@2x.png" alt="Logo de l'appli"/>
        <h1>Guess What est un jeu conçu pour smartphone, si tu veux y jouer reviens sur ton téléphone !</h1>
    </div>
    <?php echo scripts(); ?>
    <script src="./assets/js/deviceAutorisationIOS.js"></script>
</body>

</html>