var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  headline: {
    type: String,
    unique: true,
    required: true
  },

  summary: {
    type: String,
    min: [6, "Summary must contain more than 6 characters"]
  },

  URL: String,

  comments: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
    required: true
  }
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;