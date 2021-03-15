import './Addasset.css';
import React, { Component } from "react";
import AssetTableTab from '../AssetTableTab/AssetTableTab';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { AuthContext } from '../Auth';
import axios from 'axios';


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
      open1: false,
      open2: false,
    };

    this.addStock = this.addStock.bind(this);
    this.removeStock = this.removeStock.bind(this);
  }

  componentDidMount() {
    const { currentUser } = this.context;
    currentUser.getIdToken(true).then(idtoken => this.loadData(idtoken));
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
    console.log("add stock called");
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
        <AssetTableTab stock={this.state.stock} crypto={this.state.crypto} />
        <div className="addbutton-wrapper">


        <div className="button-group">
          <Button variant="contained" color="primary" onClick={handleClickOpen1}>
            Add Asset
          </Button>
          <Button variant="contained" color="primary" onClick={handleClickOpen2}>
            Remove Asset
          </Button>
        </div>

          <Dialog open={this.state.open1} onClose={handleClose1} aria-labelledby="form-dialog-title">
            <form onSubmit={this.addStock}>
              <DialogTitle id="form-dialog-title">Add Asset</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please enter the desired asset symbol and number of shares.
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
                  Please enter the desired asset symbol to remove.
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

      </div>
    </div>

  );
}}
