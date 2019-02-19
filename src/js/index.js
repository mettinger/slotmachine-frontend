import Slot from './Slot.js';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import InfoAndActionComponent from './InfoAndActionComponent.js';

const config = {
  inverted: false // true: reels spin from top to bottom; false: reels spin from bottom to top
}

const slot = new Slot(document.getElementById('slot'), config);


ReactDOM.render(
    <InfoAndActionComponent spinFunction={slot.spin}/>,
    document.getElementById('InfoAndActionComponent')
);

// least ownership Amount
// my open bet IDs
// my house percentage
// my house balance
// withdraw house balance
