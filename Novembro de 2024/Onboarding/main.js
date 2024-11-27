// Obter idioma do navegador
const userLocale = navigator.language || navigator.userLanguage;
         
// Definir traduções
const translations = {
   "en": {
       USERNAME_LABEL: "Username or Email",
       PASSWORD_LABEL: "Password",
   },
   "pt": {
       USERNAME_LABEL: "Nome de Usuário ou Email",
       PASSWORD_LABEL: "Senha",
   },
   "es": {
       USERNAME_LABEL: "Nombre de Usuario o Correo Eletrónico",
       PASSWORD_LABEL: "Contraseña",
   },
};

// Função para aplicar as traduções
function applyLocalization(locale){
   
   // Extraindo a língua principal
   const language = locale.split('-')[0];
   
   // Selecionar traduções, com fallback para Inglês
   const translation = translations[language] || translations['en'];
   
   // Alterar o conteúdo
   document.getElementById('username-label').innerText = translation.USERNAME_LABEL;
   document.getElementById('password-label').innerText = translation.PASSWORD_LABEL;
   
   // Atualizar o atributo Lang da página
   document.documentElement.lang = locale;
}

// Aplicar as traduções ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
   applyLocalization(userLocale);
   
   // Adicionar evento para troca de idioma no dropdown
   const languageSelector = document.getElementById('language-selector');
   languageSelector.addEventListener('change', (event) => {
       applyLocalization(event.target.value);
   });
});


// Mensagem de validação em diferentes idiomas
const USERNAME_EMAIL_MESSAGES = {
   "en": "Please enter your username or email.",
   "pt": "Por favor, insira o seu nome de usuário ou email.",
   "es": "Por favor, introduzca su nombre de usuario o correo electrónico."
};

const PASSWORD_MESSAGES = {
   "en": "Please enter your password.",
   "pt": "Por favor, insira a sua senha.",
   "es": "Por favor, introduzca su contraseña."
}

// Função para obter mensagem de validação com base no idioma com fallback para inglês
function USERNAME_EMAIL_VALIDATION(locale){
   return USERNAME_EMAIL_MESSAGES[locale] || USERNAME_EMAIL_MESSAGES['en'];
}

function PASSWORD_VALIDATION(locale){
   return PASSWORD_MESSAGES[locale] || PASSWORD_MESSAGES['en'];
}

document.addEventListener('DOMContentLoaded', () => {
   

   // Selecionar o campo de entrada
   const nameInput = document.querySelector('[name="username"]');
   const PASSWORD_INPUT = document.querySelector('[name="password"]');
   const languageSelector = document.getElementById('language-selector');

   // Obter idioma salvo ou do navegador
   const savedLocale = localStorage.getItem('preferredLanguage') || userLocale;
   applyLocalization(savedLocale);

   // Adicionar evento de validação
   nameInput.addEventListener('invalid', () => {
       nameInput.setCustomValidity(USERNAME_EMAIL_VALIDATION(savedLocale)); //
   });
   PASSWORD_INPUT.addEventListener('invalid', () => {
       PASSWORD_INPUT.setCustomValidity(PASSWORD_VALIDATION(savedLocale));
   });


   // Limpar a mensagem personalizada quando o usuário corrigir o valor
   nameInput.addEventListener('input', () => {
       nameInput.setCustomValidity('');
   });
   PASSWORD_INPUT.addEventListener('input', () => {
       PASSWORD_INPUT.setCustomValidity('');
   });

   
   // Definir idioma conforme dropdown
   languageSelector.addEventListener('change', (event) => {
       const selectedLanguage = event.target.value;

       // Aplicar a localização com o idioma localizadoco
       applyLocalization(selectedLanguage);
       
       // Salvar o idioma selecionado no LocalStorage
       localStorage.setItem('preferredLanguage', selectedLanguage);

   });
});

// Variavéis para mostrar a Senha
const passwordInput = document.getElementById('password');
const TOGGLE_PASSWORD_BUTTON = document.getElementById('toggle-password');

TOGGLE_PASSWORD_BUTTON.addEventListener('click', TOGGLE_PASSWORD);

function TOGGLE_PASSWORD() {
    if (passwordInput.type === 'password'){
        passwordInput.type = 'text';
        TOGGLE_PASSWORD_BUTTON.innerText = "Ocultar senha";
    } else {
        passwordInput.type = 'password';
        TOGGLE_PASSWORD_BUTTON.innerText = "Mostrar senha";
    }
}