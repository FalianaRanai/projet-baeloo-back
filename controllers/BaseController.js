class BaseController{
    constructor()
    {
    }

    get(request, response){
        console.log("You're in the BaseController")
    }
}

module.exports = BaseController;