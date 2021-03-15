import './HomeButtons.css';
import React, { Component } from "react";
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
  margin: {
    margin: theme.spacing(1),
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(3),
  },
});


class HomeButtons extends Component {
	generateTotalValue() {
		return this.props.portfolioValue.toFixed(2);
	}
	generateStockValue() {
		var stock = 0.0;
		if(this.props.stock != null){
			const stocks = this.props.stock;
			stocks.map((obj) => {
				stock += obj.price * obj.shares;
			})
		}
		return stock.toFixed(2);
	}
	generateCryptoValue() {
		var crypto = 0.0;
		console.log(this.props.crypto)
		if(this.props.crypto != null){
			const cryptos = this.props.crypto
			cryptos.map((obj) => {
				crypto += obj.price * obj.amount;
			})
		}
		return crypto.toFixed(2);
	}
	render(){
		const { classes } = this.props;
		return (
			<div className="button-wrapper-1">
				<Button variant="contained" size="large" color="primary" fullWidth={true} style={{ fontSize: '20px'}} className={classes.margin}>
					Crypto
					<br />
					{ "$" + this.generateCryptoValue() }
				</Button>
				<Button variant="contained" size="large" color="primary" fullWidth={true} style={{ fontSize: '20px'}} className={classes.margin}>
					Stock
					<br />
					{ "$" + this.generateStockValue() }
				</Button>
				<Button variant="contained" size="large" color="primary" fullWidth={true} style={{ fontSize: '20px'}} className={classes.margin}>
					Total Assets
					<br />
					{ "$" + this.generateTotalValue() }
				</Button>
			</div>	
		);
	}
}

export default withStyles(useStyles)(HomeButtons);







