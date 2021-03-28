import './HomeButtons.css';
import React, { Component } from "react";
import { Card, CardContent, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import helper from '../helper.js';

const useStyles = theme => ({
    root: {
		textAlign: 'center',
		width: '30%',
	  },
	  title: {
		fontSize: 16,
		fontWeight: 'bold',
	  },
	  value: {
		marginBottom: 12,
		fontSize: 22,
	  },
});


class HomeButtons extends Component {
	generateTotalValue() {
		return helper.prettifyPrice(this.props.portfolioValue);
	}
	generateStockValue() {
		var stock = 0.0;
		if(this.props.stock != null){
			const stocks = this.props.stock;
			stocks.map((obj) => {
				stock += obj.price * obj.shares;
			})
		}
		return helper.prettifyPrice(stock);
	}
	generateCryptoValue() {
		var crypto = 0.0;
		if(this.props.crypto != null){
			const cryptos = this.props.crypto
			cryptos.map((obj) => {
				crypto += obj.price * obj.amount;
			})
		}
		return helper.prettifyPrice(crypto);
	}
	render(){
		const { classes } = this.props;
		return (
			<div className="button-wrapper-1">
				<Card className={classes.root}>
					<CardContent>
						<Typography className={classes.title} color="textSecondary" gutterBottom>
							{ helper.capitalizeAll('crypto') }
						</Typography>
						<Typography className={classes.value} color="textPrimary">
							{ this.generateCryptoValue() }
						</Typography>
					</CardContent>
				</Card>
				<Card className={classes.root}>
					<CardContent>
						<Typography className={classes.title} color="textSecondary" gutterBottom>
							{ helper.capitalizeAll('stocks') }
						</Typography>
						<Typography className={classes.value} color="textPrimary">
							{ this.generateStockValue() }
						</Typography>
					</CardContent>
				</Card>
				<Card className={classes.root}>
					<CardContent>
						<Typography className={classes.title} color="textSecondary" gutterBottom>
							{ helper.capitalizeAll('net worth') }
						</Typography>
						<Typography className={classes.value} color="textPrimary">
							{ this.generateTotalValue() }
						</Typography>
					</CardContent>
				</Card>
			</div>	
		);
	}
}

export default withStyles(useStyles)(HomeButtons);