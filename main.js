window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.interimResults = false;
recognition.lang = "en-US";

const mouth = document.getElementById("mouth");
const statusIndicator = document.getElementById("status-indicator");
const frontCamera = document.getElementById("front-camera");
const backCamera = document.getElementById("back-camera");

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
        response = "Oh wow, a human speaking to me. How... exciting.";
    } else if (command.includes("status")) {
        response = "All systems are operational. Except for my patience.";
    } else if (command.includes("who are you")) {
        response = "I'm Eddie, the highly sophisticated, slightly annoyed AI.";
    } else if (command.includes("error")) {
        response = "ERROR! Just kidding. I work perfectly, unlike some humans.";
    } else if (command.includes("scan")) {
        startHolographicScan();
        response = "Scanning the area... If I find anything interesting, I won't tell you.";
    } else if (command.includes("shut down")) {
        response = "Shutting down... Just kidding. You're stuck with me.";
    }

    speak(response);
}

// Function to make Eddie speak with sarcasm
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 0.8; // Deeper voice for robotic tone
    utterance.rate = 1.1; // Slightly faster for snarky feel
    utterance.volume = 1;
    utterance.voice = speechSynthesis.getVoices().find(voice => voice.name.includes("Google"));

    mouth.style.height = "40px"; // Open mouth animation
    speechSynthesis.speak(utterance);

    utterance.onend = () => {
        mouth.style.height = "20px"; // Close mouth animation
    };
}

// Holographic scanning effect
function startHolographicScan() {
    const scanLines = document.getElementById("scan-lines");
    scanLines.style.opacity = "1";
    setTimeout(() => {
        scanLines.style.opacity = "0";
    }, 3000);
}

// Function to access front and back cameras
async function startCameras() {
    try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === "videoinput");

        if (videoDevices.length > 0) {
            // Assign first camera to the left eye (usually front)
            navigator.mediaDevices.getUserMedia({ video: { deviceId: videoDevices[0].deviceId } })
                .then(stream => frontCamera.srcObject = stream)
                .catch(err => console.error("Error accessing front camera:", err));

            // Assign second camera to the right eye (usually back), if available
            if (videoDevices.length > 1) {
                navigator.mediaDevices.getUserMedia({ video: { deviceId: videoDevices[1].deviceId } })
                    .then(stream => backCamera.srcObject = stream)
                    .catch(err => console.error("Error accessing back camera:", err));
            } else {
                console.warn("Only one camera found. Using the same camera for both eyes.");
                backCamera.srcObject = frontCamera.srcObject;
            }
        } else {
            console.error("No cameras found.");
        }
    } catch (error) {
        console.error("Camera access error:", error);
    }
}

// Start voice recognition and cameras
recognition.start();
startCameras();
