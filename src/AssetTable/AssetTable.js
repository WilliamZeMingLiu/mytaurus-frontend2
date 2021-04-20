import React, { Component } from "react";
import './AssetTable.css';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import helper from '../helper.js';


const useStyles = theme =>({
  root: {
    width: '100%',
  },
});

class AssetTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      page: 0, 
      rowsPerPage: 10,
    }
  }

  generateDataPoints() {
    var arr = [];
    if(this.props.data != null){
      arr = this.props.data;
      arr.sort((a, b) => (a.price <= b.price) ? 1 : -1)
    }
    
    return arr
  }

  generateColumns() {
    var arr = [];
    if(this.props.data != null){
      if(this.props.data[0] != null){
        var counter = 1;
        Object.keys(this.props.data[0]).map((column) => {
          arr.push({
            id: 'column'+counter.toString(), label: column 
          })
          counter++;
        })
      }
    }
    return arr
  }

  prettifyData(data, label) {
    if(typeof(data) == 'string'){
      return helper.capitalizeAll(data);
    }
    else if (typeof(data) == 'number'){
      if(label == 'shares' || label == 'amount'){
        return helper.prettifyNumber(data);
      }
      else if(label == 'change') {
        return helper.prettifyChange(data);
      }
      else if(label == 'percentchange'){
        return helper.prettifyChangePercent(data);
      }
      return helper.prettifyPrice(data);
    }
    return data
  }
  
  colorChange(num) {
    if(num > 0){
      return 'green';
    }
    else if(num < 0){
      return 'red';
    }
    return '';
  }

  render() {
    const { classes } = this.props;
    const rows = this.generateDataPoints();
    const columns = this.generateColumns();
    //const [page, setPage] = React.useState(0);
    //const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
      this.setState({page: newPage});
      //setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      this.setState({rowsPerPage: +event.target.value});
      this.setState({page: 0});
    };

    return (
      <div>
        <Paper className={classes.root} style={{overflowY: ''}}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
            <colgroup>
                <col width="30%" />
                <col width="30%" />
                <col width="30%" />
                <col width="10%" />
            </colgroup>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {helper.capitalizeFirst(column.label)}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                      {columns.map((column) => {
                        const value = row[column.label];
                        var perColor = '';
                        if((column.label=='percentchange' || column.label == 'change') && value != 0){
                          if(value > 0){
                            perColor = '#00a152';
                          }
                          else {
                            perColor = '#ff3d00';
                          }
                        }
                        if(column.label == 'symbol' && this.props.type == 'stock'){
                          return (
                            <TableCell key={column.label} style={{color:perColor}}>
                              <a href={"/stock/" + value}>
                                {this.prettifyData(value, column.label)}
                              </a>
                            </TableCell>
                          );
                        }
                        else {
                          return (
                            <TableCell key={column.label} style={{color:perColor}}>
                              {this.prettifyData(value, column.label)}
                            </TableCell>
                          );
                        }
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={this.state.rowsPerPage}
            page={this.state.page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    );
  }
}
export default withStyles(useStyles)(AssetTable);