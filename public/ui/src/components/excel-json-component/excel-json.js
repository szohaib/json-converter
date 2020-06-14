import React, { Component } from 'react';
import UploadExcel from '../upload-excel-component/upload-excel';
import RenderJSON from '../render-json-component/render-json';
// import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import './excel-json.css';
import { connect } from 'react-redux';
import { uploadFile, getSheetNames, selectedFiles, setInputValues } from '../../apiCalls/apiCalls';
import toastr from 'toastr';
// import '../../../node_modules/toastr/build/toastr.css'
import { EventEmitter } from '../../helpers/events';

class ExcelJSON extends Component {
    state = {
        disableInputValues: true,
        inputValues: {}
    }
    render() {
        return (
            <div className="container-fluid mt-4">
                <div className="row">
                    <UploadExcel disableInputValues={this.state.disableInputValues} sheetNames={this.props.uploadedFile.sheetNames} fileAdded={this.fileAddedHandler} uploadFile={this.uploadFileHandler} selectedFiles={this.props.uploadedFile.addedFile} />
                </div>
                <div className="row margin-top-80">
                    <div className="col-md-12">
                        <RenderJSON renderJSON={this.passFileContents()} />
                    </div>
                </div>
            </div>
        );
    }

    constructor() {
        super();
        toastr.options.closeMethod = 'fadeOut';
        toastr.options.closeDuration = 300;
        toastr.options.closeEasing = 'swing';
        EventEmitter.subscribe('inputValues', (event) => {
            this.state.inputValues = { ...this.state.inputValues, ...event };
            console.log(this.state)
        })
    }

    passFileContents = () => {
        if (this.props.uploadedFile.fileContents) {
            let jsonArray = Object.values(this.props.uploadedFile.fileContents);
            return jsonArray
        }
    }

    fileAddedHandler = (e) => {
        e.persist();
        if (e.target.files.length > 0 && !e.target.files[0].name.includes('xlsx')) {
            toastr.error("Please upload an Excel File");
            return;
        }
        selectedFiles({ dispatch: this.props.dispatch, file: e.target.files }).then(() => {
            this.populateSheetNames();
        });
    }

    populateSheetNames = () => {
        const data = new FormData();
        data.append("file", this.props.uploadedFile.addedFile[0]);
        getSheetNames({ dispatch: this.props.dispatch, fileData: data, isHandlerEnabled: true }).then(() => {
            this.setState({
                disableInputValues: false
            })
        })
    }

    uploadFileHandler = (a, e) => {
        let isRowInputsValidate = this.checkRowInput();
        if (isRowInputsValidate) {
            setInputValues({ dispatch: this.props.dispatch, values: this.state.inputValues }).then(() => {
                const data = new FormData();
                data.append("file", this.props.uploadedFile.addedFile[0]);
                this.checkRowInput()
                this.checkForSheetName();

                data.append('inputValues', JSON.stringify(this.props.uploadedFile.inputValues));

                uploadFile({ dispatch: this.props.dispatch, fileData: data, isHandlerEnabled: true })
            })
        }
        else {
            return
        }

    }

    checkForSheetName = () => {
        if (!this.props.uploadedFile.inputValues.sheetName) {
            this.props.uploadedFile.inputValues.sheetName = this.props.uploadedFile.sheetNames[0]
        }
    }

    checkRowInput = () => {
        
        if (this.state.inputValues.toRow && this.state.inputValues.fromRow && this.state.inputValues.toRow < this.state.inputValues.fromRow) {
            toastr.error("From Row cannot be larger than To Row");
            return false;
        }
        return true


    }
}


export default connect(store => {
    return { uploadedFile: store.fileContents }
})(ExcelJSON);