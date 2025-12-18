const cifra = document.getElementById("cifraToggle");
const hint = document.getElementById("hintTexto");
const principal = document.getElementById("principal");
const detalle = document.getElementById("detalle");
const actualEl = document.getElementById("actual");
const totalEl = document.getElementById("total");

let montoActual = 1245000; // cifra real
let detalleActivo = false;
let primera = true;

const CONFIG_OBJETIVO = 1380000;

// Formatea números con puntos
const fmt = n => n.toLocaleString("es-CL");

// Animación suave de conteo
function animar(el, from, to, duration=1200){
  const start = performance.now();
  requestAnimationFrame(function f(now){
    const progress = Math.min((now-start)/duration,1);
    el.textContent = fmt(Math.floor(from + (to-from)*(1-Math.pow(1-progress,3))));
    if(progress < 1) requestAnimationFrame(f);
  });
}

// Actualiza la cifra en pantalla
function actualizar(){
  const faltan = CONFIG_OBJETIVO - montoActual;
  totalEl.textContent = fmt(CONFIG_OBJETIVO);
  if(detalleActivo){
    animar(actualEl,0,montoActual);
  } else {
    animar(principal,0,faltan);
  }
}

actualizar();

// Alternar entre diferencia y monto completo
cifra.onclick = () => {
  if(primera){
    cifra.classList.remove("pulso","glow");
    hint.style.display="none";
    primera = false;
  }
  detalleActivo = !detalleActivo;
  principal.classList.toggle("activo", !detalleActivo);
  detalle.classList.toggle("activo", detalleActivo);
  actualizar();
};
