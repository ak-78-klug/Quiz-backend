const { Quiz } = require("../models/quiz");
const express = require("express");
const router = express.Router();

router.get(`/`, async (req, res) => {
  const quizList = await Quiz.find();

  if (!quizList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(quizList);
});

router.post("/", async (req, res) => {
  let quiz = new Quiz({
    userId: req.body.userId,
    title: req.body.title,
  });
  quiz = await quiz.save();

  if (!quiz) return res.status(400).send("The quiz cannot be created!");

  res.send(quiz);
});

router.post("/user-with-quiz", async (req, res) => {
  const quizWithUser = await Quiz.find({
    _id: req.body.quizId,
  }).populate("userId");

  res.send(quizWithUser);
});

router.patch("/:id", async (req, res) => {
  const quiz = await Quiz.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
    },
    { new: true }
  );

  if (!quiz) return res.status(400).send("The quiz cannot be updated!");

  res.send(quiz);
});

router.delete("/:id", (req, res) => {
  Quiz.findByIdAndRemove(req.params.id)
    .then((quiz) => {
      if (quiz) {
        return res
          .status(200)
          .json({ success: true, message: "The quiz is deleted!" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "Quiz not found!" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
});

module.exports = router;
