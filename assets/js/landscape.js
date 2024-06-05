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

});