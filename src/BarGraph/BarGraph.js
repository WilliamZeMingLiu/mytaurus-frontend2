import CanvasJSReact from '../assets/canvasjs.react';
var React = require('react');
var Component = React.Component;


var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class BarGraph extends Component {
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
				dataPoints: [
					{ y:  1000000000, label: "BTC" },
					{ y:  1800000000, label: "DOGE" },
					{ y:  563000000, label: "ETH" },
					{ y:  376000000, label: "BB" },
					{ y:  336000000, label: "VTI" },
				]
			}]
		}
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
export default BarGraph 
