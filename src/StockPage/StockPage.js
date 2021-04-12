//import './StockPage.css';
import {withRouter} from 'react-router';
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
import StockDashboard from '../StockDashboard/StockDashboard';
import LoadScreen from '../LoadScreen/LoadScreen';



class StockPage extends Component {
	static contextType = AuthContext;

	constructor(props) {
		super(props);
		this.state = {
			initializing: true,
			token: null,
			portfolioValue: null,
			stock: null,
			crypto: null,
			symbol: this.props.match.params.symbol,
			overview: null,
			historical: null,
		};
	}

	componentDidMount() {
		const { currentUser } = this.context;
		currentUser.getIdToken(true).then(idtoken => this.loadData(idtoken));
		this.assets = setInterval(() => {
			this.loadData(this.state.token)
		}, 10000);
	}

	componentWillUnmount() {
		clearInterval(this.assets);
	  }

	loadData(token) {
		//console.log(token);
		const stockURL = "https://my-taurus.herokuapp.com/stocks/all";
		const cryptoURL = "https://my-taurus.herokuapp.com/crypto/all";
		const overviewURL = "https://my-taurus.herokuapp.com/stocks/overview";
		const historicalURL = "https://my-taurus.herokuapp.com/stocks/daily";
		//"https://my-taurus.herokuapp.com/stocks/daily";
		//"https://my-taurus.herokuapp.com/stocks/intraday";

		let config = {
			headers: {
				Authorization: `Bearer ${token}`
			}
		}

		const params = new URLSearchParams();
    	params.append('symbol', this.state.symbol);

		axios.all([
			axios.get(stockURL, config),
			axios.get(cryptoURL, config),
			axios.post(overviewURL, params, config),
			axios.post(historicalURL, params, config),
			 //, overviewParams, config)
		])
			.then(responseArr => {
				const stockData = responseArr[0].data;
				const cryptoData = responseArr[1].data;
				const overviewData = responseArr[2].data;
				const historicalData = responseArr[3].data;

				this.setState({
					token: token,
					initializing: false,
					portfolioValue: stockData['total-value'] + cryptoData['total-value'],
					overview: overviewData,
					historical: historicalData,
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
				<NavBar component={StockDashboard} portfolioValue={this.state.portfolioValue} stock={this.state.stock} crypto={this.state.crypto} overview={this.state.overview} historical={this.state.historical} />
			</div>
		);
  }
}

export default withRouter(StockPage);