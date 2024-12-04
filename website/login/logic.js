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
    alert('Developer Tools are disabled....Please Rest!!');
  }
  // Check for F12 key
  if (event.code === 'F12') {
    event.preventDefault();
    alert('Developer Tools are disabled.');
  }
});



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
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

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
const db = getFirestore(app);

// Handle the sign-up form submission
const signupForm = document.getElementById('signup-form');

signupForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form refresh

    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value.trim();
    const name = document.getElementById('signup-name').value.trim();
    const phone = document.getElementById('signup-phone').value.trim();

    // Validate input fields
    if (!name || !email || !password || !phone) {
        alert('Please fill in all fields.');
        return;
    }

    // Validate phone number (simple regex for phone number format)
    const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 format
    if (!phoneRegex.test(phone)) {
        alert('Please enter a valid phone number (e.g., +2348030060000).');
        return;
    }

    try {
        // Create user with Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save user data to Firestore
        await setDoc(doc(db, "users", user.uid), {
            name: name,
            email: user.email,
            phone: phone,
            createdAt: new Date().toISOString(),
        });

        alert('Registration successful! Welcome aboard!');
        window.location.href = 'profile.html'; // Navigate to profile page
    } catch (error) {
        // Log the error silently
        console.error('Sign-up error:', error.message);

        // Display user-friendly error messages
        handleSignupError(error);
    }
});

// Error handling function
function handleSignupError(error) {
    let errorMessage = 'An unexpected error occurred. Please try again later.';

    if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered. Please log in.';
    } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
    } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Your password is too weak. Please use a stronger password.';
    }

    alert(errorMessage);
}


//login logic
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Success: Navigate to profile page or show success message
            alert('Login successful!');
            window.location.href = 'profile.html'; // Replace with the actual path to your profile page
        })
        .catch((error) => {
            // Handle specific Firebase errors with custom messages
            let errorMessage = 'An error occurred. Please try again.';
            
            if (error.code === 'auth/user-not-found') {
                errorMessage = 'No account found with this email.';
            } else if (error.code === 'auth/wrong-password') {
                errorMessage = 'Incorrect password. Please try again.';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'The email address you entered is invalid.';
            } else if (error.code === 'auth/missing-email') {
                errorMessage = 'Please enter an email address.';
            }

            console.error('Error Code:', error.code); // Log the specific Firebase error (for debugging)
            alert(errorMessage); // Show the custom error message
        });
});



