// Configuration
const API_ENDPOINT = "https://6sxlyd8041.execute-api.us-east-1.amazonaws.com/ask";

function initChatbot() {
    const container = document.getElementById('bedrock-chat-container');
    const input = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const closeBtn = document.getElementById('close-chat-btn');
    const minimizeBtn = document.getElementById('minimize-btn');
    const chatBody = document.getElementById('chat-body');
    const messagesDiv = document.getElementById('chat-messages');

    if (!container) return;

    // Check session storage state
    // 'opened': user explicitly opened or initial auto-popup fired
    // 'minimized': user clicked minimize/toggle or header
    // 'closed': user clicked close
    const storedState = sessionStorage.getItem('wizarch_chat_state');

    if (storedState === 'minimized') {
        if (chatBody) chatBody.style.display = 'none';
        container.style.height = 'auto';
        container.style.display = 'flex';
        if (minimizeBtn) minimizeBtn.textContent = '+';
    } else if (storedState === 'closed') {
        container.style.display = 'none';
    } else if (storedState === 'opened') {
        if (chatBody) chatBody.style.display = 'flex';
        container.style.height = '500px';
        container.style.display = 'flex';
        if (minimizeBtn) minimizeBtn.textContent = '−';
    } else {
        // First visit in session (no storedState): remain hidden until 2 sec timer
        container.style.display = 'none';
        setTimeout(() => {
            if (sessionStorage.getItem('wizarch_chat_state') === null) {
                container.style.display = 'flex';
                sessionStorage.setItem('wizarch_chat_state', 'opened');
            }
        }, 2000);
    }

    // Close window handler
    if (closeBtn && container) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            container.style.display = 'none';
            sessionStorage.setItem('wizarch_chat_state', 'closed');
        });
    }

    // Toggle minimize / restore function
    function toggleChat(e) {
        if (e) e.stopPropagation();
        if (!container || !chatBody) return;

        const isMinimized = chatBody.style.display === 'none';

        if (isMinimized) {
            // Restore widget
            container.style.display = 'flex';
            chatBody.style.display = 'flex';
            container.style.height = '500px';
            if (minimizeBtn) minimizeBtn.textContent = '−';
            sessionStorage.setItem('wizarch_chat_state', 'opened');
        } else {
            // Minimize widget
            chatBody.style.display = 'none';
            container.style.height = 'auto';
            if (minimizeBtn) minimizeBtn.textContent = '+';
            sessionStorage.setItem('wizarch_chat_state', 'minimized');
        }
    }

    if (minimizeBtn) {
        minimizeBtn.addEventListener('click', toggleChat);
    }

    // Clicking header when minimized expands it back
    const chatHeader = container ? container.querySelector('div') : null;
    if (chatHeader) {
        chatHeader.style.cursor = 'pointer';
        chatHeader.addEventListener('click', (e) => {
            if (chatBody && chatBody.style.display === 'none') {
                toggleChat(e);
            }
        });
    }

    // Append Message Helper
    function appendMessage(text, isUser) {
        if (!messagesDiv) return;

        const msg = document.createElement('div');
        msg.innerText = text;
        msg.style.cssText = `
            padding: 10px 14px; 
            border-radius: 15px; 
            max-width: 75%; 
            font-size: 14px;
            line-height: 1.4;
            align-self: ${isUser ? 'flex-end' : 'flex-start'};
            background: ${isUser ? '#007bff' : '#e9ecef'};
            color: ${isUser ? 'white' : 'black'};
        `;
        messagesDiv.appendChild(msg);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    // Send Message to Bedrock Backend
    async function handleSend() {
        if (!input) return;

        const query = input.value.trim();
        if (!query) return;

        appendMessage(query, true);
        input.value = '';

        // Add loading indicator
        appendMessage("...", false);
        const loadingBubble = messagesDiv.lastChild;

        try {
            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: query })
            });

            if (!response.ok) throw new Error("API network response issue");

            const data = await response.json();
            loadingBubble.innerText = data["answer"] || "Sorry, I couldn't process that.";
        } catch (error) {
            console.error("Error connecting to Bedrock API:", error);
            loadingBubble.innerText = "Connection error. Please try again.";
        }
    }

    // Event Listeners for actions
    if (sendBtn && input) {
        sendBtn.addEventListener('click', handleSend);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSend();
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatbot);
} else {
    initChatbot();
}
