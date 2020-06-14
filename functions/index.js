const firebase = require("firebase");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const functions = require("firebase-functions");
let multipart = require("connect-multiparty");
let multipartMiddleWare = multipart();
const Excel = require("exceljs");
// const admin = require('firebase-admin');
const fileMiddleware = require("express-multipart-file-parser");
// const firebase = require('firebase');

const app = express();
const xlsxToJson = require("./routes/xlsxToJson");
app.use(cors());
app.use(fileMiddleware)

// app.post("/upload", multipartMiddleWare, function(req, res) {
//     // res.send(req.files.file.path);
//     // res.send(req.files);
//     // let stream = new Stream.Readable();
//     // stream.push(req.files); // file is ArrayBuffer variable
//     // stream.push(null);
//     let workbook = new Excel.Workbook();
//     var a;
//     workbook.xlsx
//         .readFile(req.files.file.path)
//         .then(function() {
//             let worksheet = workbook.getWorksheet(1);

//             let headerCollection = worksheet.getRow(1).values;
//             let jsonCollection = [];
//             for (let counter = 2; counter < worksheet.rowCount; counter++) {
//                 let jsonObject = {};
//                 let secondRow = worksheet.getRow(counter).values;
//                 for (let i = 0; i < headerCollection.length; i++) {
//                     if (headerCollection[i] !== undefined) {
//                         if (secondRow[i] === undefined) {
//                             secondRow[i] = "";
//                         }
//                         jsonObject[headerCollection[i]] = secondRow[i];
//                     }
//                 }
//                 jsonCollection.push(jsonObject);
//             }
//             res.json(jsonCollection);
//         })
//         .catch(function() {
//             res.send("Error");
//         });
// });

// app.listen(8000);
// //Getting Routes

app.use("/upload", xlsxToJson);

exports.convert = functions.https.onRequest(app);

// app.get("/", (req, res) => res.send("Hello World!"));
app.listen(8000);

console.log("App listening")