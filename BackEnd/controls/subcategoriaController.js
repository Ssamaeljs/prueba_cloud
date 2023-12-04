'use strict'
var models = require('../models');

const categoria = models.categoria;
const subcategoria = models.subcategoria;
const marca = models.marca;
const producto = models.producto;

const { validationResult } = require('express-validator');
var uuid = require('uuid');

class subcategoriaController{
    async guardar(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    msg: "FALTAN DATOS",
                    code: 400,
                    errors: errors.array()
                });
            };

            const categoriaAux = await categoria.findOne({
                where: {
                    external_id: req.body.categoria
                }
            });

            if (!categoriaAux) {
                return res.status(400).json({
                    msg: "Falta la Categoria",
                    code: 400,
                });
            }

            const data = {
                tipo: req.body.tipo,
                id_categoria : categoriaAux.id
            };
            data.external_id = uuid.v4();

            const transaction = await models.sequelize.transaction();
            await subcategoria.create(data, {transaction});
            await transaction.commit();

            return res.status(200).json({
                msg: "SubCategoría creada",
                code: 200,
                info: data
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
    async modificar(req, res) {
        try {
            const subcategoriaAux = await subcategoria.findOne({
                where: {
                    external_id: req.body.subcategoria
                }
            });
            console.log(subcategoriaAux);

            if (!subcategoriaAux) {
                return res.status(400).json({
                    msg: "No existe la subcategoria",
                    code: 400,
                    errors: errors.array()
                });
            }
            var externalCategoria = req.body.categoria;
            if (!externalCategoria || externalCategoria === null) {
                const categoriaAux = await categoria.findOne({
                    where: {
                        id: subcategoriaAux.id_categoria
                    }
                });     
                externalCategoria = categoriaAux.external_id  
            }

            const categoriaAux = await categoria.findOne({
                where: {
                    external_id: externalCategoria
                }
            });


            if (!categoriaAux) {
                return res.status(400).json({
                    msg: "Falta la Categoria",
                    code: 400,
                });
            }
            subcategoriaAux.tipo = req.body.tipo;
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
            var lista ;
            if (!req.params.external_id) {
                lista = await subcategoria.findAll({
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
            })
            }else{
                const categoriaAux = await categoria.findOne({
                    where: {
                        external_id: req.params.external_id
                    }
                });
    
                if (!categoriaAux) {
                    return res.status(400).json({
                        msg: "Falta la Categoria",
                        code: 400,
                    });
                }
                
                lista = await subcategoria.findOne({
                    where: {
                        id_categoria: categoriaAux.id
                    },
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
}
module.exports = subcategoriaController