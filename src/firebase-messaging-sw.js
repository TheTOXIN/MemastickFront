// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/5.8.6/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.8.6/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  apiKey: 'AIzaSyDTkeBmdNaZzFkFxYVUjJeCZQ0Vg9qbHT8', // SECURED BY CORS
  authDomain: 'memastick-d525f.firebaseapp.com',
  databaseURL: 'https://memastick-d525f.firebaseio.com',
  projectId: 'memastick-d525f',
  storageBucket: 'memastick-d525f.appspot.com',
  messagingSenderId: '1004879436852'
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

