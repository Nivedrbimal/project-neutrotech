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
  const sidebar = document.getElementById("sidebar");
  const toggleSidebarResponsive = document.getElementById("toggleSidebarResponsive");
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

// =========== MATHEMATICS ============

// -------- GENERAL CALCULATOR --------
function genCalcCompute() {
  const input = document.getElementById('genCalcVal').value;
  const mode = document.getElementById('genCalcAngleMode').value;
  const round = document.getElementById('genCalcRound').value || 10000;
  let expr = input
    .replace(/x/g, '*')
    .replace(/÷/g, '/')
    .replace(/\^/g, '**')
    .replace(/π/g, 'Math.PI');

  if (mode === 'deg') {
    expr = expr.replace(/sin⁻¹\(([^)]+)\)/g, '(Math.asin($1) * 180 / Math.PI)');
    expr = expr.replace(/cos⁻¹\(([^)]+)\)/g, '(Math.acos($1) * 180 / Math.PI)');
    expr = expr.replace(/tan⁻¹\(([^)]+)\)/g, '(Math.atan($1) * 180 / Math.PI)');
    expr = expr.replace(/csc⁻¹\(([^)]+)\)/g, '(Math.asin(1 / $1) * 180 / Math.PI)');
    expr = expr.replace(/sec⁻¹\(([^)]+)\)/g, '(Math.acos(1 / $1) * 180 / Math.PI)');
    expr = expr.replace(/cot⁻¹\(([^)]+)\)/g, '(Math.atan(1 / $1) * 180 / Math.PI)');
    expr = expr.replace(/sin\(([^)]+)\)/g, 'Math.sin(($1) * Math.PI / 180)');
    expr = expr.replace(/cos\(([^)]+)\)/g, 'Math.cos(($1) * Math.PI / 180)');
    expr = expr.replace(/tan\(([^)]+)\)/g, 'Math.tan(($1) * Math.PI / 180)');
    expr = expr.replace(/csc\(([^)]+)\)/g, '1 / Math.sin(($1) * Math.PI / 180)');
    expr = expr.replace(/sec\(([^)]+)\)/g, '1 / Math.cos(($1) * Math.PI / 180)');
    expr = expr.replace(/cot\(([^)]+)\)/g, '1 / Math.tan(($1) * Math.PI / 180)');
    expr = expr.replace(/asin\(([^)]+)\)/g, '(Math.asin($1) * 180 / Math.PI)');
    expr = expr.replace(/acos\(([^)]+)\)/g, '(Math.acos($1) * 180 / Math.PI)');
    expr = expr.replace(/atan\(([^)]+)\)/g, '(Math.atan($1) * 180 / Math.PI)');
    expr = expr.replace(/acsc\(([^)]+)\)/g, '(Math.asin(1 / $1) * 180 / Math.PI)');
    expr = expr.replace(/asec\(([^)]+)\)/g, '(Math.acos(1 / $1) * 180 / Math.PI)');
    expr = expr.replace(/acot\(([^)]+)\)/g, '(Math.atan(1 / $1) * 180 / Math.PI)');
  } else {
    expr = expr.replace(/sin⁻¹\(([^)]+)\)/g, 'Math.asin($1)');
    expr = expr.replace(/cos⁻¹\(([^)]+)\)/g, 'Math.acos($1)');
    expr = expr.replace(/tan⁻¹\(([^)]+)\)/g, 'Math.atan($1)');
    expr = expr.replace(/csc⁻¹\(([^)]+)\)/g, 'Math.asin(1 / $1)');
    expr = expr.replace(/sec⁻¹\(([^)]+)\)/g, 'Math.acos(1 / $1)');
    expr = expr.replace(/cot⁻¹\(([^)]+)\)/g, 'Math.atan(1 / $1)');
    expr = expr.replace(/sin\(([^)]+)\)/g, 'Math.sin($1)');
    expr = expr.replace(/cos\(([^)]+)\)/g, 'Math.cos($1)');
    expr = expr.replace(/tan\(([^)]+)\)/g, 'Math.tan($1)');
    expr = expr.replace(/csc\(([^)]+)\)/g, '1 / Math.sin($1)');
    expr = expr.replace(/sec\(([^)]+)\)/g, '1 / Math.cos($1)');
    expr = expr.replace(/cot\(([^)]+)\)/g, '1 / Math.tan($1)');
    expr = expr.replace(/asin\(([^)]+)\)/g, 'Math.asin($1)');
    expr = expr.replace(/acos\(([^)]+)\)/g, 'Math.acos($1)');
    expr = expr.replace(/atan\(([^)]+)\)/g, 'Math.atan($1)');
    expr = expr.replace(/acsc\(([^)]+)\)/g, 'Math.asin(1 / $1)');
    expr = expr.replace(/asec\(([^)]+)\)/g, 'Math.acos(1 / $1)');
    expr = expr.replace(/acot\(([^)]+)\)/g, 'Math.atan(1 / $1)');
  }
  try {
    const result = eval(expr);
    if (round === 0) {
      document.getElementById('genCalcOut').textContent = result;
    }
    else {
      document.getElementById('genCalcOut').textContent = Math.round(result * round) / round;
    }
  }
  catch (e) {
    document.getElementById('genCalcOut').textContent = "Invalid Expression";
  }
}
function genCalcClear() {
  document.getElementById('genCalcVal').value = '';
  document.getElementById('genCalcRound').value = 'select'
  document.getElementById('genCalcAngleMode').value = 'select'
  document.getElementById('genCalcOut').textContent = '';
}


// ---------- TRIG EVALUATOR ----------
function parseRadianInput(raw) {
  try { return eval(raw.replace(/π/g, 'Math.PI')); }
  catch { return NaN; }
}
function parsePolarInput(raw) {
  const match = raw.match(/^\s*([\d.]+)\s*∠\s*([\d.π\/+-]+)\s*$/i);
  if (!match) return null;
  let r = parseFloat(match[1]);
  let theta;
  try { theta = eval(match[2].replace(/π/g, 'Math.PI')); }
  catch { return null; }
  return { r, theta };
}
function updatePlaceholder() {
  const mode = document.getElementById('triMode').value;
  const op = document.getElementById('triOp').value;
  const input = document.getElementById('triVal');
  if (['asin', 'acos', 'atan', 'acsc', 'asec', 'acot'].includes(op))
    input.placeholder = 'Enter value';
  else if (['sinh', 'cosh', 'tanh', 'csch', 'sech', 'coth'].includes(op))
    input.placeholder = 'Enter a real number';
  else if (mode === 'deg') input.placeholder = 'Enter in degree(s)';
  else input.placeholder = 'Enter in radian(s)';
}
function trigClear() {
  document.getElementById('triOut').textContent = '';
  document.getElementById('triVal').value = '';
  document.getElementById('triPolar').value = '';
  document.getElementById('triOp').value = 'sin';
  document.getElementById('triMode').value = 'deg';
  updatePlaceholder();
}
function getNiceAngle(op, angle) {
  const pi = Math.PI, tol = 1e-6;
  const near = (a, b) => Math.abs(a - b) < tol;

  switch (op) {
    case 'sin':
      if (near(angle, 0) || near(angle, 2 * pi)) return '0';
      if (near(angle, pi / 6) || near(angle, 11 * pi / 6)) return '1/2';
      if (near(angle, pi / 4) || near(angle, 7 * pi / 4)) return '√2/2';
      if (near(angle, pi / 3) || near(angle, 5 * pi / 3)) return '√3/2';
      if (near(angle, pi / 2)) return '1';
      if (near(angle, pi)) return '0';
      break;
    case 'cos':
      if (near(angle, 0) || near(angle, 2 * pi)) return '1';
      if (near(angle, pi / 6) || near(angle, 11 * pi / 6)) return '√3/2';
      if (near(angle, pi / 4) || near(angle, 7 * pi / 4)) return '√2/2';
      if (near(angle, pi / 3) || near(angle, 5 * pi / 3)) return '1/2';
      if (near(angle, pi / 2) || near(angle, 3 * pi / 2)) return '0';
      if (near(angle, pi)) return '-1';
      break;
    case 'tan':
      if (near(angle, 0) || near(angle, pi) || near(angle, 2 * pi)) return '0';
      if (near(angle, pi / 6) || near(angle, 7 * pi / 6)) return '1/√3';
      if (near(angle, pi / 4) || near(angle, 5 * pi / 4)) return '1';
      if (near(angle, pi / 3) || near(angle, 4 * pi / 3)) return '√3';
      if (near(angle, pi / 2) || near(angle, 3 * pi / 2)) return 'undefined';
      break;
    case 'csc':
      if (near(angle, 0) || near(angle, pi) || near(angle, 2 * pi)) return 'undefined';
      if (near(angle, pi / 6) || near(angle, 5 * pi / 6)) return '2';
      if (near(angle, pi / 4) || near(angle, 3 * pi / 4)) return '√2';
      if (near(angle, pi / 3) || near(angle, 2 * pi / 3)) return '2√3/3';
      if (near(angle, pi / 2)) return '1';
      break;
    case 'sec':
      if (near(angle, pi / 2) || near(angle, 3 * pi / 2)) return 'undefined';
      if (near(angle, 0) || near(angle, 2 * pi)) return '1';
      if (near(angle, pi / 6) || near(angle, 11 * pi / 6)) return '2√3/3';
      if (near(angle, pi / 4) || near(angle, 7 * pi / 4)) return '√2';
      if (near(angle, pi / 3) || near(angle, 5 * pi / 3)) return '2';
      if (near(angle, pi)) return '-1';
      break;
    case 'cot':
      if (near(angle, 0) || near(angle, pi) || near(angle, 2 * pi)) return 'undefined';
      if (near(angle, pi / 6) || near(angle, 7 * pi / 6)) return '√3';
      if (near(angle, pi / 4) || near(angle, 5 * pi / 4)) return '1';
      if (near(angle, pi / 3) || near(angle, 4 * pi / 3)) return '1/√3';
      if (near(angle, pi / 2)) return '0';
      break;
    default: return null;
  }
  return null;
}
function trigCompute() {
  const mode = document.getElementById('triMode').value;
  const op = document.getElementById('triOp').value;
  const raw = document.getElementById('triVal').value;
  const polarRaw = document.getElementById('triPolar').value;
  const outEl = document.getElementById('triOut');
  if (!raw && !polarRaw) { outEl.textContent = 'Enter a value'; return; }
  let x, polar = null;
  if (polarRaw) {
    polar = parsePolarInput(polarRaw);
    if (!polar) {
      outEl.textContent = 'Invalid polar input';
      return;
    }
    const thetaRad = (mode === 'deg') ? polar.theta * Math.PI / 180 : polar.theta;
    const xRect = polar.r * Math.cos(thetaRad);
    const yRect = polar.r * Math.sin(thetaRad);
    let trigValue;
    switch (op) {
      case 'sin': trigValue = Math.sin(thetaRad); break;
      case 'cos': trigValue = Math.cos(thetaRad); break;
      case 'tan': trigValue = Math.tan(thetaRad); break;
      case 'csc': trigValue = 1 / Math.sin(thetaRad); break;
      case 'sec': trigValue = 1 / Math.cos(thetaRad); break;
      case 'cot': trigValue = 1 / Math.tan(thetaRad); break;
      default: trigValue = NaN;
    }

    outEl.textContent = `Result: ${def.fmt(trigValue)} | Rectangular: (${def.fmt(xRect)}, ${def.fmt(yRect)})`;
    return;
  }

  else if (mode === 'rad') {
    x = parseRadianInput(raw);
  } else {
    x = Number(raw);
  }
  if (isNaN(x)) { outEl.textContent = 'Invalid input'; return; }

  const toRad = v => mode === 'deg' ? v * Math.PI / 180 : v;
  const fromRad = v => mode === 'deg' ? v * 180 / Math.PI : v;
  const angle = toRad(x);

  let res;
  try {
    if (polar) {
      res = evalTrig(op, polar.theta, mode);
    } else {
      res = evalTrig(op, angle, mode);
    }
    switch (op) {
      case 'sin': res = Math.sin(angle); break;
      case 'cos': res = Math.cos(angle); break;
      case 'tan': res = Math.tan(angle); break;
      case 'csc': res = 1 / Math.sin(angle); break;
      case 'sec': res = 1 / Math.cos(angle); break;
      case 'cot': res = 1 / Math.tan(angle); break;
      case 'asin': res = fromRad(Math.asin(x)); break;
      case 'acos': res = fromRad(Math.acos(x)); break;
      case 'atan': res = fromRad(Math.atan(x)); break;
      case 'asec': res = fromRad(Math.acos(1 / x)); break;
      case 'acsc': res = fromRad(Math.asin(1 / x)); break;
      case 'acot': res = fromRad(Math.atan(1 / x)); break;
      case 'sinh': res = Math.sinh(x); break;
      case 'cosh': res = Math.cosh(x); break;
      case 'tanh': res = Math.tanh(x); break;
      case 'csch': res = 1 / Math.sinh(x); break;
      case 'sech': res = 1 / Math.cosh(x); break;
      case 'coth': res = 1 / Math.tanh(x); break;
      default: res = NaN;
    }
    let output = `Result: ${def.fmt(res)}`;
    const nice = getNiceAngle(op, angle);
    if (nice) output += ` or ${nice}`;

    if (polar) {
      let xr = polar.r * Math.cos(polar.theta);
      let yr = polar.r * Math.sin(polar.theta);
      output += ` | Rectangular: (${def.fmt(xr)}, ${def.fmt(yr)})`;
    }

    outEl.textContent = output;
  } catch (e) { outEl.textContent = 'Error: ' + e.message; }
}

