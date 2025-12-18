const principal = document.getElementById("principal");
const cifra = document.getElementById("cifraToggle");
const hint = document.getElementById("hintTexto");
const barraWrap = document.getElementById("barraWrap");

const segRojo = document.getElementById("segRojo");
const segVerde = document.getElementById("segVerde");
const segGris = document.getElementById("segGris");

const items = document.querySelectorAll(".item");

const btnRegalos = document.getElementById("btnRegalos");
const overlay = document.getElementById("overlay");
const cerrar = document.getElementById("cerrarOverlay");

const OBJETIVO = 1380000;
const ROJO = 968648;
const VERDE = 381352;
const FALTANTE = OBJETIVO - ROJO - VERDE;

const fmt = n => n.toLocaleString("es-CL");

function animar(el, to) {
  let from = 0;
  const start = performance.now();
  function step(now) {
    const p = Math.min((now - start) / 1000, 1);
    el.textContent = fmt(Math.floor(from + (to - from) * p));
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

animar(principal, FALTANTE);

cifra.onclick = () => {
  cifra.classList.remove("pulso","glow");
  hint.style.display = "none";
  barraWrap.classList.add("activo");

  segRojo.style.width = (ROJO / OBJETIVO * 100) + "%";
  segVerde.style.width = (VERDE / OBJETIVO * 100) + "%";
  segGris.style.width  = (FALTANTE / OBJETIVO * 100) + "%";
};

function activar(tipo) {
  items.forEach(i => i.classList.remove("activo"));
  document.querySelector(`[data-tipo="${tipo}"]`).classList.add("activo");

  if (tipo === "rojo") animar(principal, ROJO);
  if (tipo === "verde") animar(principal, VERDE);
  if (tipo === "gris") animar(principal, FALTANTE);
}

items.forEach(i => i.onclick = () => activar(i.dataset.tipo));
segRojo.onclick = () => activar("rojo");
segVerde.onclick = () => activar("verde");
segGris.onclick  = () => activar("gris");

btnRegalos.onclick = () => overlay.classList.add("activo");
cerrar.onclick = () => overlay.classList.remove("activo");
overlay.onclick = e => {
  if (e.target === overlay) overlay.classList.remove("activo");
};
