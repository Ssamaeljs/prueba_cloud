var express = require('express');
var router = express.Router();
const { body } = require('express-validator');
//Controladores
const CategoriaController = require('../controls/categoriaController');
var categoriaController = new CategoriaController();
const SubCategoriaController = require('../controls/subcategoriaController');
var subcategoriaController = new SubCategoriaController();
const MarcaController = require('../controls/marcaController');
var marcaController = new MarcaController();
const ProductoController = require('../controls/productoController');
var productoController = new ProductoController();

//Middlewares
const { crearMiddlewareCargaImagen }= require('../controls/utilities/multerConfig');
const upload_imagen_marca = crearMiddlewareCargaImagen('marcas');
const upload_imagen_producto = crearMiddlewareCargaImagen('productos');

//Categoria
router.post('/guardar/categoria',categoriaController.guardar);
router.get('/listar/categoria',categoriaController.listar);
router.get('/listar/categoria/:external_id',categoriaController.listar);

//SubCategoria
router.post('/guardar/subcategoria',subcategoriaController.guardar);
router.get('/listar/subcategoria',subcategoriaController.listar);
router.get('/listar/subcategoria/:external_id',subcategoriaController.listar);
//Marca
router.post('/guardar/marca',upload_imagen_marca.single('img'),marcaController.guardar);
router.get('/listar/marca',marcaController.listar);

//Producto
router.post('/guardar/producto',upload_imagen_producto.single('img'),productoController.guardar);
router.post('/guardar/producto/:external_id',upload_imagen_producto.single('img'),productoController.modificar);
router.get('/listar/producto',productoController.listar);
router.get('/listar/producto/:external_id',productoController.listar);
router.delete('/eliminar/producto/:external_id',productoController.borrar);

module.exports = router;
