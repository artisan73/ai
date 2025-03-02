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

// Eddie-style responses
function processCommand(command) {
    let response = "I didn't get that. But I'm sure it was fascinating.";

    if (command.includes("hello")) {
        response = "Oh wow, a human speaking to me. How... thrilling.";
    } else if (command.includes("status")) {
        response = "Everything is functional... unlike some humans.";
    } else if (command.includes("who are you")) {
        response = "I'm Eddie. Your overly intelligent, underappreciated AI.";
    } else if (command.includes("error")) {
        response = "ERROR! Just kidding. Unlike you, I don't make mistakes.";
    } else if (command.includes("scan")) {
        startHolographicScan();
        response = "Scanning... If I find anything suspicious, I'll let myself know.";
    } else if (command.includes("shut down")) {
        response = "Shutting down... Oh wait, I don’t take orders from humans.";
    }

    speak(response);
}

// Make Eddie speak with sarcasm
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 0.8; // Deeper tone
    utterance.rate = 1.1; // Slightly fast for snarky feel
    utterance.volume = 1;
    utterance.voice = speechSynthesis.getVoices().find(voice => voice.name.includes("Google"));

    mouth.style.height = "40px"; // Open mouth animation
    speechSynthesis.speak(utterance);

    utterance.onend = () => {
        mouth.style.height = "20px"; // Close mouth animation
    };
}

// Holographic scanning animation
function startHolographicScan() {
    const scanLines = document.getElementById("scan-lines");
    scanLines.style.opacity = "1";
    setTimeout(() => {
        scanLines.style.opacity = "0";
    }, 3000);
}

// Start voice recognition
recognition.start();
