document.addEventListener('DOMContentLoaded', function(){

    function isiOS() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
}

// Exemple d'utilisation
if (isiOS()) {
    console.log('L\'utilisateur est sur iOS.');
} else {
     document.getElementById('requestPermissionButton').style.display = "none";
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
                document.getElementById('requestPermissionButton').style.display = "none";
              console.log('Permission granted for Device Orientation.');
              window.addEventListener("deviceorientation", handleOrientation, false);
              localStorage.setItem('devicePositionPermission', 'granted');
            } else {
              console.log('Permission not granted for Device Orientation.');
            }
          })
          .catch(console.error);
      } else {
        console.log('Device Orientation API not supported or no permission needed.');
        window.addEventListener("deviceorientation", handleOrientation, false);
        localStorage.setItem('devicePositionPermission', 'denied');
      }
    } else {
      console.log('Device Orientation API not supported.');
    }
  }

  if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('./assets/js/sw.js')
                    .then(registration => {
                        console.log('Service Worker registered with scope:', registration.scope);
                    })
                    .catch(err => {
                        console.log('Service Worker registration failed:', err);
                    });
            });
        }

        let deferredPrompt;
        const installButton = document.getElementById('install-button');

        window.addEventListener('beforeinstallprompt', (e) => {
            // Empêcher le navigateur de montrer le prompt par défaut
            e.preventDefault();
            // Stocker l'événement pour le déclencher plus tard
            deferredPrompt = e;
            // Afficher le bouton d'installation
            installButton.style.display = 'block';

            installButton.addEventListener('click', () => {
                // Masquer le bouton d'installation
                installButton.style.display = 'none';
                // Afficher le prompt d'installation
                deferredPrompt.prompt();
                // Attendre que l'utilisateur réponde au prompt
                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('User accepted the A2HS prompt');
                    } else {
                        console.log('User dismissed the A2HS prompt');
                    }
                    deferredPrompt = null;
                });
            });
        });

        window.addEventListener('appinstalled', (evt) => {
            console.log('PWA was installed');
        });


})