
// ------ Favicon Selection ------
function setFavicon() {
  const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const favicon = document.querySelector('link[rel="icon"]');
  if(darkMode) favicon.href = 'https://neutroxity.me/faviconNRB.ico';
  else favicon.href = 'https://neutroxity.me/faviconNRB.png';
}
setFavicon();
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setFavicon);

function updateColor(varName, color) {
  const root = document.documentElement;
  root.style.setProperty(varName, color);
}
window.addEventListener('load', () => {
  ['accent1', 'accent2', 'background1', 'background2', 'accent5', 'accent6'].forEach(key => {
    const value = localStorage.getItem(key);
    if (value) {
      const varName =
        key === 'accent1' ? '--accent1' :
        key === 'accent2' ? '--accent2' :
        key === 'background1' ? '--background1' :
        key === 'background2' ? '--background2' :
        key === 'accent5' ? '--accent5' :
        '--accent6';
      updateColor(varName, value);
      const input = document.getElementById(
        key === 'accent5' ? 'card1Picker' :
        key === 'accent6' ? 'card2Picker' :
        key + 'Picker'
      );
      if (input) input.value = value;
    }
  });
});

// ---------- Navigation ----------
const navList = [
  {key: "panel-home", url:"https://neutroxity.me/home/"},
  {key: "panel-math", url:"https://neutroxity.me/math/"},
  {key: "panel-physics", url:"https://neutroxity.me/physics/"},
  {key: "panel-chemistry", url:"https://neutroxity.me/chemistry/"},
  {key: "panel-games", url:"https://neutroxity.me/games/"},
  {key: "panel-utilities", url:"https://neutroxity.me/utilities/"},
  {key: "panel-info", url:"https://neutroxity.me/info/"},
];
function switchTopPanel(e) {
  const targetPanelId = e.currentTarget.getAttribute("data-target");
  const nav = navList.find(n => n.key === targetPanelId);
  if(nav) {
    window.location.href = nav.url;
    return;
  }
  document.querySelectorAll('.menu-btn').forEach(b => b.classList.remove('active'));
  const btn = document.querySelector(`.menu-btn[data-target="${targetPanelId}"]`);
  if(btn) btn.classList.add('active');
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.menu-btn').forEach(btn => btn.addEventListener('click', switchTopPanel));
  document.querySelectorAll('.front-btn').forEach(btn => btn.addEventListener('click', switchTopPanel));
  document.querySelectorAll('.top-link').forEach(btn => btn.addEventListener('click', switchTopPanel));
  const sidebars = document.querySelectorAll(".sidebar");
  const toggles = document.querySelectorAll(".sidebar-toggle-responsive");
  toggles.forEach(toggle => {
    toggle.addEventListener("click", () => sidebars.forEach(sb => sb.classList.toggle("open")));
  });
  document.addEventListener("click", (e) => {
    sidebars.forEach(sb => {
      const clickedToggle = [...toggles].some(t => t === e.target);
      if(sb.classList.contains("open") && !sb.contains(e.target) && !clickedToggle) {
        sb.classList.remove("open");
      }
    });
  });
  const sidebar = document.getElementById("sidebar");
  const toggle = document.getElementById("toggleSidebar");
  if(sidebar && toggle) {
    toggle.addEventListener("click", () => sidebar.classList.toggle("collapsed"));
  }
});

// ---------- INTRO SCREEN ----------
window.addEventListener('load', () => {
  const intro = document.getElementById('intro');
  if(!intro) return;
  setTimeout(() => intro.classList.add('fade-out'), 4000);
  setTimeout(() => {
    intro.remove();
    document.body.style.overflow = 'hidden';
    window.location.href = "https://neutroxity.me/home/";
  }, 5000);
});
