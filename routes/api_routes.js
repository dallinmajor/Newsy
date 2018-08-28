var db = require("../models");

module.exports = function (app) {

    app.get("/api/article/comments/:id", function (req, res) {
        
        db.Comment.find({ article: req.params.id}).then(function(comments) {
            res.send(comments);
        })  
    });

    app.delete("/articles/api/delete/:id", function (req, res) {

        db.Comment.findByIdAndRemove({ _id: req.params.id })
            .then(function () {
                console.log('deleted');
            });
    });

    app.post("/articles/api/insert/:id", function (req, res) {


    });

    app.post("/articles/api/comment/:id", function (req, res) {

        db.Comment.create(req.body)
            .then(function (dbcomment) {
                db.Article.findOneAndUpdate({ _id: req.params.id }, { $push: { comments: [dbcomment._id] } }).then(function (result) {
                    console.log(result);
                });
                res.send(dbcomment);
            });
    });
};


