import './HomeButtons.css';

function HomeButtons() {
	return (
		<div className="button-wrapper-1">
			<div className="button">
				<h4>Crypto</h4>
				<h2>$34,398.01</h2>
			</div>
			<div className="button">
				<h4>Stock</h4>
				<h2>$60,393.40</h2>
			</div>
			<div className="button" style={{border: "solid #9b9da0 3px"}}>
				<h4><u>Total Assets</u></h4>
				<h2>$110,393.32</h2>
			</div>
		</div>	
	);
}

export default HomeButtons;



