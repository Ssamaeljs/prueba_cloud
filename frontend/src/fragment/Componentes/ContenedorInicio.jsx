import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";

import MapView from "./Mapa/MapaView";
import MedicionView from "./MedicionUV/MedicionView";

import { GET } from "../../hooks/Conexion";
import { getToken } from "../../utilidades/Sessionutil";

const ContenedorInicio = (props) => {
  const { isAdmin } = props;
  const [llDispositivos, setLlDispositivos] = useState(false);
  const [dispositivos, setDispositivos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!llDispositivos) {
      GET("listar/dispositivo", getToken())
        .then((info) => {
          if (info.code !== 200) {
            setError("Error de Conexión:  " + info.msg);
          } else {
            if (!isAdmin) {
              const dispositivosActivos = info.info.filter(
                (dispositivo) => dispositivo.estado
              );
              setDispositivos(dispositivosActivos);
            } else {
              setDispositivos(info.info);
            }
          }
        })
        .catch(() => {
          setError("Error de Conexión");
        })
        .finally(() => {
          setLlDispositivos(true);
          setLoading(false);
        });
    }
  }, [llDispositivos, setLoading]);

  const [selectedUVData, setSelectedUVData] = useState(null);
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
              />
            </div>
          </div>
        )
      )}
    </>
  );
};

export default ContenedorInicio;
