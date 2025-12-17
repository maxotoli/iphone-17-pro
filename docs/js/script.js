const CONFIG = {
  objetivoTotal: 1380000,
  claveAdmin: "906090"
};

const cifra = document.getElementById("cifraToggle");
const hint = document.getElementById("hintTexto");
const principal = document.getElementById("principal");
const detalle = document.getElementById("detalle");
const actualEl = document.getElementById("actual");
const totalEl = document.getElementById("total");

const arbol = document.getElementById("arbolAdmin");
const adminPanel = document.getElementById("adminPanel");
const montoInput = document.getElementById("montoInput");
const btnSumar = document.getElementById("btnSumar");
const btnRestar = document.getElementById("btnRestar");
const btnReset = document.getElementById("btnReset");

let montoActual = Number(localStorage.getItem("montoActual")) || 1185000;
let detalleActivo = false;
let primera = true;

const fmt = n => n.toLocaleString("es-CL");

function animar(el, a, b, d=1200){
  const i=performance.now();
  requestAnimationFrame(function f(t){
    const p=Math.min((t-i)/d,1);
    el.textContent=fmt(Math.floor(a+(b-a)*(1-Math.pow(1-p,3))));
    if(p<1)requestAnimationFrame(f);
  });
}

function actualizar(){
  const faltan = CONFIG.objetivoTotal - montoActual;
  totalEl.textContent = fmt(CONFIG.objetivoTotal);
  detalleActivo
    ? animar(actualEl,0,montoActual)
    : animar(principal,0,faltan);
}

actualizar();

cifra.onclick = () => {
  if(primera){
    cifra.classList.remove("pulso","glow");
    hint.style.display="none";
    primera=false;
  }
  detalleActivo=!detalleActivo;
  principal.classList.toggle("activo",!detalleActivo);
  detalle.classList.toggle("activo",detalleActivo);
  actualizar();
};

arbol.onclick = () => {
  if(prompt("Clave admin:")===CONFIG.claveAdmin){
    adminPanel.classList.toggle("oculto");
  }
};

btnSumar.onclick = () => {
  const v=Number(montoInput.value); if(!v)return;
  montoActual+=v;
  localStorage.setItem("montoActual",montoActual);
  montoInput.value="";
  actualizar();
};

btnRestar.onclick = () => {
  const v=Number(montoInput.value); if(!v)return;
  montoActual=Math.max(0,montoActual-v);
  localStorage.setItem("montoActual",montoActual);
  montoInput.value="";
  actualizar();
};

btnReset.onclick = () => {
  if(!confirm("¿Resetear monto?"))return;
  montoActual=0;
  localStorage.setItem("montoActual",0);
  actualizar();
};
