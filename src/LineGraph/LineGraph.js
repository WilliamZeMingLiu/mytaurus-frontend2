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

		if(this.props.data != null){
			let properties = Object.keys(this.props.data.overview).reverse();
			
			properties.forEach(prop => dps.push({x: new Date(prop), y: Number(this.props.data.overview[prop]['4. close'])}));
		}
		
		return dps;
	}
	
	render() {
		const options = {
		  theme: "light1", // "light1", "dark1", "dark2"
		  animationEnabled: true,
		  zoomEnabled: true,
		  axisX: {
		  	title: "Date (MM/DD/YY)",
	        crosshair: {
	           snapToDataPoint: true,
	        },
	        valueFormatString: "MM/DD/YY",
	      },
	      axisY: {
            title: "Daily Close Price",
            prefix: "$",
            crosshair: {
              snapToDataPoint: true,
              valueFormatString: "$#,###.##"
            }
          },
          toolTip: {
            shared: true
          },
	      data: [{
            name: "Price (in USD)",
            type: "area",
            yValueFormatString: "$#,###.##",
            xValueFormatString: "DDDD, MMM DD, YYYY",
            dataPoints : this.generateDataPoints(),
          }]
		}
		
		return (
			<div className="wrapper">
				<CanvasJSChart options = {options}/>
			</div>
		);
	}
}