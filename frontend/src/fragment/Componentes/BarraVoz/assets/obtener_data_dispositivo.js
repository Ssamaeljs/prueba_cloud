export const obtener_data_dispositivo = (dispositivos) => {
  dispositivos.map((dispositivo) => {
    let uv = 0;
    let fecha;
    dispositivo.medicion.map((medicion) => {
      fecha = medicion.fecha;
      uv = medicion.uv;
    });
    return {
      geometry: [dispositivo.latitud, dispositivo.longitud],
      name: dispositivo.identificador,
      uv: uv,
      fecha: fecha,
    };
  });
};
