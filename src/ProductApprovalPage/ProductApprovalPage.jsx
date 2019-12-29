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
import { dataService } from '../_services/data.service'

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

class ProductApprovalPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          page: 0,
          rowsPerPage:10,
          data:[]
      };
      this.getProducts = this.getProducts.bind(this);
      this.handleChangePage = this.handleChangePage.bind(this);
      this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);

      this.columns = [
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
          label: '',
          minWidth: 120,
          align: 'center',
          special: (productData) =>
            <div>
              <Fab size="medium"
                variant="extended"
                aria-label="delete"
                style={{margin: '10px', backgroundColor: '#de183e', color: 'white', width: '100px'}}
                onClick={(e) => this.rejectProduct(productData)}
              >
                ไม่อนุมัติ
              </Fab>
              <Fab size="medium"
                variant="extended"
                aria-label="delete"
                style={{margin: '10px', backgroundColor: '#27b95f', color: 'white', width: '100px'}}
                onClick={(e) => this.rejectProduct(productData)}
              >
                อนุมัติ
              </Fab>
            </div>
        },
      ];
    }

    componentDidMount(){
      // this.getProducts()
    }

    getProducts(){
      this.setState(() => ({ data:dataService.getProducts()}))
    }

    handleChangePage(event,newPage){
      this.setState({page: newPage})
    }

    handleChangeRowsPerPage(event) {
      this.setState({page: 0,rowsPerPage:event.target.value})
    }

    rejectProduct(productData) {
      console.log('shoot reject product api', productData)
    }

    render() {
        const { classes } = this.props;
        const { page,rowsPerPage,data } = this.state;

        return (
          <Paper className={classes.root}>
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="flex-start"
              >
              <Fab variant="extended" aria-label="delete"
                className={classes.fabTransparent}
                style={{backgroundColor:'transparent',color:'black'}}
                disabled>
                Product Approval
              </Fab>
            </Grid>
            <div className={classes.tableWrapper}>
              <Table>
                <TableHead>
                  <TableRow>
                    {this.columns.map(column => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth, fontWeight: 'bold' }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.productID}>
                        {this.columns.map(column => {
                          const value = row[column.id];
                          return (
                            <TableCell key={value} align={column.align}>
                              {column.format && typeof value === 'number' ? column.format(value)
                                :
                                column.special?
                                  column.special(row)
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

const connectedProductApprovalPage = connect(mapState,)(withStyles(styles)(ProductApprovalPage));
export { connectedProductApprovalPage as ProductApprovalPage };