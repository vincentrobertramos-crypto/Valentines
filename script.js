// Array of floating icons and words
const floatingItems = ["💖", "💗", "💕", "🌸", "🌷", "🌹", "💋", "love", "you", "Creng", "Crelyn"];
const confettiItems = ["💖", "💗", "💕", "🌸", "🌷", "🌹"];

const gifList = [
    "GIF/manja1.gif",
    "GIF/manja2.gif",
    "GIF/manja3.gif",
    "GIF/manja4.gif",
    "GIF/manja5.gif",
    "GIF/manja7.gif",
    "GIF/manja8.gif",
];

const messageList = [
    "Please? 🥺",
    "Malulungkowt akow 😢",
    "Pretty please? 🙏",
    "Mute kita eme",
    "You're breaking my heart! 💔",
    "Iiyak ako sa gedli",
];

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicToggle");

if (musicBtn && music) {
    musicBtn.addEventListener("click", () => {
        if (music.paused) {
            music.play();
            musicBtn.innerText = "🔊";
        } else {
            music.pause();
            musicBtn.innerText = "🎵";
        }
    });
}

let noClickCount = 0;
const noButton = document.getElementById("noBtn");
const yesButton = document.getElementById("yesBtn");
const mainGif = document.getElementById("mainGif");

// ===== NORMAL FLOATING ELEMENTS =====
function createFloating() {
    const element = document.createElement("div");
    element.classList.add("floating");
    element.textContent = floatingItems[Math.floor(Math.random() * floatingItems.length)];
    element.style.left = Math.random() * 100 + "vw";
    const isWord = isNaN(Number(element.textContent)) && !/[^\w\s]/.test(element.textContent);
    element.style.fontSize = isWord ? (Math.random() * 10 + 14) + "px" : (Math.random() * 20 + 20) + "px";
    element.style.animationDuration = (Math.random() * 3 + 4) + "s";
    if (isWord) {
        element.style.color = ["#ff4d6d", "#ff69b4", "#ff99aa", "#ff6666"][Math.floor(Math.random() * 4)];
    }
    document.body.appendChild(element);
    setTimeout(() => element.remove(), 7000);
}
setInterval(createFloating, 250);

// ===== JUMP LOGIC =====
function moveButton() {
    const boxSize = 300; 
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const randomX = centerX + (Math.random() * boxSize - boxSize / 2) - (noButton.offsetWidth / 2);
    const randomY = centerY + (Math.random() * boxSize - boxSize / 2) - (noButton.offsetHeight / 2);

    noButton.style.position = "fixed";
    noButton.style.left = `${randomX}px`;
    noButton.style.top = `${randomY}px`;
    noButton.style.zIndex = "999"; 
}

// ===== FIREWORK CONFETTI =====
function createFirework() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    for (let i = 0; i < 80; i++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");
        confetti.textContent = confettiItems[Math.floor(Math.random() * confettiItems.length)];
        confetti.style.position = "fixed";
        confetti.style.left = centerX + "px";
        confetti.style.top = centerY + "px";
        confetti.style.fontSize = (Math.random() * 25 + 20) + "px";
        confetti.style.zIndex = 9999;
        document.body.appendChild(confetti);
        const angle = Math.random() * 2 * Math.PI;
        const speed = Math.random() * 300 + 200;
        confetti.animate([
            { transform: `translate(0, 0)`, opacity: 1 },
            { transform: `translate(${Math.cos(angle) * speed}px, ${Math.sin(angle) * speed * -1}px) rotate(720deg)`, opacity: 0 }
        ], { duration: 1500, easing: "ease-out", fill: "forwards" });
        setTimeout(() => confetti.remove(), 2000);
    }
}

// ===== EVENT LISTENERS =====
if (noButton) {
    noButton.addEventListener("click", () => {
        noClickCount++;
        
        const messageElement = document.querySelector(".message");

        if (noClickCount % 3 === 0) {
            const multiplier = noClickCount / 3;

            // --- THE DISAPPEARING LOGIC ---
            if (multiplier >= 7) {
                noButton.style.display = "none";
                yesButton.style.position = "static";
                yesButton.style.left = "auto";
                yesButton.style.transform = "scale(2.5)";
                yesButton.style.margin = "0 auto";
                
                if (mainGif) mainGif.src = gifList[6];
                if (messageElement) messageElement.innerText = "WA KA IT CHOICE LOVE";
                return;
            }

            // --- REGULAR SNAP-BACK LOGIC ---
            noButton.style.position = ""; 
            noButton.style.left = "";
            noButton.style.top = "";
            noButton.style.right = ""; 
            
            noButton.style.transform = `scale(${Math.max(0.4, 1 - multiplier * 0.1)})`; 
            yesButton.style.transform = `scale(${1 + multiplier * 0.2})`; 
            
            // Change GIF and Message
            if (mainGif) {
                const index = (multiplier - 1) % gifList.length;
                mainGif.src = gifList[index] + "?t=" + new Date().getTime(); 
                
                // Update the text message here
                if (messageElement) {
                    messageElement.innerText = messageList[index];
                }
            }
        } else {
            moveButton();
        }
    });
}

if (yesButton) {
    yesButton.addEventListener("click", () => {
        createFirework();
        
        // Hide the No button just in case it's still there
        noButton.style.display = "none";
        
        // Change the Header Text
        document.querySelector("h1").innerText = "Yay! See you soon! ❤️";
        
        // Change to your "Success" GIF
        if (mainGif) {
            mainGif.src = "GIF/manja.gif"; 
            
            // Optional: Reset scale to normal so the happy GIF looks clean
            mainGif.style.transform = "scale(1)";
        }

        // Optional: Reset Yes button scale so it doesn't cover the text
        yesButton.style.transform = "scale(1)";
        yesButton.style.transition = "transform 0.3s ease";
    });

}
