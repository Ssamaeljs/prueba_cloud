"use strict";
//Modelos
var models = require("../models");
const persona = models.persona;
const cuenta = models.cuenta;

//Librerias
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const { validationResult } = require("express-validator");
const saltRounds = 8;

//Clase
class UserController {
  async guardar(req, res) {
    const transaction = await models.sequelize.transaction({ timeout: 30000 });
    try {
      if (!req.params.external_persona) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({
            msg: "Faltan datos",
            code: 400,
            errors: errors.array(),
          });
        }
        const claveHash = (clave) => {
          return bcrypt.hashSync(clave, bcrypt.genSaltSync(saltRounds), null);
        };
        const data = {
          nombres: req.body.nombres,
          apellidos: req.body.apellidos,
          fecha_nacimiento: req.body.fecha_nacimiento,
          cargo: req.body.cargo,
          institucion: req.body.institucion,
          cuenta: {
            correo: req.body.correo,
            clave: claveHash(req.body.clave),
            rol: req.body.rol,
          },
        };
        data.external_id = uuid.v4();
        await persona.create(data, {
          include: [
            {
              model: models.cuenta,
              as: "cuenta",
            },
          ],
          transaction,
        });
        await transaction.commit();
        return res.status(200).json({
          msg: "Se ha registrado la persona",
          code: 200,
        });
      } else {
        const personaAux = await persona.findOne({
          where: {
            external_id: req.params.external_persona,
          },
        });

        if (!personaAux) {
          return res.status(400).json({
            msg: "No existe el registro",
            code: 400,
          });
        }

        const cuentaAux = await cuenta.findOne({
          where: {
            id_persona: personaAux.id,
          },
        });

        personaAux.nombres = req.body.nombres;
        personaAux.apellidos = req.body.apellidos;
        personaAux.fecha_nacimiento = req.body.fecha_nacimiento;
        personaAux.cargo = req.body.cargo;
        personaAux.institucion = req.body.institucion;
        cuentaAux.estado = req.body.estado;
        personaAux.external_id = uuid.v4();

        personaAux.save();
        await cuentaAux.save();

        return res.status(200).json({
          msg: "Se han modificado su datos!",
          code: 200,
        });
      }
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      return res.status(400).json({
        msg: "Ha ocurrido un error en el servidor",
        code: 500,
      });
    }
  }

  async listar(req, res) {
    try {
      var lista;
      if (!req.params.external_persona) {
        lista = await persona.findAll({
          attributes: [
            "nombres",
            "apellidos",
            "external_id",
            "fecha_nacimiento",
            "cargo",
            "institucion",
          ],
          include: {
            model: cuenta,
            as: "cuenta",
            attributes: ["correo", "estado", "rol", "clave"],
          },
        });
      } else {
        lista = await persona.findOne({
          where: {
            external_id: req.params.external_persona,
          },
          attributes: [
            "nombres",
            "apellidos",
            "external_id",
            "fecha_nacimiento",
            "cargo",
            "institucion",
          ],
          include: {
            model: cuenta,
            as: "cuenta",
            attributes: ["correo", "estado", "rol", "clave"],
          },
        });
      }
      return res.status(200).json({
        msg: "Lista obtenida",
        code: 200,
        info: lista,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: "Ha ocurrido un error en el servidor",
        code: 500,
      });
    }
  }
}
module.exports = new UserController();
