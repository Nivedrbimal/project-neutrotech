
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