function toHex(n){
  const h = Number(n).toString(16).toUpperCase();
  return h.length === 1 ? '0' + h : h;
}

function clamp(v){
  v = Number(v);
  if (Number.isNaN(v)) return 0;
  return Math.max(0, Math.min(255, Math.round(v)));
}

// Referencias a elementos (corregidas para coincidir con el HTML)
const rangeR = document.getElementById('rangeR');
const rangeG = document.getElementById('rangeG');
const rangeB = document.getElementById('rangeB');
const numR = document.getElementById('numR');
const numG = document.getElementById('numG');
const numB = document.getElementById('numB');
const preview = document.getElementById('preview'); // Cambiado de previewBox a preview
const hexCode = document.getElementById('hexCode'); // Cambiado de hexText a hexCode
const colorPicker = document.getElementById('colorPicker');
const randomBtn = document.getElementById('randomBtn');
const resetBtn = document.getElementById('resetBtn');

function updateFromValues(r, g, b){
  rangeR.value = r; numR.value = r;
  rangeG.value = g; numG.value = g;
  rangeB.value = b; numB.value = b;

  const hex = '#' + toHex(r) + toHex(g) + toHex(b);
  const rgb = `rgb(${r}, ${g}, ${b})`;

  preview.style.backgroundColor = rgb;
  hexCode.value = hex; // Cambiado de textContent a value porque es un input

  colorPicker.value = hex; // sincronizar con el color picker
}

function getCurrent(){
  return [clamp(rangeR.value), clamp(rangeG.value), clamp(rangeB.value)];
}

// Eventos sliders
[rangeR, rangeG, rangeB].forEach(range => {
  range.addEventListener('input', () => {
    const [r,g,b] = getCurrent();
    updateFromValues(r,g,b);
  });
});

// Eventos inputs numéricos
[numR, numG, numB].forEach((num, idx) => {
  num.addEventListener('input', () => {
    let v = clamp(num.value);
    if (idx === 0) rangeR.value = v;
    if (idx === 1) rangeG.value = v;
    if (idx === 2) rangeB.value = v;
    const [r,g,b] = getCurrent();
    updateFromValues(r,g,b);
  });
});

// Botón aleatorio
if (randomBtn) {
  randomBtn.addEventListener('click', () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    updateFromValues(r,g,b);
  });
}

// Botón reset
if (resetBtn) {
  resetBtn.addEventListener('click', () => updateFromValues(128,128,128));
}

// Evento del color picker
colorPicker.addEventListener('input', () => {
  const hex = colorPicker.value;
  const r = parseInt(hex.substr(1,2),16);
  const g = parseInt(hex.substr(3,2),16);
  const b = parseInt(hex.substr(5,2),16);
  updateFromValues(r,g,b);
});

// Inicializar
updateFromValues(128,128,128);