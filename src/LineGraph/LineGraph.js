import React, { Component } from "react";
import CanvasJSReact from '../assets/canvasjs.react';
import './LineGraph.css';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class LineGraph extends Component{
	constructor() {
		super();
		this.generateDataPoints = this.generateDataPoints.bind(this);
	}
	
	generateDataPoints(noOfDps) {
		var xVal = 1, yVal = 100;
		var dps = [];
		for(var i = 0; i < noOfDps; i++) {
			yVal = yVal +  Math.round(5 + Math.random() *(-5-5));
			dps.push({x: xVal,y: yVal});	
			xVal++;
		}
		return dps;
	}
	
	render() {
		const options = {
			theme: "dark2", // "light1", "dark1", "dark2"
			animationEnabled: true,
			zoomEnabled: true,
			title: {
				text: "+$1,7584.23 (+12.34%)"
			},
			data: [{
				type: "area",
				dataPoints: this.generateDataPoints(500)
			}]
		}
		
		return (
		<div>
			<CanvasJSChart options = {options}/>
		</div>
		);
	}
}

export default LineGraph;