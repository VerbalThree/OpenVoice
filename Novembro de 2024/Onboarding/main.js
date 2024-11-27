import { translations, USERNAME_EMAIL_MESSAGES, PASSWORD_MESSAGES,  } from './src/translations.js';

// Obter idioma do navegador
const userLocale = navigator.language || navigator.userLanguage;
// Variavéis para mostrar a Senha
const passwordInput = document.getElementById('password');
const TOGGLE_PASSWORD_BUTTON = document.getElementById('toggle-password');
TOGGLE_PASSWORD_BUTTON.addEventListener('click', TOGGLE_PASSWORD);

// Função para aplicar as traduções
function applyLocalization(locale){
    
    // Extraindo a língua principal
    const language = locale.split('-')[0];
    // Selecionar traduções, com fallback para Inglês
    const translation = translations[language] || translations['en'];
    
   // Alterar o conteúdo
   const ELEMENTS = [
    { id: 'auth-header', text: translation.HEADER },
    { id: 'username-label', text: translation.USERNAME_LABEL },
    { id: 'password-label', text: translation.PASSWORD_LABEL },
    { id: 'toggle-password', text: translation.SHOW_PASSWORD_LABEL },
    { id: 'login-button', text: translation.LOGIN_BUTTON_LABEL },
    { id: 'create-account-paragraph', text: translation.CREATE_ACCOUNT_PARAGRAPH },
    { id: 'rationem', text: translation.CREATE_ACCOUNT_LINK },
    { id: 'about-us', text: translation.ABOUT_US },
    { id: 'docs', text: translation.DOCS },
    { id: 'repository', text: translation.REPOSITORY },
    { id: 'copyright', text: translation.COPYRIGHT },
];

   
   // Atualizar o atributo Lang da página
    ELEMENTS.forEach(({ id, text }) => {
        const element = document.getElementById(id);
        if (element) {
            element.innerText = text;
        } else {
            console.warn(`Elemento com ID '${id}' não encontrado.`);
        }
    });

}

// Aplicar as traduções ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
   applyLocalization(userLocale);
   
   // Adicionar evento para troca de idioma no dropdown
   const languageSelector = document.getElementById('language-selector');
   languageSelector.addEventListener('change', (event) => {
       applyLocalization(event.target.value);
   });
   // Selecionar o campo de entrada
   const nameInput = document.querySelector('[name="username"]');
   const PASSWORD_INPUT = document.querySelector('[name="password"]');
   
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
}); // DOM

// Função para obter mensagem de validação com base no idioma com fallback para inglês
function USERNAME_EMAIL_VALIDATION(locale){
   return USERNAME_EMAIL_MESSAGES[locale] || USERNAME_EMAIL_MESSAGES['en'];
}

function PASSWORD_VALIDATION(locale){
   return PASSWORD_MESSAGES[locale] || PASSWORD_MESSAGES['en'];
}


function TOGGLE_PASSWORD() {
    if (passwordInput.type === 'password'){
        passwordInput.type = 'text';
        TOGGLE_PASSWORD_BUTTON.innerText = "Ocultar senha";
    } else {
        passwordInput.type = 'password';
        TOGGLE_PASSWORD_BUTTON.innerText = "Mostrar senha";
    }
}