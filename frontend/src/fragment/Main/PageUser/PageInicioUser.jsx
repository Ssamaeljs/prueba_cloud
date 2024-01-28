import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router";
import { useState } from "react";
import Header from "../Public/Header";
import ContenedorInicio from "../../Componentes/ContenedorInicio";
import ConfiguracionUsuario from "./Configuracion/ConfiguracionUsuario";

const PaginaInicioUser = () => {
  const location_props = useLocation();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("data")).user
  );
  function obtener_componente() {
    switch (location_props.pathname) {
      case "/inicio":
        return <ContenedorInicio />;
      case "/inicio/configuracion":
        return <ConfiguracionUsuario user={user} />;
      default:
        break;
    }
  }
  return (
    <>
      <section
        className="home"
        style={{
          backgroundPosition: "center",
          boxShadow: "inset 0 100px 50px 4px rgb(0 0 0 / 40%)",
        }}
      >
        <Header user={user} />
        <>
          <div
            className="container text-center"
            style={{
              transform: "translateY(150px)",
              alignItems: "center",
              backgroundColor: "rgba(19, 35, 64, 0.6)",
              borderRadius: "20px",
            }}
          >
            {obtener_componente()}
          </div>
        </>
      </section>
    </>
  );
};

export default PaginaInicioUser;
