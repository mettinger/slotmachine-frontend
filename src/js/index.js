import Slot from './Slot.js';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PlayComponent from './PlayComponent.js';

const config = {
  inverted: false // true: reels spin from top to bottom; false: reels spin from bottom to top
}

const slot = new Slot(document.getElementById('slot'), config);


ReactDOM.render(
    <PlayComponent spinFunction={slot.spin}/>,
    document.getElementById('PlayComponent')
);