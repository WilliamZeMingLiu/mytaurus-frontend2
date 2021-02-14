import './HomeTable.css';
import { Table, Tab, Nav } from 'react-bootstrap';

function HomeTable() {
	return(
		<div className="table-wrapper">
			<Tab.Container defaultActiveKey="first">
				<div className="button-wrapper-2">
					<Nav fill variant="pills">
						<Nav.Item>
							<Nav.Link eventKey="first">Stocks</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link eventKey="second">Crypto</Nav.Link>
						</Nav.Item>
					</Nav>
				</div>
				<Tab.Content>
					<Tab.Pane eventKey="first">
						<Table striped bordered hover variant="dark">
						  <thead>
						    <tr>
						      <th>Symbol</th>
						      <th>Currency</th>
						      <th># Shares</th>
						      <th>Price</th>
						      <th>Total</th>
						      <th>Change</th>
						    </tr>
						  </thead>
						  <tbody>
						    <tr>
						    	<td>VTI</td>
						    	<td>USD</td>
						    	<td>8,392</td>
						    	<td>$789.93</td>
						    	<td>109</td>
						    	<td>-0.02%</td>
						    </tr>
						    <tr>
						    	<td>BLK</td>
						    	<td>USD</td>
						    	<td>34</td>
						    	<td>$1,283.28</td>
						    	<td>883</td>
						    	<td>+2.34%</td>
						    </tr>
						    <tr>
						    	<td>BB</td>
						    	<td>EUR</td>
						    	<td>890</td>
						    	<td>$509.93</td>
						    	<td>3,494</td>
						    	<td>+5.67%</td>
						    </tr>
						  </tbody>
						</Table>
					</Tab.Pane>
					<Tab.Pane eventKey="second">
						<Table striped bordered hover variant="dark">
						  <thead>
						    <tr>
						      <th>Symbol</th>
						      <th># Shares</th>
						      <th>Price</th>
						      <th>Total</th>
						      <th>Change</th>
						    </tr>
						  </thead>
						  <tbody>
						    <tr>
						    	<td>BTC</td>
						    	<td>783</td>
						    	<td>$30,089.32</td>
						    	<td>8</td>
						    	<td>+23.45%</td>
						    </tr>
						    <tr>
						    	<td>ETH</td>
						    	<td>123</td>
						    	<td>$4,029.89</td>
						    	<td>900</td>
						    	<td>-12.79%</td>
						    </tr>
						    <tr>
						    	<td>DOGE</td>
						    	<td>738</td>
						    	<td>$0.00023</td>
						    	<td>500,083</td>
						    	<td>+500.20%</td>
						    </tr>
						  </tbody>
						</Table>
					</Tab.Pane>
				</Tab.Content>
			</Tab.Container>
		</div>
	);
}

export default HomeTable;