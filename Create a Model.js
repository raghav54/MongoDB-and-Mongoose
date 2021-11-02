require('dotenv').config();
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true });
const  Schema  = mongoose.Schema;

  const personSchema = new Schema({
    name:  {type: String, required: true}, 
    age: Number,
    favoriteFoods: [{
    type: String
}]
  });
let Person = mongoose.model('Person', personSchema);
