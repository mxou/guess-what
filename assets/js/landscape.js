document.addEventListener('DOMContentLoaded', function () {

function checkOrientation() {
    if (window.innerHeight > window.innerWidth) {
        document.querySelector('.orientation_warning').style.display = 'block';
    } else {
        document.querySelector('.orientation_warning').style.display = 'none';
    }
}

window.addEventListener('resize', checkOrientation);
window.addEventListener('load', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);



let currentFilmIndex = 0;
    function chooseNextFilm() {
        // Vérifier si tous les films ont été affichés
        if (currentFilmIndex >= theme_data.length) {
            document.querySelector('.guess').innerHTML = "Tous les films ont été affichés.";
            return;
        }

        // Sélectionner le film suivant
        const nextFilm = theme_data[currentFilmIndex];
        currentFilmIndex++;

        // Afficher le film sélectionné
        document.querySelector('.guess').innerHTML = nextFilm;
    }

function startCountdown() {
    let timeLeft = 2;
    console.log(timeLeft);
    const countdownInterval = setInterval(() => {
        timeLeft--;
        console.log(timeLeft);
        document.querySelector('.countdown').innerHTML = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            document.querySelector('h1', 'h2').style.display = 'none';
            document.querySelector('h2').style.display = 'none';
            chooseNextFilm();
        }
    }, 1000);
}

window.addEventListener('load', startCountdown);

 document.querySelector('.next-film-btn').addEventListener('click', function () {
        chooseNextFilm();
    });
    console.log(theme_data);




    if ('DeviceOrientationEvent' in window) {
  window.addEventListener('deviceorientation', deviceOrientationHandler, false);
} else {
  console.log('Device Orientation API not supported.');
}

function deviceOrientationHandler (eventData) {
  var tiltLR = eventData.gamma;
  var tiltFB = eventData.beta;
  var dir = eventData.alpha;

  document.getElementById("doTiltLR").innerHTML = Math.round(tiltLR);
  document.getElementById("doTiltFB").innerHTML = Math.round(tiltFB);
  document.getElementById("doDirection").innerHTML = Math.round(dir);
  
  console.log(Math.round(tiltLR));
  console.log(Math.round(tiltFB));
  console.log(Math.round(dir));
}

});