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

// Initialize the Appwrite client
const client = new Appwrite.Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite endpoint
    .setProject('674ef28f0002deb93b5f'); // Your project ID

// Create an instance of the Account API
const account = new Appwrite.Account(client);

// Handle the signup form submission
const signupForm = document.getElementById('signup-form');
signupForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from submitting the default way (page refresh)

    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    // Call the create user method using the Account API
    account.create('unique()', email, password, name)
    .then(response => {
        console.log('User created:', response);
        alert('Signup successful! Please login.');
        showForm('login'); // Show login form after successful signup
    })
    .catch(error => {
        console.error('Error creating user:', error);
        // Show the error message to the user
        alert(`Signup failed: ${error.message}`);
    });

});

// Handle the login form submission

const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting the default way (page refresh)

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Call the createEmailSession method for logging in
    const account = new Appwrite.Account(client);
    account.createSession(email, password)
        .then(response => {
            console.log('Login successful:', response);
            alert('Login successful! Redirecting to your profile page...');
            window.location.href = '/profile.html'; // Replace with the actual path to your profile page
        })
        .catch(error => {
            console.error('Login failed:', error);
            // Show the error message to the user
            alert(`Login failed: ${error.message}`);
        });
});