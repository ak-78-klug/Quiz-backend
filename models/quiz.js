const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const quizSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: { type: String, required: true },
});

exports.Quiz = mongoose.model("Quiz", quizSchema);
