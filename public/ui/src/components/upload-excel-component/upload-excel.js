import React, { Component } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'
import './upload-excel.css'
import { setInputValues, uploadFile } from '../../apiCalls/apiCalls'
import { connect } from 'react-redux';
class UploadExcel extends Component {
    handleChange = (e) => {
        let value = {
            [e.target.name]: parseInt(e.target.value)
        }
        setInputValues({ dispatch: this.props.dispatch, values: value })
    }

    render() {
        console.log(this.props)
        return (
            <React.Fragment>
                <div className="col-md-2 description">
                    <p>Convert your Excel to JSON using our simple User Interface. Select your Excel file , Choose the appropriate options and click upload to convert your Excel to JSON</p>
                </div>
                <div className="col-md-5">
                    <div className="upload-btn-wrapper">
                        <button className="add-file-button btn " id="file-upload-btn">Upload a file</button>
                        <input type="file" name="myfile" onChange={this.props.fileAdded} />
                    </div>
                </div>
                {this.previewFile()}
                <div className="col-md-5">
                    <div className="card file-upload-options">
                        <div className="card-body p-0">
                            <h6 className="card-title">
                                Sheet options
                            </h6>
                            <hr />
                            <div className="row">
                                <div className="col-md-12">
                                    <label>Select Sheet</label>
                                    <select name="sheetName" onChange={this.handleChange} className="form-control" disabled={this.props.disableInputValues}>
                                        {this.populateSheetNames()}
                                    </select>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-6">
                                    <label>From Row</label>
                                    <input className="form-control" name="fromRow" onChange={this.handleChange} disabled={this.props.disableInputValues}></input>
                                </div>
                                <div className="col-md-6">
                                    <label>To Row</label>
                                    <input className="form-control" name="toRow" onChange={this.handleChange} disabled={this.props.disableInputValues}></input>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <label>Header Row</label>
                                    <input className="form-control" name="headerRow" onChange={this.handleChange} disabled={this.props.disableInputValues}></input>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <button className="btn btn-md btn-custom upload-file-btn" onClick={this.props.uploadFile} disabled={this.props.disableInputValues}>Upload File</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );

    }

    // componentDidMount(){
    //     console.log(this.props)
    // }

    populateSheetNames = () => {
        var option = this.props.sheetNames ? Object.values(this.props.sheetNames).map((sheet, index) => {
            return <option key={index}>{sheet}</option>
        }) : <option>Select Sheet</option>
        return option
    }


    previewFile = () => {
        if (this.props.selectedFiles) {
            let fileUploadElement = document.getElementById('file-upload-btn');
            fileUploadElement.innerText = "";
            let filePreview = document.createElement('div');
            filePreview.classList.add('file-preview');

            let fileImage = document.createElement('img');
            fileImage.src = require("../../images/excel.jpg")
            fileImage.classList.add('file-preview-image')

            let fileName = document.createElement('p');
            fileName.innerText = this.props.selectedFiles[0].name;
            filePreview.append(fileImage);
            filePreview.append(fileName);
            fileUploadElement.append(filePreview)
        }
    }
}

export default connect(store => ({
    uploadedFile: store.fileContents
}))(UploadExcel)