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


  import { Client, Account } from 'appwrite';

// Initialize the Appwrite client
export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite endpoint (default is Appwrite Cloud)
    .setProject('674ef28f0002deb93b5f'); // Replace <PROJECT_ID> with your actual project ID

// Create an instance of the Account API
export const account = new Account(client);

// You can remove the ID import unless you have a specific use for it
