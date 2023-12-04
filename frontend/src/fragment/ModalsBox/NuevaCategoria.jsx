import { useForm } from "react-hook-form";
import mensajes from "../../utilidades/Mensajes";
import { useNavigate } from "react-router";
import { useState } from "react";
import { Guardar, GuardarJSON, Listar } from "../../hooks/Conexion";

export const NuevaCategoria = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navegation = useNavigate();

  const onSubmit = (data) => {
    var datos = {
      tipo_categoria: data.tipo.toString(),
    };
    GuardarJSON(datos, "guardar/categoria").then((info) => {
      if (info.code !== 200) {
        mensajes(info.msg, "error", "Error");
      } else {
        mensajes(info.msg);
        navegation("/a");
      }
    });
  };

  return (
    <div className="card">
      <div className="card-body">
        <form className="form-sample" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3 row">
            <div className="row">
              <div className="col-sm-12">
                <label>Tipo de Categoría</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("tipo", { required: true })}
                />
                {errors.tipo && errors.tipo.type === "required" && (
                  <div className="alert alert-danger">
                    Ingrese el nombre de la categoria
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

export default NuevaCategoria;
