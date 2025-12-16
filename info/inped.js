const def = getId();
function getId() {
    const accent1Picker = document.getElementById('accent1Picker');
    const accent2Picker = document.getElementById('accent2Picker');
    const background1Picker = document.getElementById('background1Picker');
    const background2Picker = document.getElementById('background2Picker');
    const card1Picker = document.getElementById('card1Picker');
    const card2Picker = document.getElementById('card2Picker');
    const root = document.documentElement;
    const resetBtn = document.getElementById('resetColors');
    const themeButtons = document.querySelectorAll('.theme-btn');
    const ownThemeNameInput = document.getElementById('ownThemeName');
    const ownThemeOut = document.getElementById('ownThemeOut');
    const ownThemeSave = document.getElementById('ownThemeSave');
    const saveThemeNameBtn = document.getElementById('saveThemeName');
    const themes = {
        neutroxity: { accent1: '#3c78d8', accent2: '#9900ff', background1: '#172D50', background2: '#480A71', card1: '#0c3b83', card2: '#241b77' },
        aurora: { accent1: '#2ae9c0', accent2: '#2ea6ab', background1: '#141e30', background2: '#243b55', card1: '#1e6369', card2: '#0072ff' },
        neonDark: { accent1: '#ff00cc', accent2: '#3333ff', background1: '#0f0c29', background2: '#24243e', card1: '#302b63', card2: '#4134a1' },
        cosmicDawn: { accent1: '#ff6f61', accent2: '#ff9966', background1: '#0b0c10', background2: '#1f2833', card1: '#2e3239', card2: '#3d3f45' },
        galacticVoid: { accent1: '#6a11cb', accent2: '#2575fc', background1: '#0a0a23', background2: '#12122b', card1: '#1a1a40', card2: '#2d2d5a' }
    };
    const signUpLoginScreen = document.getElementById('signUpLoginScreen');
    const profileScreen = document.getElementById('profileScreen');

    return {
        signUpLoginScreen, profileScreen,
        accent1Picker, accent2Picker, background1Picker, background2Picker, card1Picker, card2Picker, root, resetBtn, themeButtons, ownThemeNameInput, ownThemeOut, ownThemeSave, saveThemeNameBtn, themes
    }
}
