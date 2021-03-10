import React, { Component } from "react";
import CanvasJSReact from '../assets/canvasjs.react';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function compareDataPointYAscend(dataPoint1, dataPoint2) {
		return dataPoint1.y - dataPoint2.y;
}

function compareDataPointYDescend(dataPoint1, dataPoint2) {
		return dataPoint2.y - dataPoint1.y;
}

export default class BarGraph extends Component {
	constructor() {
		super();
		this.generateDataPoints = this.generateDataPoints.bind(this);
	}

	generateDataPoints() {
		var dps = [];
		if(this.props.stock != null){
			this.props.stock.map((obj) => {
				dps.push({y:obj.buyPrice*obj.shares, label:obj.symbol})
			})
		}
		if(this.props.crypto != null){
			this.props.crypto.map((obj) => {
				dps.push({y:obj.buyPrice*obj.amount, label:obj.name})
			})
		}
		return dps;
	}

	render() {
		const options = {
			animationEnabled: true,
			theme: "light2",
			axisX: {
				reversed: true,
			},
			axisY: {
				includeZero: true,
				labelFormatter: this.addSymbols
			},
			data: [{
				type: "bar",
				dataPoints: this.generateDataPoints()
			}]
		}
		options.data[0].dataPoints.sort(compareDataPointYDescend);

		return (
			<div className="bar-wrapper">
				<CanvasJSChart options = {options}/>
			</div>
		);
	}
	addSymbols(e){
		var suffixes = ["", "K", "M", "B"];
		var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
		if(order > suffixes.length - 1)
			order = suffixes.length - 1;
		var suffix = suffixes[order];
		return "$" + CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
	}
}
