"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const reportSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "users",
    },
    exam: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "exams",
    },
    result: {
        type: Object,
        required: true,
    },
}, {
    timestamps: true,
});
const Report = mongoose_1.default.model("reports", reportSchema);
exports.default = Report;
