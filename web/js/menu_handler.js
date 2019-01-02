$(window).on('load', onWindowLoaded);

function onWindowLoaded() {
    newGameButtonClicked();
    recordsButtonClicked();
    exitButtonClicked();
}

function newGameButtonClicked() {
    $('#new_game').click(() => {
        window.location = 'game.php';
    });
}

function recordsButtonClicked() {
    $('#records').click(() => {
        window.location = 'records.php';
    });
}

function exitButtonClicked() {
    $('#exit').click(() => {
        $.ajax({
            url: 'signout.php',
            type: 'post',
            complete: onComplete,
        });
    });
}

function onComplete($response) {
    if ($response.responseText === '0') {
        window.location = 'index.php';
    }
}
