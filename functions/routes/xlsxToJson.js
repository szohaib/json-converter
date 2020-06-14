const express = require("express");
const router = express.Router();
let multipart = require("connect-multiparty");
let multipartMiddleWare = multipart();
const Excel = require("exceljs");
const Stream = require("stream");
// const firebase = require("firebase");

// router.post("/", (req, res) => {
//     return res.send(req.files);
// });

router.post("/getSheets", function (req, res) {
    let workbook = new Excel.Workbook();
    let stream = new Stream.Readable();
    stream.push(req.files[0].buffer);
    stream.push(null);
    workbook.xlsx
        .read(stream)
        .then(workbook => {
            var sheetNames = []
            workbook.eachSheet(function (worksheet, sheetId) {
                sheetNames.push(worksheet.name)
            });
            return res.send(sheetNames)
        })
})

router.post("/uploadFile", function (req, res) {
    // return res.send(req.body);
    let inputValues = JSON.parse(req.body.inputValues);
   
    let sheetName = inputValues.sheetName;

    let workbook = new Excel.Workbook();
    let stream = new Stream.Readable();

    let fromRow = inputValues.fromRow || 2;
   
    let headerRow = inputValues.headerRow || 1;


    stream.push(req.files[0].buffer);
    stream.push(null);
    workbook.xlsx
        .read(stream)
        .then(workbook => {
            let worksheet = workbook.getWorksheet(sheetName);
            let headerCollection = worksheet.getRow(headerRow).values;
            let jsonCollection = [];
            let toRow = inputValues.toRow || workbook.getWorksheet(sheetName).rowCount;
            for (let counter = fromRow; counter <= toRow; counter++) {
                let jsonObject = {};
                let secondRow = worksheet.getRow(counter).values;
                for (let i = 0; i < headerCollection.length; i++) {
                    if (headerCollection[i] !== undefined) {
                        if (secondRow[i] === undefined) {
                            secondRow[i] = "";
                        }
                        jsonObject[headerCollection[i]] = secondRow[i];
                    }
                }
                jsonCollection.push(jsonObject);
            }
            return res.send(jsonCollection);
        })
        .catch(function (error) {
            return "Error";
        });
    // let workbook = new Excel.Workbook();
    // var a;
    // workbook.xlsx
    //     .load(req.body)
    //     .then(function() {
    //         let worksheet = workbook.getWorksheet(1);
    //         return res.send(worksheet.rowCount);
    //         // let headerCollection = worksheet.getRow(1).values;
    //         // let jsonCollection = [];
    //         // for (let counter = 2; counter < worksheet.rowCount; counter++) {
    //         //     let jsonObject = {};
    //         //     let secondRow = worksheet.getRow(counter).values;
    //         //     for (let i = 0; i < headerCollection.length; i++) {
    //         //         if (headerCollection[i] !== undefined) {
    //         //             if (secondRow[i] === undefined) {
    //         //                 secondRow[i] = "";
    //         //             }
    //         //             jsonObject[headerCollection[i]] = secondRow[i];
    //         //         }
    //         //     }
    //         //     jsonCollection.push(jsonObject);
    //         // }
    //         // return res.send(jsonCollection);
    //     })
    //     .catch(function() {
    //         return res.send("Error");
    //     });
});

module.exports = router;