// -------- QUADRATIC EQUATION ---------
function quadeClear() {
  ['quadA', 'quadB', 'quadC', 'quadX1', 'quadX2', 'quadH', 'quadK', 'quadPx', 'quadPy'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('quadOut').textContent = '';
}
function quadeSolve() {
  let a = def.toNum(document.getElementById('quadA').value);
  let b = def.toNum(document.getElementById('quadB').value);
  let c = def.toNum(document.getElementById('quadC').value);
  let x1 = def.toNum(document.getElementById('quadX1').value);
  let x2 = def.toNum(document.getElementById('quadX2').value);
  let h = def.toNum(document.getElementById('quadH').value);
  let k = def.toNum(document.getElementById('quadK').value);
  let px = def.toNum(document.getElementById('quadPx').value);
  let py = def.toNum(document.getElementById('quadPy').value);

  let changed = true, iter = 0;
  while (changed && iter < 40) {
    changed = false; iter++;
    if (def.known(a) && def.known(b) && def.known(c) && !def.known(x1) && !def.known(x2)) {
      let discriminant = b * b - 4 * a * c;
      if (discriminant >= 0) { x1 = (-b + Math.sqrt(discriminant)) / (2 * a); x2 = (-b - Math.sqrt(discriminant)) / (2 * a); changed = true; }
    }
    if (def.known(a) && def.known(x1) && def.known(x2)) {
      if (!def.known(b)) { b = -a * (x1 + x2); changed = true; }
      if (!def.known(c)) { c = a * (x1 * x2); changed = true; }
    }
    if (def.known(a) && def.known(x1)) {
      if (!def.known(b) && def.known(c)) { b = -(a * x1 * x1 + c) / x1; changed = true; }
      if (!def.known(c) && def.known(b)) { c = -(a * x1 * x1 + b * x1); changed = true; }
    }
    if (!def.known(a) && def.known(b) && def.known(c) && def.known(x1)) { a = -(b * x1 + c) / (x1 * x1); changed = true; }
    if (def.known(a) && def.known(b) && !def.known(h)) { h = -b / (2 * a); changed = true; }
    if (def.known(a) && def.known(h) && !def.known(k) && def.known(c)) { k = a * h * h + b * h + c; changed = true; }
    if (def.known(a) && def.known(h) && !def.known(b)) { b = -2 * a * h; changed = true; }
    if (def.known(a) && def.known(b) && def.known(h) && def.known(k) && !def.known(c)) { c = k - (a * h * h + b * h); changed = true; }
    if (def.known(a) && def.known(b) && def.known(px) && def.known(py) && !def.known(c)) { c = py - (a * px * px + b * px); changed = true; }
    if (def.known(a) && def.known(c) && def.known(px) && def.known(py) && !def.known(b)) { b = (py - c - a * px * px) / px; changed = true; }
    if (def.known(b) && def.known(c) && def.known(px) && def.known(py) && !def.known(a)) { a = (py - b * px - c) / (px * px); changed = true; }
  }

  const out = `Iterations: ${iter}\n` +
    `a = ${def.fmt(a)}\n` +
    `b = ${def.fmt(b)}\n` +
    `c = ${def.fmt(c)}\n` +
    `x1 = ${def.fmt(x1)}\n` +
    `x2 = ${def.fmt(x2)}\n` +
    `h = ${def.fmt(h)}\n` +
    `k = ${def.fmt(k)}\n` +
    `x = ${def.fmt(px)}\n` +
    `y = ${def.fmt(py)}`;

  document.getElementById('quadOut').textContent = out;
}

// --------- 2D Shapes -----------
function showShape2DInputs() {
  const shape = document.getElementById('shape2D').value;
  document.querySelectorAll('.shapes-2d').forEach(el => {
    el.classList.add('shapes-2d-hidden');
    el.classList.remove('shapes-2d-visible');
  });

  switch (shape) {
    case 'circle':
    case 'semicircle':
      document.getElementById('shapes2DCircleGrid').classList.remove('shapes-2d-hidden');
      document.getElementById('shapes2DCircleGrid').classList.add('shapes-2d-visible');
      break;
    case 'triangle':
      document.getElementById('shapes2DTriangleGrid').classList.remove('shapes-2d-hidden');
      document.getElementById('shapes2DTriangleGrid').classList.add('shapes-2d-visible');
      break;
    case 'square':
      document.getElementById('shapes2DSquareGrid').classList.remove('shapes-2d-hidden');
      document.getElementById('shapes2DSquareGrid').classList.add('shapes-2d-visible');
      break;
    case 'rectangle':
      document.getElementById('shapes2DRectangleGrid').classList.remove('shapes-2d-hidden');
      document.getElementById('shapes2DRectangleGrid').classList.add('shapes-2d-visible');
      break;
    case 'parallelogram':
      document.getElementById('shapes2DParallelogramGrid').classList.remove('shapes-2d-hidden');
      document.getElementById('shapes2DParallelogramGrid').classList.add('shapes-2d-visible');
      break;
    case 'trapezoid':
      document.getElementById('shapes2DTrapezoidGrid').classList.remove('shapes-2d-hidden');
      document.getElementById('shapes2DTrapezoidGrid').classList.add('shapes-2d-visible');
      break;
    case 'kite':
      document.getElementById('shapes2DInputsKites').classList.remove('shapes-2d-hidden');
      document.getElementById('shapes2DInputsKites').classList.add('shapes-2d-visible');
      break;
    case 'ellipse':
      document.getElementById('shapes2DEllipseGrid').classList.remove('shapes-2d-hidden');
      document.getElementById('shapes2DEllipseGrid').classList.add('shapes-2d-visible');
      break;
    case 'regularPolygon':
      document.getElementById('shapes2DRegularPolygonGrid').classList.remove('shapes-2d-hidden');
      document.getElementById('shapes2DRegularPolygonGrid').classList.add('shapes-2d-visible');
      break;
  }
}
function solveShape2D(shape, inputs) {
  let changed = true, iter = 0;

  while (changed && iter < 60) {
    changed = false; iter++;

    switch (shape) {
      // ==================== CIRCLE ====================
      case "circle":
        if (!def.known(inputs.d) && def.known(inputs.r)) { inputs.d = 2 * inputs.r; changed = true; }
        if (!def.known(inputs.r) && def.known(inputs.d)) { inputs.r = inputs.d / 2; changed = true; }
        if (!def.known(inputs.c) && def.known(inputs.r)) { inputs.c = 2 * Math.PI * inputs.r; changed = true; }
        if (!def.known(inputs.r) && def.known(inputs.c)) { inputs.r = inputs.c / (2 * Math.PI); changed = true; }
        if (!def.known(inputs.a) && def.known(inputs.r)) { inputs.a = Math.PI * inputs.r ** 2; changed = true; }
        if (!def.known(inputs.r) && def.known(inputs.a)) { inputs.r = Math.sqrt(inputs.a / Math.PI); changed = true; }
        if (!def.known(inputs.arcLength) && def.known(inputs.centralAngle) && def.known(inputs.r)) { inputs.arcLength = (inputs.centralAngle / 360) * 2 * Math.PI * inputs.r; changed = true; }
        if (!def.known(inputs.centralAngle) && def.known(inputs.arcLength) && def.known(inputs.r) && inputs.r !== 0) { inputs.centralAngle = (inputs.arcLength / (2 * Math.PI * inputs.r)) * 360; changed = true; }
        if (!def.known(inputs.sectorArea) && def.known(inputs.centralAngle) && def.known(inputs.r)) { inputs.sectorArea = (inputs.centralAngle / 360) * Math.PI * inputs.r ** 2; changed = true; }
        if (!def.known(inputs.centralAngle) && def.known(inputs.sectorArea) && def.known(inputs.r) && inputs.r !== 0) { inputs.centralAngle = (inputs.sectorArea / (Math.PI * inputs.r ** 2)) * 360; changed = true; }
        break;

      // ==================== TRIANGLE ====================
      case "triangle":
        if (!def.known(inputs.angleA) && def.known(inputs.s1) && def.known(inputs.s2) && def.known(inputs.angleB) && (inputs.tp === 'acute' || inputs.tp === 'right')) { inputs.angleA = Math.asin(inputs.s1 * Math.sin(inputs.angleB * Math.PI / 180) / inputs.s2) * 180 / Math.PI; changed = true; }
        if (!def.known(inputs.angleA) && def.known(inputs.s1) && def.known(inputs.s3) && def.known(inputs.angleC) && (inputs.tp === 'acute' || inputs.tp === 'right')) { inputs.angleA = Math.asin(inputs.s1 * Math.sin(inputs.angleC * Math.PI / 180) / inputs.s3) * 180 / Math.PI; changed = true; }
        if (!def.known(inputs.angleB) && def.known(inputs.s2) && def.known(inputs.s1) && def.known(inputs.angleA) && (inputs.tp === 'acute' || inputs.tp === 'right')) { inputs.angleB = Math.asin(inputs.s2 * Math.sin(inputs.angleA * Math.PI / 180) / inputs.s1) * 180 / Math.PI; changed = true; }
        if (!def.known(inputs.angleB) && def.known(inputs.s2) && def.known(inputs.s3) && def.known(inputs.angleC) && (inputs.tp === 'acute' || inputs.tp === 'right')) { inputs.angleB = Math.asin(inputs.s2 * Math.sin(inputs.angleC * Math.PI / 180) / inputs.s3) * 180 / Math.PI; changed = true; }
        if (!def.known(inputs.angleC) && def.known(inputs.s3) && def.known(inputs.s1) && def.known(inputs.angleA) && (inputs.tp === 'acute' || inputs.tp === 'right')) { inputs.angleC = Math.asin(inputs.s3 * Math.sin(inputs.angleA * Math.PI / 180) / inputs.s1) * 180 / Math.PI; changed = true; }
        if (!def.known(inputs.angleC) && def.known(inputs.s3) && def.known(inputs.s2) && def.known(inputs.angleB) && (inputs.tp === 'acute' || inputs.tp === 'right')) { inputs.angleC = Math.asin(inputs.s3 * Math.sin(inputs.angleB * Math.PI / 180) / inputs.s2) * 180 / Math.PI; changed = true; }
        if (!def.known(inputs.angleA) && def.known(inputs.angleB) && def.known(inputs.angleC)) { inputs.angleA = 180 - (inputs.angleB + inputs.angleC); changed = true; }
        if (!def.known(inputs.angleB) && def.known(inputs.angleA) && def.known(inputs.angleC)) { inputs.angleB = 180 - (inputs.angleA + inputs.angleC); changed = true; }
        if (!def.known(inputs.angleC) && def.known(inputs.angleA) && def.known(inputs.angleB)) { inputs.angleC = 180 - (inputs.angleA + inputs.angleB); changed = true; }
        if (!def.known(inputs.sp) && def.known(inputs.s1) && def.known(inputs.s2) && def.known(inputs.s3)) { inputs.sp = (inputs.s1 + inputs.s2 + inputs.s3) / 2; changed = true; }
        if (!def.known(inputs.tp) && def.known(inputs.angleA) && def.known(inputs.angleB) && def.known(inputs.angleC) && (inputs.angleA < 90 && inputs.angleB < 90 && inputs.angleC < 90)) { inputs.tp = 'acute'; changed = true; }
        if (!def.known(inputs.tp) && ((def.known(inputs.angleA) && inputs.angleA === 90) || (def.known(inputs.angleB) && inputs.angleB === 90) || (def.known(inputs.angleC) && inputs.angleC === 90))) { inputs.tp = 'right'; changed = true; }
        if (!def.known(inputs.tp) && ((def.known(inputs.angleA) && inputs.angleA > 90) || (def.known(inputs.angleB) && inputs.angleB > 90) || (def.known(inputs.angleC) && inputs.angleC > 90))) { inputs.tp = 'obtuse'; changed = true; }
        if (!def.known(inputs.s1) && def.known(inputs.s2) && def.known(inputs.s3) && (inputs.tp === 'right')) { inputs.s1 = Math.sqrt(inputs.s3 ** 2 - inputs.s2 ** 2); changed = true; }
        if (!def.known(inputs.s2) && def.known(inputs.s1) && def.known(inputs.s3) && (inputs.tp === 'right')) { inputs.s2 = Math.sqrt(inputs.s3 ** 2 - inputs.s1 ** 2); changed = true; }
        if (!def.known(inputs.s3) && def.known(inputs.s1) && def.known(inputs.s2) && (inputs.tp === 'right')) { inputs.s3 = Math.sqrt(inputs.s1 ** 2 + inputs.s2 ** 2); changed = true; }
        if (!def.known(inputs.s1) && def.known(inputs.s2) && def.known(inputs.s3) && (inputs.angleC === 90)) { inputs.s1 = Math.sqrt(inputs.s3 ** 2 - inputs.s2 ** 2); changed = true; }
        if (!def.known(inputs.s2) && def.known(inputs.s1) && def.known(inputs.s3) && (inputs.angleC === 90)) { inputs.s2 = Math.sqrt(inputs.s3 ** 2 - inputs.s1 ** 2); changed = true; }
        if (!def.known(inputs.s3) && def.known(inputs.s1) && def.known(inputs.s2) && (inputs.angleC === 90)) { inputs.s3 = Math.sqrt(inputs.s1 ** 2 + inputs.s2 ** 2); changed = true; }
        if (!def.known(inputs.angleA) && def.known(inputs.s1) && def.known(inputs.s2) && def.known(inputs.s3) && def.known(inputs.tp) && (inputs.s1 > inputs.s2) && (inputs.s1 > inputs.s3) && inputs.tp === 'right') { inputs.angleA = 90; changed = true; }
        if (!def.known(inputs.angleB) && def.known(inputs.s1) && def.known(inputs.s2) && def.known(inputs.s3) && def.known(inputs.tp) && (inputs.s2 > inputs.s1) && (inputs.s1 > inputs.s3) && inputs.tp === 'right') { inputs.angleB = 90; changed = true; }
        if (!def.known(inputs.angleC) && def.known(inputs.s1) && def.known(inputs.s2) && def.known(inputs.s3) && def.known(inputs.tp) && (inputs.s3 > inputs.s1) && (inputs.s3 > inputs.s2) && inputs.tp === 'right') { inputs.angleC = 90; changed = true; }
        if (!def.known(inputs.tT) && def.known(inputs.s1) && (inputs.s2) && (inputs.s3) && (inputs.s1 + inputs.s2 <= inputs.s3 || inputs.s1 + inputs.s3 <= inputs.s2 || inputs.s2 + inputs.s3 <= inputs.s1)) { inputs.tT = "Invalid"; }
        if (!def.known(inputs.tT) && def.known(inputs.s1) && def.known(inputs.s2) && def.known(inputs.s3) && inputs.s1 === inputs.s2 && inputs.s2 === inputs.s3) { inputs.tT = 'equilateral'; changed = true; }
        if (!def.known(inputs.tT) && def.known(inputs.s1) && def.known(inputs.s2) && def.known(inputs.s3) && ((inputs.s1 === inputs.s2 && inputs.s1 !== inputs.s3) || (inputs.s2 === inputs.s3 && inputs.s2 !== inputs.s1) || (inputs.s1 === inputs.s3 && inputs.s1 !== inputs.s2))) { inputs.tT = 'isosceles'; changed = true; }
        if (!def.known(inputs.tT) && def.known(inputs.s1) && def.known(inputs.s2) && def.known(inputs.s3) && (inputs.s1 !== inputs.s2 && inputs.s2 !== inputs.s3 && inputs.s1 !== inputs.s3)) { inputs.tT = 'scalene'; changed = true; }
        if (def.known(inputs.tT) && inputs.tT === 'equilateral' && def.known(inputs.s1) && !def.known(inputs.s2)) { inputs.s2 = inputs.s1; changed = true; }
        if (def.known(inputs.tT) && inputs.tT === 'equilateral' && def.known(inputs.s1) && !def.known(inputs.s3)) { inputs.s3 = inputs.s1; changed = true; }
        if (def.known(inputs.tT) && inputs.tT === 'equilateral' && def.known(inputs.s2) && !def.known(inputs.s1)) { inputs.s1 = inputs.s2; changed = true; }
        if (def.known(inputs.tT) && inputs.tT === 'equilateral' && def.known(inputs.s2) && !def.known(inputs.s3)) { inputs.s3 = inputs.s2; changed = true; }
        if (def.known(inputs.tT) && inputs.tT === 'equilateral' && def.known(inputs.s3) && !def.known(inputs.s1)) { inputs.s1 = inputs.s3; changed = true; }
        if (def.known(inputs.tT) && inputs.tT === 'equilateral' && def.known(inputs.s3) && !def.known(inputs.s2)) { inputs.s2 = inputs.s3; changed = true; }
        if (def.known(inputs.tT) && inputs.tT === 'isosceles' && def.known(inputs.s1) && def.known(inputs.s2) && inputs.s1 === inputs.s2 && !def.known(inputs.s3)) { }
        if (def.known(inputs.tT) && inputs.tT === 'isosceles' && def.known(inputs.s1) && def.known(inputs.s3) && inputs.s1 === inputs.s3 && !def.known(inputs.s2)) { }
        if (def.known(inputs.tT) && inputs.tT === 'isosceles' && def.known(inputs.s2) && def.known(inputs.s3) && inputs.s2 === inputs.s3 && !def.known(inputs.s1)) { }
        if (def.known(inputs.tT) && inputs.tT === 'equilateral' && !def.known(inputs.angleA)) { inputs.angleA = 60; changed = true; }
        if (def.known(inputs.tT) && inputs.tT === 'equilateral' && !def.known(inputs.angleB)) { inputs.angleB = 60; changed = true; }
        if (def.known(inputs.tT) && inputs.tT === 'equilateral' && !def.known(inputs.angleC)) { inputs.angleC = 60; changed = true; }
        if (!def.known(inputs.p) && def.known(inputs.s1) && def.known(inputs.s2) && def.known(inputs.s3)) { inputs.p = inputs.s1 + inputs.s2 + inputs.s3; changed = true; }
        if (!def.known(inputs.a) && def.known(inputs.s1) && def.known(inputs.s2) && def.known(inputs.s3)) { let s = (inputs.s1 + inputs.s2 + inputs.s3) / 2; inputs.a = Math.sqrt(s * (s - inputs.s1) * (s - inputs.s2) * (s - inputs.s3)); changed = true; }
        if (!def.known(inputs.b) && def.known(inputs.s1)) { inputs.b = inputs.s1; changed = true; }
        if (!def.known(inputs.s1) && def.known(inputs.b)) { inputs.s1 = inputs.b; changed = true; }
        if (def.known(inputs.tT) && inputs.tT === 'equilateral' && def.known(inputs.s1) && !def.known(inputs.h1)) { inputs.h1 = (Math.sqrt(3) / 2) * inputs.s1; changed = true; }
        if (def.known(inputs.tT) && inputs.tT === 'equilateral' && def.known(inputs.s1) && !def.known(inputs.a)) { inputs.a = (Math.sqrt(3) / 4) * inputs.s1 ** 2; changed = true; }
        if (def.known(inputs.tT) && inputs.tT === 'equilateral' && def.known(inputs.s1) && !def.known(inputs.inR)) { inputs.inR = inputs.s1 / (2 * Math.sqrt(3)); changed = true; }
        if (def.known(inputs.tT) && inputs.tT === 'equilateral' && def.known(inputs.s1) && !def.known(inputs.circumR)) { inputs.circumR = inputs.s1 / Math.sqrt(3); changed = true; }
        if (!def.known(inputs.h1) && def.known(inputs.a) && def.known(inputs.s1)) { inputs.h1 = 2 * inputs.a / inputs.s1; changed = true; }
        if (!def.known(inputs.h2) && def.known(inputs.a) && def.known(inputs.s2)) { inputs.h2 = 2 * inputs.a / inputs.s2; changed = true; }
        if (!def.known(inputs.h3) && def.known(inputs.a) && def.known(inputs.s3)) { inputs.h3 = 2 * inputs.a / inputs.s3; changed = true; }
        if (!def.known(inputs.a) && def.known(inputs.h1) && def.known(inputs.s1)) { inputs.a = 0.5 * inputs.h1 * inputs.s1; changed = true; }
        if (!def.known(inputs.a) && def.known(inputs.h2) && def.known(inputs.s2)) { inputs.a = 0.5 * inputs.h2 * inputs.s2; changed = true; }
        if (!def.known(inputs.a) && def.known(inputs.h3) && def.known(inputs.s3)) { inputs.a = 0.5 * inputs.h3 * inputs.s3; changed = true; }
        if (!def.known(inputs.s1) && def.known(inputs.a) && def.known(inputs.h1)) { inputs.s1 = 2 * inputs.a / inputs.h1; changed = true; }
        if (!def.known(inputs.s2) && def.known(inputs.a) && def.known(inputs.h2)) { inputs.s2 = 2 * inputs.a / inputs.h2; changed = true; }
        if (!def.known(inputs.s3) && def.known(inputs.a) && def.known(inputs.h3)) { inputs.s3 = 2 * inputs.a / inputs.h3; changed = true; }
        if (!def.known(inputs.a) && def.known(inputs.s1) && def.known(inputs.s2) && def.known(inputs.angleC)) { inputs.a = 0.5 * inputs.s1 * inputs.s2 * Math.sin(inputs.angleC * Math.PI / 180); changed = true; }
        if (!def.known(inputs.a) && def.known(inputs.s2) && def.known(inputs.s3) && def.known(inputs.angleA)) { inputs.a = 0.5 * inputs.s2 * inputs.s3 * Math.sin(inputs.angleA * Math.PI / 180); changed = true; }
        if (!def.known(inputs.a) && def.known(inputs.s3) && def.known(inputs.s1) && def.known(inputs.angleB)) { inputs.a = 0.5 * inputs.s3 * inputs.s1 * Math.sin(inputs.angleB * Math.PI / 180); changed = true; }
        if (!def.known(inputs.m1) && def.known(inputs.s2) && def.known(inputs.s3)) { inputs.m1 = 0.5 * Math.sqrt(2 * inputs.s2 ** 2 + 2 * inputs.s3 ** 2 - inputs.s1 ** 2); changed = true; }
        if (!def.known(inputs.m2) && def.known(inputs.s1) && def.known(inputs.s3)) { inputs.m2 = 0.5 * Math.sqrt(2 * inputs.s1 ** 2 + 2 * inputs.s3 ** 2 - inputs.s2 ** 2); changed = true; }
        if (!def.known(inputs.m3) && def.known(inputs.s1) && def.known(inputs.s2)) { inputs.m3 = 0.5 * Math.sqrt(2 * inputs.s1 ** 2 + 2 * inputs.s2 ** 2 - inputs.s3 ** 2); changed = true; }
        if (!def.known(inputs.mid1) && def.known(inputs.s1)) { inputs.mid1 = inputs.s1 / 2; changed = true; }
        if (!def.known(inputs.mid2) && def.known(inputs.s2)) { inputs.mid2 = inputs.s2 / 2; changed = true; }
        if (!def.known(inputs.mid3) && def.known(inputs.s3)) { inputs.mid3 = inputs.s3 / 2; changed = true; }
        if (!def.known(inputs.s1) && def.known(inputs.mid1)) { inputs.s1 = 2 * inputs.mid1; changed = true; }
        if (!def.known(inputs.s2) && def.known(inputs.mid2)) { inputs.s2 = 2 * inputs.mid2; changed = true; }
        if (!def.known(inputs.s3) && def.known(inputs.mid3)) { inputs.s3 = 2 * inputs.mid3; changed = true; }
        if (!def.known(inputs.s1) && def.known(inputs.m1) && def.known(inputs.s2) && def.known(inputs.s3)) { inputs.s1 = Math.sqrt(2 * inputs.s2 ** 2 + 2 * inputs.s3 ** 2 - 4 * inputs.m1 ** 2); changed = true; }
        if (!def.known(inputs.s2) && def.known(inputs.m2) && def.known(inputs.s1) && def.known(inputs.s3)) { inputs.s2 = Math.sqrt(2 * inputs.s1 ** 2 + 2 * inputs.s3 ** 2 - 4 * inputs.m2 ** 2); changed = true; }
        if (!def.known(inputs.s3) && def.known(inputs.m3) && def.known(inputs.s1) && def.known(inputs.s2)) { inputs.s3 = Math.sqrt(2 * inputs.s1 ** 2 + 2 * inputs.s2 ** 2 - 4 * inputs.m3 ** 2); changed = true; }
        if (!def.known(inputs.s1) && !def.known(inputs.s2) && !def.known(inputs.s3) && def.known(inputs.m1) && def.known(inputs.m2) && def.known(inputs.m3)) { inputs.s1 = (2 / 3) * Math.sqrt(2 * (inputs.m2 ** 2 + inputs.m3 ** 2) - inputs.m1 ** 2); changed = true; }
        if (!def.known(inputs.s1) && !def.known(inputs.s2) && !def.known(inputs.s3) && def.known(inputs.m1) && def.known(inputs.m2) && def.known(inputs.m3)) { inputs.s2 = (2 / 3) * Math.sqrt(2 * (inputs.m1 ** 2 + inputs.m3 ** 2) - inputs.m2 ** 2); changed = true; }
        if (!def.known(inputs.s1) && !def.known(inputs.s2) && !def.known(inputs.s3) && def.known(inputs.m1) && def.known(inputs.m2) && def.known(inputs.m3)) { inputs.s3 = (2 / 3) * Math.sqrt(2 * (inputs.m1 ** 2 + inputs.m2 ** 2) - inputs.m3 ** 2); changed = true; }
        if (!def.known(inputs.s3) && def.known(inputs.s1) && def.known(inputs.s2) && def.known(inputs.angleC)) { inputs.s3 = Math.sqrt(inputs.s1 ** 2 + inputs.s2 ** 2 - 2 * inputs.s1 * inputs.s2 * Math.cos(inputs.angleC * Math.PI / 180)); changed = true; }
        if (!def.known(inputs.s2) && def.known(inputs.s1) && def.known(inputs.s3) && def.known(inputs.angleB)) { inputs.s2 = Math.sqrt(inputs.s1 ** 2 + inputs.s3 ** 2 - 2 * inputs.s1 * inputs.s3 * Math.cos(inputs.angleB * Math.PI / 180)); changed = true; }
        if (!def.known(inputs.s1) && def.known(inputs.s2) && def.known(inputs.s3) && def.known(inputs.angleA)) { inputs.s1 = Math.sqrt(inputs.s2 ** 2 + inputs.s3 ** 2 - 2 * inputs.s2 * inputs.s3 * Math.cos(inputs.angleA * Math.PI / 180)); changed = true; }
        if (!def.known(inputs.angleA) && def.known(inputs.s1) && def.known(inputs.s2) && def.known(inputs.s3)) { inputs.angleA = Math.acos((inputs.s1 ** 2 - inputs.s2 ** 2 - inputs.s3 ** 2) / (-2 * inputs.s2 * inputs.s3)) * 180 / Math.PI; changed = true; }
        if (!def.known(inputs.angleB) && def.known(inputs.s1) && def.known(inputs.s2) && def.known(inputs.s3)) { inputs.angleB = Math.acos((inputs.s2 ** 2 - inputs.s1 ** 2 - inputs.s3 ** 2) / (-2 * inputs.s1 * inputs.s3)) * 180 / Math.PI; changed = true; }
        if (!def.known(inputs.angleC) && def.known(inputs.s1) && def.known(inputs.s2) && def.known(inputs.s3)) { inputs.angleC = Math.acos((inputs.s3 ** 2 - inputs.s1 ** 2 - inputs.s2 ** 2) / (-2 * inputs.s1 * inputs.s2)) * 180 / Math.PI; changed = true; }
        if (!def.known(inputs.s1) && def.known(inputs.s2) && def.known(inputs.angleA) && def.known(inputs.angleB)) { inputs.s1 = inputs.s2 * Math.sin(inputs.angleA * Math.PI / 180) / Math.sin(inputs.angleB * Math.PI / 180); changed = true; }
        if (!def.known(inputs.s2) && def.known(inputs.s1) && def.known(inputs.angleA) && def.known(inputs.angleB)) { inputs.s2 = inputs.s1 * Math.sin(inputs.angleB * Math.PI / 180) / Math.sin(inputs.angleA * Math.PI / 180); changed = true; }
        if (!def.known(inputs.s3) && def.known(inputs.s1) && def.known(inputs.angleA) && def.known(inputs.angleC)) { inputs.s3 = inputs.s1 * Math.sin(inputs.angleC * Math.PI / 180) / Math.sin(inputs.angleA * Math.PI / 180); changed = true; }
        if (!def.known(inputs.inR) && def.known(inputs.a) && def.known(inputs.s1) && def.known(inputs.s2) && def.known(inputs.s3)) { let s = (inputs.s1 + inputs.s2 + inputs.s3) / 2; inputs.inR = inputs.a / s; changed = true; }
        if (!def.known(inputs.circumR) && def.known(inputs.s1) && def.known(inputs.s2) && def.known(inputs.s3) && def.known(inputs.a)) { inputs.circumR = (inputs.s1 * inputs.s2 * inputs.s3) / (4 * inputs.a); changed = true; }
        if (!def.known(inputs.exR1) && def.known(inputs.a) && def.known(inputs.p) && def.known(inputs.s1)) { let s = inputs.p / 2; inputs.exR1 = inputs.a / (s - inputs.s1); changed = true; }
        if (!def.known(inputs.exR2) && def.known(inputs.a) && def.known(inputs.p) && def.known(inputs.s2)) { let s = inputs.p / 2; inputs.exR2 = inputs.a / (s - inputs.s2); changed = true; }
        if (!def.known(inputs.exR3) && def.known(inputs.a) && def.known(inputs.p) && def.known(inputs.s3)) { let s = inputs.p / 2; inputs.exR3 = inputs.a / (s - inputs.s3); changed = true; }
        break;

      // ==================== SQUARE ====================
      case "square":
        if (!def.known(inputs.p) && def.known(inputs.s)) { inputs.p = 4 * inputs.s; changed = true; }
        if (!def.known(inputs.s) && def.known(inputs.p)) { inputs.s = inputs.p / 4; changed = true; }
        if (!def.known(inputs.d) && def.known(inputs.s)) { inputs.d = Math.sqrt(2) * inputs.s; changed = true; }
        if (!def.known(inputs.s) && def.known(inputs.d)) { inputs.s = inputs.d / Math.sqrt(2); changed = true; }
        if (!def.known(inputs.a) && def.known(inputs.s)) { inputs.a = inputs.s ** 2; changed = true; }
        if (!def.known(inputs.s) && def.known(inputs.a)) { inputs.s = Math.sqrt(inputs.a); changed = true; }
        if (!def.known(inputs.inR) && def.known(inputs.s)) { inputs.inR = inputs.s / 2; changed = true; }
        if (!def.known(inputs.circumR) && def.known(inputs.s)) { inputs.circumR = (Math.sqrt(2) * inputs.s) / 2; changed = true; }
        if (!def.known(inputs.ml) && def.known(inputs.s)) { inputs.ml = (Math.sqrt(2) * inputs.s) / 2; changed = true; }
        if (!def.known(inputs.h) && def.known(inputs.h)) { inputs.h = inputs.s; changed = true; }
        if (!def.known(inputs.m) && def.known(inputs.h)) { inputs.m = inputs.s; changed = true; }
        break;

      // ==================== RECTANGLE ====================
      case "rectangle":
        if (!def.known(inputs.a) && def.known(inputs.l) && def.known(inputs.w)) { inputs.p = 2 * (inputs.l + inputs.w); changed = true; }
        if (!def.known(inputs.l) && def.known(inputs.p) && def.known(inputs.w)) { inputs.l = inputs.p / 2 - inputs.w; changed = true; }
        if (!def.known(inputs.w) && def.known(inputs.p) && def.known(inputs.l)) { inputs.w = inputs.p / 2 - inputs.l; changed = true; }
        if (!def.known(inputs.d) && def.known(inputs.l) && def.known(inputs.w)) { inputs.d = Math.sqrt(inputs.l ** 2 + inputs.w ** 2); changed = true; }
        if (!def.known(inputs.a) && def.known(inputs.l) && def.known(inputs.w)) { inputs.p = inputs.l * inputs.w; changed = true; }
        if (!def.known(inputs.l) && def.known(inputs.a) && def.known(inputs.w) && inputs.w !== 0) { inputs.l = inputs.a / inputs.w; changed = true; }
        if (!def.known(inputs.w) && def.known(inputs.a) && def.known(inputs.l) && inputs.l !== 0) { inputs.w = inputs.a / inputs.l; changed = true; }
        if (!def.known(inputs.midL) && def.known(inputs.l)) { inputs.midL = inputs.l / 2; changed = true; }
        if (!def.known(inputs.midW) && def.known(inputs.w)) { inputs.midW = inputs.w / 2; changed = true; }
        if (!def.known(inputs.l) && def.known(inputs.midL)) { inputs.l = 2 * inputs.midL; changed = true; }
        if (!def.known(inputs.w) && def.known(inputs.midW)) { inputs.w = 2 * inputs.midW; changed = true; }
        if (!def.known(inputs.inR) && def.known(inputs.l) && def.known(inputs.w)) { inputs.inR = Math.min(inputs.l, inputs.w) / 2; changed = true; }
        if (!def.known(inputs.circumR) && def.known(inputs.d)) { inputs.circumR = inputs.d / 2; changed = true; }
        if (!def.known(inputs.m1) && def.known(inputs.l) && def.known(inputs.w)) { inputs.m1 = 0.5 * Math.sqrt(2 * inputs.l ** 2 + 2 * inputs.w ** 2); changed = true; }
        if (!def.known(inputs.m2) && def.known(inputs.l) && def.known(inputs.w)) { inputs.m2 = inputs.m1; changed = true; }
        break;

      // ==================== PARALLELOGRAM ====================
      case "parallelogram":
        if (!def.known(inputs.a) && def.known(inputs.b) && def.known(inputs.h)) { inputs.a = inputs.b * inputs.h; changed = true; }
        if (!def.known(inputs.h) && def.known(inputs.a) && def.known(inputs.b) && inputs.b !== 0) { inputs.h = inputs.a / inputs.b; changed = true; }
        if (!def.known(inputs.p) && def.known(inputs.b) && def.known(inputs.s)) { inputs.p = 2 * (inputs.b + inputs.s); changed = true; }
        if (!def.known(inputs.angleB) && def.known(inputs.angleA)) { inputs.angleB = 180 - inputs.angleA; changed = true; }
        if (!def.known(inputs.angleA) && def.known(inputs.angleB)) { inputs.angleA = 180 - inputs.angleB; changed = true; }
        if (!def.known(inputs.midB) && def.known(inputs.b)) { inputs.midB = inputs.b / 2; changed = true; }
        if (!def.known(inputs.midS) && def.known(inputs.s)) { inputs.midS = inputs.s / 2; changed = true; }
        if (!def.known(inputs.inR) && def.known(inputs.a) && def.known(inputs.p)) { inputs.inR = inputs.a / (0.5 * inputs.P); changed = true; }
        if (!def.known(inputs.circumR) && def.known(inputs.b) && def.known(inputs.s) && def.known(inputs.angleA)) { inputs.circumR = Math.sqrt(inputs.b ** 2 + inputs.s ** 2 - 2 * inputs.b * inputs.s * Math.cos(inputs.angleA * Math.PI / 180)) / 2; changed = true; }
        if (!def.known(inputs.m1) && def.known(inputs.b) && def.known(inputs.s)) { inputs.m1 = 0.5 * Math.sqrt(2 * inputs.b ** 2 + 2 * inputs.s ** 2 - 4 * inputs.b * inputs.s * Math.cos(inputs.angleA * Math.PI / 180)); changed = true; }
        if (!def.known(inputs.m2) && def.known(inputs.b) && def.known(inputs.s)) { inputs.m2 = inputs.m1; changed = true; }
        break;

      // ==================== TRAPEZOID ====================
      case "trapezoid":
        if (!def.known(inputs.a) && def.known(inputs.b1) && def.known(inputs.b2) && def.known(inputs.h)) { inputs.a = 0.5 * (inputs.b1 + inputs.b2) * inputs.h; changed = true; }
        if (!def.known(inputs.h) && def.known(inputs.a) && def.known(inputs.b1) && def.known(inputs.b2) && (inputs.b1 + inputs.b2) !== 0) { inputs.h = (2 * inputs.a) / (inputs.b1 + inputs.b2); changed = true; }
        if (!def.known(inputs.mid) && def.known(inputs.b1) && def.known(inputs.b2)) { inputs.mid = 0.5 * (inputs.b1 + inputs.b2); changed = true; }
        if (!def.known(inputs.p) && def.known(inputs.b1) && def.known(inputs.b2) && def.known(inputs.s1) && def.known(inputs.s2)) { inputs.p = inputs.b1 + inputs.b2 + inputs.s1 + inputs.s2; changed = true; }
        if (!def.known(inputs.b1) && def.known(inputs.mid) && def.known(inputs.b2)) { inputs.b1 = 2 * inputs.mid - inputs.b2; changed = true; }
        if (!def.known(inputs.b2) && def.known(inputs.mid) && def.known(inputs.b1)) { inputs.b2 = 2 * inputs.mid - inputs.b1; changed = true; }
        if (!def.known(inputs.inR) && def.known(inputs.a) && def.known(inputs.p)) { inputs.inR = 2 * inputs.a / inputs.a; changed = true; }
        if (!def.known(inputs.circumR) && def.known(inputs.b1) && def.known(inputs.b2) && def.known(inputs.s1) && def.known(inputs.s2)) { inputs.circumR = (inputs.b1 * inputs.b2 + inputs.s1 * inputs.s2) / (4 * inputs.A); changed = true; }
        if (!def.known(inputs.m1) && def.known(inputs.b1) && def.known(inputs.b2) && def.known(inputs.s1) && def.known(inputs.s2)) { inputs.m1 = 0.5 * Math.sqrt(inputs.b1 ** 2 + inputs.s1 ** 2); changed = true; }
        if (!def.known(inputs.m2) && def.known(inputs.b1) && def.known(inputs.b2) && def.known(inputs.s1) && def.known(inputs.s2)) { inputs.m2 = 0.5 * Math.sqrt(inputs.b2 ** 2 + inputs.s2 ** 2); changed = true; }
        break;

      // ==================== RHOMBUS ====================
      case "rhombus":
        if (!def.known(inputs.p) && def.known(inputs.s)) { inputs.p = 4 * inputs.s; changed = true; }
        if (!def.known(inputs.a) && def.known(inputs.d1) && def.known(inputs.d2)) { inputs.a = 0.5 * inputs.d1 * inputs.d2; changed = true; }
        if (!def.known(inputs.s) && def.known(inputs.p)) { inputs.s = inputs.p / 4; changed = true; }
        if (!def.known(inputs.d1) && def.known(inputs.a) && def.known(inputs.d2)) { inputs.d1 = (2 * inputs.a) / inputs.d2; changed = true; }
        if (!def.known(inputs.d2) && def.known(inputs.a) && def.known(inputs.d1)) { inputs.d2 = (2 * inputs.a) / inputs.d1; changed = true; }
        if (!def.known(inputs.h) && def.known(inputs.a) && def.known(inputs.s)) { inputs.h = inputs.a / inputs.s; changed = true; }
        if (!def.known(inputs.midD1) && def.known(inputs.d1)) { inputs.midD1 = inputs.d1 / 2; changed = true; }
        if (!def.known(inputs.midD2) && def.known(inputs.d2)) { inputs.midD2 = inputs.d2 / 2; changed = true; }
        if (!def.known(inputs.m1) && def.known(inputs.s)) { inputs.m1 = inputs.s; changed = true; }
        if (!def.known(inputs.m2) && def.known(inputs.s)) { inputs.m2 = inputs.s; changed = true; }
        break;

      // ==================== KITE ====================
      case "kite":
        if (!def.known(inputs.p) && def.known(inputs.s1) && def.known(inputs.s2)) { inputs.p = 2 * (inputs.s1 + inputs.s2); changed = true; }
        if (!def.known(inputs.a) && def.known(inputs.d1) && def.known(inputs.d2)) { inputs.a = 0.5 * inputs.d1 * inputs.d2; changed = true; }
        if (!def.known(inputs.midD1) && def.known(inputs.d1)) { inputs.midD1 = inputs.d1 / 2; changed = true; }
        if (!def.known(inputs.midD2) && def.known(inputs.d2)) { inputs.midD2 = inputs.d2 / 2; changed = true; }
        if (!def.known(inputs.d1) && def.known(inputs.midD1)) { inputs.d1 = 2 * inputs.midD1; changed = true; }
        if (!def.known(inputs.d2) && def.known(inputs.midD2)) { inputs.d2 = 2 * inputs.midD2; changed = true; }
        if (!def.known(inputs.inR) && def.known(inputs.a) && def.known(inputs.p)) { inputs.inR = inputs.a / (0.5 * inputs.p); changed = true; }
        if (!def.known(inputs.circumR) && def.known(inputs.d1) && def.known(inputs.d2)) { inputs.circumR = 0.5 * Math.sqrt(inputs.d1 ** 2 + inputs.d2 ** 2); changed = true; }
        if (!def.known(inputs.m1) && def.known(inputs.s1) && def.known(inputs.s2)) { inputs.m1 = 0.5 * Math.sqrt(2 * inputs.s1 ** 2 + 2 * inputs.s2 ** 2); changed = true; }
        if (!def.known(inputs.m2) && def.known(inputs.s1) && def.known(inputs.s2)) { inputs.m2 = inputs.m1; changed = true; }
        break;

      // ==================== ELLIPSE ====================
      case "ellipse":
        if (!def.known(inputs.a) && def.known(inputs.a) && def.known(inputs.b)) { inputs.a = Math.PI * inputs.a * inputs.b; changed = true; }
        if (!def.known(inputs.p) && def.known(inputs.a) && def.known(inputs.b)) { inputs.p = Math.PI * (3 * (inputs.a + inputs.b) - Math.sqrt((3 * inputs.a + inputs.b) * (inputs.a + 3 * inputs.b))); changed = true; }
        if (!def.known(inputs.c) && def.known(inputs.a) && def.known(inputs.b)) { inputs.c = Math.sqrt(inputs.a ** 2 - inputs.b ** 2); changed = true; }
        if (!def.known(inputs.b) && def.known(inputs.a) && def.known(inputs.c)) { inputs.b = Math.sqrt(inputs.a ** 2 - inputs.c ** 2); changed = true; }
        break;

      // ==================== REGULAR POLYGON ====================
      case "regularPolygon":
        if (!def.known(inputs.p) && def.known(inputs.n) && def.known(inputs.s)) { inputs.p = inputs.n * inputs.s; changed = true; }
        if (!def.known(inputs.a) && def.known(inputs.n) && def.known(inputs.s) && def.known(inputs.apothem)) { inputs.a = 0.5 * inputs.n * inputs.s * inputs.apothem; changed = true; }
        if (!def.known(inputs.apothem) && def.known(inputs.a) && def.known(inputs.p) && inputs.p !== 0) { inputs.apothem = (2 * inputs.a) / inputs.p; changed = true; }
        if (!def.known(inputs.inR) && def.known(inputs.a) && def.known(inputs.p) && inputs.p !== 0) { inputs.inR = (2 * inputs.a) / inputs.p; changed = true; }
        if (!def.known(inputs.circumR) && def.known(inputs.s) && def.known(inputs.n)) { inputs.circumR = inputs.s / (2 * Math.sin(Math.PI / inputs.n)); changed = true; }
        break;
    }
  }

  return inputs;
}
function shapes2DCompute() {
  const shape = document.getElementById("shape2D").value;
  let inputs = {};
  const nameMap = {
    r: "Radius",
    d: "Diameter",
    c: "Circumference",
    a: "Area",
    tp: "Triangle type based on angles",
    tT: "Triangle type based on sides",
    b: "Base",
    h1: "Height 1",
    h2: "Height 2",
    h3: "Height 3",
    m1: "Median 1",
    m2: "Median 2",
    m3: "Median 3",
    h: "Height",
    ml: "Midline",
    ml1: "Midline",
    ml2: "Midline",
    s1: "Side 1",
    s2: "Side 2",
    s3: "Side 3",
    p: "Perimeter",
    sp: "Semierimeter",
    l: "Length",
    w: "Width",
    d1: "Diagonal 1",
    d2: "Diagonal 2",
    n: "Number of Sides",
    s: "Side Length",
    apothem: "Apothem Length",
    sectorArea: "Sector Area",
    arcLength: "Arc Length",
    centralAngle: "Central Angle",
    semiperimeter: "Semiperimeter",
    inR: "Inradius",
    circumR: "Circumradius",
    exR1: "Exradius 1",
    exR2: "Exradius 2",
    exR3: "Exradius 3",
    angleA: "Angle A",
    angleB: "Angle B",
    angleC: "Angle C",
    midsegment: "Midsegment",
    base1: "Base 1",
    base2: "Base 2",
    focalDistance: "Focal Distance",
    semiMajor: "Semi-Major Axis",
    semiMinor: "Semi-Minor Axis",
    midL: "Longer midline",
    midW: "Shorter midline",
    midB: "Midline of base",
    midS: "Midline of side",
    midD1: "Midsegment of diagonal 1",
    midS: "Midsegment of diagonal 2",
    mid1: "Midsegment 1",
    mid2: "Midsegment 2",
    mid3: "Midsegment 3"
  };
  switch (shape) {
    case "circle":
      inputs = {
        r: parseFloat(shape2DCircleRadius?.value) || null,
        d: parseFloat(shape2DCircleDiameter?.value) || null,
        c: parseFloat(shape2DCircleCircumference?.value) || null,
        a: parseFloat(shape2DCircleArea?.value) || null,
        SectorArea: parseFloat(shape2DCircleSectorArea?.value) || null,
        ArcLength: parseFloat(shape2DCircleArcLength?.value) || null,
        CentralAngle: parseFloat(shape2DCircleCentralAngle?.value) || null
      };
      break;
    case "triangle":
      inputs = {
        tp: shape2DTriangleAngleType?.value || null,
        tT: shape2DTriangleSideType?.value || null,
        s1: parseFloat(shape2DTriangleSide1?.value) || null,
        s2: parseFloat(shape2DTriangleSide2?.value) || null,
        s3: parseFloat(shape2DTriangleSide3?.value) || null,
        b: parseFloat(shape2DTriangleBase?.value) || null,
        h1: parseFloat(shape2DTriangleHeight1?.value) || null,
        h2: parseFloat(shape2DTriangleHeight2?.value) || null,
        h3: parseFloat(shape2DTriangleHeight3?.value) || null,
        m1: parseFloat(shape2DTriangleMedian1?.value) || null,
        m2: parseFloat(shape2DTriangleMedian2?.value) || null,
        m3: parseFloat(shape2DTriangleMedian3?.value) || null,
        mid1: parseFloat(shape2DTriangleMidsegment1?.value) || null,
        mid2: parseFloat(shape2DTriangleMidsegment2?.value) || null,
        mid3: parseFloat(shape2DTriangleMidsegment3?.value) || null,
        p: parseFloat(shape2DTrianglePerimeter?.value) || null,
        sp: parseFloat(shape2DTriangleSemiperimeter?.value) || null,
        a: parseFloat(shape2DTriangleArea?.value) || null,
        angleA: parseFloat(shape2DTriangleAngle1?.value) || null,
        angleB: parseFloat(shape2DTriangleAngle2?.value) || null,
        angleC: parseFloat(shape2DTriangleAngle3?.value) || null,
        inR: parseFloat(shape2DTriangleInradius?.value) || null,
        exR1: parseFloat(shape2DTriangleExradius1?.value) || null,
        exR2: parseFloat(shape2DTriangleExradius2?.value) || null,
        exR3: parseFloat(shape2DTriangleExradius3?.value) || null,
        circumR: parseFloat(shape2DTriangleCircumradius?.value) || null
      };
      break;
    case "square":
      inputs = {
        s: parseFloat(shape2DSquareSide?.value) || null,
        d: parseFloat(shape2DSquareDiagonal?.value) || null,
        m: parseFloat(shape2DSquareMedian?.value) || null,
        h: parseFloat(shape2DSquareHeight?.value) || null,
        ml: parseFloat(shape2DSquareMidline?.value) || null,
        p: parseFloat(shape2DSquarePerimeter?.value) || null,
        a: parseFloat(shape2DSquareArea?.value) || null,
        inR: parseFloat(shape2DSquareInradius?.value) || null,
        circumR: parseFloat(shape2DSquareCircumradius?.value) || null
      };
      break;
    case "rectangle":
      inputs = {
        l: parseFloat(shape2DRectangleLength?.value) || null,
        w: parseFloat(shape2DRectangleWidth?.value) || null,
        d: parseFloat(shape2DRectangleDiagonal?.value) || null,
        p: parseFloat(shape2DRectanglePerimeter?.value) || null,
        a: parseFloat(shape2DRectangleArea?.value) || null,
        midL: parseFloat(shape2DRectangleMidlineL?.value) || null,
        midW: parseFloat(shape2DRectangleMidlineW?.value) || null,
        inR: parseFloat(shape2DRectangleInradius?.value) || null,
        circumR: parseFloat(shape2DRectangleCircumradius?.value) || null,
        m1: parseFloat(shape2DRectangleMedian1?.value) || null,
        m2: parseFloat(shape2DRectangleMedian2?.value) || null
      };
      break;
    case "parallelogram":
      inputs = {
        b: parseFloat(shape2DParallelogramBase?.value) || null,
        h: parseFloat(shape2DParallelogramHeight?.value) || null,
        s: parseFloat(shape2DParallelogramSide?.value) || null,
        angleA: parseFloat(shape2DParallelogramAngleA?.value) || null,
        angleB: parseFloat(shape2DParallelogramAngleB?.value) || null,
        p: parseFloat(shape2DParallelogramPerimeter?.value) || null,
        a: parseFloat(shape2DParallelogramArea?.value) || null,
        midB: parseFloat(shape2DParallelogramMidlineB?.value) || null,
        midS: parseFloat(shape2DParallelogramMidlineS?.value) || null,
        inR: parseFloat(shape2DParallelogramInradius?.value) || null,
        circumR: parseFloat(shape2DParallelogramCircumradius?.value) || null,
        m1: parseFloat(shape2DParallelogramMedian1?.value) || null,
        m2: parseFloat(shape2DParallelogramMedian2?.value) || null
      };
      break;
    case "trapezoid":
      inputs = {
        b1: parseFloat(shape2DTrapezoidBase1?.value) || null,
        b2: parseFloat(shape2DTrapezoidBase2?.value) || null,
        h: parseFloat(shape2DTrapezoidHeight?.value) || null,
        s1: parseFloat(shape2DTrapezoidSide1?.value) || null,
        s2: parseFloat(shape2DTrapezoidSide2?.value) || null,
        mid: parseFloat(shape2DTrapezoidMidsegment?.value) || null,
        p: parseFloat(shape2DTrapezoidPerimeter?.value) || null,
        a: parseFloat(shape2DTrapezoidArea?.value) || null,
        inR: parseFloat(shape2DTrapezoidInradius?.value) || null,
        circumR: parseFloat(shape2DTrapezoidCircumradius?.value) || null,
        m1: parseFloat(shape2DTrapezoidMedian1?.value) || null,
        m2: parseFloat(shape2DTrapezoidMedian2?.value) || null
      };
      break;
    case "rhombus":
      inputs = {
        s: parseFloat(shape2DRhombusSide?.value) || null,
        d1: parseFloat(shape2DRhombusDiagonal1?.value) || null,
        d2: parseFloat(shape2DRhombusDiagonal2?.value) || null,
        h: parseFloat(shape2DRhombusHeight?.value) || null,
        midD1: parseFloat(shape2DRhombusMidDiagonal1?.value) || null,
        midD2: parseFloat(shape2DRhombusMidDiagonal2?.value) || null,
        P: parseFloat(shape2DRhombusPerimeter?.value) || null,
        A: parseFloat(shape2DRhombusArea?.value) || null,
        m1: parseFloat(shape2DRhombusMedian1?.value) || null,
        m2: parseFloat(shape2DRhombusMedian2?.value) || null
      };
      break;
    case "kite":
      inputs = {
        d1: parseFloat(shape2DKiteDiagonal1?.value) || null,
        d2: parseFloat(shape2DKiteDiagonal2?.value) || null,
        s1: parseFloat(shape2DKiteSide1?.value) || null,
        s2: parseFloat(shape2DKiteSide2?.value) || null,
        p: parseFloat(shape2DKitePerimeter?.value) || null,
        a: parseFloat(shape2DKiteArea?.value) || null,
        midD1: parseFloat(shape2DKiteMidD1?.value) || null,
        midD2: parseFloat(shape2DKiteMidD2?.value) || null,
        inR: parseFloat(shape2DKiteInradius?.value) || null,
        circumR: parseFloat(shape2DKiteCircumradius?.value) || null,
        m1: parseFloat(shape2DKiteMedian1?.value) || null,
        m2: parseFloat(shape2DKiteMedian2?.value) || null
      };
      break;
    case "ellipse":
      inputs = {
        a: parseFloat(shape2DEllipseSemiMajor?.value) || null,
        b: parseFloat(shape2DEllipseSemiMinor?.value) || null,
        c: parseFloat(shape2DEllipseFocalDistance?.value) || null,
        p: parseFloat(shape2DEllipsePerimeter?.value) || null,
        a: parseFloat(shape2DEllipseArea?.value) || null
      };
      break;
    case "regularPolygon":
      inputs = {
        n: parseFloat(shape2DRegularPolygonSides?.value) || null,
        s: parseFloat(shape2DRegularPolygonSideLength?.value) || null,
        apothem: parseFloat(shape2DRegularPolygonApothemLength?.value) || null,
        a: parseFloat(shape2DRegularPolygonArea?.value) || null,
        p: parseFloat(shape2DRegularPolygonPerimeter?.value) || null,
        circumR: parseFloat(shape2DRegularPolygonCircumradius?.value) || null,
        inR: parseFloat(shape2DRegularPolygonInradius?.value) || null
      };
      break;
  }

  const result = solveShape2D(shape, inputs);
  let out = `Shape: ${shape}\n`;
  for (const [key, val] of Object.entries(result)) out += `${nameMap[key] || key} = ${def.fmt(val)}\n`;
  document.getElementById("shapes2DOut").textContent = out;
}
function shapes2DClear() {
  document.querySelectorAll('.shapes-2d-visible input').forEach(input => input.value = '');
  document.getElementById('shape2D').value = 'select';
  document.getElementById('shapes2DOut').textContent = '';
  const grids = [
    'shapes2DCircleGrid',
    'shapes2DTriangleGrid',
    'shapes2DSquareGrid',
    'shapes2DRectangleGrid',
    'shapes2DParallelogramGrid',
    'shapes2DTrapezoidGrid',
    'shapes2DRhombusGrid',
    'shapes2DKiteGrid',
    'shapes2DEllipseGrid',
    'shapes2DRegularPolygonGrid'
  ];
  grids.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.classList.remove('shapes-2d-visible');
      el.classList.add('shapes-2d-hidden');
    }
  });
}

