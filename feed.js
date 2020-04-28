var User =require('./models/user.js')
var Book = require('./models/books.js')
const newfn=function()
{
    console.log("this is running");
    var books=[{
        title:'kalu ki pustak',
        authorname:'kalu',
        imageurl:'none'
    }]
    var user=[{
        username:'bhuvan92',
        password:'bhuvan92@',
        membershipDays:31
    }]
    Book.find().then(function(sucess){
        console.log("this is sucess ",sucess)
        if(sucess.length==0){
            books.forEach(element => {
               var new_book= new Book(element)
               new_book.save(function(err,result){
                console.log("this is result",result)
               })
            });
        }
    })
    User.find({}).then(function(sucess){
        console.log("this is a sucess",sucess)
        if(sucess.length==0){
            user.forEach(element => {
                var new_user= new User(element)
               new_user.save(function(err,result){
                console.log("this is result",result)
               })
            });
        }
    })
}
newfn()