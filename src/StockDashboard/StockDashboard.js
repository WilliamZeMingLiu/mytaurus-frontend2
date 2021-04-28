//Dashboard.css';
import React, { Component } from "react";
import AssetTableTab from '../AssetTableTab/AssetTableTab';
import HomeButtons from '../HomeButtons/HomeButtons';
import PieGraph from '../PieGraph/PieGraph';
import BarGraph from '../BarGraph/BarGraph';
import Grid from '@material-ui/core/Grid';
import LineGraph from '../LineGraph/LineGraph';
import NewsFeed from '../NewsFeed/NewsFeed';
import helper from '../helper.js';
import { Card, CardContent, Paper, Divider, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export default class StockDashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			portfolioValue: this.props.portfolioValue,
			stock: this.props.stock,
			crypto: this.props.crypto,
			overview: this.props.overview,
			historical: this.props.historical,
			news: this.props.news,
		};
	}

	render() {
		return (
			<div className="dashboard-wrapper">
				<Card>
			      <CardContent>
			      <Typography variant="h6" gutterBottom color="primary">
				    {this.state.overview.overview.Symbol}: {this.state.overview.overview.Name}
				  </Typography>
				  <br />
				  <LineGraph data={this.state.historical} />
				  <div style={{display: 'flex', flexWrap: 'wrap'}}>
				  	<div style={{width: '150px', margin: '0 10px 20px 0'}}>
				  		<Typography variant="subtitle2" gutterBottom color="textSecondary">
					    	Industry
					    </Typography>
					    <Divider light />
						<Typography variant="body1" color="textPrimary">
					         {this.state.overview.overview.Industry}
					    </Typography>
				  	</div>
				  	<div style={{width: '150px', margin: '0 10px 20px 0'}}>
				  		<Typography variant="subtitle2" gutterBottom color="textSecondary">
					    	Sector
					    </Typography>
					    <Divider light />
						<Typography variant="body1" color="textPrimary">
					        {this.state.overview.overview.Sector}
					    </Typography>
				  	</div>
					<div style={{width: '150px', margin: '0 10px 20px 0'}}>
						<Typography variant="subtitle2" gutterBottom color="textSecondary">
					    	Country
					    </Typography>
					    <Divider light />
						<Typography variant="body1" color="textPrimary">
					         {this.state.overview.overview.Country}
					    </Typography>
					</div>
					<div style={{width: '150px', margin: '0 10px 20px 0'}}>
						<Typography variant="subtitle2" gutterBottom color="textSecondary">
					    	Exchange
					    </Typography>
					    <Divider light />
						<Typography variant="body1" color="textPrimary">
					         {this.state.overview.overview.Exchange}
					    </Typography>
					</div>
					<div style={{width: '150px', margin: '0 10px 20px 0'}}>
						<Typography variant="subtitle2" gutterBottom color="textSecondary">
					    	Market Cap
					    </Typography>
					    <Divider light />
						<Typography variant="body1" color="textPrimary">
					         ${helper.prettifyNumber(this.state.overview.overview.MarketCapitalization)}
					    </Typography>
					</div>
					<div style={{width: '150px', margin: '0 10px 20px 0'}}>
						<Typography variant="subtitle2" gutterBottom color="textSecondary">
					    	Gross Profit TTM
					    </Typography>
					    <Divider light />
						<Typography variant="body1" color="textPrimary">
					        ${helper.prettifyNumber(this.state.overview.overview.GrossProfitTTM)}
					    </Typography>
					</div>
					<div style={{width: '150px', margin: '0 10px 20px 0'}}>
						<Typography variant="subtitle2" gutterBottom color="textSecondary">
					    	# of Employees
					    </Typography>
					    <Divider light />
						<Typography variant="body1" color="textPrimary">
					         {helper.prettifyNumber(this.state.overview.overview.FullTimeEmployees)}
					    </Typography>
					</div>
					<div style={{width: '150px', margin: '0 10px 20px 0'}}>
						<Typography variant="subtitle2" gutterBottom color="textSecondary">
					    	P/E Ratio
					    </Typography>
					    <Divider light />
						<Typography variant="body1" color="textPrimary">
					         {this.state.overview.overview.PERatio}
					    </Typography>
					</div>
					<div style={{width: '150px', margin: '0 10px 20px 0'}}>
						<Typography variant="subtitle2" gutterBottom color="textSecondary">
					    	Shares Float
					    </Typography>
					    <Divider light />
						<Typography variant="body1" color="textPrimary">
					         {helper.prettifyNumber(this.state.overview.overview.SharesFloat)}
					    </Typography>
					</div>
					<div style={{width: '150px', margin: '0 10px 20px 0'}}>
						<Typography variant="subtitle2" gutterBottom color="textSecondary">
					    	Shares Outstanding
					    </Typography>
					    <Divider light />
						<Typography variant="body1" color="textPrimary">
					         {helper.prettifyNumber(this.state.overview.overview.SharesOutstanding)}
					    </Typography>
					</div>
					<div style={{width: '150px', margin: '0 10px 20px 0'}}>
						<Typography variant="subtitle2" gutterBottom color="textSecondary">
					    	50 Day Moving Average
					    </Typography>
					    <Divider light />
						<Typography variant="body1" color="textPrimary">
					         {this.state.overview.overview['50DayMovingAverage']}
					    </Typography>
					</div>
					<div style={{width: '150px', margin: '0 10px 20px 0'}}>
						<Typography variant="subtitle2" gutterBottom color="textSecondary">
					    	200 Day Moving Average
					    </Typography>
					    <Divider light />
						<Typography variant="body1" color="textPrimary">
					         {this.state.overview.overview['200DayMovingAverage']}
					    </Typography>
					</div>
				  </div>
				  <br />
				  <div>
			      	<Typography variant="h6" gutterBottom color="textSecondary">
				    	About
				    </Typography>
				    <Divider light />
				    <br />
					<Typography variant="body1" gutterBottom color="textPrimary">
				        &emsp; &emsp; {this.state.overview.overview.Description}
				    </Typography>
			    </div>
			    <br />
				  	<div>
					  	<Typography variant="h6" gutterBottom color="textSecondary">
					    	News Feed
					    </Typography>
					    <Divider light />
				    	<br />
						{
							this.props.news.map(news =>
								<NewsFeed
									url={news.image}
									link={news.url}
									title={news.title}
									date={news.timestamp.split("T")[0]}
									content={news.summary}
									/>
							)
						}
					</div>
			      	<br />
			      	
			      </CardContent>
			    </Card>
			</div>
		);
	}
}