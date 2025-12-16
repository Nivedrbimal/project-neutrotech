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