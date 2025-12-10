const def = getId();
// ------ Favicon Selection ------
function setFavicon() {
  if(def.darkMode) def.favicon.href = 'faviconNRB.ico';
  else def.favicon.href = 'faviconNRB.png';
  if(def.darkMode) def.faviconApple.href = 'faviconNRB.png'; 
  else def.faviconApple.href = 'faviconNRBAD.png';
}
setFavicon();
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setFavicon);

// ---------- Navigation ----------
function switchTopPanel(e) {
  const targetPanelId = e.target.getAttribute("data-target");
  document.querySelectorAll(".panel").forEach(panel => {
    panel.classList.remove("visible-panel");
    panel.classList.add("hidden");
  });
  const activePanel = document.getElementById(targetPanelId);
  if (activePanel) {
    activePanel.classList.remove("hidden");
    activePanel.classList.add("visible-panel");
  }
}
def.topLinks.forEach(link => link.addEventListener("click", switchTopPanel));
document.getElementById("panel-home").classList.add("visible-panel");
document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.querySelectorAll(".sidebar");
  const toggleSidebarResponsive = document.querySelectorAll(".toggleSidebarResponsive");
  toggleSidebarResponsive.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });
});
document.addEventListener("click", (e) => {
  if (
    sidebar.classList.contains("open") &&
    !sidebar.contains(e.target) &&
    e.target !== toggleSidebarResponsive
  ) {
    sidebar.classList.remove("open");
  }
});
function navTo(id) {
  document.querySelectorAll('.panel').forEach(s => {
    if (s.id === id) {
      s.classList.remove('hidden');
      s.classList.add('visible-panel');
      s.querySelectorAll('input, button, select, textarea').forEach(el => el.setAttribute('tabindex', '0'));
    } else {
      s.classList.add('hidden');
      s.classList.remove('visible-panel');
      s.querySelectorAll('input, button, select, textarea').forEach(el => el.setAttribute('tabindex', '-1'));
    }
  });
  document.querySelectorAll('.menu-btn').forEach(b => b.classList.remove('active'));
  const btn = document.querySelector(`.menu-btn[data-target="${id}"]`);
  if (btn) btn.classList.add('active');
  const app = document.getElementById('app');
  if (app) app.focus();
}
document.addEventListener('click', (e) => {
  const mb = e.target.closest('.menu-btn');
  let panel = "home.html"
  if (mb.dataset.target === "panel-home") panel = "home.html"
  if (mb) navTo(mb.dataset.target);
});
document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const toggle = document.getElementById("toggleSidebar");

  toggle.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
  });
});

// ---------- INTRO SCREEN ----------
window.addEventListener('load', () => {
  const intro = document.getElementById('intro');
  const header = document.getElementById('mainHeader');
  const sidebar = document.getElementById('sidebar');
  const main = document.getElementById('app');
  if (!intro) {
    header.classList.remove('hidden');
    sidebar.classList.remove('hidden');
    main.classList.remove('hidden');
    header.classList.add('visible');
    sidebar.classList.add('visible');
    main.classList.add('visible');
    document.body.style.overflow = 'auto';
    return;
  }
  setTimeout(() => { intro.classList.add('fade-out'); }, 4000);
  setTimeout(() => {
    if (intro && intro.parentNode) intro.parentNode.removeChild(intro);
    if (header) header.classList.remove('hidden');
    if (sidebar) sidebar.classList.remove('hidden');
    if (main) main.classList.remove('hidden');

    header && header.classList.add('visible');
    sidebar && sidebar.classList.add('visible');
    main && main.classList.add('visible');

    document.body.style.overflow = 'auto';
  }, 5000);
});