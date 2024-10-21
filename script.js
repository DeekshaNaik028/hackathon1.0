// Configuration
const HUGGING_FACE_API_URL = "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium";
const HUGGING_FACE_API_KEY = "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"; // Replace with your actual API key

document.addEventListener('DOMContentLoaded', () => {
    // =============== NAVIGATION ===============
    const navLinks = document.querySelectorAll('.nav-links li');
    const pages = document.querySelectorAll('.page');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const targetPage = link.getAttribute('data-page');
            
            // Update active states
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Show target page
            pages.forEach(page => {
                page.classList.remove('active');
                if (page.id === targetPage) {
                    page.classList.add('active');
                }
            });
        });
    });
    // =============== MOOD TRACKING ===============
    const moodOptions = document.querySelectorAll('.mood-options');
    let moodData = JSON.parse(localStorage.getItem('moodData')) || [];

    const moodColors = {
        'great': '#4caf50',
        'good': '#8bc34a',
        'okay': '#ffc107',
        'bad': '#ff9800',
        'awful': '#f44336'
    };

    moodOptions.forEach(options => {
        options.addEventListener('click', () => {
          const mood = options.getAttribute('data-mood');
          const timestamp = new Date().toISOString();
          
          moodData.push({ mood, timestamp });
          localStorage.setItem('moodData', JSON.stringify(moodData));
          
          updateMoodChart();
          showMoodConfirmation(mood);
      
          // Remove "selected" class from all options
          moodOptions.forEach(options => options.style.backgroundColor = '');
          options.style.backgroundColor = moodColors[mood];
          // Add "selected" class to clicked option
          options.classList.add('selected');
        });
      });

    // Mood Chart functionality
    function updateMoodChart() {
        const ctx = document.getElementById('moodChart').getContext('2d');
        const moodValues = {
            'great': 5,
            'good': 4,
            'okay': 3,
            'bad': 2,
            'awful': 1
        };

        // Process data for the chart
        const lastSevenDays = moodData
            .slice(-7)
            .map(entry => ({
                date: new Date(entry.timestamp).toLocaleDateString(),
                value: moodValues[entry.mood]
            }));

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: lastSevenDays.map(day => day.date),
                datasets: [{
                    label: 'Mood Rating',
                    data: lastSevenDays.map(day => day.value),
                    borderColor: '#6c63ff',
                    tension: 0.4,
                    fill: false
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        min: 0,
                        max: 6,
                        ticks: {
                            stepSize: 1,
                            callback: function(value) {
                                return ['', 'Awful', 'Bad', 'Okay', 'Good', 'Great'][value];
                            }
                        }
                    }
                }
            }
        });
    }

    function showMoodConfirmation(mood) {
        const confirmationDiv = document.createElement('div');
        confirmationDiv.className = 'mood-confirmation';
        confirmationDiv.textContent = `Mood logged: ${mood}`;
        confirmationDiv.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #4caf50;
            color: white;
            padding: 1rem;
            border-radius: 10px;
            animation: slideIn 0.3s ease-out;
        `;
        document.body.appendChild(confirmationDiv);
        
        setTimeout(() => {
            confirmationDiv.remove();
        }, 3000);
    }
// document.addEventListener('DOMContentLoaded', () => {
//     // =============== NAVIGATION ===============
//     const navLinks = document.querySelectorAll('.nav-links li');
//     const pages = document.querySelectorAll('.page');

//     navLinks.forEach(link => {
//         link.addEventListener('click', () => {
//             const targetPage = link.getAttribute('data-page');
            
//             // Update active states
//             navLinks.forEach(l => l.classList.remove('active'));
//             link.classList.add('active');
            
//             // Show target page
//             pages.forEach(page => {
//                 page.classList.remove('active');
//                 if (page.id === targetPage) {
//                     page.classList.add('active');
//                 }
//             });
//         });
//     });
//     // =============== MOOD TRACKING ===============
//     const moodOptions = document.querySelectorAll('.mood-option');
//     let moodData = JSON.parse(localStorage.getItem('moodData')) || [];

//     const moodColors = {
//         'great': '#4caf50',
//         'good': '#8bc34a',
//         'okay': '#ffc107',
//         'bad': '#ff9800',
//         'awful': '#f44336'
//     };

//     moodOptions.forEach(opt => {
//         opt.addEventListener('click', () => {
//           const mood = option.getAttribute('data-mood');
//           const timestamp = new Date().toISOString();
          
//           moodData.push({ mood, timestamp });
//           localStorage.setItem('moodData', JSON.stringify(moodData));
          
//           updateMoodChart();
//           showMoodConfirmation(mood);
      
//           // Remove "selected" class from all options
//           moodOptions.forEach(option => option.style.backgroundColor = '');
//           option.style.backgroundColor = moodColors[mood];
//           // Add "selected" class to clicked option
//           option.classList.add('selected');
//         });
//       });

    // Mood Chart functionality
    function updateMoodChart() {
        const ctx = document.getElementById('moodChart').getContext('2d');
        const moodValues = {
            'great': 5,
            'good': 4,
            'okay': 3,
            'bad': 2,
            'awful': 1
        };

        // Process data for the chart
        const lastSevenDays = moodData
            .slice(-7)
            .map(entry => ({
                date: new Date(entry.timestamp).toLocaleDateString(),
                value: moodValues[entry.mood]
            }));

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: lastSevenDays.map(day => day.date),
                datasets: [{
                    label: 'Mood Rating',
                    data: lastSevenDays.map(day => day.value),
                    borderColor: '#6c63ff',
                    tension: 0.4,
                    fill: false
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        min: 0,
                        max: 6,
                        ticks: {
                            stepSize: 1,
                            callback: function(value) {
                                return ['', 'Awful', 'Bad', 'Okay', 'Good', 'Great'][value];
                            }
                        }
                    }
                }
            }
        });
    }
    function showMoodConfirmation(mood) {
        const confirmationDiv = document.createElement('div');
        confirmationDiv.className = 'mood-confirmation';
        confirmationDiv.textContent = `Mood logged: ${mood}`;
        confirmationDiv.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #4caf50;
            color: white;
            padding: 1rem;
            border-radius: 10px;
            animation: slideIn 0.3s ease-out;
        `;
        document.body.appendChild(confirmationDiv);
        
        setTimeout(() => {
            confirmationDiv.remove();
        }, 3000);
    }


    // =============== ENHANCED CHAT WITH AI ===============
    const chatMessages = document.getElementById('chatMessages');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendMessage');
    let conversationHistory = [];

    // Crisis detection
    const crisisKeywords = [
        "suicide", "kill myself", "want to die", "end it all",
        "hurt myself", "self-harm", "emergency", "abuse"
    ];

    const crisisResponses = {
        suicide: "I notice you're experiencing severe distress. Please know that you're not alone. Consider calling the 988 Suicide & Crisis Lifeline (988) - they have trained counselors available 24/7.",
        emergency: "If you're experiencing a medical or mental health emergency, please call emergency services (911) immediately.",
        abuse: "If you're in immediate danger, please contact emergency services. The National Domestic Violence Hotline (1-800-799-SAFE) is also available 24/7.",
        default: "I notice you might be in distress. Please remember that help is available 24/7 through the Crisis Lifeline (988)."
    };

    function detectCrisis(message) {
        return crisisKeywords.some(keyword => 
            message.toLowerCase().includes(keyword)
        );
    }

    function getCrisisResponse(message) {
        if (message.toLowerCase().includes("suicide")) {
            return crisisResponses.suicide;
        } else if (message.toLowerCase().includes("abuse")) {
            return crisisResponses.abuse;
        }
        return crisisResponses.default;
    }

    async function getAIResponse(message) {
        try {
            conversationHistory.push({ role: "user", content: message });
            const conversationContext = conversationHistory
                .map(msg => msg.content)
                .join("\n");

            const response = await fetch(HUGGING_FACE_API_URL, {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${HUGGING_FACE_API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    inputs: conversationContext,
                    parameters: {
                        max_length: 150,
                        temperature: 0.7,
                        top_p: 0.9,
                        repetition_penalty: 1.2
                    }
                })
            });

            const data = await response.json();
            const aiResponse = data[0].generated_text;

            conversationHistory.push({ role: "assistant", content: aiResponse });
            if (conversationHistory.length > 10) {
                conversationHistory = conversationHistory.slice(-10);
            }

            return aiResponse + "\n\nPlease note: I'm an AI companion and not a substitute for professional mental health care.";

        } catch (error) {
            console.error("Error getting AI response:", error);
            return "I apologize, but I'm having trouble responding right now. Please try again later.";
        }
    }

    function addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
        messageDiv.innerHTML = `<p>${content}</p>`;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    async function sendMessage() {
        const message = messageInput.value.trim();
        if (message) {
            messageInput.value = '';
            addMessage(message, true);

            const typingDiv = document.createElement('div');
            typingDiv.className = 'message bot typing';
            typingDiv.innerHTML = '<p>Typing...</p>';
            chatMessages.appendChild(typingDiv);

            try {
                let response;
                if (detectCrisis(message)) {
                    response = getCrisisResponse(message);
                } else {
                    response = await getAIResponse(message);
                }

                typingDiv.remove();
                addMessage(response);

            } catch (error) {
                console.error("Error:", error);
                typingDiv.remove();
                addMessage("I apologize, but I'm having trouble responding right now. Please try again later.");
            }
        }
    }

    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // =============== EXERCISE FUNCTIONALITY ===============
    const exerciseButtons = document.querySelectorAll('.start-exercise');
    exerciseButtons.forEach(button => {
        button.addEventListener('click', startExercise);
    });

    function startExercise(e) {
        const exerciseType = e.target.parentElement.querySelector('h3').textContent;
        const exerciseDuration = e.target.parentElement.querySelector('p').textContent;
        
        // Redirect to the appropriate exercise page
        if (exerciseType === 'Deep Breathing') {
            window.location.href = 'deep-breathing.html';
        } else if (exerciseType === 'Body Scan') {
            window.location.href = 'body-scan.html';
        } else if (exerciseType === 'Guided Meditation') {
            window.location.href = 'guided-meditation.html';
        }
    }


    // =============== EMERGENCY SUPPORT ===============
    const sosButton = document.querySelector('.sos-btn');
    sosButton.addEventListener('click', () => {
        const emergencyMessage = `
            Emergency Resources:
            - National Crisis Hotline: 988
            - Emergency Services: 911
            - Crisis Text Line: Text HOME to 741741
            
            Would you like to be connected to emergency services?
        `;
        if (confirm(emergencyMessage)) {
            window.location.href = 'tel:911';
        }
    });

    // Initialize mood chart on load
    updateMoodChart();
});