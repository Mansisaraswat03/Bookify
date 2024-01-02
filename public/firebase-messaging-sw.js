importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyCFyjzP9LhbIf54fWxhJP12BC-TmEYYmiY",
  authDomain: "bookstore-60181.firebaseapp.com",
  projectId: "bookstore-60181",
  storageBucket: "bookstore-60181.appspot.com",
  messagingSenderId: "964036647944",
  appId: "1:964036647944:web:16bb6215ad7c5797b8c5bd"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});