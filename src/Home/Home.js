import './Home.css';
import React, { Component } from "react";
import Footer from '../Footer/Footer.js';
import NavBar from '../NavBar/NavBar';
import HomeTable from '../HomeTable/HomeTable';
import HomeButtons from '../HomeButtons/HomeButtons';
import LineGraph from '../LineGraph/LineGraph';
import GraphTab from '../GraphTab/GraphTab';


export default class Home extends Component {
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
	    <div className="Home">
	      <NavBar />
	      <div className="dashboard-wrapper">
				<HomeButtons portfolioValue={this.state.portfolioValue} />
				<LineGraph portfolioValue={this.state.portfolioValue} />
				<div className="split-wrapper">
					<HomeTable stock={this.state.stock} crypto={this.state.crypto} />
					<GraphTab />
				</div>
			</div>
	      <Footer />
	    </div>
	  );
  }
}

