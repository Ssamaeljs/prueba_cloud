const multer = require("multer");
const path = require("path");
const uuid = require("uuid");

// Define una función para generar nombres de archivo únicos
const generarNombreArchivo = (file) => {
  const partes = file.originalname.split(".");
  const extension = partes[partes.length - 1];
  return `${uuid.v4()}.${extension}`;
};

// Define una función para validar las extensiones de archivo permitidas
const validarExtensionArchivo = (file, cb) => {
  const allowedExtensions = [".jpeg", ".jpg", ".png"];
  const ext = path.extname(file.originalname);
  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Solo se permiten archivos JPEG, JPG y PNG."));
  }
};

// Agrega una función para validar el tamaño máximo del archivo (2MB)
const validarTamanioMaximoArchivo = (file, cb) => {
  const maxSize = 2 * 1024 * 1024; // 2MB
  if (file.size <= maxSize) {
    cb(null, true);
  } else {
    cb(new Error("El tamaño del archivo excede el límite de 2MB."));
  }
};

// Función de configuración de multer genérica
const configuracionMulter = (carpetaDestino) => {
  return {
    storage: multer.diskStorage({
      destination: path.join(
        __dirname,
        `../../public/images/${carpetaDestino}`
      ),
      filename: (req, file, cb) => {
        cb(null, generarNombreArchivo(file));
      },
    }),
    fileFilter: (req, file, cb) => {
      validarExtensionArchivo(file, cb);
    },
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  };
};

// Crear el middleware de carga de imágenes genérico
const crearMiddlewareCargaImagen = (carpetaDestino) => {
  const configuracion = configuracionMulter(carpetaDestino);
  return multer(configuracion);
};

module.exports = {
  crearMiddlewareCargaImagen,
};
