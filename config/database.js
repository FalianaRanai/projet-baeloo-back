const mongoose = require("mongoose");

// The solution was simply replacing localhost by 0.0.0.0. I.e. in my source code I had to change
// If you are using latest nodejs (v17.x) , then try updating mongodb url from localhost to 127.0.0.1


const dbname = "baeloo";
const url = `mongodb://127.0.0.1:27017/${dbname}`;

let connection = 
mongoose.connect(url, { useNewUrlParser: true })
.then(()=>{
    console.log("successfully connected to mongoDB");
})
.catch((err)=>{
    console.log(err);
});

module.exports = connection;