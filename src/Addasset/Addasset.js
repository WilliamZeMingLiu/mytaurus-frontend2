import './Addasset.css';
import React, { Component } from "react";
import HomeButtons from '../HomeButtons/HomeButtons';
import AssetTableTab from '../AssetTableTab/AssetTableTab';
import LineGraph from '../LineGraph/LineGraph';
import GraphTab from '../GraphTab/GraphTab';
import { Button } from '@material-ui/core';
import{useState, useRef, setState} from 'react-hook-use-state';
import Modal from 'react-modal';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';



export default class Addasset extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
      portfolioValue:null,
  		stock:null,
  		crypto:null,
      symbol:null,
      shares:null
  	}
  }


  render(){
  	return (
      <div className="Addasset-wrapper">
      <AssetTableTab stock={this.state.stock} crypto={this.state.crypto} />
        <div className="addbutton-wrapper">
            <Popup trigger={<button > Add Asset </button>} position="right center">
            <div><form>
            <label>
              Asset Symbol:
              <input type="text" name="symbol" defaultValue={this.symbol} onChange={this.handleChange} />
            </label>
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            <label>
              Share Quantity:
              <input type="text" name="0" defaultValue={this.shares} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
          </div>
            </Popup>
          &nbsp;
          &nbsp;
          &nbsp;
          &nbsp;
          <Popup trigger={<button > Remove Asset </button>} position="right center">
          <div><form>
          <label>
            Asset Symbol:
            <input type="text" name="symbol" defaultValue={this.symbol} onChange={this.handleChange}  />
          </label>
          &nbsp;
          &nbsp;
          &nbsp;
          &nbsp;
          <label>
            Share Quantity:
            <input type="text" name="0" defaultValue={this.shares} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        </div>
          </Popup>
        </div>
        &nbsp;
        &nbsp;
        &nbsp;
        &nbsp;

      </div>

	);
  }
}
