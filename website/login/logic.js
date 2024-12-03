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
    .setProject('674ef28f0002deb93b5f'); // Replace with your actual project ID

// Create an instance of the Account API
const account = new Appwrite.Account(client);

// Handle the signup form submission
const signupForm = document.getElementById('signup-form');

// Listen for form submission
signupForm.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form from submitting the default way (page refresh)

  const name = document.getElementById('signup-name').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  const users = new Appwrite.Users(client); // Ensure Users API is correctly initialized

  // Call the create user method
  users.create('unique()', email, password, name)
    .then(response => {
      console.log('User created:', response);
      alert('Signup successful! Please login.');
      showForm('login'); // Show login form after successful signup
    })
    .catch(error => {
      console.error('Error creating user:', error);
      alert('Signup failed. Please try again.');
    });
});
