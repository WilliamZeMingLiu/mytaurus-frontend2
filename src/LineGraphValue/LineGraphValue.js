import React, { Component } from "react";
import CanvasJSReact from '../assets/canvasjs.react';
//import CanvasJSReact from '../assets/canvasjs.react';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class LineGraph extends Component{
	constructor() {
		super();
		this.state = {
			graphData: null,
		}
		this.generateDataPoints = this.generateDataPoints.bind(this);
		//this.dateFrame = this.dateFrame.bind(this);
	}

	generateDataPoints() {
		var dps = [];
		if(this.props.data != null){
			let properties = this.props.data;
			properties.forEach(prop => dps.push({x: new Date(prop.date), y: Number(prop.stockValue + prop.cryptoValue)}));
		}
		return dps;
	}

	/*dateFrame() {
		if(this.state.graphData != null) {
			var m1 = this.state.graphData[0].x.getMonth() + 1;
			var m2 = this.state.graphData[this.state.graphData.length-1].x.getMonth() + 1;
			return m1 + '/' + this.state.graphData[0].x.getDate() + '/' + this.state.graphData[0].x.getFullYear() + ' to ' +
		  	m2 + '/' + this.state.graphData[this.state.graphData.length-1].x.getDate() + '/' + this.state.graphData[this.state.graphData.length-1].x.getFullYear();
		}
		return null;
	}*/

	componentDidMount(){
		var dps = this.generateDataPoints();
		this.setState({ graphData: dps }, () =>{
			//console.log(this.state.graphData[0].x);
		});
	}

	render() {
		  const options = {
			animationEnabled: true,
			axisX: {
				valueFormatString: "MMM DD YYYY",
			},
			axisY: {
				title: "Current Total (in USD)",
				prefix: "$",
				gridThickness: 0,
			},
			data: [{
				yValueFormatString: "$#,###",
				xValueFormatString: "MMM DD YYYY",
				type: "spline",
				dataPoints: this.state.graphData,
			}]
		}
	    const containerProps = {
	      height: "500px",
	      margin: "auto"
	    };
		
		return (
			<div>
				<CanvasJSChart options={options}
				  containerProps = {containerProps}
		          onRef={ref => this.stockChart = ref}
		        />
			</div>
		);
	}
}