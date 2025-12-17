/* ===============================
   CONFIGURACIÓN
================================ */
const CONFIG = {
  objetivoTotal: 1380000,
  claveAdmin: "906090"
};

/* ===============================
   ELEMENTOS
================================ */
const cifra = document.getElementById("cifraToggle");
const hint = document.getElementById("hintTexto");

const principal = document.getElementById("principal");
const detalle = document.getElementById("detalle");
const actualEl = document.getElementById("actual");
const totalEl = document.getElementById("total");

const arbolAdmin = document.getElementById("arbolAdmin");
const adminPanel = document.getElementById("adminPanel");
const montoInput = document.getElementById("montoInput");
const btnSumar = document.getElementById("btnSumar");
const btnReset = document.getElementById("btnReset");

/* ===============================
   DATOS
================================ */
let montoActual = Number(localStorage.getItem("montoActual")) || 1185000;
let mostrandoDetalle = false;
let primeraVez = true;

const formato = n => n.toLocaleString("es-CL");

/* ===============================
   ANIMACIÓN
================================ */
function animarNumero(el, desde, hasta, duracion = 1200) {
  const inicio = performance.now();
  function frame(t) {
    const progreso = Math.min((t - inicio) / duracion, 1);
    const easing = 1 - Math.pow(1 - progreso, 3);
    el.textContent = formato(Math.floor(desde + (hasta - desde) * easing));
    if (progreso < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

/* ===============================
   ACTUALIZAR VISTA
================================ */
function actualizar() {
  const faltan = CONFIG.objetivoTotal - montoActual;
  totalEl.textContent = formato(CONFIG.objetivoTotal);

  if (mostrandoDetalle) {
    animarNumero(actualEl, 0, montoActual);
  } else {
    animarNumero(principal, 0, faltan);
  }
}

/* ===============================
   INICIO
================================ */
actualizar();

/* ===============================
   TOGGLE CIFRA
================================ */
cifra.addEventListener("click", () => {
  if (primeraVez) {
    cifra.classList.remove("pulso", "glow");
    hint.style.display = "none";
    primeraVez = false;
  }

  mostrandoDetalle = !mostrandoDetalle;
  principal.classList.toggle("activo", !mostrandoDetalle);
  detalle.classList.toggle("activo", mostrandoDetalle);
  actualizar();
});

/* ===============================
   ÁRBOL = ADMIN
================================ */
arbolAdmin.addEventListener("click", () => {
  const clave = prompt("Clave admin:");
  if (clave === CONFIG.claveAdmin) {
    adminPanel.classList.toggle("oculto");
  }
});

/* ===============================
   ACCIONES ADMIN
================================ */
btnSumar.addEventListener("click", () => {
  const valor = Number(montoInput.value);
  if (!valor) return;

  montoActual += valor;
  localStorage.setItem("montoActual", montoActual);
  montoInput.value = "";
  actualizar();
});

btnReset.addEventListener("click", () => {
  if (!confirm("¿Resetear monto?")) return;
  montoActual = 0;
  localStorage.setItem("montoActual", montoActual);
  actualizar();
});
