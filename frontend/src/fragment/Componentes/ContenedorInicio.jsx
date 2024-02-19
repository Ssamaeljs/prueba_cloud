import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import generatePdf from "./generatePdf";
import MapView from "./Mapa/MapaView";
import MedicionView from "./MedicionUV/MedicionView";
import { Button } from "reactstrap";
import { GET } from "../../hooks/Conexion";
import { getToken } from "../../utilidades/Sessionutil";
import GraficoHistorico from "./Graficos/GraficoHistorico";

const ContenedorInicio = (props) => {
  const { isAdmin } = props;
  const [llDispositivos, setLlDispositivos] = useState(false);
  const [dispositivos, setDispositivos] = useState([]);
  const [promedio, setPromedio] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUVData, setSelectedUVData] = useState(null);

  useEffect(() => {
    if (!llDispositivos) {
      GET("listar/api_dispositivo", getToken())
        .then((info) => {
          var dispositivos, promedio;
          dispositivos = info.info.dispositivos;
          promedio = info.info.promedio;
          console.log(dispositivos);
          if (info.code !== 200) {
            setError("Error de Conexión:  " + info.msg);
          } else {
            setPromedio(promedio);
            if (!isAdmin) {
              var dispositivosActivos = dispositivos.filter(
                (dispositivo) => dispositivo.activo
              );
              setDispositivos(dispositivosActivos);
            } else {
              setDispositivos(dispositivos);
            }
          }
        })
        .catch((e) => {
          console.error(e);
          setError("Error de Conexión");
        })
        .finally(() => {
          setLlDispositivos(true);
          setLoading(false);
        });
    }
  }, [llDispositivos, setLoading]);
  const handleGeneratePdf = () => {
    generatePdf(dispositivos, promedio); // Llamamos a la función para generar el PDF con los dispositivos y el promedio
  };
  return (
    <>
      {loading ? (
        <div
          className="row justify-content-center"
          style={{ padding: "100px", scale: "1" }}
        >
          <Spinner
            style={{ width: "100px", height: "100px" }}
            animation="border"
            variant="success"
          />
          <h1
            style={{
              color: "white",
              fontSize: "25px",
              fontFamily: "Arial",
              fontWeight: "600",
              borderBottom: "1px solid #e20613",
            }}
          >
            Cargando datos...
          </h1>
        </div>
      ) : error ? (
        <>
          <img
            src={"https://upload.wikimedia.org/wikipedia/commons/d/df/UNL3.png"}
            alt="404"
            style={{ width: "20%" }}
          />
          <h1
            style={{
              color: "red",
              fontSize: "25px",
              fontFamily: "Arial",
              fontWeight: "600",
            }}
          >
            {error}
          </h1>
        </>
      ) : (
        llDispositivos &&
        dispositivos.length > 0 && (
          <div className="row">
            <div className="col-6 ">
              <MapView
                dispositivos={dispositivos}
                setSelectedUVData={setSelectedUVData}
              />
            </div>
            <div className="col-6">
              <MedicionView
                dispositivos={dispositivos}
                selectedUVData={selectedUVData}
                promedio={promedio}
              />
            </div>
            <div
              className="row justify-content-center"
              style={{ padding: "28px" }}
            >
              <GraficoHistorico
                radiacionUVDispositivoActual={dispositivos.map(
                  (dispositivo) => dispositivo.medicion[0].uv
                )}
                dispositivos={dispositivos}
                radiacionUVPromedio={promedio}
              />
            </div>
          </div>
        )
      )}
    </>
  );
};

export default ContenedorInicio;
