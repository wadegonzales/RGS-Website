const track = document.getElementById("hold");
const cardClicked = document.querySelectorAll('.player');

window.onload = () => {
    track.dataset.mouseDownAt = "0"; // Default: not dragging
    track.dataset.prevPercentage = "0"; // Default: no previous movement
    track.dataset.percentage = "0"; // Default: initial position
};

window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;
};

window.onmouseup = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
};

window.onmousemove = e => {
    if (track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -75;
    let nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;
    nextPercentage = Math.min(nextPercentage, 0);
    nextPercentage = Math.max(nextPercentage, -100);
    track.dataset.percentage = nextPercentage;

    track.animate({
        transform: `translate(${nextPercentage}%, -50%)`
    }, { duration: 800, fill: "forwards" });

    for (const image of track.getElementsByClassName("image")) {
        image.animate({
            objectPosition: `${nextPercentage + 100}% 50%`
        }, { duration: 800, fill: "forwards" });
    }
};

document.querySelectorAll('.hold > .player').forEach(player => {
    player.addEventListener('click', () => {
        
        const action = player.getAttribute('data-action');
        
        // Hide all card descriptions initially
        document.querySelectorAll('.card-description').forEach(desc => {
            desc.style.display = 'none';
        });

        // Display the corresponding card description based on the action
        switch(action) {
            case 'ml-action':
                document.querySelector('.card-description.ml').style.display = 'block';
                break;
            case 'valo-action':
                document.querySelector('.card-description.valo').style.display = 'block';
                break;
            case 'hok-action':
                document.querySelector('.card-description.hok').style.display = 'block';
                break;
            case 'codm-action':
                document.querySelector('.card-description.codm').style.display = 'block';
                break;
            case 'dota-action':
                document.querySelector('.card-description.dota').style.display = 'block';
                break;
            case 'tekken-action':
                document.querySelector('.card-description.tekken').style.display = 'block';
                break;                   
            default:
                console.log('Default action or unknown action.');
        }
    });
});
// Add event listeners for the close buttons
document.querySelectorAll('.description-close').forEach(button => {
    button.addEventListener('click', () => {
        // Hide the parent .card-description with fade-out effect
        const description = button.parentElement;
        description.classList.remove('show');
        
        // Reset the background filter
        document.querySelector('.interface').classList.remove('dark-background');
    });
});

let isDragging = false;

document.querySelectorAll('.hold > .player').forEach(player => {
    player.addEventListener('mousedown', (e) => {
        isDragging = false; // Reset dragging state on mouse down
    });

    player.addEventListener('mousemove', (e) => {
        isDragging = true; // Set dragging state when mouse is moving
    });

    player.addEventListener('click', (e) => {
        if (!isDragging) { // Only trigger click if not dragging
            const action = player.getAttribute('data-action');

            // Hide all card descriptions initially
            document.querySelectorAll('.card-description').forEach(desc => {
                desc.classList.remove('show');
            });

            // Display the corresponding card description with slide-in effect
            switch (action) {
                case 'ml-action':
                    document.querySelector('.card-description.ml').classList.add('show');
                    break;
                case 'valo-action':
                    document.querySelector('.card-description.valo').classList.add('show');
                    break;
                case 'hok-action':
                    document.querySelector('.card-description.hok').classList.add('show');
                    break;
                case 'codm-action':
                    document.querySelector('.card-description.codm').classList.add('show');
                    break;
                case 'dota-action':
                    document.querySelector('.card-description.dota').classList.add('show');
                    break;
                case 'tekken-action':
                    document.querySelector('.card-description.tekken').classList.add('show');
                    break;
                default:
                    console.log('Default action or unknown action.');
            }
        }
    });
});

// Add event listeners for the close buttons
document.querySelectorAll('.description-close').forEach(button => {
    button.addEventListener('click', () => {
        // Hide the parent .card-description with slide-out effect
        const description = button.parentElement;
        description.classList.remove('show');
    });
});


// Add event listeners to each player card
document.querySelectorAll('.player').forEach(player => {
    player.addEventListener('mousedown', (e) => {
        isDragging = false; // Reset the drag flag on mouse down
        const startX = e.clientX;

        // Listen for mousemove to detect dragging
        const onMouseMove = (e) => {
            const currentX = e.clientX;
            if (Math.abs(currentX - startX) > 5) { // If dragging distance > 5px, consider it dragging
                isDragging = true;
            }
        };

        const onMouseUp = () => {
            if (!isDragging) { // Trigger only if not dragging
                const cardSheet = player.querySelector('.card-sheet');

                // Close all other card sheets before showing the clicked one
                document.querySelectorAll('.card-sheet').forEach(sheet => {
                    sheet.classList.remove('show');
                });
                

                // Show the clicked card's sheet with the animation
                cardSheet.classList.add('show');
                

                // Add a scale effect to the clicked card
                player.classList.add('clicked');

                // Remove the 'clicked' class after 0.3s to allow future clicks to trigger the scale effect
                setTimeout(() => {
                    player.classList.remove('clicked');
                }, 300);
            }

            // Clean up event listeners after mouse up
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        // Add event listeners for mousemove and mouseup
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
});

// Add event listeners for the close buttons
document.querySelectorAll('.close-description').forEach(button => {
    button.addEventListener('click', () => {
        // Hide the .card-sheet when the close button is clicked
        const cardSheet = button.closest('.card-sheet');
        cardSheet.classList.remove('show');
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.player');
  
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add 'visible' class with a delay
          entry.target.style.transitionDelay = `${index * 0.2}s`; // Stagger effect
          entry.target.classList.add('visibles');
          observer.unobserve(entry.target); // Stops observing once it fades in
        }
      });
    }, {
      threshold: 0.1 // Trigger when 10% of the element is visible
    });
  
    fadeElements.forEach(el => observer.observe(el));
  });