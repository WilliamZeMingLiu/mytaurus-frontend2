import logo from '../logo.svg';
import './App.css';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import Dashboard from '../Dashboard/Dashboard.js';
//import Drawer from '../Drawer/Drawer';

function App() {
  return (
    <div className="App">
      <Header />
      <Dashboard />
      <Footer />
    </div>
  );
}

export default App;
