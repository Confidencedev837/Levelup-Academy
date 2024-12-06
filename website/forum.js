// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getFirestore, collection, addDoc, query, onSnapshot } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";

// Firebase setup
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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Global variable to store current user's name
let currentUserName = "Guest User";

// Listen for auth state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUserName = user.displayName || user.email.split('@')[0]; // Use displayName or email username
  } else {
    currentUserName = "Guest User"; // Default to Guest User if not logged in
  }
});

// Render comments dynamically for a specific post
const renderComments = (postId) => {
  const commentsContainer = document.getElementById(`comments-${postId}`);
  const commentsQuery = query(collection(db, "posts", postId, "comments"));

  onSnapshot(commentsQuery, (snapshot) => {
    commentsContainer.innerHTML = ""; // Clear previous comments
    snapshot.forEach((doc) => {
      const comment = doc.data();
      const commentElement = document.createElement("div");
      commentElement.className = "comment";
      commentElement.innerHTML = `<strong>${comment.userName}:</strong> ${comment.text}`;
      commentsContainer.appendChild(commentElement);
    });
  });
};

// Add a comment to a post
const addComment = async (postId) => {
    // Grab the input field for the specific post ID
    const inputField = document.getElementById(`comment-input-${postId}`);
    
    // Get the text from the input field and trim any extra spaces
    const commentText = inputField.value.trim();
  
    // If the comment text is empty, stop the function and do nothing
    if (!commentText) return;
  
    // Add the comment to Firestore's "posts" collection under a specific postId
    await addDoc(collection(db, "posts", postId, "comments"), {
      text: commentText,  // The text of the comment
      userName: currentUserName,  // The name of the current user
      timestamp: new Date()  // The current date/time when the comment was added
    });
  
    // Clear the input field after the comment is posted
    inputField.value = "";
  };
  
// Initialize comments for hardcoded posts
renderComments("post1");
renderComments("post2");
