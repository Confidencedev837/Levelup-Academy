document.addEventListener("DOMContentLoaded", () => {
    const sentences = [
      "Welcome back you've been missed",
      "Don't have an account?",
      "Step right up and create one!",
      "Rest assured you're in good hands."
    ];
  
    let currentSentence = 0;
    let currentText = "";
    let isTyping = true;
    let currentIndex = 0;
  
    const textElement = document.querySelector('.logintypewriter');
  
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


  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBl5Rp-B2hgfTUZfqouhTQyC-YGKtChbmw",
    authDomain: "levelup-academy-ed1f8.firebaseapp.com",
    projectId: "levelup-academy-ed1f8",
    storageBucket: "levelup-academy-ed1f8.firebasestorage.app",
    messagingSenderId: "713868724590",
    appId: "1:713868724590:web:93c4500ae58f11caa5d97f",
    measurementId: "G-4L810NXKQW"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