// =============== PHYSICS ===============

// ---------- KINEMATICS SOLVER ----------
function kinematics_clear() {
  ['kin_s', 'kin_u', 'kin_v', 'kin_a', 'kin_t'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('kin_out').textContent = '';
}
function kinematics_solve() {
  let s = def.toNum(document.getElementById('kin_s').value);
  let u = def.toNum(document.getElementById('kin_u').value);
  let v = def.toNum(document.getElementById('kin_v').value);
  let a = def.toNum(document.getElementById('kin_a').value);
  let t = def.toNum(document.getElementById('kin_t').value);

  let changed = true, iter = 0;
  while (changed && iter < 40) {
    changed = false; iter++;
    if (!def.known(v) && def.known(u) && def.known(a) && def.known(t)) { v = u + a * t; changed = true; }
    if (!def.known(u) && def.known(v) && def.known(a) && def.known(t)) { u = v - a * t; changed = true; }
    if (!def.known(a) && def.known(v) && def.known(u) && def.known(t) && t !== 0) { a = (v - u) / t; changed = true; }
    if (!def.known(t) && def.known(v) && def.known(u) && def.known(a) && a !== 0) { t = (v - u) / a; changed = true; }
    if (!def.known(s) && def.known(u) && def.known(t) && def.known(a)) { s = u * t + 0.5 * a * t * t; changed = true; }
    if (!def.known(s) && def.known(u) && def.known(v) && def.known(t)) { s = (u + v) / 2 * t; changed = true; }
    if (!def.known(t) && def.known(s) && def.known(u) && def.known(v) && (u + v) !== 0) { t = (2 * s) / (u + v); changed = true; }
    if (!def.known(v) && def.known(u) && def.known(a) && def.known(s)) { const val = u * u + 2 * a * s; if (val >= 0) { v = Math.sqrt(val); changed = true; } }
    if (!def.known(u) && def.known(v) && def.known(a) && def.known(s)) { const val = v * v - 2 * a * s; if (val >= 0) { u = Math.sqrt(val); changed = true; } }
    if (!def.known(a) && def.known(v) && def.known(u) && def.known(s) && s !== 0) { a = (v * v - u * u) / (2 * s); changed = true; }
  }

  const out = `Iterations: ${iter}\n` +
    `s = ${def.fmt(s)}\n` +
    `u = ${def.fmt(u)}\n` +
    `v = ${def.fmt(v)}\n` +
    `a = ${def.fmt(a)}\n` +
    `t = ${def.fmt(t)}`;

  document.getElementById('kin_out').textContent = out;
}

// ---------- PROJECTILE FLEXIBLE SOLVER ----------
function proj_clear() {
  ['pm_v0', 'pm_theta', 'pm_g', 'pm_T', 'pm_R', 'pm_H'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('pm_out').textContent = '';
}
function proj_flexible() {
  let v0 = def.toNum(document.getElementById('pm_v0').value);
  let theta = def.toNum(document.getElementById('pm_theta').value);
  let g = def.toNum(document.getElementById('pm_g').value) ?? 9.81;
  let T = def.toNum(document.getElementById('pm_T').value);
  let R = def.toNum(document.getElementById('pm_R').value);
  let H = def.toNum(document.getElementById('pm_H').value);

  let changed = true, iter = 0;
  while (changed && iter < 40) {
    changed = false; iter++;
    if (def.known(v0) && def.known(theta)) {
      const th = def.deg2rad(theta);
      if (!def.known(T)) { T = 2 * v0 * Math.sin(th) / g; changed = true; }
      if (!def.known(R)) { R = (v0 * v0 * Math.sin(2 * th)) / g; changed = true; }
      if (!def.known(H)) { H = (v0 * v0 * Math.sin(th) * Math.sin(th)) / (2 * g); changed = true; }
    }
    if (def.known(T) && def.known(theta) && !def.known(v0)) { const th = def.deg2rad(theta); v0 = (T * g) / (2 * Math.sin(th)); changed = true; }
    if (def.known(R) && def.known(theta) && !def.known(v0)) { const th = def.deg2rad(theta); const denom = Math.sin(2 * th); if (Math.abs(denom) > 1e-12) { v0 = Math.sqrt(R * g / denom); changed = true; } }
    if (def.known(v0) && def.known(R) && !def.known(theta)) { const val = (R * g) / (v0 * v0); if (Math.abs(val) <= 1) { const twoTh = Math.asin(val); theta = def.rad2deg(twoTh / 2); changed = true; } }
    if (def.known(H) && def.known(v0) && !def.known(theta)) { const v = (2 * g * H) / (v0 * v0); if (v >= 0 && v <= 1) { theta = def.rad2deg(Math.asin(Math.sqrt(v))); changed = true; } }
    if (def.known(H) && def.known(theta) && !def.known(v0)) { const th = def.deg2rad(theta); const denom = Math.sin(th) * Math.sin(th); if (denom > 0) { v0 = Math.sqrt(2 * g * H / denom); changed = true; } }
    if (def.known(T) && def.known(v0) && !def.known(theta)) { const val = (T * g) / (2 * v0); if (Math.abs(val) <= 1) { theta = def.rad2deg(Math.asin(val)); changed = true; } }
  }

  const out = `Iterations: ${iter}\n` +
    `v0 = ${def.fmt(v0)} m/s\n` +
    `θ = ${def.fmt(theta)}°\n` +
    `g = ${def.fmt(g)} m/s²\n` +
    `T = ${def.fmt(T)} s\n` +
    `R = ${def.fmt(R)} m\n` +
    `H = ${def.fmt(H)} m`;
  document.getElementById('pm_out').textContent = out;
}

// ---------- WAVES CALCULATOR ----------
function waves_clear() {
  ['wav_v', 'wav_f', 'wav_lambda', 'wav_T', 'wav_F', 'wav_mu'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('wav_out').textContent = '';
}
function waves_solve() {
  let v = def.toNum(document.getElementById('wav_v').value);
  let f = def.toNum(document.getElementById('wav_f').value);
  let lambda = def.toNum(document.getElementById('wav_lambda').value);
  let T = def.toNum(document.getElementById('wav_T').value);
  let F = def.toNum(document.getElementById('wav_F').value);
  let mu = def.toNum(document.getElementById('wav_mu').value);

  let changed = true, iter = 0;
  while (changed && iter < 40) {
    changed = false; iter++;
    if (!def.known(v) && def.known(f) && def.known(lambda)) { v = f * lambda; changed = true; }
    if (!def.known(f) && def.known(v) && def.known(lambda) && lambda !== 0) { f = v / lambda; changed = true; }
    if (!def.known(lambda) && def.known(v) && def.known(f) && f !== 0) { lambda = v / f; changed = true; }
    if (!def.known(T) && def.known(f) && f !== 0) { T = 1 / f; changed = true; }
    if (!def.known(f) && def.known(T) && T !== 0) { f = 1 / T; changed = true; }
    if (!def.known(v) && def.known(lambda) && def.known(T) && T !== 0) { v = lambda / T; changed = true; }
    if (!def.known(lambda) && def.known(v) && def.known(T)) { lambda = v * T; changed = true; }
    if (!def.known(T) && def.known(v) && def.known(lambda) && v !== 0) { T = lambda / v; changed = true; }
    if (!def.known(v) && def.known(F) && def.known(mu) && mu !== 0) { v = Math.sqrt(F / mu); changed = true; }
    if (!def.known(F) && def.known(v) && def.known(mu)) { F = mu * v * v; changed = true; }
    if (!def.known(mu) && def.known(v) && def.known(F) && v !== 0) { mu = F / (v * v); changed = true; }
  }

  const out = `Iterations: ${iter}\n` +
    `v = ${def.fmt(v)}\n` +
    `f = ${def.fmt(f)}\n` +
    `λ = ${def.fmt(lambda)}\n` +
    `T = ${def.fmt(T)}\n` +
    `F = ${def.fmt(F)}\n` +
    `μ = ${def.fmt(mu)}`;

  document.getElementById('wav_out').textContent = out;
}


// ============== GAMES ===============


// --------- Pi Game ---------
function changePiMode() {
  const piStart = document.getElementById("piStart");
  const piReset = document.getElementById("piReset");
  const piComment = document.getElementById("piComment");
  const mode = document.getElementById("piMode").value;
  const piTestHolder = document.getElementById("piTesterHolder");
  const piPracticeHolder = document.getElementById("piPracticeHolder");
  const piRevealHolder = document.getElementById("piRevealHolder");
  [piTestHolder, piPracticeHolder, piRevealHolder].forEach(el => {
    el.classList.add('piHidden');
    el.classList.remove('piVisible');
  });
  if (mode === 'selectPi') {
    [piTestHolder, piPracticeHolder, piRevealHolder].forEach(el => {
      el.classList.add('piHidden');
      el.classList.remove('piVisible');
    });
    piReset.classList.add('pi-reset-hidden');
    piReset.classList.remove('pi-reset-visible');
    piStart.classList.add('pi-start-hidden');
    piStart.classList.remove('pi-start-visible');
    piComment.classList.add('pi-comment-hidden');
    piComment.classList.remove('pi-comment-visible');
    document.getElementById("piComment").textContent = "";
    document.getElementById("piTestInput").value = "";
  }
  else if (mode === 'testPi') {
    piTestHolder.classList.remove('piHidden');
    piTestHolder.classList.add('piVisible');
    piReset.classList.remove('pi-reset-hidden');
    piReset.classList.add('pi-reset-visible');
    piStart.classList.remove('pi-start-hidden');
    piStart.classList.add('pi-start-visible');
    piComment.classList.remove('pi-comment-hidden');
    piComment.classList.add('pi-comment-visible');
    document.getElementById("piComment").textContent = "";
    document.getElementById("piTestInput").value = "";
  } else if (mode === 'pracPi') {
    piPracticeHolder.classList.remove('piHidden');
    piPracticeHolder.classList.add('piVisible');
    piReset.classList.remove('pi-reset-hidden');
    piReset.classList.add('pi-reset-visible');
    piStart.classList.remove('pi-start-hidden');
    piStart.classList.add('pi-start-visible');
    piComment.classList.remove('pi-comment-hidden');
    piComment.classList.add('pi-comment-visible');
    document.getElementById("piComment").textContent = "";
    document.getElementById("piTestInput").value = "";
  } else {
    piRevealHolder.classList.remove('piHidden');
    piRevealHolder.classList.add('piVisible');
    piReset.classList.add('pi-reset-hidden');
    piReset.classList.remove('pi-reset-visible');
    piStart.classList.add('pi-start-hidden');
    piStart.classList.remove('pi-start-visible');
    piComment.classList.add('pi-comment-hidden');
    piComment.classList.remove('pi-comment-visible');
    document.getElementById("piComment").textContent = "";
    document.getElementById("piTestInput").value = "";
  }
}
function piReset() {
  [document.getElementById("piTesterHolder"), document.getElementById("piPracticeHolder"), document.getElementById("piRevealHolder")].forEach(el => {
    el.classList.add('piHidden');
    el.classList.remove('piVisible');
  });
  document.getElementById("piMode").value = 'selectPi';
  document.getElementById("piReset").classList.add('pi-reset-hidden');
  document.getElementById("piStart").classList.add('pi-start-hidden');
  document.getElementById("piStart").textContent = 'Start';
  document.getElementById("piComment").classList.add('pi-comment-hidden');
  document.getElementById("piComment").classList.remove('pi-comment-visible');
  document.getElementById("piComment").textContent = "";
  document.getElementById("piTestInput").value = "";
  document.getElementById("piInputs").innerHTML = "";
  def.piIndex = 0;
  def.mistakesAllowed = 3;
}
function piStart() {
  const piStart = document.getElementById("piStart");
  const mode = document.getElementById("piMode").value;
  if (piStart.textContent === 'Start') {
    document.getElementById("piTestInput").disabled = false;
    if (mode === 'testPi') {
      startPiTest();
    }
    else {
      startPiPractice()
    }
    piStart.textContent = 'Restart';
  }
  else {
    piStart.textContent = 'Start';
    document.getElementById("piComment").textContent = "";
    document.getElementById("piTestInput").value = "";
    document.getElementById("piInputs").innerHTML = "";
    document.getElementById("piTestInput").disabled = false;
  }
}
function startPiTest() {
  const piTestInput = document.getElementById("piTestInput");
  const piComment = document.getElementById("piComment");
  let startTime = 0;
  def.piIndex = 0;
  startTime = Date.now();
  piComment.textContent = 'Start typing...';
  piTestInput.value = '';
  piTestInput.focus();
  piTestInput.oninput = () => {
    const val = piTestInput.value;
    if (val[val.length - 1] === def.piGamePi[def.piIndex]) {
      def.piIndex++;
    } else {
      const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);
      piComment.textContent = `Wrong digit at position ${def.piIndex + 1}. Time: ${timeTaken}s`;
      piTestInput.disabled = true;
      return;
    }
    if (def.piIndex >= def.piGamePi.length) {
      const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);
      piComment.textContent = `Perfect! You typed all ${def.piGamePi.length} digits correctly in ${totalTime}s!`;
      piTestInput.disabled = true;
    }
  };
}
function startPiPractice() {
  def.mistakesAllowed = parseInt(document.getElementById("mistakeLimit").value || '3');
  def.piIndex = 0;
  document.getElementById("piInputs").innerHTML = "";
  createNextPracticeInput();
}
function createNextPracticeInput() {
  const inputContainer = document.getElementById("piInputs");
  const input = document.createElement("input");
  const piComment = document.getElementById("piComment");
  input.type = "text";
  input.inputMode = "numeric";
  input.className = "pi-digit-input";
  input.placeholder = `#${def.piIndex + 1}`;
  piComment.textContent = 'Start typing...';
  input.addEventListener("input", () => {
    const entered = input.value.trim();
    if (entered === "") {
      input.style.borderColor = "";
      return;
    }
    if (!/^\d$/.test(entered)) {
      piComment.textContent = "Please enter a number.";
      input.value = "";
      input.style.borderColor = "orange";
      return;
    }
    if (entered === def.piGamePi[def.piIndex]) {
      input.style.borderColor = "green";
      input.style.transition = "border-color 0.3s";
      def.piIndex++;
      setTimeout(() => {
        input.style.borderColor = "";
        input.disabled = true;
        if (def.piIndex < def.piGamePi.length) createNextPracticeInput();
        else piComment.textContent = `You completed all ${def.piGamePi.length} digits!`;
      }, 300);
    }
    else {
      input.style.borderColor = "red";
      input.style.transition = "border-color 0.3s";
      def.mistakesAllowed--;
      if (def.mistakesAllowed <= 0) {
        piComment.textContent = `You’ve reached the mistake limit. Final digit count: ${def.piIndex}`;
        disableAllInputs();
      } else {
        piComment.textContent = `Oops, you got that one wrong. Mistakes left: ${def.mistakesAllowed}. Try again!`;
      }
    }
  });
  inputContainer.appendChild(input);
  input.focus();
}
function disableAllInputs() {
  document.querySelectorAll(".pi-digit-input").forEach(inp => inp.disabled = true);
}
// -------- Math Quiz ---------
function getSelectedOperations() {
  const ops = [];
  document.querySelectorAll('.operation:checked').forEach(cb => {
    ops.push(cb.value);
  });
  return ops.length > 0 ? ops : ['+'];
}
function fg2_start() {
  const min = def.toNum(document.getElementById('fg_min').value) ?? 0;
  const max = def.toNum(document.getElementById('fg_max').value) ?? 10;
  const opsPer = def.toNum(document.getElementById('fg_ops').value) ?? 1;
  const n = def.toNum(document.getElementById('fg_n').value) ?? 5;

  if (min >= max) {
    document.getElementById('fg2_area').textContent = 'Minimum number must be less than the maximum number.';
    return;
  }

  const allowed = getSelectedOperations();
  def.fg2_state = { min, max, opsPer, n, idx: 0, score: 0, allowed };
  fg2_next();
}
function fg2_reset() {
  def.fg2_state = null;
  document.getElementById('fg2_area').textContent = 'Reset. Configure and press Start.';
}
function randInt(a, b) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}
function randChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function makeExpr(min, max, ops, allowedOps) {
  const nums = [];
  for (let i = 0; i < ops + 1; i++) nums.push(randInt(min, max));
  let expr = '' + nums[0];
  for (let i = 0; i < ops; i++) {
    let op = randChoice(allowedOps);
    let val = nums[i + 1];
    if ((op === '÷' || op === '/' || op === '%') && val === 0) val = 1;
    switch (op) {
      case '*':
        op = '×';
        break;
      case '/':
        op = '÷';
        break;
      case '**':
        op = '^';
        break;
    }
    expr += ` ${op} ${val}`;
  }
  return expr;
}
function toggleDropdown() {
  const dd = document.getElementById('operationDropdown');
  if (!dd) return;
  dd.classList.toggle('open');
  const content = document.getElementById('opsContent');
  const toggle = document.getElementById('opsToggle');
  if (dd.classList.contains('open')) {
    content.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
  } else {
    content.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
  }
}
if (def.opsToggle) {
  def.opsToggle.addEventListener('click', toggleDropdown);
  def.opsToggle.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleDropdown(); } });
}
document.addEventListener('click', (e) => {
  const dd = document.getElementById('operationDropdown');
  if (!dd) return;
  if (!dd.contains(e.target)) {
    dd.classList.remove('open');
    document.getElementById('opsContent').setAttribute('aria-hidden', 'true');
    document.getElementById('opsToggle').setAttribute('aria-expanded', 'false');
  }
});
function getSelectedOperations() {
  const boxes = Array.from(document.querySelectorAll('.operation'));
  const ops = boxes.filter(cb => cb.checked).map(cb => cb.value);
  return ops.length ? ops : ['+', '-', '*', '/'];
}
function evalExpr(s) {
  if (!/^[0-9+\-x×÷*/%^().\s]+$/.test(s)) throw new Error('Invalid tokens');
  const safe = s
    .replace(/×|x/g, '*')
    .replace(/÷/g, '/')
    .replace(/\^/g, '**');
  return Function(`"use strict"; return (${safe})`)();
}
function fg2_next() {
  if (!def.fg2_state) return;

  if (def.fg2_state.idx >= def.fg2_state.n) {
    document.getElementById('fg2_area').textContent =
      `Finished! Score: ${def.fg2_state.score}/${def.fg2_state.n}`;
    return;
  }

  const expr = makeExpr(def.fg2_state.min, def.fg2_state.max, def.fg2_state.opsPer, def.fg2_state.allowed);
  let correct;
  try {
    correct = evalExpr(expr);
  } catch (e) {
    return fg2_next();
  }
  correct = Math.round(correct * 100) / 100;

  def.fg2_state.current = { expr, correct };

  const area = document.getElementById('fg2_area');
  area.innerHTML = `
    Q${def.fg2_state.idx + 1}/${def.fg2_state.n}: Solve → ${expr}
    <br><br>
    <input id="fg2_answer" type="number" step="0.01" style="padding:6px 8px;border-radius:6px;border:1px solid rgba(255,255,255,0.03);background:#071219;color:#e6eef6;font-family:var(--mono)"/>
    <button class="btn" onclick="fg2_submit()">Submit</button>
  `;

  const ansInput = document.getElementById('fg2_answer');
  if (ansInput) ansInput.focus();
}
function fg2_submit() {
  const ansInput = document.getElementById('fg2_answer');
  const ans = ansInput ? Number(ansInput.value) : NaN;

  const correct = Math.round(def.fg2_state.current.correct * 100) / 100;
  const ok = Math.abs(ans - correct) < 1e-9;

  if (ok) def.fg2_state.score++;
  def.fg2_state.idx++;

  document.getElementById('fg2_area').textContent =
    (ok ? 'Correct! ' : 'Incorrect. ') + `Answer: ${def.fmt(correct)}`;

  setTimeout(fg2_next, 2000);
}
document.addEventListener('DOMContentLoaded', () => {
  if (def.opsToggle && def.opsContent) {
    def.opsToggle.addEventListener('click', () => {
      const expanded = def.opsToggle.getAttribute('aria-expanded') === 'true';
      def.opsToggle.setAttribute('aria-expanded', !expanded);
      def.opsContent.setAttribute('aria-hidden', expanded);
      def.opsContent.classList.toggle('show');
    });
  }
});

