const cifra = document.getElementById("cifraToggle");

const principal = document.getElementById("principal");
const detalle = document.getElementById("detalle");

const actualEl = document.getElementById("actual");

const FALTAN = 195000;
const ACTUAL = 1185000;
const TOTAL = 1380000;

let mostrandoDetalle = false;

/* ====== FORMATO ====== */
const formato = n => n.toLocaleString("es-CL");

/* ====== CONTADOR ANIMADO ====== */
function animarNumero(el, desde, hasta, duracion = 1200) {
  const inicio = performance.now();

  function frame(t) {
    const progreso = Math.min((t - inicio) / duracion, 1);
    const eased = 1 - Math.pow(1 - progreso, 3);
    const valor = Math.floor(desde + (hasta - desde) * eased);
    el.textContent = formato(valor);

    if (progreso < 1) requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

/* ====== ANIMACIÓN INICIAL ====== */
animarNumero(principal, 0, FALTAN);

/* ====== TOGGLE CON TRANSICIÓN ====== */
cifra.addEventListener("click", () => {
  mostrandoDetalle = !mostrandoDetalle;

  if (mostrandoDetalle) {
    principal.classList.remove("activo");
    detalle.classList.add("activo");

    animarNumero(actualEl, 0, ACTUAL);
  } else {
    detalle.classList.remove("activo");
    principal.classList.add("activo");

    animarNumero(principal, 0, FALTAN);
  }
});
