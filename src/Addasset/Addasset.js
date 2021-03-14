import './Addasset.css';
import React, { Component } from "react";
import HomeButtons from '../HomeButtons/HomeButtons';
import AssetTableTab from '../AssetTableTab/AssetTableTab';
import LineGraph from '../LineGraph/LineGraph';
import GraphTab from '../GraphTab/GraphTab';
import { Button } from '@material-ui/core';




export default class Addasset extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
      portfolioValue:null,
  		stock:null,
  		crypto:null
  	}
  }

  add = () => {

 }

 remove = () => {

}

  render(){
  	return (
      <div className="Addasset-wrapper">
      <AssetTableTab stock={this.state.stock} crypto={this.state.crypto} />
        <div className="addbutton-wrapper">
            <Button variant="contained" color="primary" onClick={this.add}>
            Add Asset
          </Button>
          &nbsp;
          &nbsp;
          &nbsp;
          &nbsp;
          <Button variant="contained" color="primary" onClick={this.remove}>
          Remove Asset
        </Button>
        </div>
      </div>

	);
  }
}
