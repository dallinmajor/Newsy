var db = require("../models");

module.exports = function (app) {

    //a Get Route that takes the id of an article
    app.get("/articles/api/:id", function (req, res) {

        // Finds all the comments in connection to that article
        db.Article.findById(req.params.id)
            .populate("Comment")
            .then(function (comments) {
                req.send(comments);
            })
    })

    //a Delete Route that take the id of a comment
    app.delete("/articles/api/delete/:id", function (req, res) {

        // Deletes that comment from the data base
        db.Comment.findByIdAndRemove({ _id: req.params.id });
    })

    //a PUT Route that takes an id and an comment object
    app.put("/articles/api/edit/:id", function (req, res) {

        //Find that comment in the database and update it with the edited text
        db.Comment.findOneAndUpdate({ _id: req.params.id }, { $set: { comment: req.body.comment } })
    })

    //a POST Route that takes an object of a comment
    app.post("/articles/api/comment/:id", function () {

        //Creates a new comment in the database
        db.Comment.create(req.body)
            .then(function (dbcomment) {
                //Adds the comment it Article
                db.Article.findOneAndUpdate({ _id: req.params.id }, { comments: dbcomment._id }, { new: true });
            })
    })
}