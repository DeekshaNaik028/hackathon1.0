function initializeBotpress() {
    // Create and append Botpress script
    const script = document.createElement('script');
    script.src = "https://cdn.botpress.cloud/webchat/v1/inject.js";
    script.async = true;
    document.body.appendChild(script);

    // Show loading indicator
    showLoading();

    // Configure and initialize webchat when script loads
    script.onload = () => {
        if (window.botpressWebChat) {
            window.botpressWebChat.init({
                // Replace these with your actual Botpress credentials
                "botId": "ed0474c3-0a9e-4a17-b154-80e098f47382",
                "clientId": "fbfbb823-052e-4377-a809-49a156054526",
                
                "hostUrl": "https://cdn.botpress.cloud/webchat/v1",
                "messagingUrl": "https://messaging.botpress.cloud",
                "botName": "Support Bot",
                
                // Webchat styling and behavior
                "stylesheet": "https://webchat-styler-css.botpress.app/prod/code/4f9f251e-5f9f-4da3-8d83-935d1661829c/v44889/style.css",
                "useSessionStorage": true,
                "showConversationsButton": false,
                "enableTranscriptDownload": false,
                "disableAnimations": true,
                "closeOnEscape": false,
                "showHeaderIcon": true,
                "composerPlaceholder": "Type your message here...",
                
                "containerWidth": "100%",
                "layoutWidth": "100%",
                "hideWidget": true,
                
                // Theme customization
                "theme": "light",
                "themePath": "https://myserver.com/assets/my-custom-theme.css"
            });

            // Configure container
            window.botpressWebChat.onEvent(setupChatContainer, ['LIFECYCLE.LOADED']);

        } else {
            console.error('Botpress WebChat not loaded');
            handleBotpressError(new Error('Botpress WebChat not loaded'));
        }
    };

    script.onerror = () => {
        console.error('Failed to load Botpress WebChat script');
        handleBotpressError(new Error('Failed to load Botpress WebChat script'));
    };
}

function setupChatContainer() {
    const chatContainer = document.querySelector('.chat-container');
    if (chatContainer) {
        // Clear existing chat elements
        chatContainer.innerHTML = '';

        // Create Botpress container
        const botpressContainer = document.createElement('div');
        botpressContainer.id = 'botpress-webchat-container';
        chatContainer.appendChild(botpressContainer);

        // Render the Botpress webchat into our container
        window.botpressWebChat.render(botpressContainer, { hideWidget: true });

        // Hide loading indicator
        hideLoading();
    } else {
        console.error('Chat container not found');
    }
}
// Show loading indicator
function showLoading() {
    const loadingElement = document.getElementById('chat-loading');
    if (loadingElement) {
        loadingElement.style.display = 'block';
    }
}

// Hide loading indicator
function hideLoading() {
    const loadingElement = document.getElementById('chat-loading');
    if (loadingElement) {
        loadingElement.style.display = 'none';
    }
}

// Add event listeners for Botpress events
function addBotpressEventListeners() {
    if (window.botpressWebChat) {
        window.botpressWebChat.onEvent(
            function(event) {
                switch (event.type) {
                    case 'message':
                        console.log('New message:', event.message);
                        break;
                    case 'typing':
                        console.log('Bot is typing...');
                        break;
                    case 'error':
                        handleBotpressError(event.error);
                        break;
                }
            },
            ['message', 'typing', 'error']
        );
    }
}

// Initialize when DOM is loaded
function addBotpressEventListeners() {
    if (window.botpressWebChat) {
        window.botpressWebChat.onEvent(
            function(event) {
                switch (event.type) {
                    case 'message':
                        console.log('New message:', event.message);
                        // You can add UI updates here, e.g., scrolling to bottom
                        scrollChatToBottom();
                        break;
                    case 'typing':
                        console.log('Bot is typing...');
                        showTypingIndicator();
                        break;
                    case 'done_typing':
                        hideTypingIndicator();
                        break;
                    case 'error':
                        handleBotpressError(event.error);
                        break;
                }
            },
            ['message', 'typing', 'done_typing', 'error']
        );
    }
}
function scrollChatToBottom() {
    const chatContainer = document.querySelector('.chat-container');
    if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
}

// Function to show typing indicator
function showTypingIndicator() {
    const typingIndicator = document.createElement('div');
    typingIndicator.id = 'typing-indicator';
    typingIndicator.textContent = 'Bot is typing...';
    document.querySelector('.chat-container').appendChild(typingIndicator);
}

// Function to hide typing indicator
function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}
// Function to retry Botpress connection
function retryBotpressConnection() {
    showLoading();
    initializeBotpress();
}

// Responsiveness check
window.addEventListener('resize', () => {
    const chatContainer = document.querySelector('.chat-container');
    if (chatContainer) {
        if (window.innerWidth <= 768) {
            chatContainer.style.height = '400px';
        } else {
            chatContainer.style.height = '500px';
        }
    }
});

// Chat reinitialization on page navigation
function setupChatInitialization() {
    const chatSection = document.getElementById('chat');
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (chatSection.classList.contains('active')) {
                    initializeBotpress();
                }
            }
        });
    });

    observer.observe(chatSection, { attributes: true });
}

function addManualChatButton() {
    const chatSection = document.querySelector('.chat-section');
    if (chatSection) {
        const button = document.createElement('button');
        button.textContent = 'Open Chat';
        button.onclick = openBotpressChat;
        chatSection.insertBefore(button, chatSection.firstChild);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    try {
        initializeBotpress();
        debugBotpress();
        addManualChatButton();
    } catch (error) {
        handleBotpressError(error);
    }
});