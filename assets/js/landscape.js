document.addEventListener('DOMContentLoaded', function () {
  console.log(theme_data);
  // ORIENTATION CHECK
  // ORIENTATION CHECK

  gsap.from('h3', {
    y: -100,
    opacity: 0,
    duration: 1.3,
    ease: "elastic.out"
  })

  const svgtl = gsap.timeline({
    repeat: -1,
    repeatDelay: 1,
  });

  svgtl.from('.orientation_warning img', {
    rotation: 0,
    opacity: 0,
    duration: .8,
    ease: "power2.inOut",
  })
  svgtl.to('.orientation_warning img', {
    opacity: 0,
    scale: .8,
    ease: "power2.in"
  })

  function checkOrientation() {
    if (window.innerHeight > window.innerWidth) {
      document.querySelector('.orientation_warning').style.display = 'flex';
    } else {
      document.querySelector('.orientation_warning').style.display = 'none';
    }
  }

  window.addEventListener('resize', checkOrientation);
  window.addEventListener('load', checkOrientation);
  window.addEventListener('orientationchange', checkOrientation);

  // ORIENTATION CHECK
  // ORIENTATION CHECK

  // Function timer qui annonce que la partie va commencer
  function startCountdown() {
    let timeLeft = 5;
    console.log(timeLeft);
    const countdownInterval = setInterval(() => {
      timeLeft--;
      console.log(timeLeft);
      document.querySelector('.countdown').innerHTML = timeLeft;
      gsap.from('.countdown', {
        scale: 3,
        y: 10,
        opacity: 0,
        duration: .5,
        ease: "power2.out"
      }
      );

      if (timeLeft <= 0) {
        clearInterval(countdownInterval);
        document.querySelector('h1', 'h2').style.display = 'none';
        document.querySelector('h2').style.display = 'none';
        document.querySelector('.countdown').style.display = 'none';
        startTimer();
      } if (timeLeft === 2) {
        chooseNextFilm();
      }
    }, 1000);
  }
  window.addEventListener('load', startCountdown);

  let goodGuess = 0;
  // Function pour le timer de 60s (durée de la partie)
  function startTimer() {
    let timeLeft = 5;
    document.querySelector('.timer').innerHTML = timeLeft + "s"
    const timer = setInterval(() => {
      timeLeft--;
      document.querySelector('.timer').innerHTML = timeLeft + "s";
      if (timeLeft === 0) {
        brrr();
        clearInterval(timer);
        document.querySelector('.guess').innerHTML = "Nombre bonnes réponses :" + goodGuess;
        document.querySelector('.guess').style = "font-size: 4rem;";
        document.querySelector('.timer').innerHTML = "Fin";
        document.querySelector('#accueil').style.display = "block";
        window.removeEventListener("deviceorientation", handleOrientation, false);
      }
    }, 1000);
  }

  // Function pour que ça vibre brrrrrr
  function brrr() {
    if ('vibrate' in navigator) {
      navigator.vibrate(800);
      console.log('Vibration API supported and used.');
    } else {
      console.log('Vibration API not supported.');
    }
  }


  // Function qui va afficher le prochain film
  let currentFilmIndex = 0;
  let timerActive = false;
  let timerActivePoint = false;

  function chooseNextFilm() {
    if (currentFilmIndex >= theme_data.length) {
      document.querySelector('#accueil').style.display = "block";
      brrr();
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

  // Function pour add des points quand le téléphone est incliné vers le bas
  function addPoint() {
    if (timerActivePoint) {
      return;
    }

    timerActivePoint = true;

    setTimeout(() => {
      goodGuess++;
      timerActivePoint = false;
    }, 2000);
  }


  // Gère le droit d'utilier la device position sur IOS
  document.getElementById('requestPermissionButton').addEventListener('click', function () {
    requestDeviceOrientationPermission();
  });

  function requestDeviceOrientationPermission() {
    if ('DeviceOrientationEvent' in window) {
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
          .then(permissionState => {
            if (permissionState === 'granted') {
              console.log('Permission granted for Device Orientation.');
              window.addEventListener("deviceorientation", handleOrientation, false);
            } else {
              console.log('Permission not granted for Device Orientation.');
            }
          })
          .catch(console.error);
      } else {
        console.log('Device Orientation API not supported or no permission needed.');
        window.addEventListener("deviceorientation", handleOrientation, false);
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
