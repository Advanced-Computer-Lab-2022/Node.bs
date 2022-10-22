const mongoose = require('mongoose')
const schema = mongoose.Schema

const ExerciseSchema = new schema ({
    type: {
        type: String
    },

    options: [{
        type: String,
        
 }],

    questions: {
     type: String
 },
    answers: [{ 
        type: String
    }],

})
module.exports = mongoose.model('Exercise' , ExerciseSchema)






