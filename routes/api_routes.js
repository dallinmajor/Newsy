var Story = require("./models/story");
var request = require("request");

module.exports = function(app, cheerio) {
    //a Get Route that when hit...
        //Scrapes NewYork Times webpage for Articles.
            //For each Article
                //Create an Object
                //Give the Object a property of Headline with its value equal to the Articles Title
                //Give the Object a property of Summary with its value equal to the Artiles Summary
                //Give the Object a property of URL with its value equal to the href url link of the Article

                //Create a new Article in the Newsy database
                    //Give it the created object
                    //If an Article of that name already exists don't add the articles

    
    //a Get Route that when hit...
        //Finds all the articles in the database
            //Serves the articles.handlebars with an array of article objects

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