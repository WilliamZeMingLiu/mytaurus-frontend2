import React, { Component } from "react";
//import CanvasJSReact from '../assets/canvasjs.stock.react';
import CanvasJSReact from '../assets/canvasjs.react';
import './LineGraph.css';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class LineGraph extends Component{
	constructor() {
		super();
		this.state = {
			graphData: null,
		}
		this.generateDataPoints = this.generateDataPoints.bind(this);
		this.dateFrame = this.dateFrame.bind(this);
	}

	generateDataPoints() {
		var dps = [];
		if(this.props.data != null){
			let properties = Object.keys(this.props.data.overview).reverse();
			properties.forEach(prop => dps.push({x: new Date(prop), y: Number(this.props.data.overview[prop]['4. close'])}));
		}
		return dps;
	}

	dateFrame() {
		if(this.state.graphData != null) {
			var m1 = this.state.graphData[0].x.getMonth() + 1;
			var m2 = this.state.graphData[this.state.graphData.length-1].x.getMonth() + 1;
			return m1 + '/' + this.state.graphData[0].x.getDate() + '/' + this.state.graphData[0].x.getFullYear() + ' to ' +
		  	m2 + '/' + this.state.graphData[this.state.graphData.length-1].x.getDate() + '/' + this.state.graphData[this.state.graphData.length-1].x.getFullYear();
		}
		return null;
	}

	componentDidMount(){
		var dps = this.generateDataPoints();
		this.setState({ graphData: dps }, () =>{
			//console.log(this.state.graphData[0].x);
		});
	}

	render() {
		const options = {
		  theme: "light1", // "light1", "dark1", "dark2"
		  animationEnabled: true,
		  zoomEnabled: true,
		  axisX: {
		  	title: this.dateFrame(),
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
            dataPoints : this.state.graphData,
          }]
		}
		
		return (
			<div className="wrapper">
				<CanvasJSChart options = {options} />
			</div>
		);
	}
}