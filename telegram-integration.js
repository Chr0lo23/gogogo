// Încarcă Telegram Widget
function loadTelegramWidget() {
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.setAttribute('data-telegram-login', 'fragar');
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-onauth', 'onTelegramAuth(user)');
    script.setAttribute('data-request-access', 'write');
    document.body.appendChild(script);
}

// Funcția apelată la autentificarea utilizatorului
function onTelegramAuth(user) {
    alert('Logged in as ' + user.first_name + ' ' + user.last_name + ' (' + user.id + (user.username ? ', @' + user.username : '') + ')');
    
    // Trimite user ID către Unity
    sendUserIdToUnity(user.id);
}

// Trimite user ID-ul la Unity
function sendUserIdToUnity(userId) {
    if (window.unityInstance && unityInstance.SendMessage) {
        unityInstance.SendMessage('GameController', 'ReceiveUserId', userId);
    }
}

// Încarcă widgetul Telegram când documentul este gata
document.addEventListener('DOMContentLoaded', loadTelegramWidget);