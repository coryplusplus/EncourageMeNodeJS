var express = require("express");
var ejs = require("ejs");
var objectId = require("mongodb").ObjectID;


var app = express();

var port = process.env.PORT || 5000;
var nav = [{
    Link: "/profiles",
    Text: 'Profiles'
    }];
var title = "Encourage-Me";
app.use(express.static("public"));
app.use(express.static("src/views"));
app.use(express.static("src/controllers"));
app.use('/src/controllers', express.static("src/controllers"));
app.set("views", "./src/views");
app.set("view engine", "ejs");


var test = "Testing hooker"
app.get("/", function (req, resp) {
    resp.render("index", {title:title,
                         nav:nav});
});

app.get("/profiles", function (req, resp) {
    resp.render("profiles", {nav:nav,
                            title:title});
});

app.get("/request/:id", function(req, resp){
    var id = new String(req.params.id);
    resp.render("encouragement",{id: id, 
                                 nav: nav,
                                title:title})
    
})
app.get("/books", function (req, resp) {
    resp.send("Hello Books");
});



app.listen(port, function (err) {
    console.log("running server on port " + port);
});