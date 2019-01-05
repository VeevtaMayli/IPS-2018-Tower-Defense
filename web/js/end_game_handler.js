window.addEventListener('load', onWindowLoaded);

function onWindowLoaded() {
    $('#to_menu').on('click', () => {
        window.location = 'menu.php';
    });

    $('#again_button').on('click', () => {
        window.location.reload(true);
    });

    const kills = $('#kills_indicator').text();
    const score = $('#score_indicator').text();

    $('#kills_counter').text(kills);
    $('#score_counter').text(score);
}
