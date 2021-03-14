import './Addasset.css';
import React, { Component } from "react";
import HomeButtons from '../HomeButtons/HomeButtons';
import AssetTableTab from '../AssetTableTab/AssetTableTab';
import LineGraph from '../LineGraph/LineGraph';
import GraphTab from '../GraphTab/GraphTab';
import { Button } from '@material-ui/core';
import { useState, useRef, setState } from 'react-hook-use-state';
import Modal from 'react-modal';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { AuthContext } from '../Auth';
import axios from 'axios';


export default class Addasset extends Component {
  static contextType = AuthContext;

	constructor(props) {
		super(props);
		this.state = {
			initializing: true,
			portfolioValue: null,
			stock: null,
			crypto: null,
      symbol: null,
      shares: null
		};
	}

	componentDidMount() {
		const { currentUser } = this.context;
		currentUser.getIdToken(true).then(idtoken => this.loadData(idtoken));
	}

	loadData(token) {
		console.log(token)
		const stockURL = "https://my-taurus.herokuapp.com/stocks/all";
		const cryptoURL = "https://my-taurus.herokuapp.com/crypto/all";

		let config = {
			headers: {
				Authorization: `Bearer ${token}`
			}
		}

		axios.all([
			axios.get(stockURL, config),
			axios.get(cryptoURL, config)
		])
			.then(responseArr => {
				this.setState({
					initializing: false,
					portfolioValue: 0, /* generate portfolio value dynamically*/
					stock: responseArr[0].data,
					crypto: responseArr[1].data
				});

			});
	}

	render() {
		if (this.state.initializing) {
			return <div />
		}
    return(
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
        </div>
        &nbsp;
        &nbsp;
        &nbsp;
        &nbsp;

      </div>

    );
  }
}
