'use strict'
var models = require('../models');

const categoria = models.categoria;
const subcategoria = models.subcategoria;
const marca = models.marca;
const producto = models.producto;

const path = require('path');
const { validationResult } = require('express-validator');
var uuid = require('uuid');

class productoController{
    async guardar(req, res) {
        const tempImagePath = req.file ? req.file.path : null; // Ruta temporal de la imagen
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                fs.unlinkSync(tempImagePath);
                return res.status(400).json({
                    msg: "FALTAN DATOS",
                    code: 400,
                    errors: errors.array()
                });
            };
            
            const marcaAux = await marca.findOne({
                where: {
                    external_id: req.body.marca
                }
            });
            
            if (!marcaAux) {
                return res.status(400).json({
                    msg: "Falta la Marca",
                    code: 400,
                    errors: errors.array()
                });
            }

            const data = {
                nombre: req.body.nombre,
                img: req.file.filename,
                description: req.body.descripcion,
                precio: req.body.precio,
                id_marca: marcaAux.id
            };

            data.external_id = uuid.v4();

            const transaction = await models.sequelize.transaction();
            await producto.create(data, {transaction});
            await transaction.commit();

            return res.status(200).json({
                msg: "Producto creado",
                code: 200,
                info: data
            });
        } catch (error) {
            console.error(error);
            // Si ocurre un error, intentamos eliminar el archivo si existe
            if (tempImagePath) {
                try {
                    fs.unlinkSync(tempImagePath);
                } catch (unlinkError) {
                    console.error("Error al eliminar el archivo temporal:", unlinkError);
                }
            }
            return res.status(500).json({
                msg: "Ha ocurrido un error en el servidor",
                code: 500
            });
        }
    }

    async modificar(req, res) {
        try {
            const productoAux = await producto.findOne({
                where: {
                    external_id: req.params.external_id
                }
            });
            if (!productoAux) {
                return res.status(400).json({
                    msg: "No existe el producto",
                    code: 400,
                    errors: errors.array()
                });
            }
            var external_marca = req.body.marca;
            if (!external_marca || external_marca === null) {
                const marcaAux = await marca.findOne({
                    where: {
                        id: productoAux.id_marca
                    }
                });     
                external_marca = marcaAux.external_id  
            }
            const marcaAux = await marca.findOne({
                where: {
                    external_id: external_marca
                }
            });

            if (!marcaAux) {
                return res.status(400).json({
                    msg: "Falta la Marca",
                    code: 400,
                });
            }
            if (req.file) {
                productoAux.img = req.file.filename;
            }
            productoAux.nombre = req.body.nombre;
            productoAux.description = req.body.descripcion;
            productoAux.precio = req.body.precio;
            productoAux.id_marca = marcaAux.id;
            productoAux.external_id = uuid.v4();
            productoAux.estado = req.body.estado;
            const result = await productoAux.save();
            if (!result) {
                return res.status(400).json({
                    msg: "Producto No Modificado",
                    code: 400
                });
            }

            return res.status(200).json({
                msg: "Producto Modificado",
                code: 200
            });
        } catch (error) {
            console.log(error)
            if (error.errors && error.errors[0].message) {
                return res.status(400).json({
                    msg: error.errors[0].message,
                    code: 400
                });
            } else {
                return res.status(500).json({
                    msg: "Ha ocurrido un error en el servidor",
                    code: 500
                });
            }
        }
    }

    async listar(req, res){
        try {
            var lista ;
            if (!req.params.external_id) {
                lista = await producto.findAll({
                    attributes: ['img','nombre','precio','description','external_id', 'estado'],
                    include: [{
                        model: marca,
                        attributes: ['nombre','external_id'],
                        include: [{
                            model: subcategoria,
                            attributes: ['tipo','external_id'],
                            include: [{
                                model: categoria,
                                attributes: ['tipo','external_id']
                            }]
                        }]
                    }]
                })
            }else{
                lista = await producto.findOne({
                    where: {
                        external_id: req.params.external_id
                    },
                    attributes: ['img','nombre','precio','description','external_id', 'estado'],
                    include: [{
                        model: marca,
                        attributes: ['nombre','external_id'],
                        include: [{
                            model: subcategoria,
                            attributes: ['tipo','external_id'],
                            include: [{
                                model: categoria,
                                attributes: ['tipo','external_id']
                            }]
                        }]
                    }]
                    
                })
            }
            return res.status(200).json({
                msg: 'Lista obtenida',
                code: 200,
                info: lista
            });
        } catch (error) {
            console.log(error);
            if (error.errors && error.errors[0].message) {
                return res.status(400).json({
                    msg: error.errors[0].message,
                    code: 400
                });
            } else {
                return res.status(500).json({
                    msg: "Ha ocurrido un error en el servidor",
                    code: 500
                });
            } 
        }
        
    }

    async borrar(req, res){
        try {
            var productoAux = await producto.findOne({
                where: {
                    external_id: req.params.external_id
                },
            });
            if (!productoAux) {
                return res.status(400).json({
                    msg: "No existe el producto",
                    code: 400,
                    errors: errors.array()
                });
            }
            const result = await productoAux.destroy();
            if (!result) {
                return res.status(400).json({
                    msg: "Producto No Eliminado",
                    code: 400
                });
            }
            return res.status(200).json({
                msg: "Producto Eliminado",
                code: 200
            });
        } catch (error) {
            console.log(error);
            if (error.errors && error.errors[0].message) {
                return res.status(400).json({
                    msg: error.errors[0].message,
                    code: 400
                });
            } else {
                return res.status(500).json({
                    msg: "Ha ocurrido un error en el servidor",
                    code: 500
                });
            } 
        }
    }
}
module.exports = productoController