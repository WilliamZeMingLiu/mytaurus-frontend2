import './Dashboard.css';
import { Tab, Button, Container, Row, Col } from 'react-bootstrap';
import HomeTable from '../HomeTable/HomeTable';
import HomeButtons from '../HomeButtons/HomeButtons';
import LineGraph from '../LineGraph/LineGraph';
import PieGraph from '../PieGraph/PieGraph';

function Dashboard() {
	return (
		<div className="dashboard-wrapper">
			<HomeButtons />

			<LineGraph />

			<div className="split-wrapper">
				<HomeTable />
				<div className="pie-wrapper">
					<PieGraph />
				</div>
			</div>
		</div>
	);
}

export default Dashboard;