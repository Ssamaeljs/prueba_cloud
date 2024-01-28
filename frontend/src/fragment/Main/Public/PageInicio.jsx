import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import ContenedorInicio from "../../Componentes/ContenedorInicio";

const PaginaInicio = () => {
  return (
    <div>
      <section
        className="home"
        style={{
          backgroundPosition: "center",
          boxShadow: "inset 0 100px 50px 4px rgb(0 0 0 / 40%)",
        }}
      >
        <Header />

        <div
          className="container text-center"
          style={{
            transform: "translateY(150px)",
            alignItems: "center",
            backgroundColor: "rgba(19, 35, 64, 0.6)",
            borderRadius: "20px",
          }}
        >
          <ContenedorInicio />
        </div>
      </section>
    </div>
  );
};

export default PaginaInicio;
