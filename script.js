/* CONFIGURACIÓN PARA EL PROYECTO DE HELENA
   Cambia SECRET_CODE antes de publicar.
   Aviso: GitHub Pages es estático. Este código es una barrera romántica,
   no una autenticación segura: alguien con conocimientos puede inspeccionar JS.
*/
const SECRET_CODE = "HELENA2026"; // Código de Helena: cámbialo antes de publicar.
const OWNER_CODE = "DANIELREVISION7"; // Código de revisión: cámbialo por uno privado.
const STORAGE_KEY = "helena7days_v1";
let reviewMode = false; // Solo vive en memoria: nunca se guarda en el progreso de Helena.

const days = [
  { title: "Un viaje hasta ti", icon: "✈️", summary: "De República Dominicana hasta México", content: `<p>Un pequeño viaje para recordarte que, a veces, lo bonito también sabe encontrar su camino.</p><p class="quote">Sea rápido o lento, si va a durar, va a durar</p><p>❤️ Al llegar, el cielo se llena de corazones. Esta es la primera sorpresa.</p>` },
  { title: "Aquí empezó todo", icon: "🎲", summary: "Dos dados, dos iniciales", content: `<p>Dos dados esperan tu toque. En sus caras superiores aparecen las iniciales <strong>D</strong> y <strong>H</strong>, como una pequeña señal de esta historia.</p><p class="quote">Aquí empezó todo ❤️</p><p>Esta es la idea aprobada para el tablero inspirado en Parchís Star. La animación de los dados se añadirá al integrar la experiencia completa.</p>` },
  { title: "Una sorpresa para ti", icon: "🎵", summary: "Una canción especial para ti", content: `<p>Hay canciones que merecen escucharse con calma. Preparé este fragmento especialmente para acompañar tu sorpresa.</p><div class="music-card"><p class="music-label">🎧 UNA CANCIÓN PARA HELENA</p><audio controls preload="metadata" class="day3-audio"><source src="dia3-no-silence.mp3" type="audio/mpeg">Tu navegador no puede reproducir este archivo de audio.</audio><p class="music-note">Fragmento desde 00:13 hasta el final disponible de la versión que compartiste.</p></div>` },
  { title: "El misterio de mi corazón", icon: "🗝️", summary: "Una sorpresa por descubrir", content: `<div class="placeholder">Día 4 pendiente de aprobar. No se publicará contenido definitivo hasta que lo revisemos juntos.</div>` },
  { title: "Nuestro cielo de promesas", icon: "✨", summary: "Cinco estrellas, cinco mensajes", content: `<p>Un cielo rosa oscuro y violeta guarda cinco estrellas. Toca cada una para descubrir una frase; al llegar a la quinta, se conectan formando un corazón con las iniciales <strong>D + H</strong>.</p><p>La experiencia incluirá una dedicatoria final y música instrumental suave.</p>` },
  { title: "Un detalle que nos une", icon: "🌹", summary: "Una sorpresa guardada", content: `<div class="placeholder">Día 6 pendiente de definir. Este espacio queda preparado para la idea que aprobemos.</div>` },
  { title: "Una última sorpresa", icon: "❤️", summary: "El cierre de estos siete días", content: `<p>La sorpresa final tendrá una máquina interactiva con cinco corazones, mensajes y una dedicatoria especial, con música instrumental suave y una estética romántica en rojo oscuro y rosa.</p><div class="placeholder">El contenido final se integrará cuando terminemos de aprobar todos los detalles.</div>` }
];

const login = document.querySelector("#login");
const calendarView = document.querySelector("#calendar-view");
const codeForm = document.querySelector("#code-form");
const codeInput = document.querySelector("#secret-code");
const loginError = document.querySelector("#login-error");
const calendar = document.querySelector("#calendar");
const surprisePanel = document.querySelector("#surprise-panel");
const surpriseTitle = document.querySelector("#surprise-title");
const surpriseKicker = document.querySelector("#surprise-kicker");
const surpriseContent = document.querySelector("#surprise-content");

