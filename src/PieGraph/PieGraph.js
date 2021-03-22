import React, { Component } from "react";
import CanvasJSReact from '../assets/canvasjs.react';
import './PieGraph.css';
import helper from '../helper.js';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function compareDataPointYAscend(dataPoint1, dataPoint2) {
		return dataPoint1.y - dataPoint2.y;
}

function compareDataPointYDescend(dataPoint1, dataPoint2) {
		return dataPoint2.y - dataPoint1.y;
}

export default class PieGraph extends Component {
	constructor() {
		super();
		this.generateDataPoints = this.generateDataPoints.bind(this);
	}

	generateDataPoints() {
		var dps = [];
		if(this.props.portfolioValue != null){
			let portfolioValue = this.props.portfolioValue;
			if(this.props.stock != null){
				this.props.stock.map((obj) => {
					var y_value = obj.price*obj.shares;
					y_value /= portfolioValue
					y_value = y_value*100;
					dps.push({y:y_value, name: helper.capitalizeAll(obj.symbol)})
				})
			}
			if(this.props.crypto != null){
				this.props.crypto.map((obj) => {
					var y_value = obj.price*obj.amount;
					y_value /= portfolioValue
					y_value = y_value*100;
					dps.push({y:y_value, name: helper.capitalizeAll(obj.symbol)})
				})
			}
		}
		return dps;
	}

	render() {
		const options = {
			theme: "light2",
			animationEnabled: true,
			title: {
			},
			subtitles: [{
				verticalAlign: "center",
				fontSize: 24,
				dockInsidePlotArea: true
			}],
			data: [{
				type: "doughnut",
				showInLegend: true,
				yValueFormatString: "#,###'%'",
				dataPoints: this.generateDataPoints()
			}]
		}
		options.data[0].dataPoints.sort(compareDataPointYDescend);
		
		return (
			<div className="pie-wrapper">
				<CanvasJSChart options = {options}/>
			</div>
		);
	}
}
   