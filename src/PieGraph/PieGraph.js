import React, { Component } from "react";
import CanvasJSReact from '../assets/canvasjs.react';
import './PieGraph.css';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class PieGraph extends Component {
	render() {
		const options = {
			theme: "dark2",
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
				dataPoints: [
					{ name: "BTC", y: 5 },
					{ name: "DOGE", y: 31 },
					{ name: "ETH", y: 40 },
					{ name: "BB", y: 17 },
					{ name: "VTI", y: 7 }
				]
			}]
		}
		return (
		<div>
			<CanvasJSChart options = {options}/>
		</div>
		);
	}
}
export default PieGraph;     