//Modelos
var models = require("../models");
const cuenta = models.cuenta;
const persona = models.persona;
//Librerias
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//Clase
class CuentaController {
  async login(req, res) {
    try {
      var cuentaAux = await cuenta.findOne({
        where: {
          correo: req.body.correo,
        },
        include: [
          {
            model: persona,
            as: "persona",
          },
        ],
      });

      if (!cuentaAux)
        return res.status(400).json({
          msg: "Cuenta no encontrada",
          code: 400,
        });

      switch (cuentaAux.estado) {
        case "RECHAZADO":
          return res.status(400).json({
            msg: "Cuenta Rechazada",
            code: 400,
          });

        case "EN ESPERA":
          return res.status(400).json({
            msg: "Cuenta no activa",
            code: 400,
          });
      }

      var esClaveValida = function (clave, claveUser) {
        return bcrypt.compareSync(claveUser, clave);
      };

      if (!esClaveValida(cuentaAux.clave, req.body.clave)) {
        return res.status(200).json({
          msg: "Clave incorrecta",
          code: 400,
        });
      }
      const tokenData = {
        external_token: cuentaAux.external_id,
        email: cuentaAux.correo,
        check: true,
      };

      require("dotenv").config();
      const llave = process.env.KEY_LOGIN;
      const token = jwt.sign(tokenData, llave, {
        expiresIn: "2h",
      });

      return res.status(200).json({
        msg: "Bienvenido " + cuentaAux.persona.nombres,
        info: {
          token: token,
          user: {
            correo: cuentaAux.correo,
            nombres: cuentaAux.persona.nombres,
            apellidos: cuentaAux.persona.apellidos,
            user: cuentaAux.persona,
            rol: cuentaAux.rol,
          },
        },
        code: 200,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        msg: "Ha ocurrido un error en el servidor",
        code: 500,
      });
    }
  }
}
module.exports = new CuentaController();
