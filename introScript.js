// Select the button and video elements
const button = document.querySelector('.custom-button');
const backgroundVideo = document.getElementById('videos');
const originalText = button.textContent.toLowerCase();
const skips = document.getElementById('skip-button');

function skip(){
    window.location.href = "./homepage.html";
}
;


function login(){
    const fadeScreen = document.getElementById("fadeScreen");
    const transitionVideo = document.getElementById("transitionVideo");

    setTimeout(() => {
        skips.style.opacity = 1; // Add the visible class after the delay
      }, 2000);
    
    // Step 1: Start the fade-in effect
    fadeScreen.style.opacity = 1;
    button.style.opacity = 0;
  
    setTimeout(() => {
      // Step 2: Play the video after the fade-in
      transitionVideo.style.display = "block";
      transitionVideo.play();
  
      // Step 3: Navigate to the new page after the video ends
      transitionVideo.addEventListener("ended", () => {
        window.location.href = "homepage.html"; // Replace with your desired URL
      });
    }, 1000); // Match the fade-in duration
}


let animationFrame;
let iteration = 0;
let isHovered = false; // Track hover state

// Function to generate random letter animation
function animateText(reverse = false, toUpper = false) {
    cancelAnimationFrame(animationFrame); // Stop any existing animation to prevent overlap

    button.textContent = originalText
        .split('')
        .map((char, index) => {
            if (index < iteration) {
                return toUpper ? originalText[index].toUpperCase() : originalText[index].toLowerCase();
            }
            const randomChar = Math.random() < 0.5
                ? String.fromCharCode(65 + Math.floor(Math.random() * 26))
                : String.fromCharCode(48 + Math.floor(Math.random() * 10));
            return randomChar;
        })
        .join('');

    if (reverse) {
        if (iteration > 0) {
            iteration -= 0.3;
            animationFrame = requestAnimationFrame(() => animateText(true, false));
        } else {
            button.textContent = originalText;
            cancelAnimationFrame(animationFrame);
        }
    } else {
        if (iteration <= originalText.length) {
            iteration += 0.3;
            animationFrame = requestAnimationFrame(() => animateText(false, true));
        } else if (toUpper) {
            button.textContent = originalText.toUpperCase();
            cancelAnimationFrame(animationFrame);
        }
    }
}

// Event listeners for button hover effects
button.addEventListener('mouseover', () => {
    if (isHovered) return; // Prevent re-triggering if already hovered
    isHovered = true;
    iteration = 0;
    animateText(false, true);
    backgroundVideo.style.filter = 'brightness(0.2)'; // Dim background video
});

button.addEventListener('mouseout', () => {
    if (!isHovered) return;
    isHovered = false;
    iteration = originalText.length;
    animateText(true, false);
    backgroundVideo.style.filter = 'brightness(0.4)'; // Dim background video
});
