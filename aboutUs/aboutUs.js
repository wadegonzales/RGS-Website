
// Scroll event for container A
document.addEventListener("scroll", () => {
    const imageContainerA = document.querySelector(".A");
    const scrollA = window.scrollY;

    imageContainerA.style.transform = `translateX(${-scrollA / 2}px)`;
});

// Scroll event for container B
document.addEventListener("scroll", () => {
    const imageContainerB = document.querySelector(".B");
    const scrollB = window.scrollY;

    imageContainerB.style.transform = `translateX(${-1000 + scrollB / 2}px)`;
});

// Intersection Observer for visibility animation
document.addEventListener('DOMContentLoaded', () => {
    // Group all elements to be observed
    const elementsToObserve = [
        { selector: '.polygon', visibleClass: 'visibles' },
        { selector: '.rgsIntro', visibleClass: 'visibless' }
    ];

    elementsToObserve.forEach(({ selector, visibleClass }) => {
        const elements = document.querySelectorAll(selector);

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add 'visible' class with a delay
                    entry.target.style.transitionDelay = `${index * 0.2}s`; // Stagger effect
                    entry.target.classList.add(visibleClass);
                    observer.unobserve(entry.target); // Stops observing once it fades in
                }
            });
        }, {
            threshold: 0.1 // Trigger when 10% of the element is visible
        });

        elements.forEach(el => observer.observe(el));
    });
});

// Add click event listener to each main container for flipping
const containers = document.querySelectorAll('.main-container');

containers.forEach(container => {
    container.addEventListener('click', () => {
        // Toggle the 'flipped' class
        container.classList.toggle('flipped');
    });
});

// Variable to store the last clicked container
/*let lastClickedContainer = null;

containers.forEach(container => {
    container.addEventListener('click', () => {
        // If there is a last clicked container, reset it to the original state
        if (lastClickedContainer && lastClickedContainer !== container) {
            lastClickedContainer.classList.remove('flipped');
        }

        // Toggle the 'flipped' class on the current container
        container.classList.toggle('flipped');

        // Update the last clicked container to be the current one
        lastClickedContainer = container;
    });
});*/document.addEventListener('DOMContentLoaded', () => {
  // Select the text elements
  const textElement = document.querySelector('.aboutUsDesc');
  const textElements = document.querySelector('.rgs-about-desc');
  const textElementss = document.querySelector('.rgs-about-descs');

  // Get the text content from data attributes
  const textContent = textElement.dataset.text;
  const textContents = textElements.dataset.text;
  const textContentss = textElementss.dataset.text;

  // Split the text into individual letters and wrap each in a span for each element
  textElement.innerHTML = textContent.split('').map((letter) => `<span class="letter">${letter}</span>`).join('');
  textElements.innerHTML = textContents.split('').map((letter) => `<span class="letter">${letter}</span>`).join('');
  textElementss.innerHTML = textContentss.split('').map((letter) => `<span class="letter">${letter}</span>`).join('');

  // Select all letter elements for each text element
  const letters = document.querySelectorAll('.aboutUsDesc .letter');
  const lettersForSecondElement = document.querySelectorAll('.rgs-about-desc .letter');
  const lettersForThirdElement = document.querySelectorAll('.rgs-about-descs .letter');

  // Calculate total letters for each element
  const totalLetters = letters.length;
  const totalLettersForSecondElement = lettersForSecondElement.length;
  const totalLettersForThirdElement = lettersForThirdElement.length;

  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;

    // Calculate the progress for each text element with adjusted delays for faster highlighting
    const maxScrollFirst = (document.body.scrollHeight / 2.5) - window.innerHeight;
    const progressFirst = Math.min(scrollPosition / maxScrollFirst, 1);

    // Make the second text element highlight faster by reducing the divisor
    const maxScrollSecond = (document.body.scrollHeight / 1.4) - window.innerHeight; // Reduced divisor for faster effect
    const progressSecond = Math.min(Math.max((scrollPosition - maxScrollFirst) / maxScrollSecond, 0), 1);

    // Make the third text element highlight faster by reducing the divisor
    const maxScrollThird = (document.body.scrollHeight / 3.2) - window.innerHeight; // Reduced divisor for faster effect
    const progressThird = Math.min(Math.max((scrollPosition - (maxScrollFirst + maxScrollSecond)) / maxScrollThird, 0), 1);

    // Calculate how many letters to highlight for each element
    const lettersToHighlight = Math.floor(progressFirst * totalLetters);
    const lettersToHighlightForSecondElement = Math.floor(progressSecond * totalLettersForSecondElement);
    const lettersToHighlightForThirdElement = Math.floor(progressThird * totalLettersForThirdElement);

    // Highlight letters for the first text element
    letters.forEach((letter, index) => {
      if (index < lettersToHighlight) {
        letter.classList.add('highlight');
      } else {
        letter.classList.remove('highlight');
      }
    });

    // Highlight letters for the second text element
    lettersForSecondElement.forEach((letter, index) => {
      if (index < lettersToHighlightForSecondElement) {
        letter.classList.add('highlight');
      } else {
        letter.classList.remove('highlight');
      }
    });

    // Highlight letters for the third text element
    lettersForThirdElement.forEach((letter, index) => {
      if (index < lettersToHighlightForThirdElement) {
        letter.classList.add('highlight');
      } else {
        letter.classList.remove('highlight');
      }
    });

    // Highlight the whole paragraph if at the end of the scroll for the first text element
    if (progressFirst === 1) {
      textElement.classList.add('highlight-paragraph');
    } else {
      textElement.classList.remove('highlight-paragraph');
    }

    // Highlight the whole paragraph if at the end of the scroll for the second text element
    if (progressSecond === 1) {
      textElements.classList.add('highlight-paragraph');
    } else {
      textElements.classList.remove('highlight-paragraph');
    }

    // Highlight the whole paragraph if at the end of the scroll for the third text element
    if (progressThird === 1) {
      textElementss.classList.add('highlight-paragraph');
    } else {
      textElementss.classList.remove('highlight-paragraph');
    }
  });
});


