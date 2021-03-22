import './AssetTableTab.css';
import React, { Component } from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AssetTable from '../AssetTable/AssetTable';
import { Card, CardContent } from '@material-ui/core';


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


class AssetTableTab extends Component {
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
        <div className="table-tab-wrapper">
          <Card>
            <AppBar position="static" color="primary">
              <Tabs variant="fullWidth" centered value={this.state.value} onChange={handleChange} aria-label="table tabs">
                <Tab label="Stocks" {...a11yProps(0)} />
                <Tab label="Crypto" {...a11yProps(1)} />
              </Tabs>
            </AppBar>
            <CardContent>
              <TabPanel value={this.state.value} index={0}>
                  <AssetTable data={this.props.stock} />
              </TabPanel>
              <TabPanel value={this.state.value} index={1}>
                  <AssetTable data={this.props.crypto} />
              </TabPanel>
            </CardContent>
          </Card>
        </div>
      ); 
    } 
}

export default AssetTableTab;