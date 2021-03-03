import React, { Component } from "react";
import CanvasJSReact from '../assets/canvasjs.react';
import './LineGraph.css';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class LineGraph extends Component{
	constructor() {
		super();
		this.generateDataPoints = this.generateDataPoints.bind(this);
	}
	
	generateDataPoints() {
		var dps = [];
		if(this.props.portfolioValue != null){
			var noOfDps = this.props.portfolioValue.length;
			this.props.portfolioValue.map((obj) => {
				dps.push({label:obj.date, y:obj.value})
			})
		}
		return dps;
	}
	
	render() {
		const options = {
			theme: "light1", // "light1", "dark1", "dark2"
			animationEnabled: true,
			zoomEnabled: true,
			data: [{
				type: "area",
				dataPoints: this.generateDataPoints()
			}]
		}
		
		return (
			<div className="wrapper">
				<h1>+$1,7584.23 (+12.34%)</h1>
				<CanvasJSChart options = {options}/>
			</div>
		);
	}
}