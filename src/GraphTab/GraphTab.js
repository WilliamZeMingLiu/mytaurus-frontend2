import './GraphTab.css';
import React, { Component } from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import PieGraph from '../PieGraph/PieGraph';
import BarGraph from '../BarGraph/BarGraph';
import PieChartIcon from '@material-ui/icons/PieChart';
import BarChartIcon from '@material-ui/icons/BarChart';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={1}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));


class GraphTab extends Component {
  constructor(props){
    super(props);
    this.state = {
      value:0
    }
  }

  render(){
    const handleChange = (event, newValue) => {
      this.setState({value: newValue});
    };

    return(
      <div className="graph-wrapper">
        <AppBar position="static" color="primary">
          <Tabs variant="fullWidth" centered value={this.state.value} onChange={handleChange} aria-label="table tabs">
            <Tab icon={<BarChartIcon fontSize='large' />} {...a11yProps(0)} />
            <Tab icon={<PieChartIcon fontSize='large' />} {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={this.state.value} index={0}>
            <BarGraph stock={this.props.stock} crypto={this.props.crypto} />
        </TabPanel>
        <TabPanel value={this.state.value} index={1}>
            <PieGraph stock={this.props.stock} crypto={this.props.crypto} portfolioValue={this.props.portfolioValue} />
        </TabPanel>
      </div>
    );
  }
  
}

export default GraphTab;