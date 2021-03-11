import './Home.css';
import React, { Component } from "react";
import axios from 'axios';
import Footer from '../Footer/Footer.js';
import NavBar from '../NavBar/NavBar';
import HomeTable from '../HomeTable/HomeTable';
import HomeButtons from '../HomeButtons/HomeButtons';
import LineGraph from '../LineGraph/LineGraph';
import GraphTab from '../GraphTab/GraphTab';
import { auth } from '../firebase';
import { useContext } from 'react';
import { AuthContext } from '../Auth';


export default class Home extends Component {
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
		const {currentUser} = this.context;
		console.log(currentUser);



			currentUser.getIdToken(true).then(idtoken => this.loadData(idtoken));

		
	}

	loadData(token) {
		const valueURL = "https://my-taurus.herokuapp.com/values";
		const stockURL = "https://my-taurus.herokuapp.com/stocks/all";
		const cryptoURL = "https://my-taurus.herokuapp.com/crypto/all";

		let config = {
			headers: {
				Authorization: `Bearer ${token}`
			}
		}

		axios.all([
			axios.get(valueURL, config),
			axios.get(stockURL, config),
			axios.get(cryptoURL, config)
		])
		.then(responseArr => {
			console.log(responseArr[0])
			this.setState({
				initializing: false,
				portfolioValue: responseArr[0].data,
				stock: responseArr[1].data,
				crypto: responseArr[2].data
			});

		});
	}

	render() {
		if (this.state.initializing) {
			return <div />
		}

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

