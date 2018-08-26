var db = require("../models");
var request = require("request");

module.exports = function (app, cheerio) {
    //a Get Route that when hit...
    app.get("/", function (req, res) {

        var URL = "https://www.ksl.com/";

        //Scrapes KSL webpage for News Articles.
        request(URL, function (error, response, body) {
            var $ = cheerio.load(body);

            //For each Article
            $("div.queue_story").each(function (i, elm) {

                //Create an Object
                var article = {};

                //Give the Object a property of Headline with its value equal to the Articles Title
                article.headline = $(elm)
                    .find("div.headline")
                    .find("h2")
                    .find("a")
                    .text();

                //Give the Object a property of Summary with its value equal to the Artiles Summary
                article.summary = $(elm)
                    .find("div.headline")
                    .find("h5")
                    .text()

                //Give the Object a property of image with its value equal to the url to the image
                article.image = $(elm)
                    .find(".image_box")
                    .find("a")
                    .find("picture")
                    .find("source")
                    .attr("data-srcset")

                //Give the Object a property of URL with its value equal to the href url link of the Article 
                article.URL = URL + $(elm)
                    .find(".headline")
                    .find("h2")
                    .find("a")
                    .attr("href");

                if (article.headline) {

                    //If an Article of that name already exists don't add the articles
                    db.Article.find({ headline: article.headline }).then(function (exists) {
                        if (exists[0]) {
                            return
                        } else {

                            //Create a new Article in the data base
                            db.Article.create(article).then(function (dbArticle) {
                                console.log(dbArticle);
                            }).catch(function (err) {
                                console.log(err);
                            })
                        }
                    })
                } else {
                    return
                }
            })
        })

        //Serves up the handlebars homepage
        res.render("home")
    });

    //a Get Route that when hit...
    app.get("/articles", function (req, res) {

        //Finds all the articles in the database
        db.Article.find({}).then(function (articles) {

            //Serves the articles.handlebars with an array of article objects
            res.render("articles", { article: articles })
        })
    })
}

















