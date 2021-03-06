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
import DialogActions from '@material-ui/core/DialogActions';
import { dataService } from '../_services/data.service'
import { createService } from '../_services/create.service'
import TextField from '@material-ui/core/TextField';
import errorimage from '../static/errorimage.png';
import moment from 'moment'

import { withStyles } from '@material-ui/styles';
import DialogDetailComponent from '../DialogDetailComponent'

export const styles = theme => ({
  root: {
    width: '100%',
  },
  table: {
    minWidth: 650,
  },
  tableWrapper: {
    maxHeight: 407,
    overflow: 'auto',
  },
  tabDetail: {
    maxHeight: 300,
    minHeight: 200,
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

const statusColor = {
  pending: '#d9b028',
  rejected: '#eb2a51',
  approved: '#5e9c5a'
}

class BankSlipPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            rowsPerPage:10,
            detailDialog: false,
            tabState: 0,
            dataCount: 0,
            data:[],
            userSelected: {},
            userDetail: {},
            isError: false,
            product: {
              amount: '',
              picture: errorimage
            }
        };
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
        this.getBankSlip = this.getBankSlip.bind(this);
        this.detail = this.detail.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.customTemplate = this.customTemplate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.handleChangeValue = this.handleChangeValue.bind(this);
        this.columns = [
          { id: '_id', label: 'รหัสการโอน', minWidth: 100 },
          {
            id: 'created_time',
            label: 'วันที่ทำรายการ',
            minWidth: 100,
            special: value =>
              <div>
                {moment(value).format("Do MMM YYYY")}
              </div>
          },
          {
            id: 'user',
            label: 'ชื่อผู้โอน',
            minWidth: 200,
            align: 'left',
            special: value =>
            <div>
              {value.name}
            </div>
          },
          {
            id: 'status',
            label: 'สถานะ',
            minWidth: 120,
            align: 'center',
            special: value =>
            <Fab size="small" variant="extended" aria-label="delete" style={{margin: '10px', backgroundColor: statusColor[value], color: 'white', textTransform: 'inherit', width: '100px'}} disabled>
              {value}
            </Fab>
          },
        ];
    }

    componentDidMount(){
      this.getBankSlip(10,1)
    }

    getBankSlip(limit, page){
      dataService.getBankSlip(limit, page)
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
      this.getBankSlip(this.state.rowsPerPage, newPage+1)
    }

    handleChangeRowsPerPage(event) {
      this.setState({page: 0,rowsPerPage:event.target.value})
      this.getBankSlip(event.target.value, 1)
    }

    closeDialog(){
      this.setState({detailDialog: false});
    }

    handleChangeValue(e){
      const product = Object.assign({}, this.state.product, { amount:e.target.value });
      this.setState({product: product});
    }

    onCancel() {
      //TODO Shoot api
      const { product } = this.state
      const preparedUpdateSlip = {
        _id: product._id,
        amount: 0,
        status: "rejected",
      }
      createService.updateSlip(preparedUpdateSlip)
      .then(res =>{
        if (!res) return
        if (res.status === 200) {
          this.getBankSlip(this.state.rowsPerPage, this.state.page)
          this.closeDialog();
        }
      })
    }

    onSubmit() {
      if(this.validateForm()){
        //TODO Shoot api
        const { product } = this.state
        const preparedUpdateSlip = {
          _id: product._id,
          amount: product.amount,
          status: "approved",
        }
        createService.updateSlip(preparedUpdateSlip)
        .then(res =>{
          if (!res) return
          if (res.status === 200) {
            this.getBankSlip(this.state.rowsPerPage, this.state.page)
            this.closeDialog();
          }
        })
      }else{
        this.setState(() => ({ isError:true}))
      }
    }

    validateForm(){
      const {product} = this.state;
      return product !== null && product.amount !== "";
    }

    customTemplate() {
      const { classes } = this.props;
      const { product, isError } = this.state;

      return (
          <Grid
            container
            direction="column"
            justify="space-between"
            alignItems="flex-start"
          >

          <img style={{ maxWidth: 210, maxHeight: 118}}
            alt={product.amount}
            src={product.picture?product.picture:errorimage}
            onError={this.addDefaultSrc}/>
            <TextField
            id="amount"
            className={classes.textField}
            value={product.amount}
            margin="normal"
            name="amount"
            type="number"
            placeholder="จำนวนเงินที่เติม"
            InputProps={{
              classes: {
                input: classes.resize,
              },
            }}
            onChange={this.handleChangeValue}
            error={isError&&product.amount===""}
            helperText={isError&&product.amount===""?"กรุณาระบุจำนวนเงิน":""}
          />
               <DialogActions style={{ justifyContent: 'flex-start' }}>
            <Fab size="small" onClick={this.onCancel} variant="extended" aria-label="delete" style={{ margin: '10px', backgroundColor: '#eb2a51', color: 'white', textTransform: 'inherit', width: '130px' }}>
              ปฏิเสธ
              </Fab>
            <Fab size="small" onClick={this.onSubmit} variant="extended" aria-label="delete" style={{ margin: '10px', backgroundColor: '#0079ea', color: 'white', textTransform: 'inherit', width: '130px' }}>
              ยืนยัน
              </Fab>
          </DialogActions>
        </Grid>
      );
    }

    detail(e, data){
      const user = data.user
      if (e.defaultPrevented ) return;
      this.setState({userDetail: user, detailDialog: true, tabState: 0, product: { amount: '', picture: data.src, _id: data._id}, isError: false});
    }

    render() {
        const { classes } = this.props;
        const { page, rowsPerPage, data, detailDialog, userDetail } = this.state;

        return (
          <>

          <Paper className={classes.root}>
          <DialogDetailComponent userDetail={userDetail} customTemplate={this.customTemplate()} closeDialog={this.closeDialog} dialogState={detailDialog}/>
              <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="flex-start"
                >
                <Fab variant="extended" aria-label="delete" className={classes.fabTransparent} style={{backgroundColor:'transparent',color:'black'}} disabled>
                  BANK SLIP
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
                  {data.map((row,index) => {
                    return (
                      <TableRow hover role="checkbox" style={index%2===0 ? {backgroundColor:'#f2f2f2'} : {}}
                      tabIndex={-1} key={row.transactionId} onClick={(e) => this.detail(e, row)}>
                        {this.columns.map(column => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align} >
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

const connectedPackagePage = connect(mapState,)(withStyles(styles)(BankSlipPage));
export { connectedPackagePage as BankSlipPage };