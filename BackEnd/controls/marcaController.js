'use strict'
var models = require('../models');

const categoria = models.categoria;
const subcategoria = models.subcategoria;
const marca = models.marca;
const producto = models.producto;

const { validationResult } = require('express-validator');
const fs = require('fs');
var uuid = require('uuid');

class marcaController{

    async guardar(req, res) {
        const tempImagePath = req.file.path; // Ruta temporal de la imagen
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                // Eliminar la imagen temporal en caso de error
                fs.unlinkSync(tempImagePath);
                return res.status(400).json({
                    msg: "FALTAN DATOS",
                    code: 400,
                    errors: errors.array()
                });
            }

            const subcategoriaAux = await subcategoria.findOne({
                where: {
                    external_id: req.body.subcategoria
                }
            });

            if (!subcategoriaAux) {
                // Eliminar la imagen temporal en caso de error
                fs.unlinkSync(tempImagePath);
                return res.status(400).json({
                    msg: "Falta la Subcategoria",
                    code: 400,
                });
            }

            const data = {
                nombre: req.body.nombre,
                img: req.file.filename,
                id_subcategoria: subcategoriaAux.id
            };

            data.external_id = uuid.v4();

            const transaction = await models.sequelize.transaction();
            await marca.create(data, { transaction });
            await transaction.commit();

            return res.status(200).json({
                msg: "Marca creada",
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
            const marcaAux = await marca.findOne({
                where: {
                    external_id: req.body.marca
                }
            });

            if (!marcaAux) {
                return res.status(400).json({
                    msg: "No existe la marca",
                    code: 400,
                    errors: errors.array()
                });
            }

            const subcategoriaAux = await subcategoria.findOne({
                where: {
                    external_id: req.body.subcategoria
                }
            });
            
            marcaAux.tipo = req.body.tipo;
            subcategoriaAux.id_categoria = categoriaAux.id
            subcategoriaAux.external_id = uuid.v4();

            const result = await subcategoriaAux.save();
            if (!result) {
                return res.status(400).json({
                    msg: "No se han modificado sus datos",
                    code: 400
                });
            }

            return res.status(200).json({
                msg: "Se han modificado su datos!",
                code: 200
            });

        } catch (error) {
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
            var lista = await marca.findAll({
                include:[{
                    model: producto,
                    as: 'producto',
                    attributes: ['img','nombre','precio','description','external_id']
                }],
                attributes: ['img','nombre','external_id', 'estado']
            })
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
}
module.exports = marcaController