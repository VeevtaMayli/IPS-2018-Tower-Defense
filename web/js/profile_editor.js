$(window).on('load', onWindowLoaded);

function onWindowLoaded() {
    const curName = $('#username').val();
    $('#ok_modal_title').text(curName);

    editProfile();
}

function isPasswordsEqual(pass, repeatedPass) {
    return pass === repeatedPass;
}

function editProfile(name) {
    $('#change_profile').click(function() {
        updateProfile(name);
    });
}

function updateProfile(curName) {
    const name = $('#username').val();
    const password = $('#password').val();
    const confirmedPassword = $('#repeated_password').val();
    if ((name === curName) && (password === '')) {
        return;
    } else if (name !== '' && isPasswordsEqual(password, confirmedPassword)) {
        const data = {
            'username': name,
            'password': password,
        };
        $.ajax({
            url: 'profile_editor.php',
            type: 'post',
            data: data,
            dataType: 'json',
            complete: onComplete.bind(name),
        });
    } else {
        $('#ok_modal_text').text('Веденные пароли не совпадают!');
    }

    $('#ok_modal').modal('show');
}

function onComplete(response, name) {
    const responseCode = response.responseText;

    if (responseCode === '0') {
        $('#ok_modal_text').text('Изменения приняты!');
        $('#cur_name').text(this);
        $('#ok_modal_title').text(this);
    } else {
        $('#ok_modal_text').text('Вы не внесли изменения!');
    }
}

