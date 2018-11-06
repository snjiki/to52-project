import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.sass';
import './styles.css';
import axios from 'axios';

class AddItemPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemName: "",
      itemPrice: "",
      itemCurrency: "",
      itemDescription: "",
      itemEmail: "" ,
      itemTags: "",
      itemImage: null,
      itemImageUrl: null
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.state.itemEmail = localStorage.getItem('email');
    setTimeout(() => {
      this.modalWrapper.classList.add(this.props.openClass);
    }, 50);
  }


  handleChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    
    this.setState({
      [name]: value
    });
  }

  fileSelectedHandler = event => {
    this.setState({
      itemImage: event.target.files[0]
    }); 
    let reader = new FileReader();
    if(event.target.files[0]){
      const itemImageUrl = reader.readAsDataURL(event.target.files[0]);
    }
    reader.onloadend = function(e){
      this.setState({
      itemImageUrl: [reader.result]
    });
    }.bind(this);
    
    //console.log(itemImageUrl);
  }

  close() {
    this.modalWrapper.classList.remove(this.props.openClass);
    setTimeout(() => {
      this.props.close();
    }, 850);
  }

  save(){
    let fd = new FormData();
    this.state.itemEmail = localStorage.getItem('email');
    fd.append('itemImage', this.state.itemImage, this.state.itemImage.name);
    fd.append('email',this.state.itemEmail);
    fd.append('name', this.state.itemName);
    fd.append('price', this.state.itemPrice);
    fd.append('currency', this.state.itemCurrency);
    fd.append('description', this.state.itemDescription);
    fd.append('negotiable', true);

    axios.post('/api/item',fd).then(res => {
      console.log(res);
      console.log(fd);
      this.close();
    }).then( reponse => {
        window.location.reload();
    });


   //alert(this.state.itemName + 'and '; + this.state.itemDescription );
  }

  render() {
    return (
      <div className="addItemWrapper" ref={node => { this.modalWrapper = node; }}>
        <div className="hider" />
        <div className="modal">
          <div className="heading">
            <h3>Add Item</h3>
          </div>
          <div className="itemWrapper">
            <div className="itemPicWrapper">
              <div className="img">
              <img className="img" src={this.state.itemImageUrl} />
              </div>
              <p className="imgText frm"><a className="frm" onClick={()=>this.fileInput.click()} >Upload Item Picture</a></p>
              <input 
              style={{display: 'none'}} 
              type="file" 
              onChange={this.fileSelectedHandler} 
              ref={fileInput => this.fileInput = fileInput} />
            </div>
            <div className="itemInfoWrapper">
              <div className="inputWrapper">
                <label htmlFor="itemName">Name:</label>
                <input id="itemName" name="itemName" type="text" className="itemName" placeholder="Enter Name" required onChange={this.handleChange} />
              </div>
              <div className="priceWrapper">
                <div className="inputWrapper">
                  <label htmlFor="itemPrice">Price:</label>
                  <input min="0" id="itemPrice" name="itemPrice" type="number" className="itemPrice" placeholder="Enter Price" required onChange={this.handleChange} />
                </div>
                <div className="inputWrapper">
                  <label htmlFor="itemCurrency">Currency:</label>
                  <input id="itemCurrency" name="itemCurrency" type="text" className="itemCurrency" placeholder="Enter Currency" onChange={this.handleChange} />
                </div>
              </div>
              <div className="inputWrapper">
                <label htmlFor="itemDescription">Description:</label>
                <textarea name="itemDescription" id="itemDescription" className="itemDescription" placeholder="Enter Item Description" onChange={this.handleChange} />
              </div>
              <div className="inputWrapper">
                <label htmlFor="itemTags">Tags(Comma Separated):</label>
                <textarea name="itemTags" id="itemTags" className="itemTags" placeholder="Enter Tags" onChange={this.handleChange} />
              </div>
            </div>
          </div>
          <div className="buttonWrapper">
            <button className="saveItemBtn" onClick={this.save.bind(this)}>Save</button>
            <button className="cancelItemBtn" onClick={this.close.bind(this)}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }
}

AddItemPage.propTypes = {
  close: PropTypes.func,
  openClass: PropTypes.string
};

export default AddItemPage;
