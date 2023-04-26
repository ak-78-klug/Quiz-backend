"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// require("dotenv").config();
// import dbConfig from "./config/dbConfig";
// Routes
const usersRoute_1 = __importDefault(require("./routes/usersRoute"));
const examsRoute_1 = __importDefault(require("./routes/examsRoute"));
const reportsRoute_1 = __importDefault(require("./routes/reportsRoute"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.json());
app.use("/api/users", usersRoute_1.default);
app.use("/api/exams", examsRoute_1.default);
app.use("/api/reports", reportsRoute_1.default);
const port = process.env.PORT || 5000;
__dirname = path_1.default.resolve();
if (process.env.NODE_ENV === "production") {
    app.use(express_1.default.static(path_1.default.join(__dirname, "client", "build")));
    app.get("*", (req, res) => {
        res.sendFile(path_1.default.resolve(__dirname, "client", "build", "index.html"));
    });
}
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
