'use strict'
var models = require('../models');

const categoria = models.categoria;
const subcategoria = models.subcategoria;
const marca = models.marca;
const producto = models.producto;

const { validationResult } = require('express-validator');
var uuid = require('uuid');
class categoriaController{
    async guardar(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    msg: "FALTAN DATOS",
                    code: 400,
                    errors: errors.array()
                });
            }
            if (req.body.tipo_categoria == "") {
                return res.status(400).json({
                    msg: "Falta el tipo de categoria",
                    code: 400
                });
            }

            const data = {
                tipo: req.body.tipo_categoria
            };
            console.log(data)
            data.external_id = uuid.v4();

            const transaction = await models.sequelize.transaction();
            await categoria.create(data, {transaction});
            await transaction.commit();

            return res.status(200).json({
                msg: "Categoría creada",
                code: 200,
                info: data
            });
        } catch (error) {
            console.log(error.errors);
            if (error.errors && error.errors[0].message) {
                return res.status(200).json({
                    msg: error.errors[0].message,
                    code: 200
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
            var lista
            if (!req.params.external_id) {
                lista = await categoria.findAll({
                    include: [
                        {
                            model: subcategoria,
                            as: 'subcategoria',
                            include:[{
                                model: marca,
                                as: 'marca',
                                include:[{
                                    model: producto,
                                    as: 'producto',
                                    attributes: ['img','nombre','precio','description','external_id']
                                }],
                                attributes: ['img','nombre','external_id', 'estado']
                            }],
                            attributes: ['tipo','external_id']
                        }
                    ],
                    attributes: ['tipo','external_id']
                });
            }else{
                lista = await categoria.findOne({
                    where: {
                        external_id: req.params.external_id
                    },
                    include: [
                        {
                            model: subcategoria,
                            as: 'subcategoria',
                            include:[{
                                model: marca,
                                as: 'marca',
                                include:[{
                                    model: producto,
                                    as: 'producto',
                                    attributes: ['img','nombre','precio','description','external_id']
                                }],
                                attributes: ['img','nombre','external_id', 'estado']
                            }],
                            attributes: ['tipo','external_id']
                        }
                    ],
                    attributes: ['tipo','external_id']
                });
            }
            return res.status(200).json({
                msg: 'Lista obtenida',
                code: 200,
                info: lista
            });
        } catch (error) {
            console.log(error.errors);
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
module.exports = categoriaController