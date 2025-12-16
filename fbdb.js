const fb = getId();
function getId() {
  const firebaseConfig = {
    apiKey: "AIzaSyDaQEkGy2NYGlEUjAXs5GKkqPRjAfVnqNs",
    authDomain: "neutrotech-backup.firebaseapp.com",
    databaseURL: "https://neutrotech-backup-default-rtdb.firebaseio.com",
    projectId: "neutrotech-backup",
    storageBucket: "neutrotech-backup.firebasestorage.app",
    messagingSenderId: "577271578104",
    appId: "1:577271578104:web:9d000cd7fc1d54f001aa0d",
    measurementId: "G-ZX3T3TSGZZ"
  };
  let db = null;
  let currentUser = null;
  let currentUserName = null;
  let elementDataDB = [];
  return {
    firebaseConfig, db, currentUser, currentUserName, elementDataDB
  }
}

firebase.initializeApp(fb.firebaseConfig);
firebase.appCheck().activate('6LeV1igsAAAAADMuEzlTwfep6NQUBb851WtaMT_S',true);
const auth = firebase.auth();
auth.onAuthStateChanged(user => {
  if (user) {
    fb.currentUser = user;
    fb.db = firebase.database();
    console.log("Signed in as:", user.email);
    if (window.location.href.indexOf("/info/") > -1)showScreen(def.profileScreen);
    startApp(user);
  } 
  else {
    fb.currentUser = null;
    fb.db = firebase.database();
    console.log("No user signed in");
    if (window.location.href.indexOf("/info/") > -1) showScreen(def.signUpLoginScreen);
  }
  if (window.location.href.indexOf("/games/")>-1) {
    showSnakeLeaderScores();
    showJetShooterLeaderScores();
  }
});
function startApp(user) {
  firebase.appCheck().getToken(false)
    .then(tokenResponse => {
      if (tokenResponse) console.log("App Check token recieved");
      fb.db.ref(`users/${user.uid}/test`).set({ message: "Hello!" })
        .then(() => console.log("Data written successfully!"))
        .catch(err => console.error("Write failed:", err));
        if (window.location.href.indexOf("/chemistry/") > -1)loadElementData();
        if (window.location.href.indexOf("/games/")>-1)def.neutropolisGame.classList.remove('hidden');
      fb.db.ref(`users/${user.uid}/username`).on("value", snapshot => {
        console.log("Username:", snapshot.val());
        fb.currentUserName = snapshot.val();
      });
      fb.db.ref(`users/${user.uid}/test`).on("value", snapshot => {
        console.log("Database value:", snapshot.val());
      });
    })
    .catch(err => {
      if (err) console.error("App Check failed, error: ", err)
    });
}
function addUserData(newData) {
  if (!fb.db || !fb.currentUser) return console.error("Database or user not initialized!");
  fb.db.ref(`users/${fb.currentUser.uid}`).update(newData)
    .then(() => console.log("Data updated successfully!"))
    .catch(err => console.error("Failed to update data:", err));
}
function getUserData() {
  if (!fb.db || !fb.currentUser) return console.error("Database or user not initialized!");
  fb.db.ref(`users/${fb.currentUser.uid}`).once("value")
    .then(snapshot => {
      if (snapshot.exists()) {
        console.log("User data:", snapshot.val());
      } else {
        console.log("No data found for this user.");
      }
    })
    .catch(err => console.error("Failed to get data:", err));
}

// ---------- Supporter ----------
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}