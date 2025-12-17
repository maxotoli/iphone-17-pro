const objetivo = 1200000;
const total = 1380000;

const actualEl = document.getElementById("actual");
const totalEl = document.getElementById("total");

const formato = (numero) => numero.toLocaleString("es-CL");

totalEl.textContent = formato(total);

const duracion = 2500;
const inicio = performance.now();

function easeOut(t) {
  return 1 - Math.pow(1 - t, 3);
}

function animar(tiempo) {
  const progreso = Math.min((tiempo - inicio) / duracion, 1);
  const eased = easeOut(progreso);

  const valor = Math.floor(eased * objetivo);
  actualEl.textContent = formato(valor);

  if (progreso < 1) {
    requestAnimationFrame(animar);
  }
}

requestAnimationFrame(animar);
