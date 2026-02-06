import { invoke } from '@tauri-apps/api/tauri';
import { appWindow } from '@tauri-apps/api/window';

// DOM elements
const input = document.getElementById('input');
const sendBtn = document.getElementById('send-btn');
const messagesContainer = document.getElementById('messages');

// Add message to chat
function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
    messageDiv.textContent = text;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Send message
async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;
    
    addMessage(text, true);
    input.value = '';
    
    try {
        const response = await invoke('greet', { name: text });
        addMessage(response, false);
    } catch (error) {
        addMessage(`Error: ${error}`, false);
    }
}

// Event listeners
sendBtn.addEventListener('click', sendMessage);
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    } else if (e.key === 'Escape') {
        appWindow.hide();
    }
});

// Focus input on load
input.focus();

// Welcome message
addMessage('Welcome to TARS! Press Ctrl+Space to summon me anytime.', false);
