import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

// Function to get date in dd/mm/yy format
const getFormattedDate = () => {
    let d = new Date();
    let day = d.getDate();
    let month = d.getMonth();
    let year = d.getFullYear();
    if (day < 10) {
        day += "0";
    } 
    if (month + 1 < 10) {
        month = "0" + String(month + 1);
    } else {
        month += 1;
    }
    return day + "/" + month + "/" + year;
}

ReactDOM.render(<App />, document.getElementById("root"));
