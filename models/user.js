var mongoose = require('mongoose')
const BookSchema  = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    imageurl:{
        type:String,
    },
    authorname:{
        type:String,
        required:true
    }
})
const UserSchema  = new mongoose.Schema({
    username: {
     type:String,
     required:true
	},
    password:{
     type:String,
     required:true
    },
    membershipDays:{
        type:Number
    },
    auth_token:{
        type:String
    },
    books:[BookSchema]
      //preferance


})

const User = mongoose.model('User', UserSchema)

module.exports = User;