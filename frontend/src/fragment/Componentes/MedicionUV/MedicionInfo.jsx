import React from "react";
import { getPromedio, getUVColor } from "./assets/MedicionUtils";

const MedicionInfo = (props) => {
  const { dispositivos, selectedUVData } = props;
  return (
    <div className="container text-right">
      <div className="row">
        <div className="container" style={{ padding: "20px " }}>
          <a
            style={{
              color: getUVColor(
                selectedUVData ? selectedUVData.uv : getPromedio(dispositivos)
              ).color,
              fontSize: "20px",
              fontFamily: "Arial",
              fontWeight: "bold",
            }}
          >
            {
              getUVColor(
                selectedUVData ? selectedUVData.uv : getPromedio(dispositivos)
              ).tipo
            }
          </a>
        </div>

        <div />
        <div className="row">
          <a
            style={{
              color: "white",
              fontSize: "15px",
              fontFamily: "Arial",
              fontWeight: "bold",
            }}
          >
            {
              getUVColor(
                selectedUVData ? selectedUVData.uv : getPromedio(dispositivos)
              ).descripcion
            }
          </a>
          <div />
        </div>
      </div>
    </div>
  );
};

export default MedicionInfo;
