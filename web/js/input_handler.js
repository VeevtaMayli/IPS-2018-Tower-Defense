const ERR_NONE = '0';
const ERR_NO_PARAM = '1';
const ERR_USER_NOT_EXISTS = '2';
const ERR_INCORRECT_PASS = '3';
const ERR_USER_EXISTS = '4';

const ERROR_MESSAGES = {
    1: 'Введите имя защитника и/или пароль!',
    2: 'Защитника с таким именем не существует!',
    3: 'Неверный пароль!',
    4: 'Увы! Защитник с таким именем уже есть...'
};

$(window).on('load', onWindowLoaded);

function onWindowLoaded() {
    onButtonClicked('login');
    onButtonClicked('registration');
}

function onButtonClicked(buttonType) {
    const buttonId = '#' + buttonType + '_button';
    const url = buttonType + '.php';
    let onComplete;
    $(buttonId).click(function() {
        const login = $('#login').val();
        const password = $('#password').val();
        const data = {
            'login': login,
            'password': password,
        };
        if (buttonType === 'login') {
            onComplete = onCompleteLogin;
        } else {
            onComplete = onCompleteRegistration;
        }

        $.ajax({
            url: url,
            type: 'post',
            data: data,
            dataType: 'json',
            complete: onComplete,
        });
    });
}

function onCompleteLogin(response) {
    const errorCode = response.responseText;
    if (errorCode === ERR_NONE) {
        window.location = 'menu.php';
    } else {
        showMessage(errorCode);
    }
}

function onCompleteRegistration(response) {
    const responseObject = JSON.parse(response.responseText);

    if (responseObject !== ERR_USER_EXISTS) {
        $('#choice_modal').modal('hide');
        $('#ok_modal').modal('show');
        $('#ok_modal_title').text('Регистрация!');
        $('#ok_modal_text').text('Добро пожаловать в наши ряды, ' + responseObject['name']);
        $('#ok_modal').on('hidden.bs.modal', () => {
            window.location = 'menu.php';
        });
    } else {
        showMessage(ERR_USER_EXISTS);
    }
}

function showMessage(errorCode) {
    let typeModal;
    let text = '';
    if (errorCode === ERR_USER_NOT_EXISTS) {
        typeModal = 'choice';
        text = ' Хотите им стать?';
    } else {
        typeModal = 'ok';
    }

    text = getErrorMessage(errorCode) + text;

    const modalWindowId = '#' + typeModal + '_modal';
    const modalTitleId = '#' + typeModal + '_modal_title';
    const modalTextId = '#' + typeModal + '_modal_text';

    $(modalWindowId).modal('show');
    $(modalTitleId).text('Внимание');
    $(modalTextId).text(text);
}
function getErrorMessage(errorCode) {
    return ERROR_MESSAGES[errorCode];
}
