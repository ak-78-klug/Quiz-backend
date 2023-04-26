import express from "express";
import { Request, Response } from "express";

import authMiddleware from "../middlewares/authMiddleware";
import Exam from "../models/examModel";
import User from "../models/userModel";
import Report from "../models/reportModel";

const router = express.Router();

// add report

router.post(
  "/add-report",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const newReport = new Report(req.body);
      await newReport.save();
      res.send({
        message: "Attempt added successfully",
        success: true,
      });
    } catch (error: any) {
      res.status(500).send({
        message: error.message,
        data: error,
        success: false,
      });
    }
  }
);

// get all reports

router.post(
  "/get-all-reports",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { examName, userName } = req.body;

      const exams = await Exam.find({
        name: {
          $regex: examName,
        },
      });

      const matchedExamIds = exams.map((exam: Exam) => exam._id);

      const users = await User.find({
        name: {
          $regex: userName,
        },
      });

      const matchedUserIds = users.map((user: User) => user._id);

      const reports = await Report.find({
        exam: {
          $in: matchedExamIds,
        },
        user: {
          $in: matchedUserIds,
        },
      })
        .populate("exam")
        .populate("user")
        .sort({ createdAt: -1 });
      res.send({
        message: "Attempts fetched successfully",
        data: reports,
        success: true,
      });
    } catch (error: any) {
      res.status(500).send({
        message: error.message,
        data: error,
        success: false,
      });
    }
  }
);

// get all reports by user
router.post("/get-all-reports-by-user", authMiddleware, async (req, res) => {
  try {
    const reports = await Report.find({ user: req.body.userId })
      .populate("exam")
      .populate("user")
      .sort({ createdAt: -1 });
    res.send({
      message: "Attempts fetched successfully",
      data: reports,
      success: true,
    });
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

export default router;
