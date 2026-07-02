// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.

importScripts('https://www.gstatic.com/firebasejs/10.10.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.10.0/firebase-messaging-compat.js');

//import { onBackgroundMessage } from "firebase/messaging/sw";
// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object


  try {

    firebase.initializeApp({
      apiKey: "AIzaSyB__cHcE3VVH6RHxaSPRKL-gbeSshO5kHw",
      authDomain: "notificationdeev.firebaseapp.com",
      projectId: "notificationdeev",
      storageBucket: "notificationdeev.firebasestorage.app",
      messagingSenderId: "25160666719",
      appId: "1:25160666719:web:3e9be3a34266f44e1a95ea",
      measurementId: "G-8VMBE69G9S"
    });

    // Retrieve an instance of Firebase Messaging so that it can handle background
    // messages.
    const messaging = firebase.messaging();


  } catch (error) {
      console.error('Error fetching data:', error);
  }

//self.addEventListener('install', (event) => {
   // event.waitUntil(initializingFirebaseApp());
//});
