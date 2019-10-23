import React from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';

import { withStyles } from '@material-ui/styles';

const styles = theme => ({
  root: {
    width: '100%',
  },
  tableWrapper: {
    maxHeight: 407,
    overflow: 'auto',
  },
  fab: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    boxShadow: '0 0 0',
    color:'white',
  },
  fabTransparent:{
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    backgroundColor: 'transparent',
    boxShadow: '0 0 0',
  }
});

const columns = [
  { id: 'name', label: 'ชื่อสินค้า', minWidth: 200 },
  { id: 'size', label: 'ขนาด', minWidth: 100 },
  {
    id: 'price',
    label: 'ราคา',
    minWidth: 120,
    align: 'left',
    format: value => value.toLocaleString()+" บาท"
  },
  {
    id: 'seller',
    label: 'ผู้ขาย',
    minWidth: 120,
    align: 'left',
  },
  {
    id: 'status',
    label: 'สถานะ',
    minWidth: 120,
    align: 'center',
    special: value => value === "Subscribe"?
      <Fab size="medium" variant="extended" aria-label="delete" style={{margin: '10px', backgroundColor: '#AE27B9', color: 'white'}}>
        {value}
      </Fab>
      :<h5>-</h5>,
  },
];

function createData(name, size, price, seller,status) {
  return { name, size, price, seller,status };
}

const rows = [
  createData('ข้าวหอมมะลิ', '1 กิโลกรัม', 50, 'Nature Food', '-'),
  createData('ข้าวหอมมะลิ', '5 กิโลกรัม', 250, 'Nature Food', 'Subscribe'),
  createData('ข้าวโพดหวาน', '5 กิโลกรัม', 250, 'Corn Mill Farm', '-'),
  createData('นมข้าวโพดหวาน', '250 ml', 25, 'Corn Mill Farm', 'Subscribe'),
  createData('ข้าวหอมมะลิ', '1 กิโลกรัม', 50, 'Nature Food', '-'),
  createData('ข้าวหอมมะลิ', '5 กิโลกรัม', 250, 'Nature Food', 'Subscribe'),
  createData('ข้าวโพดหวาน', '5 กิโลกรัม', 250, 'Corn Mill Farm', '-'),
  createData('นมข้าวโพดหวาน', '250 ml', 25, 'Corn Mill Farm', 'Subscribe'),
  createData('ข้าวหอมมะลิ', '1 กิโลกรัม', 50, 'Nature Food', '-'),
  createData('ข้าวหอมมะลิ', '5 กิโลกรัม', 250, 'Nature Food', 'Subscribe'),
  createData('ข้าวโพดหวาน', '5 กิโลกรัม', 250, 'Corn Mill Farm', '-'),
  createData('นมข้าวโพดหวาน', '250 ml', 25, 'Corn Mill Farm', 'Subscribe'),
];

class ProductPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            rowsPerPage:10,
        };
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    }

    handleChangePage(event,newPage){
      this.setState({page: newPage})
    }

    handleChangeRowsPerPage(event) {
      this.setState({page: 0,rowsPerPage:event.target.value})
    }

    render() {
        const { classes } = this.props;
        const { page,rowsPerPage } = this.state;
        return (
          <Paper className={classes.root}>
              <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="flex-start"
                >
                <Fab variant="extended" aria-label="delete" className={classes.fabTransparent}>
                  Product
                </Fab>
                <div HorizontalAlignment="Right">
                  <Fab size="medium" variant="extended" aria-label="delete" className={classes.fab} style={{backgroundColor:'#648EB5'}}>
                    อนุมัติสินค้าใหม่
                  </Fab>
                  <Fab size="medium" variant="extended" aria-label="delete" className={classes.fab} style={{backgroundColor:'#0079EA'}}>
                    เพิ่มสินค้าใหม่
                  </Fab>
                </div>
              </Grid>
            <div className={classes.tableWrapper}>
              <Table>
                <TableHead>
                  <TableRow>
                    {columns.map(column => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        {columns.map(column => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number' ? column.format(value)
                                :
                                column.special?
                                  column.special(value)
                                :
                                value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{
                'aria-label': 'previous page',
              }}
              nextIconButtonProps={{
                'aria-label': 'next page',
              }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </Paper>
        );
    }
}

function mapState(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}

const connectedProductPage = connect(mapState,)(withStyles(styles)(ProductPage));
export { connectedProductPage as ProductPage };
