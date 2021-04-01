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
import { Card, CardContent, Typography, IconButton, Tooltip } from '@material-ui/core';
import AutoComplete from '@material-ui/lab/Autocomplete';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import helper from '../helper.js';
import LoadScreen from '../LoadScreen/LoadScreen';



export default class Addasset extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      token: null,
      suggestionList: [],
      isHidden: true,
      initializing: false,
      symbol: null,
      shares: null,
      cryptoSymbol: null,
      amount: null,
      open1: false,
      open2: false,
      open3: false,
      open4: false,
    };
    
    this.loadData = this.props.loadData;
    this.searchStock = this.searchStock.bind(this)
    this.addStock = this.addStock.bind(this);
    this.removeStock = this.removeStock.bind(this);
    this.addCrypto = this.addCrypto.bind(this);
    this.removeCrypto = this.removeCrypto.bind(this);
    this.generateStockValue = this.generateStockValue.bind(this);
    this.generateCryptoValue = this.generateCryptoValue.bind(this);
    this.generateStockPoints = this.generateStockPoints.bind(this);
    this.generateCryptoPoints = this.generateCryptoPoints.bind(this);
  }

  componentDidMount() {
    const { currentUser } = this.context;
    currentUser.getIdToken(true).then(idtoken => this.setState({token: idtoken}));
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
    console.log(this.props.crypto)
		return helper.prettifyPrice(crypto);
	}
  generateStockPoints() {
    var arr = [];
    if(this.props.stock != null){
      arr = this.props.stock;
      arr.sort((a, b) => (a.price <= b.price) ? -1 : 1)
    }
    return arr
  }

  generateCryptoPoints() {
    var arr = [];
    if(this.props.crypto != null){
      arr = this.props.crypto;
      arr.sort((a, b) => (a.price <= b.price) ? -1 : 1)
    }
    return arr
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  updateField = (field, value) => {
    this.setState({[field]: value})
    this.searchStock(value)
  }

  async searchStock(value) {
    const url = 'https://my-taurus.herokuapp.com/stocks/search'

    const params = new URLSearchParams();
    params.append('symbol', value);

    const config = {
      headers: {
        'Authorization': `Bearer ${this.state.token}`
      }
    }

    let result = await axios.post(url, params, config)
    this.setState({suggestionList: result.data.suggestions})
    console.log(this.state.suggestionList)
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
    console.log(this.state.cryptoSymbol)
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
    console.log("E:" + this.state.symbol);
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
    //For stock modals
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

    //For crypto modals
    const handleClickOpen3 = () => {
      this.setState({open3: true});
    }

    const handleClose3 = () => {
      this.setState({open3: false});
    }

    const handleClickOpen4 = () => {
      this.setState({open4: true});
    }

    const handleClose4 = () => {
      this.setState({open4: false});
    }

    if (this.state.initializing) {
      return <LoadScreen />
    }
    return (
      <div className="modal-wrapper">
        <Dialog open={this.state.open1} onClose={handleClose1} aria-labelledby="form-dialog-title">
          <form onSubmit={this.addStock}>
            <DialogTitle id="form-dialog-title">Add Stock</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please enter the desired stock ticker symbol and number of shares that you wish to add.
              </DialogContentText>
              <div className="textfield-wrapper">
                <AutoComplete
                  id="combo-box-demo"
                  options={this.state.suggestionList}
                  getOptionLabel={(stock) => stock.symbol}
                  style={{ width: 170 }}
                  renderInput={(params) => 
                    <TextField {...params} 
                      autoFocus 
                      margin="dense" 
                      variant="outlined" 
                      name="name" 
                      value={this.state.symbol} 
                      label="Symbol" 
                      onChange={e => this.updateField("symbol", e.target.value)} 
                    />}
                />
                <TextField
                  style={{ width: 170 }}
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
                Add Stock
              </Button>
            </DialogActions>
          </form>
        </Dialog>

        <Dialog open={this.state.open2} onClose={handleClose2} aria-labelledby="form-dialog-title">
          <form onSubmit={this.removeStock}>
            <DialogTitle id="form-dialog-title">Remove Stock</DialogTitle>
            <DialogContent>
              <DialogContentText>
              Please enter the desired stock ticker symbol that you wish to remove.
              </DialogContentText>
                <div className="textfield-wrapper">
                  <AutoComplete
                    id="combo-box-demo"
                    options={this.props.stock}
                    getOptionLabel={(stock) => helper.capitalizeAll(stock.symbol)}
                    style={{ width: 170 }}
                    renderInput={(params) => 
                      <TextField {...params}
                        autoFocus
                        margin="dense"
                        variant="outlined"
                        name="symbol"
                        value={this.state.symbol}
                        label="Symbol"
                        onChange={this.handleChange}
                        type="text"
                      />}
                  />
                </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose2} color="primary">
                Cancel
              </Button>
              <Button type="submit" onClick={handleClose2} color="primary">
                Remove Stock
              </Button>
            </DialogActions>
          </form>
        </Dialog>

        <Dialog open={this.state.open3} onClose={handleClose3} aria-labelledby="form-dialog-title">
          <form onSubmit={this.addCrypto}>
            <DialogTitle id="form-dialog-title">Add Cryptocurrency</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please enter the desired cryptocurrency symbol and amount that you wish to add.
              </DialogContentText>
              <div className="textfield-wrapper">
                <TextField
                  autoFocus
                  margin="dense"
                  variant="outlined"
                  name="cryptoSymbol"
                  value={this.state.cryptoSymbol}
                  label="Symbol"
                  onChange={this.handleChange}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  variant="outlined"
                  name="amount"
                  value={this.state.amount}
                  label="Amount"
                  type="number"
                  onChange={this.handleChange}
                />
              </div>
              
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose3} color="primary">
                Cancel
              </Button>
              <Button type="submit" onClick={handleClose3} color="primary">
                Add Crypto
              </Button>
            </DialogActions>
          </form>
        </Dialog>

        <Dialog open={this.state.open4} onClose={handleClose4} aria-labelledby="form-dialog-title">
          <form onSubmit={this.removeCrypto}>
            <DialogTitle id="form-dialog-title">Remove Cryptocurrency</DialogTitle>
            <DialogContent>
              <DialogContentText>
              Please enter the desired cryptocurrency symbol that you wish to remove.
              </DialogContentText>
                <div className="textfield-wrapper">
                  <TextField
                    autoFocus
                    margin="dense"
                    variant="outlined"
                    name="cryptoSymbol"
                    value={this.state.cryptoSymbol}
                    label="Symbol"
                    onChange={this.handleChange}
                    type="text"
                  />
                </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose4} color="primary">
                Cancel
              </Button>
              <Button type="submit" onClick={handleClose4} color="primary">
                Remove Crypto
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
                <AssetTable data={this.props.stock} />
              </CardContent>
          </Card>
        </div>
        <div style={{width: '48%'}}> 
          <Card> 
              <CardContent>
                <Typography style={{fontSize: 16, fontWeight: 'bold'}} color="textSecondary" gutterBottom>
                  Your Cryptocurrencies
                </Typography>
                <Tooltip title="Remove Crypto">
                  <IconButton color="inherit" onClick={handleClickOpen4} style={{float: 'right'}} size='small'>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Add Crypto">
                  <IconButton color="inherit" onClick={handleClickOpen3} style={{float: 'right'}} size='small'>
                    <AddIcon />
                  </IconButton>
                </Tooltip>
                <Typography style={{fontSize: 22, marginBottom: '10px'}} color="textPrimary">
                  { this.generateCryptoValue() }
                </Typography>
                <AssetTable data={this.props.crypto} />
              </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}}
