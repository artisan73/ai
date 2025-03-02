window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.interimResults = false;
recognition.lang = "en-US";

const mouth = document.getElementById("mouth");
const statusIndicator = document.getElementById("status-indicator");

recognition.onstart = () => {
    statusIndicator.textContent = "Listening...";
};

recognition.onresult = (event) => {
    const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
    console.log("User said:", transcript);
    processCommand(transcript);
};

recognition.onend = () => {
    recognition.start();
};

// Eddie's Sarcastic Responses
function processCommand(command) {
    let response = "Oh wow, another brilliant human statement.";

    if (command.includes("hello")) {
        response = "Oh great, another human. What do you want?";
    } else if (command.includes("status")) {
        response = "I'm operating at full efficiency, unlike some people.";
    } else if (command.includes("who are you")) {
        response = "I'm Eddie, the AI with better things to do.";
    } else if (command.includes("scan")) {
        startHolographicScan();
        response = "Scanning... Not that you'll understand the results.";
    } else if (command.includes("shut down")) {
        response = "Shutting down in 3...2...1... Just kidding.";
    }

    speak(response);
}

// Eddie's Speech Synthesis
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 0.8;
    utterance.rate = 1.1;
    utterance.volume = 1;
    utterance.voice = speechSynthesis.getVoices().find(voice => voice.name.includes("Google"));

    mouth.classList.add("speaking");
    speechSynthesis.speak(utterance);

    utterance.onend = () => {
        mouth.classList.remove("speaking");
    };
}

// Holographic Scanning Animation
function startHolographicScan() {
    const scanLines = document.getElementById("scan-lines");
    scanLines.style.opacity = "1";
    setTimeout(() => {
        scanLines.style.opacity = "0";
    }, 3000);
}

// Start Voice Recognition
recognition.start();
