import { translations, USERNAME_EMAIL_MESSAGES, PASSWORD_MESSAGES } from './src/translations.js';

// Obter idioma do navegador
const userLocale = navigator.language || navigator.userLanguage;
         
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