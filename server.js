var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cheerio = require("cheerio");

var app = express();

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/News";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.use(express.static("public"));

require("./routes/api_routes")(app);
require("./routes/handlebar_routes")(app, cheerio);



app.listen(3000, function () {
    console.log("App running on port 3000!");
});