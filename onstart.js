
// ------ Favicon Selection ------
function setFavicon() {
  const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const favicon = document.querySelector('link[rel="icon"]');
  if(darkMode) favicon.href = 'https://neutroxity.tech/faviconNRB.ico';
  else favicon.href = 'https://neutroxity.tech/faviconNRB.png';
}
setFavicon();
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setFavicon);

// ---------- Navigation ----------
const navList = [
  {key: "panel-home", url:"https://neutroxity.tech/home/"},
  {key: "panel-math", url:"https://neutroxity.tech/math/"},
  {key: "panel-physics", url:"https://neutroxity.tech/physics/"},
  {key: "panel-chemistry", url:"https://neutroxity.tech/chemistry/"},
  {key: "panel-games", url:"https://neutroxity.tech/games/"},
  {key: "panel-utilities", url:"https://neutroxity.tech/utilities/"},
  {key: "panel-info", url:"https://neutroxity.tech/info/"},
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
    window.location.href = "https://neutroxity.tech/home/";
  }, 5000);
});
