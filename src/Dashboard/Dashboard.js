import './Dashboard.css';
import React, { Component } from "react";
import AssetTableTab from '../AssetTableTab/AssetTableTab';
import HomeButtons from '../HomeButtons/HomeButtons';
import LineGraph from '../LineGraph/LineGraph';
import GraphTab from '../GraphTab/GraphTab';



export default class Dashboard extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		portfolioValue:null,
  		stock:null,
  		crypto:null
  	}
  }

  componentDidMount() {
  	const valueURL = "https://my-taurus.herokuapp.com/values";
  	const stockURL = "https://my-taurus.herokuapp.com/stocks/all";
  	const cryptoURL = "https://my-taurus.herokuapp.com/crypto/all";

	Promise.all([
	  fetch(valueURL),
	  fetch(stockURL),
	  fetch(cryptoURL)
	])
	  .then(([res1, res2, res3]) =>
	  	Promise.all([res1.json(), res2.json(), res3.json()]))
	  .then(([data1, data2, data3]) =>
	   {
	    this.setState({
	    	portfolioValue:data1,
	    	stock:data2,
	    	crypto:data3
	    });
	   });
  }

  render(){
  	return (
	    <div className="dashboard-wrapper">
			<HomeButtons stock={this.state.stock} crypto={this.state.crypto} portfolioValue={this.state.portfolioValue} />
			<LineGraph portfolioValue={this.state.portfolioValue} />
			<div className="split-wrapper">
				<AssetTableTab stock={this.state.stock} crypto={this.state.crypto} />
				<GraphTab stock={this.state.stock} crypto={this.state.crypto} portfolioValue={this.state.portfolioValue} />
			</div>
		</div>
	);
  }
}
