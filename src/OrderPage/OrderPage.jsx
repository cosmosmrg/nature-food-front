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
import { dataService } from '../_services/data.service'

//Dialog
import DialogDetailComponent from '../DialogDetailComponent'

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
  { id: '_id', label: 'รหัสคำสั่งซื้อ', minWidth: 200 },
  { id: 'created_time', label: 'วันที่ทำรายการ', minWidth: 100 },
  {
    id: 'user',
    label: 'ชื่อผู้ซื้อ',
    minWidth: 120,
    align: 'left',
  },
  {
    id: 'total_price',
    label: 'ราคา',
    minWidth: 120,
    align: 'left',
    format: value => value.toLocaleString()+" บาท"
  },
  {
    id: 'status',
    label: 'สถานะ',
    minWidth: 120,
    align: 'center',
    special: value => {
      let statusColor;
      //TODO pending, delivered --> bug: processing
      value === "Pending" ? statusColor = '#d9b128' : statusColor = '#27b95a'
      return (<Fab disabled size="small" variant="extended" aria-label="delete" style={{margin: '10px', backgroundColor: statusColor, color: 'white', width: '110px'}}>
        {value}
      </Fab>)},
  },
];


class OrderPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            rowsPerPage: 10,
            dialogState: false,
            dataCount: 0,
            data: [
              {
                _id: "5e0b33f135742b0ba1856c81",
                user: "5e039819b822791dabaadf7f",
                status: "pending",
                created_time: "2019-12-31T11:41:37.810Z",
                items: [],
                total_price: 0
              }
            ]
        };
        this.userDetail = {};
        this.dialogDetailElement = React.createRef();
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
        this.getOrders = this.getOrders.bind(this);
        this.rows = [];
    }

    componentDidMount(){
      // this.getOrders(10,1)
    }

    getOrders(limit, page){
      dataService.getOrders(limit, page)
        .then(data => {
          this.setState(() => ({ data:data.docs, dataCount: data.total}))
        })
        .catch(err=>{
          if(err===401){
            this.props.history.push('/login')
          }
        })
    }

    handleChangePage(event,newPage){
      this.setState({page: newPage})
      this.getOrders(this.state.rowsPerPage, newPage+1)
    }

    handleChangeRowsPerPage(event) {
      this.setState({page: 0,rowsPerPage:event.target.value})
      this.getOrders(event.target.value, 1)
    }

    orderDetail = (e, orderCode) => {
      this.packageDetail = dataService.getPackage(orderCode);
      this.dialogDetailElement.current.changeStatus(this.packageDetail.status);
      Object.assign(this.userDetail, dataService.getMockUserDetail(orderCode));
      this.openDialog();
    }
    openDialog = () => {
      this.setState({dialogState: true})
    }

    closeDialog = () => {
      this.setState({dialogState: false})
    }

    render() {
        const { classes } = this.props;
        const { page, rowsPerPage, dialogState, data } = this.state;
        const showStatus = true;

        return (
          <>
            <DialogDetailComponent userDetail={this.userDetail} ref={this.dialogDetailElement} orderDetail={this.packageDetail} closeDialog={this.closeDialog} dialogState={dialogState} showStatus={showStatus}/>
            <Paper className={classes.root}>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="flex-start"
                  >
                  <Fab variant="extended" aria-label="delete" className={classes.fabTransparent}>
                    Order
                  </Fab>
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
                    {data.map((order,index) => {
                      return (
                        <TableRow hover role="checkbox" style={index%2===0 ? {backgroundColor:'#f2f2f2'} : {}}
                          tabIndex={-1} key={order.orderCode}>
                          {columns.map(column => {
                            const value = order[column.id];
                            return (
                              <TableCell key={column.id} align={column.align} onClick={(e) => {this.orderDetail(e, order.orderCode)}}>
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
          </>
        );
    }
}

function mapState(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}

const connectedOrderPage = connect(mapState,)(withStyles(styles)(OrderPage));
export { connectedOrderPage as OrderPage };
