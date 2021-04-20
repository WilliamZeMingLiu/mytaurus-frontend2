import './HomeButtons.css';
import React, { Component } from "react";
import { Chip, Card, CardContent, Typography } from '@material-ui/core';
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
		//console.log(this.props);
		return helper.prettifyPrice(crypto);
	}
	generateStockChange() {
		var total = 0;
		if(this.props.stock != null){
			const stocks = this.props.stock;
			stocks.map((obj) => {
				total += obj.change * obj.shares;
			})
		}
		return total;
	}
	generateCryptoChange() {
		var total = 0;
		if(this.props.crypto != null){
			const crypto = this.props.crypto;
			crypto.map((obj) => {
				//console.log(obj);
				total += obj.change * obj.amount;
			})
		}
		return total;
	}
	generateTotalChange() {
		var cTotal = 0;
		var sTotal = 0;
		if(this.props.crypto != null){
			const crypto = this.props.crypto;
			crypto.map((obj) => {
				cTotal += obj.change * obj.amount;
			})
		}
		if(this.props.stock != null){
			const stocks = this.props.stock;
			stocks.map((obj) => {
				sTotal += obj.change * obj.shares;
			})
		}
		return cTotal+sTotal;
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
						<Typography style={{fontSize: '10px'}} color="textSecondary">
							Daily Change
						</Typography>
						<Chip
							label={helper.prettifyChange(this.generateCryptoChange())}
							className="assetBadge"
							color="primary"
							style={{ backgroundColor: `${this.generateCryptoChange() >= 0 ? '#00a152' : '#ff3d00' }`, fontSize: 18}}
						/>
						
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
						<Typography style={{fontSize: '10px'}} color="textSecondary">
							Daily Change
						</Typography>
						<Chip
							label={helper.prettifyChange(this.generateStockChange())}
							className="assetBadge"
							color="primary"
							style={{ backgroundColor: `${this.generateStockChange() >= 0 ? '#00a152' : '#ff3d00' }`, fontSize: 18}}
						/>
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
						<Typography style={{fontSize: '10px'}} color="textSecondary">
							Daily Change
						</Typography>
						<Chip
							label={helper.prettifyChange(this.generateTotalChange())}
							className="assetBadge"
							color="primary"
							style={{ backgroundColor: `${this.generateTotalChange() >= 0 ? '#00a152' : '#ff3d00' }`, fontSize: 18}}
						/>
					</CardContent>
				</Card>
			</div>	
		);
	}
}

export default withStyles(useStyles)(HomeButtons);