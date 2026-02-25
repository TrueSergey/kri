// js/pages/chat.js

const messagesContainer = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const onlineCount = document.getElementById('onlineCount');

// Имитация онлайн-пользователей
onlineCount.textContent = Math.floor(Math.random() * 5) + 1 + ' онлайн';

// Загрузка сообщений из localStorage
let messages = JSON.parse(localStorage.getItem('chat_messages')) || [];

function renderMessages() {
    messagesContainer.innerHTML = '';
    if (messages.length === 0) {
        messagesContainer.innerHTML = '<div class="empty-chat"><i class="fas fa-comment-dots" style="font-size: 3rem; margin-bottom: 10px;"></i><p>Хабарламалар жоқ. Бірінші болып жазыңыз!</p></div>';
        return;
    }
    messages.forEach(msg => {
        const isSent = msg.sender === localStorage.getItem('username');
        const div = document.createElement('div');
        div.className = `message ${isSent ? 'sent' : 'received'}`;
        div.innerHTML = `
            <strong>${msg.sender}</strong><br>
            ${msg.text}
            <span class="message-time">${msg.time}</span>
        `;
        messagesContainer.appendChild(div);
    });
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
renderMessages();

sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
    const user = localStorage.getItem('username');
    if (!user) {
        alert('Хабарлама жіберу үшін жүйеге кіріңіз!');
        window.location.href = 'login.html';
        return;
    }
    const text = messageInput.value.trim();
    if (!text) return;

    const newMsg = {
        sender: user,
        text: text,
        time: new Date().toLocaleTimeString('kk-KZ', { hour: '2-digit', minute: '2-digit' })
    };
    messages.push(newMsg);
    localStorage.setItem('chat_messages', JSON.stringify(messages));
    messageInput.value = '';
    renderMessages();

    // Имитация ответа через 1 секунду (только для демо)
    setTimeout(() => {
        const botMsg = {
            sender: 'Бот',
            text: 'Сіздің хабарламаңыз қабылданды. Жауап күтіңіз.',
            time: new Date().toLocaleTimeString('kk-KZ', { hour: '2-digit', minute: '2-digit' })
        };
        messages.push(botMsg);
        localStorage.setItem('chat_messages', JSON.stringify(messages));
        renderMessages();
    }, 1000);
}