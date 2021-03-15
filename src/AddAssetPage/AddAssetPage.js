import './AddAssetPage.css';
import React, { Component } from "react";
import axios from 'axios';
import Footer from '../Footer/Footer.js';
import NavBar from '../NavBar/NavBar';
//import HomeTable from '../HomeTable/HomeTable';
import Addasset from '../Addasset/Addasset';

export default class AddAssetPage extends Component {
	constructor(props) {
		super(props);
	}

	render() {
	  	return (
		    <div className="Home">
		      <NavBar component={Addasset}/>
		      <Footer />
		    </div>
		  );
  }
}