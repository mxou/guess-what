<?php
include('./assets/php/functions.php'); 
echo head('TITRE'); ?>

<body>
    <div class="element_container">
        <h1>Combien de joueurs ?</h1>
        <div class="count">
            <h1 class="add_remove_btn remove_btn">-</h1>
    <a href="#" class="button count_page_btn count_btn"></a>
    <h1 class="add_remove_btn add_btn">+</h1>
    </div>
    <a href="#" class="button count_page_btn">Continuer</a>
    <a href="#" class="button count_page_btn">Retour</a>
</div>
<?php echo scripts(); ?>
</body>
