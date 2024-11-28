const PASSWORD_INPUT = document.getElementById('current-password');
const TOGGLE_PASSWORD_BUTTON = document.getElementById('toggle-password');

TOGGLE_PASSWORD_BUTTON.addEventListener('click', togglePassword);

function togglePassword(){
    if(PASSWORD_INPUT.type === 'password'){
        PASSWORD_INPUT.type = 'text';
        TOGGLE_PASSWORD_BUTTON.textContent = "Esconder senha";
        TOGGLE_PASSWORD_BUTTON.setAttribute('aria-label', 'Esconder senha');
    } else {
        PASSWORD_INPUT.type = 'password';
        TOGGLE_PASSWORD_BUTTON.textContent = "Mostrar senha";
        TOGGLE_PASSWORD_BUTTON.setAttribute('aria-label', "Mostrar senha em texto." + 'Aviso: Isso irá mostrar a sua senha na tela.');
    }
}