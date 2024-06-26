document.addEventListener('DOMContentLoaded', function () {
  checkAndRequestPermission();
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
  // Function timer qui annonce que la partie va commencer
  let game = false
  let nextButton = document.querySelector('#next');
  let scoreScreenLink = document.querySelector('#scoreScreen');
  let timeLeft = 5;
  let results = sessionStorage.getItem('results') || '';

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
        timeLeft = 0;
        startTimer();
      } if (timeLeft === 1) {
        chooseNextFilm();
      }
    }, 1000);
  }

  // Valeur du timer de 60s (durée de la partie)
  let timeLeftIg = 60;
  let goodGuess = 0;

  function startTimer() {
    document.querySelector('.timer').innerHTML = timeLeftIg + "s"
    window.addEventListener("deviceorientation", handleOrientation, false);
    const timer = setInterval(() => {
      timeLeftIg--;
      document.querySelector('.timer').innerHTML = timeLeftIg + "s";
      // console.log(timeLeftIg)
      if (timeLeftIg === 0) {
        brrr();
        clearInterval(timer);
        document.querySelector('.results').innerHTML = "Nombre bonnes réponses :" + goodGuess;
        document.querySelector('.results').style = "font-size: 2rem;";
        document.querySelector('.results').style = "display: block;"
        document.querySelector('.guess').style = "display: none;"
        document.querySelector('.timer').innerHTML = "Fin";
        document.querySelector('#accueil').style.display = "block";
        if (nextButton) {
          document.querySelector('#next').style.display = "block";
        }
        if (scoreScreenLink) {
          document.querySelector('#scoreScreen').style.display = "block";
        }
        window.removeEventListener("deviceorientation", handleOrientation, false);
      }
    }, 1000);
  }

  function checkOrientation() {
    if (window.innerHeight > window.innerWidth) {
      document.querySelector('.orientation_warning').style.display = 'flex';
    } else {
      document.querySelector('.orientation_warning').style.display = 'none';
      if (game == false) {
        game = true;
        // console.log(game);
        startCountdown();
      }
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
      document.querySelector('#next').style.display = "block";
      document.querySelector('#scoreScreen').style.display = "block";
      document.querySelector('#accueil').style.display = "block";
      document.querySelector('.results').innerHTML = "Nombre bonnes réponses :" + goodGuess;
      document.querySelector('.results').style = "font-size: 2rem;";
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

  function checkAndRequestPermission() {
    const permissionStatus = localStorage.getItem('devicePositionPermission');
    console.log(permissionStatus);

    if (permissionStatus === 'granted') {
      console.log('Permission for device position already granted.');
      window.addEventListener("deviceorientation", handleOrientation, false);
    } else {
      console.log('Permission not granted for device position.');
      // window.location.href = 'index.php';
    }
  }

  function handleOrientation(event) {
    // console.log("gamma frr")
    const gamma = Math.round(event.gamma);
    document.getElementById('t').innerHTML = gamma;
    if (gamma >= -45 && gamma <= 0) {
      chooseNextFilm();
      addPoint();
    } else if (gamma >= 0 && gamma <= 45) {
      chooseNextFilm();
    }
  }
  if (nextButton) {
    nextButton.addEventListener("click", function () {
      results += "<p>" + document.querySelector('span').innerHTML + ": " + goodGuess + "</p> ";
      sessionStorage.setItem('results', results);
      console.log(results);
    })
  }
  if (scoreScreenLink) {
    scoreScreenLink.addEventListener("click", function () {
      console.log("click")
      results += "<p>" + document.querySelector('span').innerHTML + ": " + goodGuess + "</p> ";
      console.log(results);
      document.querySelector('#results-screen').style = "display: flex";
      document.querySelector('#results-screen>div').innerHTML = results;
      results = '';
      sessionStorage.setItem('results', results);
    })
  }
});