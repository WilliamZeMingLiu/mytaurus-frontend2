import './Footer.css';
import { Navbar } from 'react-bootstrap';

function Footer() {
	return (
		<div className="footer-wrapper">
		<Navbar bg="dark" variant="dark">
			<Navbar.Brand>
				MyTaurus
			</Navbar.Brand>
			<Navbar.Toggle />
			<Navbar.Collapse className="justify-content-end">
				<Navbar.Text>
					Signed in as: <a href="#login">Mark Otto</a>
				</Navbar.Text>
			</Navbar.Collapse>
		</Navbar>
		</div>
	);
}

export default Footer;