const bgDev = document.querySelector('.devs-container');
const bgBlack = document.querySelector('.blackBg');
const firstNameElement = document.querySelector('.Name.First');
const lastNameElement = document.querySelector('.Name.Last');
const devs = document.querySelectorAll('.dev');
const beforeElement = bgDev.querySelector('::before');
const textBg = document.querySelector('.dev-name-slide');

document.querySelectorAll('.dev').forEach(dev => {
  dev.addEventListener('mouseover', () => {
      const saturate = dev.querySelector('.dev-profile');
      const action = dev.getAttribute('data-action');

    
      textBg.removeAttribute('background-color');
      textBg.style.backgroundImage = 'linear-gradient(45deg,#ff6600fb,#a21c01,#f3c017)';

      switch (action) {
          case 'wade-action':
              firstNameElement.style.transform = 'translateX(350%)';
              lastNameElement.style.transform = 'translate(220%, 70%)';
              firstNameElement.innerText = 'WADE';
              lastNameElement.innerText = 'GONZALES';
              saturate.style.filter = 'saturate(1)';
              break;
          case 'dan-action':
              firstNameElement.style.transform = 'translateX(300%)';
              lastNameElement.style.transform = 'translate(220%, 70%)';
              firstNameElement.innerText = 'DANIEL';
              lastNameElement.innerText = 'TABUNLUPA';
              saturate.style.filter = 'saturate(1)';
              break;
          case 'arv-action':
              firstNameElement.style.transform = 'translateX(450%)';
              lastNameElement.style.transform = 'translate(300%, 70%)';
              firstNameElement.innerText = 'ARVY';
              lastNameElement.innerText = 'LEGARDE';
              saturate.style.filter = 'saturate(1)';
              break;
          case 'aki-action':
              firstNameElement.style.transform = 'translateX(850%)';
              lastNameElement.style.transform = 'translate(400%, 70%)';
              firstNameElement.innerText = 'AKI';
              lastNameElement.innerText = 'VIADOR';
              saturate.style.filter = 'saturate(1)';
              break;
          default:
              console.log('Default action or unknown action.');
      }
  });

  dev.addEventListener('mouseout', () => {
      console.log('Mouseout triggered for:', dev); 
      bgBlack.style.opacity = '0';
      firstNameElement.removeAttribute('style');
      lastNameElement.removeAttribute('style');
      firstNameElement.style.left = '0';
      textBg.removeAttribute('style');
      const saturate = dev.querySelector('.dev-profile');
      if (saturate) {
          saturate.style.filter = 'saturate(0)'; 
      }
  });
});


