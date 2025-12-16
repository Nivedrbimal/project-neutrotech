// ======== CHEMISTRY ========
function highlightElementGroup(type) {
  const elements = document.querySelectorAll(`.${type}`);
  const alreadyHighlighted = Array.from(elements).some(el => el.classList.contains('highlighted'));
  document.querySelectorAll('.element-box').forEach(el => el.classList.remove('highlighted'));
  if (!alreadyHighlighted) {
    elements.forEach(el => el.classList.add('highlighted'));
  }
}
document.querySelectorAll('.element-box').forEach(box => {
  box.addEventListener('click', () => {
    const symbol = box.getAttribute('data-symbol');
    if (!fb.db || !fb.currentUser) {
      def.ptOut.textContent = `Sign in to see more detailed info on ${symbol}`;
      setTimeout(() => def.ptOut.textContent = '', 4000);
    }
    else showElementInfo(symbol);
  });
});
function searchElement() {
  const searchedElement = document.getElementById('ptSearch').value.trim().toLowerCase();
  const element = def.elementData.find(el =>
    el.Symbol.toLowerCase() === searchedElement ||
    el.Name.toLowerCase() === searchedElement ||
    el.Z.toString() === searchedElement
  );
  if (element) {
    const elementId = "atom" + element.Symbol;
    const elementElem = document.getElementById(elementId);
    if (elementElem) {
      elementElem.click();
      elementElem.classList.add("hover-element");
      setTimeout(() => elementElem.classList.remove("hover-element"), 4000);
    } 
    else {
      def.ptOut.textContent = `Element found, but no HTML element with ID "${elementId}" exists.`;
    }
  } 
  else {
    def.ptOut.textContent = 'Invalid input. Please enter a valid element name, symbol, or atomic number.';
  }
}
document.getElementById('ptSearch').addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    searchElement();
  }
});
function showElementInfoOut(button) {
  if (!fb.db || !fb.currentUser) return;
  document.querySelectorAll('.element-info-out-display').forEach(e => {
    e.classList.remove('active');
  });
  const targetId = button.getAttribute('data-target-id');
  const contentElement = document.getElementById(targetId);
  if (contentElement) {
    contentElement.classList.add('active');
  }
}
function loadElementData() {
  if (!fb.db || !fb.currentUser) {
    console.error("Firebase DB not initialized yet!");
    return;
  }
  fb.db.ref("elementData").once("value")
    .then(snapshot => {
      fb.elementDataDB = Object.values(snapshot.val());
      console.log("Element data loaded:", fb.elementDataDB.length, "elements");
    })
    .catch(err => console.error("Error loading elementData from Firebase:", err));
}
function showElementInfo(symbol) {
  if (!fb.db || !fb.currentUser) return;
  document.getElementById('ptOutElementInfo').classList.add("visible");
  const element = fb.elementDataDB.find(e => e.Symbol === symbol);
  const mainInfo = document.getElementById('elementInfoOutMain');
  mainInfo.classList.remove(
    "alkaliMetalsLegend", "metalloidsLegend", "actinidesLegend",
    "alkalineEarthMetalsLegend", "reactiveNonMetalsLegend",
    "unknownElementsLegend", "transitionMetalsLegend",
    "nobleGasesLegend", "postTransitionMetalsLegend", "lanthanidesLegend"
  );
  if (element) {
    const atomicNumber = element.Z;
    const elementCategories = {
      "alkaliMetalsLegend": [3, 11, 19, 37, 55, 87],
      "metalloidsLegend": [5, 6, 14, 32, 33, 51, 52],
      "actinidesLegend": [89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103],
      "alkalineEarthMetalsLegend": [4, 12, 20, 38, 56, 88],
      "reactiveNonMetalsLegend": [1, 7, 8, 9, 15, 16, 17, 34, 35, 53],
      "unknownElementsLegend": [109, 110, 111, 112, 113, 114, 115, 116, 117, 118],
      "transitionMetalsLegend": [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 72, 73, 74, 75, 76, 77, 78, 79, 80, 104, 105, 106, 107, 108],
      "nobleGasesLegend": [2, 10, 18, 36, 54, 86],
      "postTransitionMetalsLegend": [13, 31, 49, 50, 81, 82, 83, 84, 85],
      "lanthanidesLegend": [57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70]
    };
    for (const [className, atomicNumbers] of Object.entries(elementCategories)) {
      if (atomicNumbers.includes(atomicNumber)) {
        mainInfo.classList.add(className);
        break;
      }
    }
    document.getElementById("element-info-out-number").textContent = element.Z;
    document.getElementById("element-info-out-symbol").textContent = element.Symbol;
    document.getElementById("element-info-out-name").textContent = element.Name;
    document.getElementById("element-info-out-classification").textContent = 'Classification: ' + element.Classification;
    document.getElementById("element-info-out-standard-state").textContent = 'State: ' + element.Standard_State;
    // * temp 
    document.getElementById("element-info-out-period").textContent = 'Period: ' + element.Period;
    document.getElementById("element-info-out-group").textContent = 'Group: ' + element.Group;
    document.getElementById("element-info-out-block").textContent = 'Block: ' + element.Block;
    document.getElementById("element-info-out-atomic-mass").textContent = 'Atomic Mass: ' + element.Atomic_Mass;
    document.getElementById("element-info-out-protons").textContent = 'Protons: ' + element.Protons;
    document.getElementById("element-info-out-neutrons").textContent = 'Neutrons: ' + element.Neutrons;
    document.getElementById("element-info-out-electrons-neutral").textContent = 'Electrons (Neutral): ' + element["Electrons (Neutral)"];
    document.getElementById("element-info-out-discoverer").textContent = 'Discoverer: ' + element.Discoverer;
    document.getElementById("element-info-out-date").textContent = 'Discovery Date: ' + element.Date;
    document.getElementById("element-info-out-origin").textContent = 'Name Origin: ' + element.Origin;
    document.getElementById("element-info-out-abundance-earth").textContent = 'Abundance on Earth: ' + element.Abundance_On_Earth;
    document.getElementById("element-info-out-abundance-other").textContent = 'Abundance: ' + element.Abundance;
    document.getElementById("element-info-out-sources").textContent = 'Sources: ' + element.Sources;
    document.getElementById("element-info-out-electron-configuration").textContent = 'Complete Electron Configuration: ' + element.Electron_Configuration;
    document.getElementById("element-info-out-condensed-electron-configuration").textContent = 'Condensed Electron Configuration: ' + element.Condensed_Electron_Configuration;
    if (element && element.Isotopes && element.Isotopes.length > 0) {
      createIsotopeSlider(element);
    }
    document.getElementById("element-info-out-common-oxidation-states").textContent = 'Common Oxidation States: ' + element.Common_Oxidation_States;
    document.getElementById("element-info-out-electron-count-in-ion").textContent = 'Electron Count in Ion: ' + element.Electron_Count_in_Ion;
    document.getElementById("element-info-out-valence-orbital-diagram").textContent = 'Valence Electron Diagram: ' + element.Valence_Orbital_Diagram;
    document.getElementById("element-info-out-dot-structure").textContent = 'Dot Structure: ' + element.DotStructure;
    document.getElementById("element-info-out-nuclear-spin").textContent = 'Nuclear Spin (I): ' + element["Nuclear Spin (I)"];
    document.getElementById("element-info-out-magnetic-moment").textContent = 'Magnetic Moment (μ/μN​): ' + element["Magnetic Moment (μ/μN​)"];
    document.getElementById("element-info-out-melting-point-c").textContent = 'Melting Point (°C): ' + element["Melting Point (°C)"];
    document.getElementById("element-info-out-melting-point-k").textContent = 'Melting Point (K): ' + element["Melting Point (K)"];
    document.getElementById("element-info-out-melting-point-pressure-dependency").textContent = 'Melting Point Pressure Dependency: ' + element["Melting Point Pressure Dependency"];
    document.getElementById("element-info-out-boiling-point-c").textContent = 'Boiling Point (°C): ' + element["Boiling Point (°C)"];
    document.getElementById("element-info-out-boiling-point-k").textContent = 'Boiling Point (K): ' + element["Boiling Point (K)"];
    document.getElementById("element-info-out-boiling-point-pressure-dependency").textContent = 'Boiling Point Pressure Dependency: ' + element["Boiling Point Pressure Dependency"];
    document.getElementById("element-info-out-density").textContent = 'Density (g/cm³): ' + element["Density (g/cm³)"];
    document.getElementById("element-info-out-atomic-radius").textContent = 'Atomic Radius (pm): ' + element["Atomic Radius (pm)"];
    document.getElementById("element-info-out-covalent-radius").textContent = 'Covalent Radius (pm): ' + element["Covalent Radius (pm)"];
    document.getElementById("element-info-out-van-der-waals-radius").textContent = 'Van der Waals Radius (pm): ' + element["Van der Waals Radius (pm)"];
    document.getElementById("element-info-out-ionic-radius").textContent = 'Ionic Radius(es) (pm): ' + element["Ionic Radius(es) (pm)"];
    document.getElementById("element-info-out-mohs-hardness").textContent = 'Mohs Hardness: ' + element["Mohs Hardness"];
    document.getElementById("element-info-out-youngs-modulus").textContent = 'Young\'s Modulus (GPa): ' + element["Young's Modulus (GPa)"];
    document.getElementById("element-info-out-bulk-modulus").textContent = 'Bulk Modulus (GPa): ' + element["Bulk Modulus (GPa)"];
    document.getElementById("element-info-out-shear-modulus").textContent = 'Shear Modulus (GPa): ' + element["Shear Modulus (GPa)"];
    document.getElementById("element-info-out-thermal-conductivity").textContent = 'Thermal Conductivity (W/m·K): ' + element["Thermal Conductivity (W/m·K)"];
    document.getElementById("element-info-out-specific-heat").textContent = 'Specific Heat (J/g·K): ' + element["Specific Heat (J/g·K)"];
    document.getElementById("element-info-out-heat-of-fusion").textContent = 'Heat of Fusion (kJ/mol): ' + element["Heat of Fusion (kJ/mol)"];
    document.getElementById("element-info-out-heat-of-vaporization").textContent = 'Heat of Vaporization (kJ/mol): ' + element["Heat of Vaporization (kJ/mol)"];
    document.getElementById("element-info-out-color-solid").textContent = 'Color in Solid State: ' + element["Color_in_Solid_State"];
    document.getElementById("element-info-out-refractive-index").textContent = 'Refractive Index: ' + element["Refractive_Index"];
    document.getElementById("element-info-out-crystal-structure").textContent = 'Crystal Structure: ' + element["Crystal_Structure"];
    document.getElementById("element-info-out-lattice-parameters").textContent = 'Lattice Parameters: ' + element["Lattice Parameters (a, b, c in Å, angles α, β, γ)"];
    document.getElementById("element-info-out-space-group").textContent = 'Space Group: ' + element["Space_Group"];
    document.getElementById("element-info-out-molar-volume").textContent = 'Molar Volume: ' + element["Molar_Volume"];
    document.getElementById("element-info-out-solubility").textContent = 'Solubility: ' + element["Solubility"];
    document.getElementById("element-info-out-vapor-point").textContent = 'Vapor Point: ' + element["Vapor_Point"];
    document.getElementById("element-info-out-electronegativity").textContent = 'Electron Negativity: ' + element["Electronegativity"];
    document.getElementById("element-info-out-electron-affinity").textContent = 'Electron Affinity: ' + element["Electron_Affinity"];
    document.getElementById("element-info-out-ionization-energy").textContent = '1st Ionization Energy (kJ/mol): ' + element["1st Ionization Energy (kJ/mol)"];
    document.getElementById("element-info-out-electrode-potential").textContent = 'Standard Electrode Potential: ' + element["Standard_Electrode_Potential"];
    document.getElementById("element-info-out-acid-base-behavior").textContent = 'Acid or Base Behavior: ' + element["Acid_or_base_behavior"];
    document.getElementById("element-info-out-reactivity").textContent = 'Reactivity: ' + element["Reactivity"];
    document.getElementById("element-info-out-electrical-conductivity").textContentmagnetic = 'Electrical Conductivity: ' + element["Electrical_Conductivity"];
    document.getElementById("element-info-out-magnetic-properties").textContent = 'Magnetic Properties: ' + element["Magnetic_Properties"];
    document.getElementById("element-info-out-band-gap").textContent = 'Band Gap: ' + element["Band_Gap"];
    document.getElementById("element-info-out-radioactivity").textContent = element["Radioactive?"];
    document.getElementById("element-info-out-half-life").textContent = 'Half Life: ' + element["Half-life"];
    document.getElementById("element-info-out-toxicity").textContent = 'Toxicity: ' + element["Toxicity"];
    document.getElementById("element-info-out-bio-role").textContent = 'Biological Role: ' + element["Biological_Role"];
  } 
  else {
    console.warn("No element found for symbol:", symbol);
  }
  document.getElementById("ptInfoBtn").classList.remove('ptInfoBtnHidden');
  document.getElementById("ptInfoBtn").classList.add('ptInfoBtnVisible');
}
function createIsotopeSlider(element) {
  const atomicNumber = element.Z;
  const elementCategories = {
    "alkaliMetalsLegend": [3, 11, 19, 37, 55, 87],
    "metalloidsLegend": [5, 6, 14, 32, 33, 51, 52],
    "actinidesLegend": [89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103],
    "alkalineEarthMetalsLegend": [4, 12, 20, 38, 56, 88],
    "reactiveNonMetalsLegend": [1, 7, 8, 9, 15, 16, 17, 34, 35, 53],
    "unknownElementsLegend": [109, 110, 111, 112, 113, 114, 115, 116, 117, 118],
    "transitionMetalsLegend": [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 72, 73, 74, 75, 76, 77, 78, 79, 80, 104, 105, 106, 107, 108],
    "nobleGasesLegend": [2, 10, 18, 36, 54, 86],
    "postTransitionMetalsLegend": [13, 31, 49, 50, 81, 82, 83, 84, 85],
    "lanthanidesLegend": [57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70]
  };
  if (!element || !element.Isotopes) return;
  const isotopes = Object.values(element.Isotopes);
  const slider = document.getElementById('isotopeSlider');
  const btnLeft = document.getElementById('isotopeLeft');
  const btnRight = document.getElementById('isotopeRight');
  slider.innerHTML = "";
  isotopes.forEach(iso => {
    const box = document.createElement('div');
    box.className = 'iso-box';
    box.classList.remove(
    "alkaliMetalsLegend", "metalloidsLegend", "actinidesLegend",
    "alkalineEarthMetalsLegend", "reactiveNonMetalsLegend",
    "unknownElementsLegend", "transitionMetalsLegend",
    "nobleGasesLegend", "postTransitionMetalsLegend", "lanthanidesLegend"
  );
  for (const [className, atomicNumbers] of Object.entries(elementCategories)) {
    if (atomicNumbers.includes(atomicNumber)) {
      box.classList.add(className);
      break;
    }
  }
    box.dataset.isoName = iso.Name;
    box.innerHTML = `
      <div class="iso-symbol">${iso.Symbol}</div>
      <div class="iso-mass">${iso.Mass}</div>
    `;
    box.addEventListener('click', () => showIsotopeInfo(iso));
    slider.appendChild(box);
  });
  btnLeft.onclick = () => {
    slider.scrollBy({ left: -250, behavior: "smooth" });
  };
  btnRight.onclick = () => {
    slider.scrollBy({ left: 250, behavior: "smooth" });
  };
}
function showIsotopeInfo(iso) {
  document.getElementById("isotope-name").textContent = "Name: " + (iso.Name || "N/A");
  document.getElementById("isotope-symbol").textContent = "Symbol: " + (iso.Symbol || "N/A");
  document.getElementById("isotope-neutrons").textContent = "Neutrons: " + (iso.Neutrons || "N/A");
  document.getElementById("isotope-mass").textContent = "Mass: " + (iso.Mass || "N/A");
  document.getElementById("isotope-mass-excess").textContent = "Mass Excess: " + (iso.Mass_Excess || "N/A");
  document.getElementById("element-info-out-natural").textContent = "Natural Abundance: " + (iso.Abundances?.Natural ?? "N/A");
  document.getElementById("element-info-out-solar").textContent = "Solar Abundance: " + (iso.Abundances?.Solar ?? "N/A");
  document.getElementById("element-info-out-universe").textContent = "Universe Abundance: " + (iso.Abundances?.Universe ?? "N/A");
  document.getElementById("isotope-binding-energy").textContent = "Binding Energy: " + (iso.Binding_Energy || "N/A");
  document.getElementById("isotope-decay-energy").textContent = "Decay Energy: " + (iso.Decay_Energy || "N/A");
  document.getElementById("isotope-decay-mode").textContent = "Decay Mode: " + (iso.Decay_Mode || "N/A");
  document.getElementById("isotope-decay-width").textContent = "Decay Width: " + (iso.Decay_Width || "N/A");
  document.getElementById("isotope-half-life").textContent = "Half-Life: " + (iso.Half_Life || "N/A");
  document.getElementById("isotope-mag-moment").textContent = "Magnetic Moment: " + (iso.Magnetic_Moment || "N/A");
  document.getElementById("isotope-quadrupole").textContent = "Quadrupole Moment: " + (iso.Quadrupole_Moment || "N/A");
  document.getElementById("isotope-specific-activity").textContent = "Specific Activity: " + (iso.Specific_Activity || "N/A");
  document.getElementById("isotope-spin").textContent = "Spin: " + (iso.Spin || "N/A");
  document.getElementById("isotope-notes").textContent = "Notes: " + (iso.Notes || "N/A");
  document.getElementById("isotope-use").textContent = "Use: " + (iso.Use || "N/A");
}
document.querySelectorAll('.info-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = 'info-' + btn.dataset.target;
    const panel = document.getElementById(targetId);
    document.querySelectorAll('.info-panel').forEach(p => {
      if (p !== panel) p.classList.remove('active');
    });
    panel.classList.toggle('active');
  });
});
function ptInfoClear() {
  document.getElementById('ptOutElementInfo').classList.remove("visible");
  document.getElementById("ptInfoBtn").classList.add('ptInfoBtnHidden');
  document.getElementById("ptInfoBtn").classList.remove('ptInfoBtnVisible');
}
