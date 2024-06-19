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


})