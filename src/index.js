import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MyMsal from './Components/Mymsal';
import * as serviceWorker from './serviceWorker';
import {MyGraphApi} from "./Components/MyGrapApi";
import CosmosService from "./Services/CosmosService";

ReactDOM.render(

  <React.StrictMode>
    <App />
    <MyMsal/>
    <MyGraphApi test="hujkk"/>
    <CosmosService/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
