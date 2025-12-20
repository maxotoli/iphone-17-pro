document.addEventListener("DOMContentLoaded", () => {

  const numero = document.getElementById("numero");
  const reset = document.getElementById("reset");
  const segmentos = document.querySelectorAll(".seg");
  const cifra = document.querySelector(".cifra");
  const celebracion = document.getElementById("celebracion");

  const ROJO = 968648;
  const VERDE = 381352;
  const AMARILLO = 60100;
  const TOTAL = ROJO + VERDE + AMARILLO;

  let actual = 0;
  const fmt = n => n.toLocaleString("es-CL");

  function animar(desde, hasta, dur=700){
    const start = performance.now();
    cifra.classList.add("active");

    function frame(t){
      const p = Math.min((t-start)/dur,1);
      const e = 1 - Math.pow(1-p,3);
      numero.textContent = fmt(Math.round(desde+(hasta-desde)*e));
      if(p<1) requestAnimationFrame(frame);
      else cifra.classList.remove("active");
    }
    requestAnimationFrame(frame);
  }

  function mostrar(v){
    animar(actual,v);
    actual=v;
  }

  function celebrar(){
    celebracion.innerHTML="";

    for(let i=0;i<120;i++){
      const c=document.createElement("div");
      c.className="particula";
      c.style.left=Math.random()*100+"%";
      c.style.background=["gold","#ffd700","#fff","#0b5d2a"][Math.floor(Math.random()*4)];
      c.style.animationDuration=2+Math.random()*2+"s";
      celebracion.appendChild(c);
    }

    for(let i=0;i<30;i++){
      const s=document.createElement("div");
      s.className="serp";
      s.style.left=Math.random()*100+"%";
      s.style.background=["gold","#ffd700","#25d366"][Math.floor(Math.random()*3)];
      celebracion.appendChild(s);
    }

    setTimeout(()=>celebracion.innerHTML="",3000);
  }

  mostrar(TOTAL);
  celebrar();

  segmentos.forEach(seg=>{
    seg.addEventListener("click",()=>{
      segmentos.forEach(s=>s.classList.remove("activo"));
      mostrar(Number(seg.dataset.monto));
    });
  });

  reset.addEventListener("click",()=>{
    mostrar(TOTAL);
    celebrar();
  });

});
