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

