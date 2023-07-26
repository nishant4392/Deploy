const mongoose= require("mongoose");

const bookModel = mongoose.Schema({
    title:{
        type : String,
        trim : true ,
        required : true
    },
    author:{
        type:String,
        trim:true,
        required:true,
    },
    asin:{
        type:Number,
        required:true,
        unique:true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 1,
    },
    peopleVoted: {
        type: Number,
        default:0
    },
    wishListed:{
        type: Number,
        default:0
    },
    reading:{
        type: Number,
        default:0
    },
    completed:{
        type: Number,
        default:0
    },
    dropped:{
        type: Number,
        default:0
    }
});

const Book = mongoose.model("Book",bookModel);

module.exports = Book;