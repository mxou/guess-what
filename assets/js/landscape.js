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
let timerActive = false;
let goodGuess = 0;

function chooseNextFilm() {
    // Vérifier si tous les films ont été affichés
    if (currentFilmIndex >= theme_data.length) {
        document.querySelector('.guess').innerHTML = "Nombre bonnes réponses :" + goodGuess;
        // document.querySelectorAll('.end_game_button').style.display = 'block';
        return;
    }
    if (timerActive) {
        return;
    }

    timerActive = true;

    setTimeout(() => {
        const nextFilm = theme_data[currentFilmIndex];
        currentFilmIndex++;
        document.querySelector('.guess').innerHTML = nextFilm;
        timerActive = false;
    }, 2000); 
}

function addPoint() {
  setTimeout(() => {
        goodGuess += 1;
    }, 2000); 
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

    console.log(theme_data);


// Gestionnaire d'événement pour le clic sur le bouton de demande de permission
document.getElementById('requestPermissionButton').addEventListener('click', function () {
  requestDeviceOrientationPermission();
});

// Gestionnaire d'événement pour l'événement deviceorientation
window.addEventListener("deviceorientation", handleOrientation, true);

function requestDeviceOrientationPermission() {
  if ('DeviceOrientationEvent' in window) {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission()
        .then(permissionState => {
          if (permissionState === 'granted') {
            console.log('Permission granted for Device Orientation.');
          } else {
            console.log('Permission not granted for Device Orientation.');
          }
        })
        .catch(console.error);
    } else {
      console.log('Device Orientation API not supported or no permission needed.');
    }
  } else {
    console.log('Device Orientation API not supported.');
  }
}

function handleOrientation(event) {
  const gamma = Math.round(event.gamma);
  document.getElementById('t').innerHTML = gamma;

  if (gamma >= 45 && gamma <= 60) {
    addPoint();
    chooseNextFilm();
  } else if (gamma >= -40 && gamma <= -20) {
    chooseNextFilm();
  }
}


});
