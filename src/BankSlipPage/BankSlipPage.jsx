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
import TextField from '@material-ui/core/TextField';
import errorimage from '../static/errorimage.png';

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
  Pending: '#d9b028',
  Reject: '#eb2a51',
  Complete: '#5e9c5a'
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
            data:[
              {
                _id: "5e0b400d35742b0ba1856c82",
                email: "may-test@x.com",
                created_time: "2019-12-31T12:33:17.389Z",
                status: "pending",
                __v: 0
              }, {
                _id: "5e0b400d35742b0ba1856c82",
                email: "may-test@x.com",
                created_time: "2019-12-31T12:33:17.389Z",
                status: "pending",
                __v: 0
              }
          ],
            userSelected: {},
            userDetail: {},
            isError: false,
            product: {
              amount: ''
            }
        };
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
        this.getBankSlip = this.getBankSlip.bind(this);
        this.detail = this.detail.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.customTemplate = this.customTemplate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChangeValue = this.handleChangeValue.bind(this);
        this.columns = [
          { id: '_id', label: 'รหัสการโอน', minWidth: 100 },
          { id: 'created_time', label: 'วันที่ทำรายการ', minWidth: 100 },
          {
            id: 'email',
            label: 'ชื่อผู้โอน',
            minWidth: 200,
            align: 'left',
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
      // this.getBankSlip(10,1)
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
    }

    handleChangeRowsPerPage(event) {
      this.setState({page: 0,rowsPerPage:event.target.value})
    }

    closeDialog(){
      this.setState({detailDialog: false});
    }

    handleChangeValue(e){
      const product = Object.assign({}, this.state.product, { amount:e.target.value });
      this.setState({product: product});
    }

    onSubmit(){
      if(this.validateForm()){
        this.closeDialog();
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
            <Fab size="small" onClick={this.closeDialog} variant="extended" aria-label="delete" style={{ margin: '10px', backgroundColor: '#eb2a51', color: 'white', textTransform: 'inherit', width: '130px' }}>
              ยกเลิก
              </Fab>
            <Fab size="small" onClick={this.onSubmit} variant="extended" aria-label="delete" style={{ margin: '10px', backgroundColor: '#0079ea', color: 'white', textTransform: 'inherit', width: '130px' }}>
              ยืนยัน
              </Fab>
          </DialogActions>
        </Grid>
      );
    }

    detail(e, userId){
      if (e.defaultPrevented ) return;
      this.setState({userDetail: dataService.getMockUserDetail('AA123')});
      this.setState({detailDialog: true});
      this.setState({tabState: 0});
      this.setState({product: { amount: ''}});
      this.setState({isError: false});
    }

    render() {
        const { classes } = this.props;
        const { page, rowsPerPage, data, detailDialog, userDetail } = this.state;
        return (
          <>

          <Paper className={classes.root}>
          <DialogDetailComponent userDetail={userDetail} customTemplate={this.customTemplate} closeDialog={this.closeDialog} dialogState={detailDialog}/>
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
                      tabIndex={-1} key={row.transactionId} onClick={(e) => this.detail(e, row.userId)}>
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
              count={data.length}
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