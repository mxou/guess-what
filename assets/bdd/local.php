<?php

// le nom de la base
define('APP_DB_NAME', 'db_guess_what');

// le nom de la machine qui héberge le serveur MYSQL
define('APP_DB_HOST', 'localhost');

// le nom de l'utilisateur MYSQL
define('APP_DB_USER', 'root');

// le mot de passe de l'utilisateur MYSQL
define('APP_DB_PASSWORD', '');

try{
    $pdo= new PDO("mysql:host=".APP_DB_HOST.";
    dbname=".APP_DB_NAME, APP_DB_USER, APP_DB_PASSWORD);

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

    // echo "Connexion réussie à la BDD" , '<br>';

    }
catch(PDOException $e){
    // echo "Erreur de connexion : " , $e->getMessage();
}
?>