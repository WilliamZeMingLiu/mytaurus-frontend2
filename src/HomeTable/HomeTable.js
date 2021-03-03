import './HomeTable.css';
import React, { Component } from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';


function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={1}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

/*const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));
*/

const useStyles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

function createStockData(symbol, currency, shares, price, total, change) {
  return { symbol, currency, shares, price, total, change };
}

function createCryptoData(symbol, shares, price, total, change) {
  return { symbol, shares, price, total, change };
}

const stockRows = [
  createStockData('VTI', "USD", 6.0, 24, 4.0, 393),
  createStockData('BLK', "EUR", 9.0, 37, 4.3, 324),
  createStockData('BB', "USD", 16.0, 24, 6.0, 9101),
];


const cryptoRows = [
  createCryptoData('BTC', 159, 6.0, 24, 4.0),
  createCryptoData('ETH', 237, 9.0, 37, 4.3),
  createCryptoData('DOGE', 262, 16.0, 24, 6.0),
];


class HomeTable extends Component {
  //const classes = useStyles();
  //const [value, setValue] = React.useState(0);

  /*const handleChange = (event, newValue) => {
	setValue(newValue);
  };
  */

  constructor(props){
  	super(props);
  	this.state = {
  		value: 0
  	};
  }

  render(){
  	const { classes } = this.props;
	//const [value, setValue] = React.useState(0);

	/*const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	*/

	return(
		<div className="table-wrapper">
			<AppBar position="static" color="primary">
				<Tabs variant="fullWidth" centered value={this.state.value} onChange={(newValue) => this.setState({value:newValue})} aria-label="table tabs">
					<Tab label="Stocks" {...a11yProps(0)} />
					<Tab label="Crypto" {...a11yProps(1)} />
				</Tabs>
			</AppBar>
			<TabPanel value={this.state.value} index={0}>
				<TableContainer component={Paper}>
			      <Table className={classes.table} aria-label="stock table">
			        <TableHead>
			          <TableRow>
			            <TableCell>Symbol</TableCell>
			            <TableCell align="right">Currency</TableCell>
			            <TableCell align="right">Shares</TableCell>
			            <TableCell align="right">Price</TableCell>
			            <TableCell align="right">Total</TableCell>
			            <TableCell align="right">Change</TableCell>
			          </TableRow>
			        </TableHead>
			        <TableBody>
			          {stockRows.map((row) => (
			            <TableRow key={row.symbol}>
			              <TableCell component="th" scope="row">
			                {row.symbol}
			              </TableCell>
			              <TableCell align="right">{row.currency}</TableCell>
			              <TableCell align="right">{row.shares}</TableCell>
			              <TableCell align="right">{row.price}</TableCell>
			              <TableCell align="right">{row.total}</TableCell>
			              <TableCell align="right">{row.change}</TableCell>
			            </TableRow>
			          ))}
			        </TableBody>
			      </Table>
			    </TableContainer>
			</TabPanel>
			<TabPanel value={this.state.value} index={1}>
				<TableContainer component={Paper}>
			      <Table className={classes.table} aria-label="crypto table">
			        <TableHead>
			          <TableRow>
			            <TableCell>Symbol</TableCell>
			            <TableCell align="right">Shares</TableCell>
			            <TableCell align="right">Price</TableCell>
			            <TableCell align="right">Total</TableCell>
			            <TableCell align="right">Change</TableCell>
			          </TableRow>
			        </TableHead>
			        <TableBody>
			          {cryptoRows.map((row) => (
			            <TableRow key={row.symbol}>
			              <TableCell component="th" scope="row">
			                {row.symbol}
			              </TableCell>
			              <TableCell align="right">{row.shares}</TableCell>
			              <TableCell align="right">{row.price}</TableCell>
			              <TableCell align="right">{row.total}</TableCell>
			              <TableCell align="right">{row.change}</TableCell>
			            </TableRow>
			          ))}
			        </TableBody>
			      </Table>
			    </TableContainer>
			</TabPanel>
		</div>
	);
  }
}

export default withStyles(useStyles)(HomeTable);