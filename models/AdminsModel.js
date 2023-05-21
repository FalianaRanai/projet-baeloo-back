const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");

class AdminsModel {
  constructor() {
    this.Schema = {
      name: String,
      username: String,
      password: String,
      valide: Number,
    };
    this.model =
      mongoose.models.admins || mongoose.model("admins", this.Schema);
  }

  create = (request, response) => {
    request.body.username = request.body.username.toLowerCase();

    const passwordHash = crypto
      .createHash("sha1")
      .update(request.body.password)
      .digest("hex");
    request.body.password = passwordHash;

    this.model(request.body)
      .save()
      .then(() => {
        response
          .status(200)
          .json({ message: `admin user successfully created` });
      })
      .catch((err) => {
        response
          .status(400)
          .json({ error: `error while adding document: ${err}` });
      });
  };

  checkExistingAdmin = (request, response) =>{
    this.model.find({username: request.body.username.toLowerCase()})
    .then((data)=>{
      if(data[0].username.toLowerCase()==request.body.username.toLowerCase()){
        response.status(400).json("Username already taken")
      }
      else{
        this.create(request,response);
      }
    })
    .catch((e)=>{
      this.create(request,response);
    });
  };

  read = (request, response) => {
    this.model
      .find()
      .then((items) => {
        response.status(200).json(items);
      })
      .catch((err) => {
        response.status(400).json(`ERROR: ${err}`);
      });
  };

  update = (request, response) => {

    this.model
      .findByIdAndUpdate(request.params.id, request.body)
      .then((item) => {
        response
          .status(200)
          .json({ message: `${item.nomCategorie} successfully updated` });
      })
      .catch((err) => {
        response
          .status(400)
          .json({ error: `error while updating document: ${err}` });
      });
  };

  delete = (request, response) => {
    this.model
      .findByIdAndRemove(request.params.id)
      .then(() => {
        response
          .status(200)
          .send({ message: `admin user successfully deleted` });
      })
      .catch((err) => {
        response
          .status(400)
          .json({ error: `error while deleting document: ${err}` });
      });
  };

  find = (request, response) => {
    this.model
      .find({ _id: request.params.id })
      .then((data) => {
        response.status(200).json(data);
      })
      .catch((e) => {
        response
          .status(400)
          .json({ error: `error while finding document: ${e}` });
      });
  };

  login = (request, response) =>{

    const passwordHash = crypto
      .createHash("sha1")
      .update(request.body.password)
      .digest("hex");
    request.body.password = passwordHash;

    this.model.find({username: request.body.username, password: request.body.password, valide: 1})
    .then((data)=>{
      if(data.length==0)
      {
        response.status(400).json(`error while finding document:`);
      }
      else{
        response.status(200).json(data);
      }
    })
    .catch((e)=>{
      response.status(400).json({ error: `error while finding document: ${e}` });
    })
  };
}
module.exports = AdminsModel;
