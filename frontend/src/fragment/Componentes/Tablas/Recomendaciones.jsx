import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from "react-bootstrap";
const Recomendaciones = () => {
  const indices = ["1-2", "3-7", "8+"];
  const description = [
    "Puede permanecer en el exterior sin riesgos.",
    "Pongase camisa, crema de proteccion solar, sombrero y gafas de sol",
    "Son imprescindibles camisa, crema de proteccion solar, sombrero y gafas de sol",
  ];
  return (
    <div className="card text-center" style={{ maxWidth: "30rem" }}>
      <div className="card-header">
        <h5 className="card-title" style={{ fontWeight: "bold" }}>
          Tabla de Recomendaciones
        </h5>
      </div>
      <div className="card-body">
        <Table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Indice</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            {indices.map((indice, index) => (
              <tr key={index}>
                <td>{indice}</td>
                <td>{description[index]}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Recomendaciones;
