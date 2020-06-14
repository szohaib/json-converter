const express = require("express");
const cors = require("cors");
const functions = require("firebase-functions");
const fileMiddleware = require("express-multipart-file-parser");

const app = express();
const xlsxToJson = require("./routes/xlsxToJson");


app.use(cors());
app.use(fileMiddleware)

app.use("/upload", xlsxToJson);

exports.convert = functions.https.onRequest(app);


app.listen(8000);

console.log("App listening")