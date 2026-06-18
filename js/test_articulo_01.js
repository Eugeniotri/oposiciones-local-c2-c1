function cargarTestArticulo1() {
  const contenedor = document.getElementById("testArticulo1");
  if (!contenedor) return;

  preguntasArticulo1.forEach((pregunta, indice) => {
    const bloque = document.createElement("div");
    bloque.className = "pregunta";

    let html = `<p><strong>${indice + 1}.</strong> ${pregunta.texto}</p>`;

    pregunta.opciones.forEach((opcion, i) => {
      html += `
        <label class="opcion">
          <input type="radio" name="pregunta${indice}" value="${i}">
          ${String.fromCharCode(97 + i)}) ${opcion}
        </label>
      `;
    });

    bloque.innerHTML = html;
    contenedor.appendChild(bloque);
  });
}

function corregirTestArticulo1() {
  let aciertos = 0;
  const detalle = document.getElementById("detalleResultado");
  detalle.innerHTML = "";

  preguntasArticulo1.forEach((pregunta, indice) => {
    const seleccionada = document.querySelector(`input[name="pregunta${indice}"]:checked`);
    const linea = document.createElement("p");

    if (seleccionada && Number(seleccionada.value) === pregunta.correcta) {
      aciertos++;
      linea.innerHTML = `${indice + 1}. Correcta`;
      linea.className = "correcta";
    } else {
      linea.innerHTML = `${indice + 1}. Incorrecta. Correcta: ${String.fromCharCode(97 + pregunta.correcta)}) ${pregunta.opciones[pregunta.correcta]}`;
      linea.className = "incorrecta";
    }

    detalle.appendChild(linea);
  });

  const resultado = document.getElementById("resultadoTest");
  resultado.textContent = `Resultado: ${aciertos}/10`;
  resultado.className = aciertos >= 8 ? "resultado correcta" : "resultado incorrecta";

  if (aciertos >= 8) {
    marcarTemaBlindado("Constitución Artículo 1", aciertos);
  }
}

cargarTestArticulo1();
