import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Eliminar, Listar, Obtener, URLBASE } from "../hooks/Conexion";
import { useNavigate } from "react-router";
import mensajes from "../utilidades/Mensajes";
import { Button, FormControl, InputGroup, Modal } from "react-bootstrap";
import NuevoProducto from "./NuevoProducto";
import EditarProducto from "./EditarProducto";
import Footer from "./tools/Footer";
import NuevaMarca from "./ModalsBox/NuevaMarca";
import NuevaSubCategoria from "./ModalsBox/NuevaSubcategoria";
import NuevaCategoria from "./ModalsBox/NuevaCategoria";

export const ListarTodo = () => {
  //SHOW AGREGAR
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //SHOW EDITAR
  const [showEdit, setShowEdit] = useState(false);
  const handleShowEdit = () => setShowEdit(true);
  const handleCloseEdit = () => setShowEdit(false);

  //SHOW AGREGAR CATEGORIA
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  //SHOW AGREGAR SUBCATEGORIA
  const [show3, setShow3] = useState(false);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);

  //SHOW AGREGAR MARCA
  const [show4, setShow4] = useState(false);
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);

  const [data, setData] = useState([]);
  const navegation = useNavigate();

  const [tablaListarProductos, setTablaListarProductos] = useState([]);
  const [llProductos, setLlProductos] = useState(false);
  const [productoObtenido, setproductoObtenido] = useState([]);

  if (!llProductos) {
    Listar("/listar/producto").then((info) => {
      if (info.code !== 200) {
        mensajes(info.msg, "error", "error");
      } else {
        setData(info.info);
        setTablaListarProductos(info.info);
        setLlProductos(true);
      }
    });
  }

  const handleSearch = (e) => {
    filtrar(e.target.value);
  };

  const filtrar = (terminoBusqueda) => {
    const estadoActivo = "Activo";
    const estadoDadoDeBaja = "Fuera de Stock";

    var resultadosBusqueda = tablaListarProductos.filter((elemento) => {
      const estado = elemento.estado ? estadoActivo : estadoDadoDeBaja;
      if (
        elemento.nombre
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.marca.nombre
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.marca.subcategorium.tipo
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.marca.subcategorium.categorium.tipo
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.precio
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.description
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        estado.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
      ) {
        return elemento || estado;
      }

      return;
    });
    setData(resultadosBusqueda);
  };

  const obtenerId = (id) => {
    Listar("listar/producto/" + id).then((info) => {
      var datos = info.info;
      if (info.code !== 200 || info.msg === "TOKEN NO VALIDO O EXPIRADO") {
        mensajes(info.msg, "error", "error");
      } else {
        setproductoObtenido(datos);
      }
    });
  };

  const eliminarProducto = (id) => {
    Eliminar("eliminar/producto/" + id).then((info) => {
      if (info.code !== 200) {
        mensajes(info.msg, "error", "error");
      } else {
        mensajes(info.msg);
        navegation("/a");
      }
    });
  };
  return (
    <div className="container-md">
      <div
        id="root"
        className="d-flex justify-content-center align-items-center vh-100"
      >
        <div className="container-fluid">
          <div className="row row-cols-1">
            <div className="col-sm-6 mt-5 mb-4 text-gred">
              <h2
                style={{
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                  color: "#212A3E",
                }}
              >
                PRODUCTOS DISPONIBLES
              </h2>
            </div>
          </div>

          <div
            className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded"
            style={{
              display: "flex",
              flexDirection: "column",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
          >
            <div className="container">
              <div className="row align-items-end">
                <div className="col-6">
                  <InputGroup>
                    <InputGroup.Text className="bg-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M9.5 3a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM1 9.5a8.5 8.5 0 1 1 17 0 8.5 8.5 0 0 1-17 0z"
                        />
                        <path
                          fill-rule="evenodd"
                          d="M16.853 16.854a.5.5 0 0 0 .707 0l3.793-3.793a.5.5 0 0 0 0-.707l-3.793-3.793a.5.5 0 0 0-.707.707L19.293 12H10.5a.5.5 0 0 0 0 1h8.793l-2.646 2.646a.5.5 0 0 0 0 .707z"
                        />
                      </svg>
                    </InputGroup.Text>
                    <FormControl
                      type="search"
                      className="me-2"
                      placeholder="Buscar por un criterio (Categoría, Subcategoría, Marca, Nombre)"
                      onChange={handleSearch}
                    />
                  </InputGroup>
                </div>
                <div className="col">
                  <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                    <Button
                      variant="primary"
                      style={{ backgroundColor: "#212A3E" }}
                      onClick={handleShow}
                    >
                      Nuevo Producto
                    </Button>
                    <Button variant="primary" onClick={handleShow2}>
                      Nueva Categoría
                    </Button>
                    <Button
                      variant="primary"
                      style={{ backgroundColor: "#212A3E" }}
                      onClick={handleShow3}
                    >
                      Nueva Subcategoría
                    </Button>
                    <Button variant="primary" onClick={handleShow4}>
                      Nueva Marca
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12" style={{ marginBottom: "10px" }}></div>{" "}
            <div className="d-grid gap-2 d-md-flex justify-content-md-center"></div>
            <div className="col">
              <table className="table table-striped">
                <thead className="table-dark">
                  <tr>
                    <th
                      className="text-center"
                      style={{
                        backgroundColor: "#212A3E",
                        color: "#FFFFFF",
                        border: "none",
                      }}
                    >
                      Producto
                    </th>
                    <th
                      className="text-center"
                      style={{
                        backgroundColor: "#212A3E",
                        color: "#FFFFFF",
                        border: "none",
                      }}
                    >
                      Nombre
                    </th>
                    <th
                      className="text-center"
                      style={{
                        backgroundColor: "#212A3E",
                        color: "#FFFFFF",
                        border: "none",
                      }}
                    >
                      Precio
                    </th>
                    <th
                      className="text-center"
                      style={{
                        backgroundColor: "#212A3E",
                        color: "#FFFFFF",
                        border: "none",
                      }}
                    >
                      Descripción
                    </th>
                    <th
                      className="text-center"
                      style={{
                        backgroundColor: "#212A3E",
                        color: "#FFFFFF",
                        border: "none",
                      }}
                    >
                      Marca
                    </th>
                    <th
                      className="text-center"
                      style={{
                        backgroundColor: "#212A3E",
                        color: "#FFFFFF",
                        border: "none",
                      }}
                    >
                      Subcategoría
                    </th>
                    <th
                      className="text-center"
                      style={{
                        backgroundColor: "#212A3E",
                        color: "#FFFFFF",
                        border: "none",
                      }}
                    >
                      Categoría
                    </th>
                    <th
                      className="text-center"
                      style={{
                        backgroundColor: "#212A3E",
                        color: "#FFFFFF",
                        border: "none",
                      }}
                    >
                      Estado
                    </th>
                    <th
                      className="text-center"
                      style={{
                        backgroundColor: "#212A3E",
                        color: "#FFFFFF",
                        border: "none",
                      }}
                    >
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((producto) => (
                    <tr key={producto.id}>
                      <td
                        className="text-center"
                        style={{ backgroundColor: "#FFFFFF", border: "none" }}
                      >
                        {/* Verificar si hay una URL válida antes de mostrar la imagen */}
                        <img
                          src={URLBASE + "/images/productos/" + producto.img}
                          alt="Avatar"
                          style={{ width: "50px", height: "50px" }}
                        />
                      </td>
                      <td
                        className="text-center"
                        style={{ backgroundColor: "#FFFFFF", border: "none" }}
                      >
                        {producto.nombre}
                      </td>
                      <td
                        className="text-center"
                        style={{ backgroundColor: "#FFFFFF", border: "none" }}
                      >
                        ${producto.precio}
                      </td>
                      <td
                        className="text-center"
                        style={{ backgroundColor: "#FFFFFF", border: "none" }}
                      >
                        {producto.description}
                      </td>
                      <td
                        className="text-center"
                        style={{ backgroundColor: "#FFFFFF", border: "none" }}
                      >
                        {producto.marca["nombre"]}
                      </td>
                      <td
                        className="text-center"
                        style={{ backgroundColor: "#FFFFFF", border: "none" }}
                      >
                        {producto.marca.subcategorium["tipo"]}
                      </td>
                      <td
                        className="text-center"
                        style={{ backgroundColor: "#FFFFFF", border: "none" }}
                      >
                        {producto.marca.subcategorium.categorium["tipo"]}
                      </td>
                      <td
                        className="text-center"
                        style={{ backgroundColor: "#FFFFFF", border: "none" }}
                      >
                        {producto.estado ? "Activo" : "Fuera de Stock"}
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-auto">
                            <Button
                              variant="btn btn-outline-info btn-rounded"
                              onClick={() => {
                                handleShowEdit();
                                obtenerId(producto.external_id);
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-pencil-square"
                                viewBox="0 0 16 16"
                              >
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path
                                  fill-rule="evenodd"
                                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                                />
                              </svg>
                            </Button>
                          </div>
                          <div className="col-auto">
                            <Button
                              variant="btn btn-outline-danger"
                              onClick={() => {
                                eliminarProducto(producto.external_id);
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-x-square"
                                viewBox="0 0 16 16"
                              >
                                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                              </svg>
                            </Button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Footer />
            </div>
            {/* VENTANA MODAL AGREGAR */}
            <div className="model_box">
              <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                style={{ "--bs-modal-width": "45%" }}
                keyboard={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Nuevo Producto</Modal.Title>
                </Modal.Header>
                <NuevoProducto></NuevoProducto>
              </Modal>
            </div>
            {/* < VENTANA MODAL EDITAR> */}
            <div className="model_box">
              <Modal
                show={showEdit}
                onHide={handleCloseEdit}
                backdrop="static"
                style={{ "--bs-modal-width": "75%" }}
                keyboard={true}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Editar Producto</Modal.Title>
                </Modal.Header>
                <EditarProducto productoObtenido={productoObtenido} />
              </Modal>
            </div>
            {/* VENTANA MODAL AGREGAR CATEGORIA */}
            <div className="model_box">
              <Modal
                show={show2}
                onHide={handleClose2}
                backdrop="static"
                style={{ "--bs-modal-width": "45%" }}
                keyboard={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Nueva Categoria</Modal.Title>
                </Modal.Header>
                <NuevaCategoria></NuevaCategoria>
              </Modal>
            </div>
            {/* VENTANA MODAL AGREGAR SUBCATEGORIA*/}
            <div className="model_box">
              <Modal
                show={show3}
                onHide={handleClose3}
                backdrop="static"
                style={{ "--bs-modal-width": "45%" }}
                keyboard={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Nueva SubCategoria</Modal.Title>
                </Modal.Header>
                <NuevaSubCategoria></NuevaSubCategoria>
              </Modal>
            </div>
            {/* VENTANA MODAL AGREGAR MARCA */}
            <div className="model_box">
              <Modal
                show={show4}
                onHide={handleClose4}
                backdrop="static"
                style={{
                  "--bs-modal-width": "45%",
                }}
                keyboard={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Nueva Marca</Modal.Title>
                </Modal.Header>
                <NuevaMarca></NuevaMarca>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
