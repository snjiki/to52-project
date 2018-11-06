import React, { Component } from 'react';

import './styles.sass';
import './styles.css';
import profileImg from '../../assets/images/profile.png';

class BasicInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "User TO52",
      imgSrc: profileImg
    };
  }
  render() {
    return(
      <div className="basicInfo">
        <div className="profilePic"> 
        <img className="img itemImgWrapper imageItemPage" src={this.state.imgSrc} />
        </div>
        <div className="nameWrapper">
          <h3 className="normal">{this.state.name}</h3>
        </div>
      </div>
    );
  }
}

export default BasicInfo;
