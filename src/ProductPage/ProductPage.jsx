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

const columns = [
  { id: 'name',
    label: 'ชื่อสินค้า',
    minWidth: 200,
    special: value => <h5 style={{color:'#0079EA',textDecoration: 'underline'}}>{value}</h5>
  },
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
    align: 'center',
    special: value => value? <h5>{value.shop_name}</h5>: <h5>-</h5>
  },
  {
    id: 'status',
    label: 'สถานะ',
    minWidth: 120,
    align: 'center',
  },
  {
    id: 'is_package',
    label: 'แพ็คเกจ',
    minWidth: 120,
    align: 'center',
    special: value => value?
      <Fab size="medium"
        variant="extended"
        aria-label="delete"
        style={{margin: '10px', backgroundColor: '#AE27B9', color: 'white'}}
        disabled>
        package
      </Fab>
      :<h5>-</h5>,
  },
];

class ProductPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            rowsPerPage: 10,
            dataCount: 0,
            data: []
        };
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
        this.getProducts = this.getProducts.bind(this);
        this.handleProductCreate= this.handleProductCreate.bind(this);
        this.navigateProductApprovalPage= this.navigateProductApprovalPage.bind(this);
    }
    componentDidMount(){
      this.getProducts(10,1)
    }

    getProducts(limit, page){
      dataService.getProducts(limit, page)
        .then(data => {
          this.setState(() => ({ data:data.docs, dataCount:data.total}))
        })
        .catch(err=>{
          if(err===401){
            this.props.history.push('/login')
          }
        })
    }

    handleChangePage(event,newPage){
      this.setState({page: newPage})
      this.getProducts(this.state.rowsPerPage, newPage+1)
    }

    handleChangeRowsPerPage(event) {
      this.setState({page: 0,rowsPerPage:event.target.value})
      this.getProducts(event.target.value, 1)

    }
    navigateProductApprovalPage(event){
      event.preventDefault()
      this.props.history.push('/productApproval')
    }
    handleProductCreate(event){
      this.props.history.push('/product/create')
    }
    handleProductEdit(event,productID){
      this.props.history.push(`/product/${productID}`)
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
                  Product
                </Fab>
                <div>
                  <Fab
                    size="medium"
                    variant="extended"
                    aria-label="delete"
                    className={classes.fab}
                    style={{backgroundColor:'#648EB5'}}
                    onClick={this.navigateProductApprovalPage}
                  >
                    อนุมัติสินค้าใหม่
                  </Fab>
                  <Fab
                    size="medium"
                    variant="extended"
                    aria-label="delete"
                    className={classes.fab}
                    style={{backgroundColor:'#0079EA'}}
                    onClick={this.handleProductCreate}
                  >
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
                        style={{ minWidth: column.minWidth, fontWeight: 'bold' }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row,index) => {
                    return (
                      <TableRow hover role="checkbox" style={index%2===0 ? {backgroundColor:'#f2f2f2'} : {}}
                        tabIndex={-1} key={row._id} onClick={(e) => {this.handleProductEdit(e, row._id)}}>
                        {columns.map(column => {
                          const value = row[column.id];
                          return (
                            <TableCell key={value+row._id} align={column.align}>
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
              count={this.state.dataCount}
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
