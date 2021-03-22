import React, { Component } from "react";
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
  container: {
    maxHeight: 440,
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

  prettifyData(data) {
    if(typeof(data) == 'string'){
      return helper.capitalizeAll(data);
    }
    else if (typeof(data) == 'number'){
      if(data % 1 == 0){
        return helper.prettifyNumber(data);
      }
      return helper.prettifyPrice(data);
    }
    return data
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
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
            <colgroup>
                <col width="20%" />
                <col width="20%" />
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
                        return (
                          <TableCell key={column.label}>
                            {this.prettifyData(value)}
                          </TableCell>
                        );
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