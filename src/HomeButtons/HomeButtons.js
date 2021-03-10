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
		var total = null;
		if(this.props.portfolioValue != null){
			total = this.props.portfolioValue[this.props.portfolioValue.length-1].value;
		}
		return total;
	}
	generateStockValue() {
		var stock = null;
		if(this.props.stock != null){
			this.props.stock.map((obj) => {
				stock += obj.buyPrice * obj.shares;
			})
		}
		return stock;
	}
	generateCryptoValue() {
		var crypto = null;
		if(this.props.crypto != null){
			this.props.crypto.map((obj) => {
				crypto += obj.buyPrice * obj.amount;
			})
		}
		return crypto;
	}
	render(){
		const { classes } = this.props;
		return (
			<div className="button-wrapper-1">
				<Button variant="contained" size="large" color="primary" fullWidth={true} style={{ fontSize: '20px'}} className={classes.margin}>
					Crypto
					<br />
					{ "$" + this.generateStockValue() }
				</Button>
				<Button variant="contained" size="large" color="primary" fullWidth={true} style={{ fontSize: '20px'}} className={classes.margin}>
					Stock
					<br />
					{ "$" + this.generateCryptoValue() }
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







