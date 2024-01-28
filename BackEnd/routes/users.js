const express = require("express");
const router = express.Router();
const userService = require("../services/UserService");
//const adminService = require("")

const apiConfig = require("./assets/api.json");
const { authenticateToken } = require("./assets/middleware");

apiConfig.forEach((route) => {
  const { type, models } = route;
  switch (type) {
    case "get":
      models.forEach((model) => {
        model.urls.forEach((url) => {
          router.get(url, authenticateToken, (req, res) => {
            userService.listar(req, res, model.model);
          });
        });
      });
      break;
    case "post":
      models.forEach((model) => {
        model.urls.forEach((url) => {
          router.post(url, (req, res) => {
            userService.guardar(req, res, model.model);
          });
        });
      });
      break;
    default:
      break;
  }
});

module.exports = router;
