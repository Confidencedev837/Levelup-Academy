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


  // Import the Firebase libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBl5Rp-B2hgfTUZfqouhTQyC-YGKtChbmw",
    authDomain: "levelup-academy-ed1f8.firebaseapp.com",
    projectId: "levelup-academy-ed1f8",
    storageBucket: "levelup-academy-ed1f8.appspot.com",
    messagingSenderId: "713868724590",
    appId: "1:713868724590:web:93c4500ae58f11caa5d97f",
    measurementId: "G-4L810NXKQW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Handle the sign-up form submission
const signupForm = document.getElementById('signup-form');
signupForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission from refreshing the page

    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    // Sign up the user using Firebase Authentication
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in successfully
            const user = userCredential.user;
            console.log('User signed up:', user);
            alert('Sign up successful! Welcome, ' + email);
            window.location.href = 'profile.html'; // Redirect to the profile page
        })
        .catch((error) => {
            // Handle errors
              // Handle specific Firebase errors with custom messages
              let errorMessage = 'An error occurred. Please try again.';
            
              if (error.code === 'auth/email-already-in-use') {
                  errorMessage = 'This email is already associated with an account.';
              } else if (error.code === 'auth/invalid-email') {
                  errorMessage = 'The email address you entered is invalid.';
              } else if (error.code === 'auth/weak-password') {
                  errorMessage = 'Your password is too weak. Please choose a stronger password.';
              } else if (error.code === 'auth/missing-email') {
                  errorMessage = 'Please enter an email address.';
              }
  
              console.error('Error Code:', error.code); // Log the specific Firebase error (for debugging)
              alert(errorMessage); // Show the custom error message
        });
});
