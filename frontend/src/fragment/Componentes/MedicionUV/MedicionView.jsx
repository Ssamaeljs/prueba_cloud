import React from "react";
import MedicionUV from "./MedicionUV";
import MedicionInfo from "./MedicionInfo";
import CategoriasExposicion from "../Tablas/CategoriasExposicion";
import BarraVoz from "../BarraVoz/BarraVoz";

const MedicionView = (props) => {
  const { dispositivos, selectedUVData } = props;
  return (
    <div
      className="card"
      style={{
        maxWidth: "100%",
        maxHeight: "100%",
        backgroundColor: "rgba(19, 35, 64, 0.7)",
      }}
    >
      <div className="card-header">
        <h3
          className="card-title text-center"
          style={{ fontWeight: "bold", color: "white" }}
        >
          Medición
        </h3>
      </div>
      <div className="card-body">
        <div className="row ">
          <div className="col-4">
            <MedicionUV
              dispositivos={dispositivos}
              selectedUVData={selectedUVData}
            />
          </div>
          <div className="col-sm">
            <div className="row">
              <MedicionInfo
                dispositivos={dispositivos}
                selectedUVData={selectedUVData}
              />
            </div>
            <div
              className="row justify-content-center"
              style={{
                paddingTop: "80px",
              }}
            >
              <BarraVoz
                dispositivos={dispositivos}
                selectedUVData={selectedUVData}
              />
            </div>
          </div>
        </div>
        <div className="row justify-content-center" style={{ padding: "38px" }}>
          <div className="col">
            <CategoriasExposicion />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicionView;
