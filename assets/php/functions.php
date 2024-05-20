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
  <link rel="icon" href="assets/img/Guess_what192.png" />
  <link rel="stylesheet" href="./assets/styles/main.css">
  <title>$title</title>
</head>

HTML_HEAD;
}
// Function pour appeler le head HTML 
function scripts() {
  return <<< SCRIPTS
  <script src="./assets/js/front.js"></script>
SCRIPTS;
} ?>