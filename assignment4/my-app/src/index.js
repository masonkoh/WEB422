/*********************************************************************************
 * *  WEB422 –Assignment04*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part of this
 * *  assignment has been copied manually or electronically from any other source (including web sites) or 
 * *  distributed to other students. 
 * *  Name: ___Youngmin Ko___ Student ID: __019155159__ Date: ___July.06.2018___
 * 
 * *********************************************************************************/ 
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'))

registerServiceWorker();
