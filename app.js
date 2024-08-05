// app.js
function logDebugMessage(message) {
    var debugContainer = document.getElementById('debug-container');
    if (debugContainer) {
        debugContainer.innerHTML += '<p>' + message + '</p>';
    } else {
        console.log(message);
    }
}

function SendTelegramUserIdToUnity(userId) {
    logDebugMessage("Sending user ID to Unity: " + userId);
    const unityInstance = unityInstance || window.unityInstance;
    if (unityInstance) {
        logDebugMessage("Unity instance found.");
        unityInstance.SendMessage('GameController', 'OnReceiveUserId', userId.toString());
        logDebugMessage("Message sent to Unity.");
    } else {
        logDebugMessage("Unity instance not found.");
    }
}

window.addEventListener('load', function() {
    logDebugMessage("Page loaded.");
    if (window.Telegram && window.Telegram.WebApp) {
        logDebugMessage("Telegram WebApp is initialized.");
        if (window.Telegram.WebApp.initDataUnsafe) {
            logDebugMessage("Telegram initDataUnsafe is available.");
            const user = window.Telegram.WebApp.initDataUnsafe.user;
            if (user) {
                logDebugMessage("User data found: " + JSON.stringify(user));
                const userId = user.id;
                SendTelegramUserIdToUnity(userId);
            } else {
                logDebugMessage("User data not found.");
            }
        } else {
            logDebugMessage("initDataUnsafe is not available.");
        }
    } else {
        logDebugMessage("Telegram WebApp is not initialized properly.");
    }
});