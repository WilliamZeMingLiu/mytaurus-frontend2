import './Dashboard.css';
import React, { Component } from "react";
import AssetTableTab from '../AssetTableTab/AssetTableTab';
import HomeButtons from '../HomeButtons/HomeButtons';
import PieGraph from '../PieGraph/PieGraph';
import BarGraph from '../BarGraph/BarGraph';
import { Card, CardContent, Typography } from '@material-ui/core';
import NewsFeed from "../NewsFeed/NewsFeed";
import KetStats from "../KeyStats/KetStats";


export default class Dashboard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			portfolioValue: this.props.portfolioValue,
			stock: this.props.stock,
			crypto: this.props.crypto,
			newsFeed: this.props.newsFeed
		};
		console.log(this.props.newsFeed)
	}

	render() {

		return (
			<div className="dashboard-wrapper">
				<HomeButtons stock={this.props.stock} crypto={this.props.crypto} portfolioValue={this.props.portfolioValue}/>

				<AssetTableTab stock={this.props.stock} crypto={this.props.crypto} />

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

				<h2>News feed</h2>
				{
					this.props.newsFeed.map(news =>
						<NewsFeed
							url={news.image}
							title={news.title}
							date={news.timestamp.split("T")[0]}
							content={news.summary}
							/>
					)
				}

				<div className="ketstat-container">
					<KetStats
						data={[
							["PREVIOUS CLOSE", "$123.00"],
							["YEAR RANGE", "$59.23 ~ $145.09"],
							["DAY RANGE", "$123.07 ~ 126.16"],
							["MARKET CAP", "2.11T US"],
							["VOLUME", "116.65M"],
							["P/E RATIO", "34.04"],
							["DIVIDEND YIELD", "0.65%"],
							["PRIMARY EXCHANGE", "NASDAQ"],
						]}/>

					<Card className="about">
						<CardContent>
							<Typography><b>About</b></Typography>
							<p>
								Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s w
							</p>
							<br />
							<p>
								Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s w
							</p>
						</CardContent>
					</Card>
				</div>

			</div>
		);
	}
}
