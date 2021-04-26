import './Dashboard.css';
import React, { Component } from "react";
import AssetTableTab from '../AssetTableTab/AssetTableTab';
import HomeButtons from '../HomeButtons/HomeButtons';
import PieGraph from '../PieGraph/PieGraph';
import BarGraph from '../BarGraph/BarGraph';
import LineGraphValue from '../LineGraphValue/LineGraphValue'
import { Card, CardContent, Typography } from '@material-ui/core';


export default class Dashboard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			portfolioValue: this.props.portfolioValue,
			stock: this.props.stock,
			crypto: this.props.crypto,
			value: this.props.value,
		};
	}

	render() {
	
		return (
			<div className="dashboard-wrapper">
				<HomeButtons stock={this.props.stock} crypto={this.props.crypto} portfolioValue={this.props.portfolioValue}/>
				
				<div className="graph-wrapper">
					<div className="bar">
						<Card>
							<CardContent>
								<Typography style={{fontSize: 16, fontWeight: 'bold'}} color="textSecondary" gutterBottom>
									Total Value of Each Asset ($)
								</Typography>
								<BarGraph stock={this.props.stock} crypto={this.props.crypto} />
							</CardContent>
						</Card>
					</div>
					<div className="pie">
						<Card>
							<CardContent>
								<Typography style={{fontSize: 16, fontWeight: 'bold'}} color="textSecondary" gutterBottom>
									Share of Net Worth (%)
								</Typography>
								<PieGraph stock={this.props.stock} crypto={this.props.crypto} portfolioValue={this.props.portfolioValue} />
							</CardContent>
						</Card>
					</div>
				</div>
				<Card  style={{marginBottom: '50px'}}>
					<CardContent>
						<Typography style={{fontSize: 16, fontWeight: 'bold'}} color="textSecondary" gutterBottom>
							Portfolio Value Change
						</Typography>
						<LineGraphValue data={this.props.value} />
					</CardContent>
				</Card>
				<AssetTableTab stock={this.props.stock} crypto={this.props.crypto} />
			</div>
		);
	}
}
