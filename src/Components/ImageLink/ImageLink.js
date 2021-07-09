import React from 'react';
import './ImageLink.css'

const Link = ({onInputChange, onButtonSubmit}) => {
    return ( 
      <React.Fragment>
       <p style={{display:'block', color:'black'}}> {"This Miracle will detect faces in your pictures. Let's Do it "}</p>
        <div className="pak center f5 shadow-1">
            <div className="center">
              <div className="im center pa2 shadow-3 br2">
                <input className="f5 pa1 w-100 center" type='text' onChange={onInputChange}/>
                <button className="w-20  grow f5 link mr6 pv1 dib white bg-light-red"
                onClick={onButtonSubmit}>Detect</button>
              </div>
            </div>
        </div>
        </React.Fragment>
      
    )
}

export default Link;