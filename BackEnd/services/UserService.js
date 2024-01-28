const UserController = require("../controls/PersonaController");
const CuentaController = require("../controls/CuentaController");
class Services {
  guardar(req, res, model) {
    switch (model) {
      case "persona":
        UserController.guardar(req, res);
        break;
      case "cuenta":
        CuentaController.login(req, res);
        break;
      case "dispositivo":
        break;
      case "medicion":
        break;
      case "peticion_token":
        break;
      default:
        break;
    }
  }

  listar(req, res, model) {
    switch (model) {
      case "persona":
        UserController.listar(req, res);
        break;
      case "cuenta":
        break;
      case "dispositivo":
        break;
      case "medicion":
        break;
      case "peticion_token":
        break;
      default:
        break;
    }
  }
}

module.exports = new Services();
