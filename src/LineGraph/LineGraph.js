import React, { Component } from "react";
import CanvasJSReact from '../assets/canvasjs.stock.react';
//import CanvasJSReact from '../assets/canvasjs.react';
import './LineGraph.css';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSStockChart;

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
			let properties = Object.keys(this.props.data.overview).reverse();
			properties.forEach(prop => dps.push({x: new Date(prop), y: Number(this.props.data.overview[prop]['4. close'])}));
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
		      charts: [{
		      	  axisX: {
			          crosshair: {
			            enabled: true,
			          }
			        },
			      axisY: {
		            title: "Daily Close Price",
		            prefix: "$",
		            crosshair: {
		              enabled: true,
		              valueFormatString: "$#,###.##"
		            }
		          },
		          toolTip: {
		            shared: true
		          },
		          data: [{
		            type: "area",
		            name: "Price (in USD)",
		            yValueFormatString: "$#,###.##",
		            xValueFormatString: "DDDD, MMM DD, YYYY",
		            dataPoints: this.state.graphData
		         }]
		      }]
	    };
	    const containerProps = {
	      height: "500px",
	      margin: "auto"
	    };
		
		return (
			<div className="wrapper">
				<CanvasJSChart options={options}
				  containerProps = {containerProps}
		          onRef={ref => this.stockChart = ref}
		        />
			</div>
		);
	}
}