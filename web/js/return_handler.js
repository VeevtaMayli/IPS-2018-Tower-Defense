window.addEventListener('load', onWindowLoaded);

function onWindowLoaded() {
    document.getElementById('return').addEventListener('click', () => {
        window.location = 'menu.php';
    });
}
