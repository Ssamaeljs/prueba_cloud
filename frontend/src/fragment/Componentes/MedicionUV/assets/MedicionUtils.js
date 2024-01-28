import colorValues from "../../../../utilidades/data/colorValues.json";

export const getPromedio = (dispositivos) => {
  let uv_promedio = 0;

  const uv_last = dispositivos.map((dispositivo) => {
    let uv = 0;
    dispositivo.medicion.map((medicion) => {
      uv = medicion.uv;
    });
    return {
      uv: uv,
    };
  });
  uv_last.map((uv) => {
    uv_promedio += uv.uv;
  });
  uv_promedio = (uv_promedio / uv_last.length).toFixed(1);
  return parseFloat(uv_promedio);
};

export const getUVColor = (uvValue) => {
  uvValue = parseInt(uvValue);
  const categoriaEncontrada = colorValues.find((categoria) => {
    const rango = categoria.valor_max.split("-");
    const min = parseFloat(rango[0]);
    const max = parseFloat(rango[1]);
    return uvValue >= min && uvValue <= max;
  });

  return categoriaEncontrada;
};

export function formatearFechaYHora(fecha) {
  if (!fecha) {
    return formatearFechaYHora(Date.now());
  }
  const date = new Date(fecha);

  const dia = String(date.getDate()).padStart(2, "0");
  const mes = String(date.getMonth() + 1).padStart(2, "0"); // Se suma 1 porque los meses van de 0 a 11
  const anio = date.getFullYear();

  const hora = String(date.getHours()).padStart(2, "0");
  const minutos = String(date.getMinutes()).padStart(2, "0");
  const segundos = String(date.getSeconds()).padStart(2, "0");

  return `${dia}/${mes}/${anio} ${hora}:${minutos}:${segundos}`;
}
