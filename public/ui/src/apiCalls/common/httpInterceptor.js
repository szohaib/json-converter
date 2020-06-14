import React, { Component } from 'react';
import ReactDOM from 'react-dom';


class Loader extends Component {
    constructor(props){
        super(props);
        // this.isLoading = isLoading.bind(this);
        // this.requestHandler = requestHandler.bind(this);
        // this.successHandler = successHandler.bind(this);
        // this.errorHandler = errorHandler.bind(this)
    }
    state = {
        xhrCreations: 0,
        xhrResolutions: 0,
        isLoading: false,
    }
    render() {
        if (this.state.isLoading) {
            return <h1>Loading</h1>
        }
        else {
            return null
        }
    }




}
const isLoading = (xhrCreations, xhrResolutions) => {
    if (xhrCreations > xhrResolutions) {
        this.setState({ isLoading: false })
    }
    else {
        xhrCreations = 0;
        xhrResolutions = 0;
        this.setState({ isLoading: true })

    }


}
const isHandlerEnabled = (config = {}) => {
    if (config.hasOwnProperty('handlerEnabled') && !config.handlerEnabled) {
        return false;
    }
    else {
        return true;
    }
}

const requestHandler = (request) => {
    if (isHandlerEnabled(request)) {
        console.log(request);
        // this.setState.map(prevState => {

        //     return { xhrCreations: prevState.xhrCreations++ }
        // })
        // isLoading(this.state.xhrCreations, this.state.xhrResolutions);

    }
    return request
}

const errorHandler = (error) => {
    // if (isHandlerEnabled(error.config)) {
    //     console.log(error)
    // }
    return Promise.reject({ ...error })
}

const successHandler = (response) => {
    // if (isHandlerEnabled(response.config)) {
    //     this.setState.map(prevState => {
    //         return {xhrResolutions : prevState.xhrResolutions++}
    //     });
    //     isLoading(this.state.xhrCreations, this.state.xhrResolutions)
    // }
    return response
}


export { Loader, isHandlerEnabled, requestHandler, errorHandler, successHandler, isLoading }