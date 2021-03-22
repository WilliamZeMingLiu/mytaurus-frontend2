import './LoadScreen.css';
import CircularProgress from '@material-ui/core/CircularProgress';

function LoadScreen() {
	return (
        <div className="loading">
            <CircularProgress color="primary" size='10rem' />
            <h1 style={{fontSize:'20px'}}>Loading...</h1>
        </div>
    )
}

export default LoadScreen;