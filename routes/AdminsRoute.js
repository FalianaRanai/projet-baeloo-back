const express = require("express");
const router = express.Router();
const AdminsController = require("../controllers/AdminsController");
const controller = new AdminsController();

router.post("/insert", controller.create);
router.post("/login", controller.login);
router.get("/findAll", controller.read);
router.put("/update/:id", controller.update);
router.delete("/delete/:id", controller.delete);
router.get("/find/:id", controller.find);

module.exports = router;