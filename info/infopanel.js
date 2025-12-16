// ------ Profile ------
function showScreen(screenToShow) {
  const screens = [def.signUpLoginScreen, def.profileScreen];
  screens.forEach(screen => {
    if (screen === screenToShow) {
      screen.classList.add('sll-visible');
      screen.classList.remove('sll-hidden');
    } else {
      screen.classList.add('sll-hidden');
      screen.classList.remove('sll-visible');
    }
  });
}
async function signUp() {
  const usernameInput = document.getElementById('signUpUsername');
  const passwordInput = document.getElementById('signUpPassword');
  const signUpOut = document.getElementById('signUpOut');
  const username = usernameInput.value.trim();
  const password = passwordInput.value;
  if (!username || !password) {
    signUpOut.textContent = "Please enter a username and password.";
    return;
  }
  if (username.length < 3 || username.length > 10) {
    signUpOut.textContent = "Username must be between 3 and 10 characters.";
    return;
  }
  const email = username + "@neutroxity.com";
  try {
    const result = await auth.createUserWithEmailAndPassword(email, password);
    const user = result.user;
    fb.currentUser = user;
    fb.db = firebase.database();
    const userData = {
      uid: user.uid,
      email: email,
      username: username,
      highscores: {
        snakeHighScore: 0,
        jetShooterHighScore: 0,
      },
      themes: {}
    };
    await fb.db.ref(`users/${user.uid}`).set(userData);
    startApp(user);
    signUpOut.textContent = `User created: ${user.email}`;
    await wait(4000);
    showScreen(def.profileScreen);
    usernameInput.value = '';
    passwordInput.value = '';
    signUpOut.textContent = '';
  } catch (err) {
  console.error("Sign-up error:", err);
  const rawMessage = err?.message ?? String(err);
  const cleanedMessage = rawMessage.replace("Firebase: ", "").replace("FirebaseError: ", "");
  signUpOut.textContent = "Unable to create an account, please try again.\nError: " + cleanedMessage;
}

}
async function signIn() {
  const usernameInput = document.getElementById('loginUsername');
  const passwordInput = document.getElementById('loginPassword');
  const loginOut = document.getElementById('loginOut');
  const username = usernameInput.value.trim();
  const password = passwordInput.value;
  if (!username || !password) {
    loginOut.textContent = "Please enter a username and password.";
    return;
  }
  const email = username + "@neutroxity.com";
  try {
    await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    const result = await auth.signInWithEmailAndPassword(email, password);
    fb.currentUser = result.user;
    fb.db = firebase.database();
    startApp(result.user);
    loginOut.textContent = `User signed in: ${result.user.email}`;
    await wait(4000);
    showScreen(def.profileScreen);
    usernameInput.value = '';
    passwordInput.value = '';
    loginOut.textContent = '';
  } 
  catch (err) {
    console.error("Sign-in error:", err);
    loginOut.textContent = "Unable to login, please check your login info.";
  }
}
async function signOut() {
  const profileOut = document.getElementById('profileOut');
  try {
    await auth.signOut();
    fb.currentUser = null;
    fb.db = null;
    profileOut.textContent = "Successfully signed out";
    await wait(4000);
    showScreen(def.signUpLoginScreen);
    profileOut.textContent = '';
  } catch (err) {
    console.error("Sign-out error:", err);
    profileOut.textContent = "Unable to sign out, please try again later";
  }
}

