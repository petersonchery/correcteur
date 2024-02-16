const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: {type: String},
    created : {type: Date , default:Date.now()},
});

const loginSchema= new mongoose.Schema({
    username:{type: String, required: true},
    password:{type:String,required:true}
});

const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username:  {type: String, required:true},
    email:     { type: String, unique: true, required: true },
    password:  { type: String, required: true },
    city:  { type: String, required: true },
    phone:  { type: String, required: true },
    state:  { type: String, required: true },
    country:  { type: String, required: true },
    postalCode:  { type: String, required: true },
    address:  { type: String, required: true },
    password:  { type: String, required: true },
	
})


module.exports = mongoose.model("login", loginSchema);
module.exports = mongoose.model("Article",articleSchema);
module.exports.User = mongoose.model("User",userSchema)