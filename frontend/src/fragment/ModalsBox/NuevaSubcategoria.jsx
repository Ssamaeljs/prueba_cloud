import { useForm } from "react-hook-form";
import mensajes from "../../utilidades/Mensajes";
import { useNavigate } from "react-router";
import { useState } from "react";
import { Guardar, GuardarJSON, Listar } from "../../hooks/Conexion";

export const NuevaSubCategoria = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navegation = useNavigate();

  const [llCategorias, setLlCategorias] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState([]);

  const onSubmit = (data) => {
    var datos = {
      tipo: data.nombre,
      categoria: categoriaSeleccionada,
    };
    GuardarJSON(datos, "guardar/subcategoria").then((info) => {
      if (info.code !== 200) {
        mensajes(info.msg, "error", "Error");
      } else {
        mensajes(info.msg);
        navegation("/a");
      }
    });
  };

  if (!llCategorias) {
    Listar("listar/categoria").then((info) => {
      if (info.code !== 200) {
      } else {
        setCategorias(info.info);
        setLlCategorias(true);
      }
    });
  }

  const handleChange = (e) => {
    setCategoriaSeleccionada(e.target.value);
  };

  return (
    <div className="card">
      <div className="card-body">
        <form className="form-sample" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3 row">
            <div className="col-sm">
              <label>Categoria</label>
              <select
                disabled={false}
                className="form-select"
                {...register("categoria", { required: true })}
                onChange={handleChange}
              >
                <option>--Seleccione--</option>
                {categorias.map((m, i) => (
                  <option key={i} value={m.external_id}>
                    {m.tipo}
                  </option>
                ))}
              </select>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <label>Tipo de SubCategoría</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("nombre", { required: true })}
                />
                {errors.nombre && errors.nombre.type === "required" && (
                  <div className="alert alert-danger">
                    Ingrese el nombre de la subcategoria
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12" style={{ marginBottom: "10px" }}></div>{" "}
            {/* Espacio adicional */}
            <div className="d-grid gap-2 d-md-flex justify-content-md-center">
              <a href="/" className="btn btn-danger btn-rounded">
                CANCELAR
              </a>
              <button className="btn btn-outline-success" type="submit">
                REGISTRAR
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NuevaSubCategoria;
