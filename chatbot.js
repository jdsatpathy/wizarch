// Configuration
const API_ENDPOINT = "https://6sxlyd8041.execute-api.us-east-1.amazonaws.com/ask";

window.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('bedrock-chat-container');
    const input = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const closeBtn = document.getElementById('close-chat-btn');
    const minimizeBtn = document.getElementById('minimize-btn'); // 1. Added Minimize Button Element
    const chatBody = document.getElementById('chat-body');      // 2. Added Chat Body Wrapper Element
    const messagesDiv = document.getElementById('chat-messages');

    // Auto Pop-up after 2 seconds
    setTimeout(() => {
        if (container) {
            container.style.display = 'flex';
        }
    }, 2000);

    // Close window handler
    if (closeBtn && container) {
        closeBtn.addEventListener('click', () => {
            container.style.display = 'none';
        });
    }

    // 3. Minimize / Restore Handler
    if (minimizeBtn && container && chatBody) {
        minimizeBtn.addEventListener('click', () => {
            const isMinimized = chatBody.style.display === 'none';

            if (isMinimized) {
                // Restore widget
                chatBody.style.display = 'flex';
                container.style.height = '500px';
                minimizeBtn.textContent = '−';
            } else {
                // Minimize widget
                chatBody.style.display = 'none';
                container.style.height = 'auto';
                minimizeBtn.textContent = '+';
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
});

