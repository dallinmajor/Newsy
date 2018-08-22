var db = require("../models");

module.exports = function(app) {
    
    //a Get Route that takes the id of an article
        // Finds all the comments in connection to that article
        //Returns an array of the comment objects

    //a Get Route that takes the id of a comment
        //Find that comment in the database
        //Returns the comment in an object

    //a Delete Route that take the id of a comment
        // Deletes that comment from the data base
    
    //a POST Route that takes an object of a comment
        // Addes that comment to the database as a document
        // Returns the newly created comment document as an object

    //a PUT Route that takes a comment id
        // And an object with edited comment
        //Updates that Comment in the database

}