// ------- Theme -------
function updateColor(varName, color) {
  def.root.style.setProperty(varName, color);
}
[def.accent1Picker, def.accent2Picker, def.background1Picker, def.background2Picker, def.card1Picker, def.card2Picker].forEach(picker => {
  picker.addEventListener('input', e => {
    const id = e.target.id;
    const varName =
      id === 'accent1Picker' ? '--accent1' :
      id === 'accent2Picker' ? '--accent2' :
      id === 'background1Picker' ? '--background1' :
      id === 'background2Picker' ? '--background2' :
      id === 'card1Picker' ? '--accent5' :
      '--accent6';
    const key =
      id === 'card1Picker' ? 'accent5' :
      id === 'card2Picker' ? 'accent6' :
      id.replace('Picker', '');
    updateColor(varName, e.target.value);
    localStorage.setItem(key, e.target.value);
  });
});
def.accent1Picker.addEventListener('input', (e) => {
  updateColor('--accent1', e.target.value);
  localStorage.setItem('accent1', e.target.value);
});
def.accent2Picker.addEventListener('input', (e) => {
  updateColor('--accent2', e.target.value);
  localStorage.setItem('accent2', e.target.value);
});
def.background1Picker.addEventListener('input', (e) => {
  updateColor('--background1', e.target.value);
  localStorage.setItem('background1', e.target.value);
});
def.background2Picker.addEventListener('input', (e) => {
  updateColor('--background2', e.target.value);
  localStorage.setItem('background2', e.target.value);
});
def.card1Picker.addEventListener('input', (e) => {
  updateColor('--accent5', e.target.value);
  localStorage.setItem('accent5', e.target.value);
});
def.card2Picker.addEventListener('input', (e) => {
  updateColor('--accent6', e.target.value);
  localStorage.setItem('accent6', e.target.value);
});
def.resetBtn.addEventListener('click', () => {
  const defaults = {
    accent1: '#3c78d8',
    accent2: '#9900ff',
    background1: '#172D50',
    background2: '#480A71',
    accent5: '#0c3b83',
    accent6: '#241b77'
  };
  for (const [key, value] of Object.entries(defaults)) {
    const varName =
      key === 'accent1' ? '--accent1' :
      key === 'accent2' ? '--accent2' :
      key === 'background1' ? '--background1' :
      key === 'background2' ? '--background2' :
      key === 'accent5' ? '--accent5' :
      '--accent6';
    updateColor(varName, value);
    localStorage.removeItem(key);
    const input = document.getElementById(
      key === 'accent5' ? 'card1Picker' :
      key === 'accent6' ? 'card2Picker' :
      key + 'Picker'
    );
    if (input) input.value = value;
  }
});
def.themeButtons.forEach(button => {
  button.addEventListener('click', () => {
    const theme = def.themes[button.dataset.theme];
    Object.entries(theme).forEach(([key, val]) => {
      const varName =
        key === 'accent1' ? '--accent1' :
        key === 'accent2' ? '--accent2' :
        key === 'background1' ? '--background1' :
        key === 'background2' ? '--background2' :
        key === 'card1' ? '--accent5' :
        '--accent6';
      updateColor(varName, val);
      localStorage.setItem(
        key === 'card1' ? 'accent5' :
        key === 'card2' ? 'accent6' : key, val
      );
    });
    accent1Picker.value = theme.accent1;
    accent2Picker.value = theme.accent2;
    background1Picker.value = theme.background1;
    background2Picker.value = theme.background2;
    card1Picker.value = theme.card1;
    card2Picker.value = theme.card2;
  });
});
function getCurrentThemeData() {
  return {
    name: def.ownThemeNameInput.value.trim() || 'My Theme',
    accent1: localStorage.getItem('accent1') || '#3c78d8',
    accent2: localStorage.getItem('accent2') || '#9900ff',
    background1: localStorage.getItem('background1') || '#172D50',
    background2: localStorage.getItem('background2') || '#480A71',
    card1: localStorage.getItem('accent5') || '#0c3b83',
    card2: localStorage.getItem('accent6') || '#241b77',
    timestamp: Date.now()
  };
}
function saveThemeSelf() {
  def.ownThemeSave.classList.remove('hidden');
  def.saveThemeNameBtn.onclick = () => {
    const themeData = {
      name: def.ownThemeNameInput.value.trim() || 'My Theme',
      accent1: def.accent1Picker.value,
      accent2: def.accent2Picker.value,
      background1: def.background1Picker.value,
      background2: def.background2Picker.value,
      card1: def.card1Picker.value,
      card2: def.card2Picker.value,
      timestamp: Date.now()
    };
    const myThemes = JSON.parse(localStorage.getItem('myThemes')) || {};
    myThemes[themeData.name] = themeData;
    localStorage.setItem('myThemes', JSON.stringify(myThemes));
    addThemeToPreviews(themeData);
    def.ownThemeOut.textContent = `${themeData.name} saved.`;
    setTimeout (() => {
      def.ownThemeSave.classList.add('hidden');
      def.ownThemeNameInput.value = "";
      def.ownThemeOut.textContent = "";
    }, 4000);
  };
}
function saveThemePublic() {
  def.ownThemeSave.classList.remove('hidden');
  def.ownThemeOut.textContent = "Enter a name and click Save Theme.";
  def.saveThemeNameBtn.onclick = () => {
    const themeData = getCurrentThemeData();
    if (!window.firebase || !firebase.database) {
      def.ownThemeOut.textContent = 'Unable to save theme. Try again later.';
      return;
    }
    def.db.ref('publicThemes').push(themeData)
      .then(() => {
        setTimeout (() => {
          def.ownThemeOut.textContent = `Published ${themeData.name} to public themes!\nWill be reviewed before appearing.`;
          def.ownThemeSave.classList.add('hidden');
        }, 4000);
      })
      .catch(err => {
        def.ownThemeOut.textContent = 'Error: ' + err.message;
      });
      def.ownThemeNameInput.value = "";
      def.ownThemeOut.textContent = "";
  };
}
function addThemeToPreviews(themeData) {
  const previewsContainer = document.querySelector('.theme-previews');
  if (document.getElementById('theme-' + themeData.name)) return;
  const btn = document.createElement('button');
  btn.className = 'theme-btn';
  btn.id = 'theme-' + themeData.name;
  btn.innerHTML = `
    <div class="preview-box" style="
      --background: linear-gradient(45deg, ${themeData.background1}, ${themeData.background2});
      --card: linear-gradient(45deg, ${themeData.card1}, ${themeData.card2});
      --accent: linear-gradient(45deg, ${themeData.accent1}, ${themeData.accent2});
      background: var(--background);
    "></div>
    <span>${themeData.name}</span>
  `;
  btn.addEventListener('click', () => {
    updateColor('--accent1', themeData.accent1);
    updateColor('--accent2', themeData.accent2);
    updateColor('--background1', themeData.background1);
    updateColor('--background2', themeData.background2);
    updateColor('--accent5', themeData.card1);
    updateColor('--accent6', themeData.card2);
    def.accent1Picker.value = themeData.accent1;
    def.accent2Picker.value = themeData.accent2;
    def.background1Picker.value = themeData.background1;
    def.background2Picker.value = themeData.background2;
    def.card1Picker.value = themeData.card1;
    def.card2Picker.value = themeData.card2;
  });
  previewsContainer.appendChild(btn);
}
window.addEventListener('load', () => {
  const myThemes = JSON.parse(localStorage.getItem('myThemes')) || {};
  Object.values(myThemes).forEach(themeData => addThemeToPreviews(themeData));
});
