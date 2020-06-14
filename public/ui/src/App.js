import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import { Provider } from 'react-redux';
import './config/development'
import ExcelJSON from './components/excel-json-component/excel-json';
import TopNavbar from "./components/top-navbar-component/top-navbar";
import '../node_modules/toastr/build/toastr.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import { Loader } from './apiCalls/common/httpInterceptor'

import store from './store';
class App extends Component {
  state = {
  };
  render() {
    return (
      <Provider store={store}>
        <React.Fragment>
          <div className="wrapper">
            <div className="container">
              <Loader></Loader>
              <TopNavbar></TopNavbar>
            </div>
            <ExcelJSON />
          </div>
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;
