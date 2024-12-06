import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBl5Rp-B2hgfTUZfqouhTQyC-YGKtChbmw",
  authDomain: "levelup-academy-ed1f8.firebaseapp.com",
  projectId: "levelup-academy-ed1f8",
  storageBucket: "levelup-academy-ed1f8.appspot.com",
  messagingSenderId: "713868724590",
  appId: "1:713868724590:web:93c4500ae58f11caa5d97f",
  measurementId: "G-4L810NXKQW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const updateNavbar = async (user) => {
  if (user) {
    try {
      // Fetch user data from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (userDoc.exists()) {
        const userData = userDoc.data();

        // Update the UI elements only if they exist
        const userNameElem = document.getElementById("loginbutton");
        const userAvatarElem = document.getElementById("images");

        if (userNameElem) {
          userNameElem.textContent = userData.name ;
              // Add click event to redirect to profile page
              userNameElem.style.cursor = "pointer"; // Change cursor to indicate clickability
              userNameElem.addEventListener("click", () => {
                window.location.href = "/login/profile.html"; // Replace with your actual profile page URL
             
              });
        }else{
            userNameElem.removeAttribute("id");
            userNameElem.id="";
        }

        if (userAvatarElem) {
          userAvatarElem.src = userData.photoURL || "/images/default-avatar.png";
        }
      } else {

        console.error("User document not found in Firestore.");
      }
    } catch (error) {

      console.error("Error fetching user data:", error); 
    }
 }else{
  
  }
};

// Listen for authentication state changes
onAuthStateChanged(auth, (user) => {
  updateNavbar(user); // Only updates the UI for logged-in users


}

);
