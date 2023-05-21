const AdminsModel = require("../models/AdminsModel");
const model = new AdminsModel();

class AdminsController {
  constructor() {}

  create = (request, response) => {
    model.checkExistingAdmin(request, response);
  };
  read = (request, response) => {
    model.read(request, response);
  };

  update = (request, response) => {
    model.update(request, response);
  };

  delete = (request, response) => {
    model.delete(request, response);
  };
  find = (request, response)=>{
    model.find(request,response);
  };
  login = (request, response)=>{
    model.login(request,response);
  };
}
module.exports = AdminsController;
