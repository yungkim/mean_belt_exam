var mongoose = require('mongoose');

var answerSchema = new mongoose.Schema({
    text: {
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 500
    },
    description : { type : String, maxlength : 500 },
    like: { type : Number, default : 0 },
    _user : { type : mongoose.Schema.Types.ObjectId, ref: 'users' },
    _question : { type : mongoose.Schema.Types.ObjectId, ref: 'questions' },
    
}, {timestamps:true} );
mongoose.model('answers', answerSchema);