// ---------- Number Guessing ----------

function ng_start() {
  def.ng_secret = randInt(1, 100); def.ng_tries = 0; document.getElementById('ng_out').textContent = 'I picked a number 1–100. Start guessing!';
}
function ng_try() {
  const g = def.toNum(document.getElementById('ng_guess').value);
  if (g === null) return;
  def.ng_tries++;
  if (g === def.ng_secret) { document.getElementById('ng_out').textContent = `🎉 You got it in ${def.ng_tries} tries!`; def.ng_secret = null; }
  else if (g < def.ng_secret) document.getElementById('ng_out').textContent = 'Too low.';
  else document.getElementById('ng_out').textContent = 'Too high.';
}



// ========== UTILITIES =============

// -------- UNIT CONVERTER ----------
function updateUnits() {
  const selectedCategory = def.categorySelect.value;
  const options = def.unitGroups[selectedCategory] || "";
  def.fromUnit.innerHTML = options;
  def.toUnit.innerHTML = options;
}
updateUnits();
def.categorySelect.addEventListener("change", updateUnits);
function unitCompute() {
  const category = def.categorySelect.value;
  const from = def.fromUnit.value;
  const to = def.toUnit.value;
  const value = parseFloat(document.getElementById("unitVal").value);
  const outputEl = document.getElementById("unitOut");

  if (isNaN(value)) {
    outputEl.textContent = "Please enter a valid number.";
    return;
  }

  let result;

  if (category === "temperature") {
    result = convertTemperature(value, from, to);
  }
  else {
    const rates = def.conversionRates[category];
    if (!rates[from] || !rates[to]) {
      outputEl.textContent = "Conversion not defined.";
      return;
    }
    const valueInBase = value * rates[from];
    result = valueInBase / rates[to];
  }
  const fromText = def.fromUnit.options[def.fromUnit.selectedIndex].text.match(/\(([^)]+)\)/);
  const toText = def.toUnit.options[def.toUnit.selectedIndex].text.match(/\(([^)]+)\)/);
  const fromAbbr = fromText ? fromText[1] : def.fromUnit.value;
  const toAbbr = toText ? toText[1] : def.toUnit.value;
  const formatted =
    Math.abs(result) >= 0.0001 && Math.abs(result) < 10000
      ? result.toFixed(4)
      : result.toExponential(4);

  outputEl.textContent = `${value} ${fromAbbr} = ${formatted} ${toAbbr}`;
}
function convertTemperature(value, from, to) {
  if (!from || !to) throw "Undef.known unit";
  let K = value * from.factor + from.offset;
  return (K - to.offset) / to.factor;
}
function unitClear() {
  document.getElementById("unitCategory").value = "length";
  document.getElementById("unitVal").value = "";
  document.getElementById("fromUnit").innerHTML = def.unitGroups.length;
  document.getElementById("toUnit").innerHTML = def.unitGroups.length;
  document.getElementById("unitOut").textContent = "";
}


