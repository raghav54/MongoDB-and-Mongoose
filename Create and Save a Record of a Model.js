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

const createAndSavePerson = (done) => {
  
  const d = new Person({name:'x',age:12,favoriteFoods:['a','b']});
  d.save(function(err, data) {
    if (err) return console.error(err);
    done(null,data);
  });
};
