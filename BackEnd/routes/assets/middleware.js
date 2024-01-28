const jwt = require("jsonwebtoken");
const models = require("../../models");
const cuenta = models.cuenta;
require("dotenv").config();
const secretKey = process.env.KEY_LOGIN;

const authenticateToken = (req, res, next) => {
  const token = req.headers["x-api-token"];
  if (!token) {
    return res.status(401).json({
      msg: "Token no proporcionado.",
      code: 401,
    });
  }

  jwt.verify(token, secretKey, async (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).json({
        msg: "Token no válido o expirado.",
        code: 401,
      });
    }

    const aux = await cuenta.findOne({
      where: {
        external_id: decoded.external_token,
      },
    });

    if (!aux) {
      return res.status(401).json({
        msg: "Token no válido o expirado.",
        code: 401,
      });
    }

    req.decoded = decoded;
    next();
  });
};

const authorize = (permiso) => {
  return (req, res, next) => {
    const usuario = req.user; // Suponiendo que has agregado el usuario al objeto de solicitud (req) durante la autenticación.

    if (!usuario || !usuario.rol || !tienePermiso(usuario.rol, permiso)) {
      return res.status(403).json({
        msg: "Acceso prohibido. No tienes los permisos necesarios.",
        code: 403,
      });
    }
    next();
  };
};

const tienePermiso = (rol, permiso) => {
  if (rol === roles.ADMINISTRADOR) {
    return true;
  }
  return false;
};

module.exports = {
  authenticateToken,
  authorize,
};