// -------- PASSWORD GENERATOR --------
def.pwdToggle.addEventListener('click', () => {
  const expanded = def.pwdToggle.getAttribute('aria-expanded') === 'true';
  def.pwdToggle.setAttribute('aria-expanded', !expanded);
  def.pwdContent.style.display = expanded ? 'none' : 'block';
  def.pwdContent.setAttribute('aria-hidden', expanded);
});
function passwordGenerate() {
  const length = parseInt(document.getElementById('pwdLength').value);
  if (isNaN(length) || length <= 0) {
    ('Please enter a valid password length.');
    return;
  }

  const types = document.querySelectorAll('.characters:checked');
  if (types.length === 0) {
    document.getElementById('pwdOut').textContent = 'Please select at least one character type.';
    return;
  }

  const charSets = {
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lower: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-----=[]{}|;:,.<>?/~`'
  };

  let allChars = '';
  types.forEach(t => allChars += charSets[t.value]);

  let password = '';
  for (let i = 0; i < length; i++) {
    password += allChars.charAt(Math.floor(Math.random() * allChars.length));
  }
  document.getElementById('pwdOut').textContent = password;
}
function passwordClear() {
  document.getElementById('pwdOut').textContent = '';
  document.getElementById('pwdLength').value = '';
  document.querySelectorAll('.characters').forEach(c => c.checked = true);
}
function copyPassword() {
  const password = document.getElementById('pwdOut').textContent;
  if (!password) return;
  navigator.clipboard.writeText(password).then(() => {
    alert('Password copied to clipboard!');
  }).catch(() => {
    alert('Failed to copy password.');
  });
}


// ------ Customize ------
function updateColor(varName, color) {
  def.root.style.setProperty(varName, color);
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