function loadState(){
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || null; }
  catch { return null; }
}
function saveState(state){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function localDateKey(date){
  const year = date.getFullYear();
  const month = String(date.getMonth()+1).padStart(2,"0");
  const day = String(date.getDate()).padStart(2,"0");
  return `${year}-${month}-${day}`;
}
function getUnlockedDay(state){
  const started = new Date(`${state.startDate}T00:00:00`);
  if (Number.isNaN(started.getTime())) return 1;
  const today = new Date();
  const todayLocal = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const elapsed = Math.floor((todayLocal - started) / 86400000);
  return Math.max(1, Math.min(7, elapsed + 1));
}
function ensureState(){
  let state = loadState();
  if (!state || !state.startDate) {
    state = { authenticated: true, startDate: localDateKey(new Date()), openedDays: [] };
    saveState(state);
  }
  if (!Array.isArray(state.openedDays)) state.openedDays = [];
  return state;
}
function showCalendar(isReview = false){
  reviewMode = isReview;
  login.classList.add("hidden");
  calendarView.classList.remove("hidden");
  document.querySelector("#mode-label").textContent = reviewMode
    ? "MODO DE REVISIÓN · NO GUARDA CAMBIOS"
    : "MODO HELENA · PROGRESO GUARDADO EN ESTE CELULAR";
  document.querySelector("#switch-mode").textContent = reviewMode ? "Salir de revisión" : "Cambiar código / modo de revisión";
  renderCalendar();
}
function renderCalendar(){
  const state = reviewMode ? { openedDays: [] } : ensureState();
  const unlocked = reviewMode ? 7 : getUnlockedDay(state);
  calendar.innerHTML = "";
  days.forEach((day,index)=>{
    const number = index + 1;
    const available = number <= unlocked;
    const opened = !reviewMode && state.openedDays.includes(number);
    const button = document.createElement("button");
    button.type = "button";
    button.className = `day-card ${available ? "available" : "locked"}`;
    button.disabled = !available;
    button.setAttribute("aria-label", available ? `Abrir día ${number}: ${day.title}` : `Día ${number} bloqueado`);
    button.innerHTML = `<div class="day-top"><span class="day-number">DÍA ${number}</span><span class="day-icon">${available ? day.icon : "🔒"}</span></div><h3>${day.title}</h3><p>${available ? day.summary : "Esta sorpresa llegará a su tiempo."}</p><span class="status">${available ? (opened ? "♥ Ya puedes volver" : "♥ Toca para abrir") : "Bloqueado"}</span>`;
    if (available) button.addEventListener("click",()=>openDay(number));
    calendar.appendChild(button);
  });
  document.querySelector("#progress-fill").style.width = `${(unlocked/7)*100}%`;
  document.querySelector("#progress-label").textContent = reviewMode
    ? "Vista de revisión: los 7 días están disponibles. No se modifica el progreso de Helena."
    : `Día ${unlocked} de 7 disponible${unlocked===1?"":"s"}`;
}
function openDay(number){
  const state = reviewMode ? null : ensureState();
  if(!reviewMode && number > getUnlockedDay(state)) return;
  if(!reviewMode){
    if(!state.openedDays.includes(number)) state.openedDays.push(number);
    saveState(state);
  }
  const day = days[number-1];
  surpriseKicker.textContent = `TU SORPRESA · DÍA ${number}`;
  surpriseTitle.textContent = day.title;
  surpriseContent.innerHTML = day.content;
  surprisePanel.classList.remove("hidden");
  renderCalendar();
  surprisePanel.scrollIntoView({behavior:"smooth",block:"start"});
}
codeForm.addEventListener("submit",event=>{
  event.preventDefault();
  const enteredCode = codeInput.value.trim().toLocaleUpperCase();
  loginError.textContent = "";

  // El código del propietario abre una vista de prueba sin leer ni escribir el progreso de Helena.
  if(enteredCode === OWNER_CODE.toLocaleUpperCase()){
    codeInput.value = "";
    showCalendar(true);
    return;
  }

  if(enteredCode !== SECRET_CODE.toLocaleUpperCase()){
    loginError.textContent = "Ese código no es correcto. Inténtalo otra vez ❤️";
    codeInput.value = "";
    codeInput.focus();
    return;
  }

  const existing = loadState();
  if(!existing || !existing.startDate){
    saveState({authenticated:true,startDate:localDateKey(new Date()),openedDays:[]});
  } else {
    existing.authenticated = true;
    saveState(existing);
  }
  codeInput.value = "";
  showCalendar(false);
});

document.querySelector("#switch-mode").addEventListener("click",()=>{
  // Volver al acceso no borra ni modifica el progreso guardado.
  reviewMode = false;
  calendarView.classList.add("hidden");
  surprisePanel.classList.add("hidden");
  login.classList.remove("hidden");
  codeInput.value = "";
  loginError.textContent = "";
  codeInput.focus();
});
document.querySelector("#close-surprise").addEventListener("click",()=>{
  surprisePanel.classList.add("hidden");
  calendar.scrollIntoView({behavior:"smooth",block:"start"});
});

// Si Helena ya introdujo el código en este navegador, no necesita repetirlo.
const saved = loadState();
if(saved && saved.authenticated){ showCalendar(false); }
