import './Home.css';
import React, { Component, useState, useEffect } from "react";
import axios from 'axios';
import NavBar from '../NavBar/NavBar';
//import HomeTable from '../HomeTable/HomeTable';
import HomeButtons from '../HomeButtons/HomeButtons';
import LineGraph from '../LineGraph/LineGraph';
import GraphTab from '../GraphTab/GraphTab';
import { auth } from '../firebase';
import { useContext } from 'react';
import { AuthContext } from '../Auth';
import Dashboard from '../Dashboard/Dashboard';
import LoadScreen from '../LoadScreen/LoadScreen';



export default class Home extends Component {
	static contextType = AuthContext;

	constructor(props) {
		super(props);
		this.state = {
			initializing: true,
			portfolioValue: null,
			stock: null,
			crypto: null,
			value: null,
		};
	}

	componentDidMount() {
		const { currentUser } = this.context;
		currentUser.getIdToken(true).then(idtoken => this.loadData(idtoken));
		this.assets = setInterval(() => {
			this.loadData(this.state.token)
		}, 10000);
		//console.log("CDM");
		//console.log(this.state.stock);
	}

	componentWillUnmount() {
		clearInterval(this.assets);
	  }

	loadData(token) {
		//console.log(token)
		const stockURL = "https://my-taurus.herokuapp.com/stocks/all";
		const cryptoURL = "https://my-taurus.herokuapp.com/crypto/all";
		const valueURL = "https://my-taurus.herokuapp.com/values/all";

		let config = {
			headers: {
				Authorization: `Bearer ${token}`
			}
		}

		axios.all([
			axios.get(stockURL, config),
			axios.get(cryptoURL, config),
			axios.get(valueURL, config),

		])
			.then(responseArr => {
				const stockData = responseArr[0].data;
				const cryptoData = responseArr[1].data;
				const valueData = responseArr[2].data;

				this.setState({
					token: token,
					initializing: false,
					portfolioValue: stockData['total-value'] + cryptoData['total-value'],
					stock: stockData['stocks'],
					crypto: cryptoData['crypto'],
					value: valueData,
				});
			});

	}

	render() {
		if (this.state.initializing) {
			return (
				<LoadScreen />
			)
		}
		return (
			<div className="Home">
				<NavBar 
					component={Dashboard} 
					portfolioValue={this.state.portfolioValue} 
					stock={this.state.stock} 
					crypto={this.state.crypto}
					value={this.state.value}
				/>
			</div>
		);
  }
}
