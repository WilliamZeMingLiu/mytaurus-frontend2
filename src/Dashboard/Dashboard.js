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
			portfolioValue: this.props.portfolioValue,
			stock: this.props.stock,
			crypto: this.props.crypto
		};
	}

	render() {
		return (
			<div className="dashboard-wrapper">
				<HomeButtons stock={this.state.stock} crypto={this.state.crypto} portfolioValue={this.state.portfolioValue} />
				
				<div className="table-graph-wrapper">
					<div className="table">
						<AssetTableTab stock={this.state.stock} crypto={this.state.crypto} />
					</div>
					<div className="graph">
						<GraphTab stock={this.state.stock} crypto={this.state.crypto} portfolioValue={this.state.portfolioValue} />
					</div>
					
				</div>
			</div>
		);
	}
}
