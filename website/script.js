document.addEventListener('contextmenu', (e) => e.preventDefault());
document.addEventListener('keydown', (e) => {
  if (e.key === "F12" || (e.ctrlKey && (e.key === "i" || e.key === "I"))) {
    e.preventDefault();
  }
});
document.addEventListener('keydown', (event) => {
  // Check for Ctrl + Shift + C
  if (event.ctrlKey && event.shiftKey && event.code === 'KeyC') {
    event.preventDefault();
    alert('Inspect Element is disabled...No Code here');
  }
  // Check for Ctrl + Shift + I
  if (event.ctrlKey && event.shiftKey && event.code === 'KeyI') {
    event.preventDefault();
    alert('Developer Tools are disabled....Pls Rest!!');
  }
  // Check for F12 key
  if (event.code === 'F12') {
    event.preventDefault();
    alert('Developer Tools are disabled.');
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const sentences = [
    "Welcome to LEVEL-UP ACADEMY!",
    "This is the best Place for you to begin your tech journey!",
    "Level up your skills with the experts.",
    "Enjoy the smooth learning curve."
  ];

  let currentSentence = 0;
  let currentText = "";
  let isTyping = true;
  let currentIndex = 0;

  const textElement = document.querySelector('.typewriter');

  function typeText() {
    if (isTyping) {
      if (currentIndex < sentences[currentSentence].length) {
        currentText += sentences[currentSentence][currentIndex];
        textElement.textContent = currentText;
        currentIndex++;
        setTimeout(typeText, 100);
      } else {
        isTyping = false;
        setTimeout(typeText, 1000); 
      }
    } else {
      if (currentIndex > 0) {
        currentText = currentText.slice(0, -1);
        textElement.textContent = currentText;
        currentIndex--;
        setTimeout(typeText, 50); 
      } else {
        isTyping = true;
        currentSentence = (currentSentence + 1) % sentences.length;
        setTimeout(typeText, 500); // always make it delay before starting the next sentence
      }
    }
  }

  // Start the typewriter shit
  typeText();
});








function toggleMenu() {
    const menu = document.querySelector('.menu');
    const menuIcon = document.querySelector('.menu-icon');
    menu.classList.toggle('active');
    menuIcon.classList.toggle('active');
}






  document.addEventListener("DOMContentLoaded", () => {
    const gridItems = document.querySelectorAll(".grid-item");

    const observerOptions = {
      root: null, // Use the viewport as the container
      threshold: 0.8, // Trigger when 80% o
    };

    const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible"); // Add the 'visible' class
          observer.unobserve(entry.target); // Stop observing this item
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    gridItems.forEach(item => observer.observe(item));
  });


  
  document.addEventListener("DOMContentLoaded", () => {
    const gridItems = document.querySelectorAll(".Griditem");

    const observerOptions = {
      root: null, // Use the viewport as the container
      threshold: 0.5, // Trigger when 80% o
    };

    const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible"); // Add the 'visible' class
          observer.unobserve(entry.target); // Stop observing this item
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    gridItems.forEach(item => observer.observe(item));
  });

 
