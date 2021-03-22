import './Dashboard.css';
import React, { Component } from "react";
import AssetTableTab from '../AssetTableTab/AssetTableTab';
import HomeButtons from '../HomeButtons/HomeButtons';
import PieGraph from '../PieGraph/PieGraph';
import BarGraph from '../BarGraph/BarGraph';
import { Card, CardContent, Typography } from '@material-ui/core';


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
				<HomeButtons stock={this.state.stock} crypto={this.state.crypto} portfolioValue={this.state.portfolioValue}/>
				
				<div className="graph-wrapper">
					<div className="bar">
						<Card>
							<CardContent>
								<Typography style={{fontSize: 16, fontWeight: 'bold'}} color="textSecondary" gutterBottom>
									Total Value of All Assets ($)
								</Typography>
								<BarGraph stock={this.state.stock} crypto={this.state.crypto} />
							</CardContent>
						</Card>
					</div>
					<div className="pie">
						<Card>
							<CardContent>
								<Typography style={{fontSize: 16, fontWeight: 'bold'}} color="textSecondary" gutterBottom>
									Asset Value Percentage (%)
								</Typography>
								<PieGraph stock={this.state.stock} crypto={this.state.crypto} portfolioValue={this.props.portfolioValue} />
							</CardContent>
						</Card>
					</div>
				</div>
				
				<AssetTableTab stock={this.state.stock} crypto={this.state.crypto} />
			</div>
		);
	}
}
