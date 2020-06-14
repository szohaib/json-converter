import React, { Component } from 'react';
import "../../../node_modules/bootstrap/dist/css/bootstrap.css"
import './render-json.css'
class RenderJSON extends Component {
    state = {}
    render() {
        return (
            <div className="card json-card">
                <div className="card-body" id="card-body">
                    <h5 className="card-title">JSON
                    {this.copyToClipboardHTML()}
                        <span className="row-count">{this.totalRows()}</span>
                    </h5>
                    <div className="content">{this.renderJSON()}</div>
                </div>
            </div>
        )
    }

    copyToClipboardHTML = () => {
        if (this.props.renderJSON && this.props.renderJSON.length > 0) {
            return (
                <button className="btn btn-sm" onClick={this.copyToClipboard}>Copy</button>
            )
        }
    }

    copyToClipboard = () => {
        var copyTextArea = document.getElementById("card-body");

        let copyText = copyTextArea.innerText;

        navigator.clipboard.writeText(copyText).then(function(){
            console.log("Copied");
        } , function(err){
            console.log(err)
        })
    }

    totalRows = () => {
        if (this.props.renderJSON) {
            return "Total " + this.props.renderJSON.length + " rows"
        }
    }

    renderJSON = () => {
        if (this.props.renderJSON) {

            let jsonSafeCopy = this.props.renderJSON.slice(0);
            if (jsonSafeCopy.length > 20) {
                let splicedJSON = jsonSafeCopy.splice(0, jsonSafeCopy.length - 20);
                return (<div><p>
                    {JSON.stringify(jsonSafeCopy)}
                </p> <span>More {splicedJSON.length} rows</span></div>);
            }
            else {
                return (<div><p>
                    {JSON.stringify(jsonSafeCopy)}</p></div>)
            }

        }
    }

}

export default RenderJSON;