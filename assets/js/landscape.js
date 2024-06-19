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
  document.querySelector('.results').style = "display: none;"
  document.querySelector('.guess').style = "display: none;"

  // ORIENTATION CHECK
  // ORIENTATION CHECK
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  shuffle(theme_data);

  let wakeLock = null;

  async function requestWakeLock() {
    if ('wakeLock' in navigator) {
      try {
        wakeLock = await navigator.wakeLock.request('screen');
      } catch (err) {
        console.error(`${err.name}, ${err.message}`);
      }
    } else {
      console.warn('Wake Lock API not supported');
    }
  }

  function releaseWakeLock() {
    if (wakeLock !== null) {
      wakeLock.release().then(() => {
        wakeLock = null;
      });
    }
  }

  window.onload = () => {
    requestWakeLock();
  };

  window.onbeforeunload = () => {
    releaseWakeLock();
  };

  // Function timer qui annonce que la partie va commencer
  let timeLeft = 5;
  function startCountdown() {
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
        document.querySelector('.guess').style = "display: block;"
        document.querySelector('body').style = "background: none; background-color: #392F5A;"
        startTimer();
      } if (timeLeft === 1) {
        chooseNextFilm();
      }
    }, 1000);
  }
  window.addEventListener('load', startCountdown);

  let goodGuess = 0;
  // Function pour le timer de 60s (durée de la partie)
  function startTimer() {
    let timeLeftIg = 60;
    document.querySelector('.timer').innerHTML = timeLeftIg + "s"
    window.addEventListener("deviceorientation", handleOrientation, false);
    const timer = setInterval(() => {
      timeLeftIg--;
      document.querySelector('.timer').innerHTML = timeLeftIg + "s";
      if (timeLeftIg === 0) {
        brrr();
        clearInterval(timer);
        document.querySelector('.results').innerHTML = "Nombre bonnes réponses :" + goodGuess;
        document.querySelector('.results').style = "font-size: 4rem;";
        document.querySelector('.results').style = "display: block;"
        document.querySelector('.guess').style = "display: none;"
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
      document.querySelector('.results').innerHTML = "Nombre bonnes réponses :" + goodGuess;
      document.querySelector('.results').style = "font-size: 4rem;";
      document.querySelector('.results').style = "display: block;"
      document.querySelector('.guess').style = "display: none;"
      document.querySelector('.timer').innerHTML = "Fin";
      window.removeEventListener("deviceorientation", handleOrientation, false);
      brrr();
      return;
    }
    if (timerActive) {
      return;
    }

    timerActive = true;
    if (timeLeft <= 0) {
      document.querySelector('body').style = "background: none; background-color: red;"
    }
    setTimeout(() => {
      const nextFilm = theme_data[currentFilmIndex];
      currentFilmIndex++;
      document.querySelector('.guess').innerHTML = nextFilm;
      timerActive = false;
      document.querySelector('body').style = "background: none; background-color: #392F5A;"
    }, 1000);
  }

  // Function pour add des points quand le téléphone est incliné vers le haut
  function addPoint() {
    if (timerActivePoint) {
      return;
    }

    document.querySelector('body').style = "background: none; background-color: green;"
    timerActivePoint = true;

    setTimeout(() => {
      goodGuess++;
      timerActivePoint = false;
      document.querySelector('body').style = "background: none; background-color: #392F5A;"
    }, 1000);
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
    // console.log("gamma frr")
    const gamma = Math.round(event.gamma);
    document.getElementById('t').innerHTML = gamma;
    if (gamma >= -60 && gamma <= -45) {
      chooseNextFilm();
      addPoint();
    } else if (gamma >= 45 && gamma <= 60) {
      chooseNextFilm();
    }
  }
});
