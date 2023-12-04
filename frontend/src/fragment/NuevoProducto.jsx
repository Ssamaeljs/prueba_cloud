import { useForm } from "react-hook-form";
import mensajes from "../utilidades/Mensajes";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Guardar, Listar } from "../hooks/Conexion";

export const NuevoProducto = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navegation = useNavigate();

  const [file, setFile] = useState(null);

  const [llCategorias, setLlCategorias] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState([]);

  const [llMarcas, setLlMarcas] = useState(false);
  const [marcas, setMarcas] = useState([]);
  const [marcaSeleccionada, setMarcaSeleccionada] = useState([]);

  const [llSubCategorias, setLlSubCategorias] = useState(false);
  const [subCategorias, setSubCategorias] = useState([]);
  const [subCategoriaSeleccionada, setSubCategoriaSeleccionada] = useState([]);

  const [llactivarSubCategorias, setLlActivarSubCategorias] = useState(true);
  const [llactivarMarcas, setLlActivarMarcas] = useState(true);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("nombre", data.nombre);
    formData.append("precio", data.precio);
    formData.append("descripcion", data.descripcion);
    formData.append("marca", marcaSeleccionada);
    //formData.append("subcategoria", subCategoriaSeleccionada);
    //formData.append("categoria", categoriaSeleccionada);
    formData.append("img", data.img[0]);
    console.log(data);
    Guardar(formData, "guardar/producto").then((info) => {
      if (info.code !== 200) {
        mensajes(info.msg, "error", "Error");
      } else {
        mensajes(info.msg);
        navegation("/a");
      }
    });
  };
  if (!llMarcas) {
    Listar("/listar/marca").then((info) => {
      if (info.code !== 200) {
      } else {
        setMarcas(info.info);
        setLlMarcas(true);
      }
    });
  }

  if (!llCategorias) {
    Listar("/listar/categoria").then((info) => {
      if (info.code !== 200) {
      } else {
        setCategorias(info.info);
        setLlCategorias(true);
      }
    });
  }

  const handleChange = (e) => {
    setCategoriaSeleccionada(e.target.value);
    if (
      e.target.value === "Agregar una nueva categoria..." ||
      e.target.value === "--Seleccione--"
    ) {
      setLlActivarSubCategorias(true);
    } else {
      setLlActivarSubCategorias(false);
    }
  };

  if (!llSubCategorias) {
    Listar("listar/subcategoria").then((info) => {
      console.log(info);
      if (info.code !== 200) {
      } else {
        setSubCategorias(info.info);
        setLlSubCategorias(true);
      }
    });
  }
  const handleChange_2 = (e) => {
    setSubCategoriaSeleccionada(e.target.value);
    if (
      e.target.value === "Agregar una nueva subcategoria..." ||
      e.target.value === "--Seleccione--"
    ) {
      setLlActivarMarcas(true);
    } else {
      setLlActivarMarcas(false);
    }
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
                <option>Agregar una nueva categoria...</option>
              </select>
            </div>

            <div className="col-sm">
              <label>SubCategoria</label>
              <select
                disabled={llactivarSubCategorias}
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
                <option>Agregar una nueva subcategoria...</option>
              </select>
              {errors.subcategoria &&
                errors.subcategoria.type === "required" && (
                  <div className="alert alert-danger">
                    Seleccione una subcategoria
                  </div>
                )}
            </div>

            <div className="col-sm">
              <label>Marca</label>
              <select
                disabled={llactivarMarcas}
                className="form-select"
                {...register("marca", { required: true })}
                onChange={(e) => {
                  setMarcaSeleccionada(e.target.value);
                }}
              >
                <option>--Seleccione--</option>
                {marcas.map((m, i) => (
                  <option key={i} value={m.external_id}>
                    {m.nombre}
                  </option>
                ))}

                <option>Agregar una nueva marca...</option>
              </select>
              {errors.marca && errors.marca.type === "required" && (
                <div className="alert alert-danger">Seleccione una marca</div>
              )}
            </div>
            <div className="row">
              <div className="col-sm-6">
                <label>Nombre del Producto</label>
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
                <label>Precio del Producto</label>
                <div class="input-group mb-3">
                  <span class="input-group-text">$</span>
                  <input
                    type="number"
                    step={0.01}
                    min={0.0}
                    className="form-control"
                    {...register("precio", { required: true })}
                  />
                  {errors.precio && errors.precio.type === "required" && (
                    <div className="alert alert-danger">Ingrese un precio</div>
                  )}
                </div>
              </div>
              <div className="col-sm-6">
                <label>Descripción del Producto</label>
                <div class="input-group">
                  <textarea
                    class="form-control"
                    aria-label="Descripción del Producto"
                    {...register("descripcion", { required: true })}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12" style={{ marginBottom: "10px" }}>
                <label>Imagen del Producto</label>
                <input
                  type="file"
                  className="form-control"
                  placeholder="Seleccionar una Imagen del Producto"
                  {...register("img")}
                />
              </div>{" "}
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default NuevoProducto;
