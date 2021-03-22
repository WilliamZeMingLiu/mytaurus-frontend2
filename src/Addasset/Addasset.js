import './Addasset.css';
import React, { Component } from "react";
import AssetTable from '../AssetTable/AssetTable';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import 'reactjs-popup/dist/index.css';
import { AuthContext } from '../Auth';
import axios from 'axios';
import { Card, CardContent, Typography, IconButton, Tooltip, List, ListItem, ListItemText } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import helper from '../helper.js';



export default class Addasset extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      token: null,
      initializing: true,
      portfolioValue: null,
      stock: null,
      crypto: null,
      symbol: null,
      shares: null,
      cryptoSymbol: null,
      amount: null,
      open1: false,
      open2: false,
    };

    this.addStock = this.addStock.bind(this);
    this.removeStock = this.removeStock.bind(this);
    this.addCrypto = this.addCrypto.bind(this);
    this.removeCrypto = this.removeCrypto(this);
    this.generateStockValue = this.generateStockValue.bind(this);
    this.generateCryptoValue = this.generateCryptoValue.bind(this);
    this.generateStockPoints = this.generateStockPoints.bind(this);
    this.generateCryptoPoints = this.generateCryptoPoints.bind(this);
  }

  componentDidMount() {
    const { currentUser } = this.context;
    currentUser.getIdToken(true).then(idtoken => this.loadData(idtoken));
  }

  generateStockValue() {
		var stock = 0.0;
		if(this.state.stock != null){
			const stocks = this.state.stock;
			stocks.map((obj) => {
				stock += obj.price * obj.shares;
			})
		}
		return helper.prettifyPrice(stock);
	}
	generateCryptoValue() {
		var crypto = 0.0;
		// console.log(this.props.crypto)
		if(this.state.crypto != null){
			const cryptos = this.state.crypto
			cryptos.map((obj) => {
				crypto += obj.price * obj.amount;
			})
		}
		return helper.prettifyPrice(crypto);
	}
  generateStockPoints() {
    var arr = [];
    if(this.state.stock != null){
      arr = this.state.stock;
      arr.sort((a, b) => (a.price <= b.price) ? -1 : 1)
    }
    return arr
  }

  generateCryptoPoints() {
    var arr = [];
    if(this.state.crypto != null){
      arr = this.state.crypto;
      arr.sort((a, b) => (a.price <= b.price) ? -1 : 1)
    }
    return arr
  }

  loadData(token) {
    console.log(token)
    const stockURL = "https://my-taurus.herokuapp.com/stocks/all";
    const cryptoURL = "https://my-taurus.herokuapp.com/crypto/all";

    let config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    axios.all([
      axios.get(stockURL, config),
      axios.get(cryptoURL, config)
    ])
      .then(responseArr => {
        const stockData = responseArr[0].data;
        const cryptoData = responseArr[1].data;

        this.setState({
          token: token,
          initializing: false,
          portfolioValue: stockData['total-value'] + cryptoData['total-value'],
          stock: stockData['stocks'],
          crypto: cryptoData['crypto']
        });

      });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  async addStock(e) {
    e.preventDefault();
    const url = 'https://my-taurus.herokuapp.com/stocks/add'

    const params = new URLSearchParams();
    params.append('symbol', this.state.symbol);
    params.append('shares', this.state.shares);

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${this.state.token}`
      }
    }

    await axios.post(url, params, config);
    this.loadData(this.state.token);
  }

  async addCrypto(e) {
    e.preventDefault();
    const url = 'https://my-taurus.herokuapp.com/crypto/add'

    const params = new URLSearchParams();
    params.append('symbol', this.state.cryptoSymbol);
    params.append('amount', this.state.amount);

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${this.state.token}`
      }
    }

    await axios.post(url, params, config);
    this.loadData(this.state.token);
  }

  async removeCrypto(e) {
    e.preventDefault();
    const url = 'https://my-taurus.herokuapp.com/crypto/remove'

    const params = new URLSearchParams();
    params.append('symbol', this.state.cryptoSymbol);

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${this.state.token}`
      }
    }

    await axios.post(url, params, config);
    this.loadData(this.state.token);

  }

  async removeStock(e) {
    e.preventDefault();
    const url = 'https://my-taurus.herokuapp.com/stocks/remove'

    const params = new URLSearchParams();
    params.append('symbol', this.state.symbol);

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${this.state.token}`
      }
    }

    await axios.post(url, params, config);
    this.loadData(this.state.token);
  }

  render() {
    const handleClickOpen1 = () => {
      this.setState({open1: true});
    }

    const handleClose1 = () => {
      this.setState({open1: false});
    }

    const handleClickOpen2 = () => {
      this.setState({open2: true});
    }

    const handleClose2 = () => {
      this.setState({open2: false});
    }

    if (this.state.initializing) {
      return <div />
    }
    return (
      <div className="Addasset-wrapper">
        <Dialog open={this.state.open1} onClose={handleClose1} aria-labelledby="form-dialog-title">
          <form onSubmit={this.addStock}>
            <DialogTitle id="form-dialog-title">Add Asset</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please enter the desired asset symbol and number of shares that you wish to add.
              </DialogContentText>
              <div className="textfield-wrapper">
                <TextField
                  autoFocus
                  margin="dense"
                  variant="outlined"
                  name="symbol"
                  value={this.state.symbol}
                  label="Symbol"
                  onChange={this.handleChange}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  variant="outlined"
                  name="shares"
                  value={this.state.shares}
                  label="Shares"
                  type="number"
                  onChange={this.handleChange}
                />
              </div>
              
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose1} color="primary">
                Cancel
              </Button>
              <Button type="submit" onClick={handleClose1} color="primary">
                Add
              </Button>
            </DialogActions>
          </form>
        </Dialog>

        <Dialog open={this.state.open2} onClose={handleClose2} aria-labelledby="form-dialog-title">
          <form onSubmit={this.removeStock}>
            <DialogTitle id="form-dialog-title">Remove Asset</DialogTitle>
            <DialogContent>
              <DialogContentText>
              Please enter the desired asset symbol that you wish to remove.
              </DialogContentText>
                <div className="textfield-wrapper">
                  <TextField
                    autoFocus
                    margin="dense"
                    variant="outlined"
                    name="symbol"
                    value={this.state.symbol}
                    label="Symbol"
                    onChange={this.handleChange}
                    type="text"
                  />
                </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose2} color="primary">
                Cancel
              </Button>
              <Button type="submit" onClick={handleClose2} color="primary">
                Remove
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      <div className="table-wrapper">
        <div style={{width: '48%'}}>
          <Card> 
              <CardContent>
                <Typography style={{fontSize: 16, fontWeight: 'bold'}} color="textSecondary" gutterBottom>
                  Your Stocks
                </Typography>
                <Tooltip title="Remove Stock">
                  <IconButton color="inherit" onClick={handleClickOpen2} style={{float: 'right'}} size='small'>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Add Stock">
                  <IconButton color="inherit" onClick={handleClickOpen1} style={{float: 'right'}} size='small'>
                    <AddIcon />
                  </IconButton>
                </Tooltip>
                <Typography style={{fontSize: 22, marginBottom: '10px'}} color="textPrimary">
                  { this.generateStockValue() }
                </Typography>
                <AssetTable data={this.state.stock} />
              </CardContent>
          </Card>
        </div>
        <div style={{width: '48%'}}> 
          <Card> 
              <CardContent>
                <Typography style={{fontSize: 16, fontWeight: 'bold'}} color="textSecondary" gutterBottom>
                  Your Cryptocurrencies
                </Typography>
                <Typography style={{fontSize: 22, marginBottom: '10px'}} color="textPrimary">
                  { this.generateCryptoValue() }
                </Typography>
                <AssetTable data={this.state.crypto} />
              </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}}
