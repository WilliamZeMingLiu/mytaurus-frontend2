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
	render(){
		const { classes } = this.props;
		return (
			<div className="button-wrapper-1">
				<Button variant="contained" size="large" color="primary" fullWidth={true} style={{ fontSize: '20px'}} className={classes.margin}>
					Crypto
					<br />
					$34,398.01
				</Button>
				<Button variant="contained" size="large" color="primary" fullWidth={true} style={{ fontSize: '20px'}} className={classes.margin}>
					Stock
					<br />
					$60,393.40
				</Button>
				<Button variant="contained" size="large" color="primary" fullWidth={true} style={{ fontSize: '20px'}} className={classes.margin}>
					Total Assets
					<br />
					{ this.props.portfolioValue == null ? "" : "$" + this.props.portfolioValue[this.props.portfolioValue.length-1].value }
				</Button>
			</div>	
		);
	}
}

export default withStyles(useStyles)(HomeButtons);







