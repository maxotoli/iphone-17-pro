// Elementos del DOM
const cifra = document.getElementById("cifraToggle");
const hint = document.getElementById("hintTexto");
const principal = document.getElementById("principal");
const detalle = document.getElementById("detalle");
const actualEl = document.getElementById("actual");
const totalEl = document.getElementById("total");

// Variables
let montoActual = 0; // se cargará desde el gist
const CONFIG_OBJETIVO = 1380000;
let detalleActivo = false;
let primera = true;

// Formateo de números
const fmt = n => n.toLocaleString("es-CL");

// Animación de números
function animar(el, from, to, duration=1200){
  const start = performance.now();
  requestAnimationFrame(function f(now){
    const p = Math.min((now-start)/duration,1);
    el.textContent = fmt(Math.floor(from+(to-from)*(1-Math.pow(1-p,3))));
    if(p<1) requestAnimationFrame(f);
  });
}

// Actualiza visualización
function actualizar(){
  const faltan = CONFIG_OBJETIVO - montoActual;
  totalEl.textContent = fmt(CONFIG_OBJETIVO);
  if(detalleActivo){
    animar(actualEl,0,montoActual);
  } else {
    animar(principal,0,faltan);
  }
}

// Toggle entre detalle/principal
cifra.onclick = () => {
  if(primera){
    cifra.classList.remove("pulso","glow");
    hint.style.display="none";
    primera=false;
  }
  detalleActivo = !detalleActivo;
  principal.classList.toggle("activo",!detalleActivo);
  detalle.classList.toggle("activo",detalleActivo);
  actualizar();
};

// Función para incrementar monto manualmente
function aumentarMonto(cantidad=10000){
  montoActual += cantidad;
  if(montoActual > CONFIG_OBJETIVO) montoActual = CONFIG_OBJETIVO;
  actualizar();
}

// Cargar monto desde gist de GitHub
fetch('https://gist.githubusercontent.com/maxotoli/cc7e68ffa308b87bf72340058e30bdd1/raw/3180a104ad500a434698416118ba3ead3666f81c/monto.json')
  .then(res => res.json())
  .then(data => {
    montoActual = data.montoActual;
    actualizar();
  })
  .catch(err => {
    console.error("No se pudo cargar el monto desde el gist", err);
    montoActual = 1195000; // valor por defecto si falla
    actualizar();
  });
