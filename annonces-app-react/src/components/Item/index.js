import React, { Component } from 'react';
// import {Link} from 'react-router';
import { withRouter } from 'react-router-dom';

import './styles.sass';
import './styles.css';

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageType: "",
      imgB64: ""
    };
  }
  
  componentDidMount(){
    if (this.props.item.image){
      //let thumb = new Buffer(this.props.item.image.data.data);
      
      //var imageBase64 = btoa(String.fromCharCode.apply(null, this.props.item.image.data.data));
      let imageBase64 = btoa(String.fromCharCode(...new Uint8Array(this.props.item.image.data.data)));

      this.setState({
        imageType: this.props.item.image.contentType,
        imgB64: imageBase64
      });
    }
  }
  
  render() {
    return(
      <div className="item">
        <div className="content" onClick={()=>{
          //withRouter.push('/item/123');
          this.props.history.push({
              pathname: '/item/'+this.props.nb ,
              state: { 
                item: this.props.item,
                imgB64: this.state.imgB64,
                imageType: this.state.imageType
              }
                  });
        }} >
        <h4 className="itemTitle">{this.props.item.name}</h4>
        <img className="img itemImage" src={"data:"+ this.state.imageType +";base64,"+ this.state.imgB64} />
        </div>
      </div>
    );
  }
}

export default withRouter(Item);
