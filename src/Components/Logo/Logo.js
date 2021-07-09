import React from 'react';
// eslint-disable-next-line
import ReactDOM from 'react-dom';
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import Visualize from './visualize.png';

const Logo = () => {
    return (
        <React.Fragment>
        <div className="ma3 mt0 mar" style={{width:'90px', height:'85px'}}>
        <Tilt>
      <div className="Tilt-inner pa2 br1 pb2 mb2 shadow-1" style={{height: '85px'}}>
        <img src={Visualize} alt="Brain" />
      </div>
    </Tilt>
    </div>
        </React.Fragment>
    )
}

export default Logo;