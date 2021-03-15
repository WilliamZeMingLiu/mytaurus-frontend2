import './Dashboard.css';
import React, { Component } from "react";
import AssetTableTab from '../AssetTableTab/AssetTableTab';
import HomeButtons from '../HomeButtons/HomeButtons';
import LineGraph from '../LineGraph/LineGraph';
import GraphTab from '../GraphTab/GraphTab';
import { AuthContext } from '../Auth';
import axios from 'axios';


export default class Dashboard extends Component {
	static contextType = AuthContext;

	constructor(props) {
		super(props);
		this.state = {
			initializing: true,
			portfolioValue: null,
			stock: null,
			crypto: null
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
				const stockData = responseArr[0].data;
				const cryptoData = responseArr[1].data;

				this.setState({
					token: token,
					initializing: false,
					portfolioValue: stockData['total-value'] + cryptoData['total-value'],
					stock: stockData['stocks'],
					crypto: cryptoData['crypto']
				});
			});
	}

	render() {
		if (this.state.initializing) {
			return <div />
		}
		return (
			<div className="dashboard-wrapper">
				<HomeButtons stock={this.state.stock} crypto={this.state.crypto} portfolioValue={this.state.portfolioValue} />

				<div className="split-wrapper">
					<AssetTableTab stock={this.state.stock} crypto={this.state.crypto} />
					<GraphTab stock={this.state.stock} crypto={this.state.crypto} portfolioValue={this.state.portfolioValue} />
				</div>
			</div>
		);
	}
}
