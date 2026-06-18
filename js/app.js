function obtenerProgreso() {
  return JSON.parse(localStorage.getItem("oposicionesProgreso")) || {};
}

function guardarProgreso(progreso) {
  localStorage.setItem("oposicionesProgreso", JSON.stringify(progreso));
}

function marcarTemaBlindado(idTema, nota) {
  const progreso = obtenerProgreso();
  progreso[idTema] = {
    estado: "Blindado",
    nota: nota,
    fecha: new Date().toLocaleDateString("es-ES")
  };
  guardarProgreso(progreso);
}

function reiniciarProgreso() {
  if (confirm("¿Seguro que quieres borrar el progreso guardado en este navegador?")) {
    localStorage.removeItem("oposicionesProgreso");
    location.reload();
  }
}

function mostrarResumenProgreso() {
  const resumen = document.getElementById("resumenProgreso");
  if (!resumen) return;

  const progreso = obtenerProgreso();
  const temas = Object.keys(progreso);

  if (temas.length === 0) {
    resumen.textContent = "Todavía no hay temas blindados.";
    return;
  }

  resumen.innerHTML = temas.map(id => {
    const item = progreso[id];
    return `${id}: ${item.estado} · Nota: ${item.nota}/10 · Fecha: ${item.fecha}`;
  }).join("<br>");
}

mostrarResumenProgreso();
