var express = require("express");
var ejs = require("ejs");

var app = express();

var port = process.env.PORT || 5000;


app.use(express.static("public"));
app.use(express.static("src/views"));
app.use(express.static("src/controllers"));
app.use('/src/controllers', express.static("src/controllers"));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set("views", "src/views");


var test = "Testing hooker"
app.get("/", function (req, resp) {
    resp.render("index");
});

app.get("/profiles", function (req, resp) {
    resp.render("profiles");
});

app.get("/books", function (req, resp) {
    resp.send("Hello Books");
});



app.listen(port, function (err) {
    console.log("running server on port " + port);
});