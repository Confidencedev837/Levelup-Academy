import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, onAuthStateChanged ,signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

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

onAuthStateChanged(auth, async (user) => {
    if (user) {
        try {
            // Get user data from Firestore
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                document.getElementById('profile-name').innerText = userData.name;
                document.getElementById('profile-email').innerText = userData.email;
            
                // Assuming 'createdAt' is a Firestore timestamp object
                const createdAtTimestamp = userData.createdAt;
            
                if (createdAtTimestamp) {
                    // Convert the Firestore Timestamp to milliseconds
                    const milliseconds = createdAtTimestamp.seconds * 1000 + createdAtTimestamp.nanoseconds / 1000000;
                    
                    // Create a Date object
                    const date = new Date(milliseconds);
            
                    // Format the date to a more readable format
                    const formattedDate = date.toLocaleString('en-US', {
                        weekday: 'long',   // "Monday"
                        year: 'numeric',   // "2024"
                        month: 'long',     // "December"
                        day: 'numeric',    // "4"
                        hour: '2-digit',   // "03"
                        minute: '2-digit', // "45"
                        second: '2-digit', // "30"
                        hour12: true       // "AM/PM"
                    });
            
                    // Set the formatted date as the innerText
                    document.getElementById('createdat').innerText = formattedDate;
                } else {
                    console.error('No createdAt timestamp found!');
                }
            } else {
                console.error('No user data found!');
            }
            
        } catch (error) {
            console.error('Error fetching user data:', error.message);
        }
    } else {
        window.location.href = 'loginpage.html'; // Redirect if not logged in
    }
});
   document.getElementById('logout-button').addEventListener('click', function() {
    signOut(auth)
        .then(() => {
            // User signed out successfully, redirect to login page
            window.location.href = 'loginpage.html';  // Replace with your login page URL
        })
        .catch((error) => {
            // Handle any errors
            console.error("Error signing out: ", error);
        });})
