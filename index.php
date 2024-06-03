<?php
include('./assets/php/functions.php'); 
echo head('TITRE'); ?>

  <body>
    <div class="element_container">
      <img
        src="./assets/img/Guesswhatalpha@2x.png"
        alt="Logo de l'appli"
        id="Logo_main_page"
      />
      <div class="buttons_container">
        <a href="./player_count.php" class="button buttonIndex">JOUER</a>
        <a href="#" class="button buttonIndex" id="caca">Options</a>
      </div>
    </div>
    <?php echo scripts(); ?>
  </body>
</html>
