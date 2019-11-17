let exp = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
let bodyparser = require("body-parser");

let app = exp();

app.use(cors());
app.use(bodyparser.json());

let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;
let User = mongoose.model("User", new Schema({
    id:ObjectId,
    username : String,
    usermail : String,
    usercity : String
}));

mongoose.Promise = global.Promise;

/*
// valtechdbuser
// valtechpass123
mongoose.connect("mongodb://valtechdbuser:valtechpass123@ds057568.mlab.com:57568/valtechdb", 
{ useNewUrlParser: true})
.then(
    () => {
        console.log("Success : DB Connected and ready to use")
    },
    (error) => {
        console.log("Error : ", error)
    }
);
*/

/*
mongoose.connect("mongodb://localhost:27017/valtechdb", 
{ useNewUrlParser: true })
.then(
    () => {
        console.log("Success : DB Connected and ready to use")
    },
    (error) => {
        console.log("Error : ", error)
    }
);
*/
mongoose.connect("mongodb://valtechdbuser:valtechpass123@ds057568.mlab.com:57568/valtechdb", 
{ useNewUrlParser: true})
.then(
    () => {
        console.log("Success : DB Connected and ready to use")
    },
    (error) => {
        console.log("Error : ", error)
    }
);

app.get("/", function(req, res){
    // res.send("hello from express : "+req.url+" is the request ");
    // res.sendFile("./index.html");
    User.find((error, users) => {
        if(error){
            console.log("Error after connection : ", error)
        }else{
            res.send(users);
        }
    })
});
app.get("/:userid", function(req, res){
    User.findById(req.params.userid, function(error, user){
        if(!error){
            res.send(user);
        }else{
            console.log(error)
        }
    })
});

app.post("/", function(req, res){
        var user = new User(req.body);
        user.save().then((nhero) =>{
            res.send(nhero)
        }, (error)=>{
            console.log(error)
        })
});
app.post("/:id", function(req, res){
        console.log(req.body);
        User.findById(req.params.id, function(error, user){
            if(error){
                console.log(error)
            }else{
                user.username = req.body.username;
                user.usermail = req.body.usermail;
                user.usercity = req.body.usercity;
                user.save().then(function(){
                    res.send(user)
                }, function(){
                    res.send({ "error" : " Some error happened"})
                })
            }
        });
});

app.get("/delete/:user", function(req, res){
    User.findByIdAndDelete({_id : req.params.user }, function(err, user){
        if(err){
            res.send({ "error" : err })
        }else{
            res.send({ "User Removed" : user })
        }
    })
});

app.listen(2525);
console.log("server is now live on localhost:2525");
