import { useForm } from "react-hook-form";
import mensajes from "../../utilidades/Mensajes";
import { useNavigate } from "react-router";
import { useState } from "react";
import { Guardar, Listar } from "../../hooks/Conexion";

export const NuevaMarca = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navegation = useNavigate();

  const [file, setFile] = useState(null);

  const [llSubCategorias, setLlSubCategorias] = useState(false);
  const [subCategorias, setSubCategorias] = useState([]);
  const [subCategoriaSeleccionada, setSubCategoriaSeleccionada] = useState([]);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("nombre", data.nombre);
    formData.append("subcategoria", subCategoriaSeleccionada);
    formData.append("img", data.img[0]);
    console.log(data);
    Guardar(formData, "guardar/marca").then((info) => {
      if (info.code !== 200) {
        mensajes(info.msg, "error", "Error");
      } else {
        mensajes(info.msg);
        navegation("/a");
      }
    });
  };

  if (!llSubCategorias) {
    Listar("/listar/subcategoria").then((info) => {
      if (info.code !== 200) {
      } else {
        setSubCategorias(info.info);
        setLlSubCategorias(true);
      }
    });
  }

  const handleChange_2 = (e) => {
    setSubCategoriaSeleccionada(e.target.value);
  };

  return (
    <div className="card">
      <div className="card-body">
        <form
          className="form-sample"
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
        >
          <div className="mb-3 row">
            <div className="col-sm">
              <label>SubCategoria</label>
              <select
                disabled={false}
                className="form-select"
                {...register("subcategoria", { required: true })}
                onChange={handleChange_2}
              >
                <option>--Seleccione--</option>
                {subCategorias.map((m, i) => (
                  <option key={i} value={m.external_id}>
                    {m.tipo}
                  </option>
                ))}
              </select>
              {errors.subcategoria &&
                errors.subcategoria.type === "required" && (
                  <div className="alert alert-danger">
                    Seleccione una subcategoria
                  </div>
                )}
            </div>
            <div className="row">
              <div className="col-sm-6">
                <label>Nombre de la Marca</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("nombre", { required: true })}
                />
                {errors.nombre && errors.nombre.type === "required" && (
                  <div className="alert alert-danger">
                    Ingrese el nombre del producto
                  </div>
                )}
              </div>
              <div className="col-sm-6">
                <label>Imagen de la Marca</label>
                <input
                  type="file"
                  className="form-control"
                  placeholder="Seleccionar una Imagen del Producto"
                  {...register("img")}
                />
              </div>{" "}
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

export default NuevaMarca;
