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
var arrayOfPeople = [
  {name: "Frankie", age: 7, favoriteFoods: ["Taco"]},
  {name: "Sol", age: 6, favoriteFoods: ["Fries"]},
  {name: "Robert", age: 8, favoriteFoods: ["Chocolate"]}
];
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function (err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function (err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
Person.findById(personId, function (err, person) {
    if (err) return console.log(err);
    person.favoriteFoods.push(foodToAdd);
    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
    if(err) return console.log(err);
    done(null, updatedDoc);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(
    personId,
    (err, removedDoc) => {
      if(err) return console.log(err);
      done(null, removedDoc);
    }
  ); 
};
