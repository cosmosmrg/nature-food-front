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
import moment from 'moment'


import { withStyles } from '@material-ui/styles';
import DialogDetailComponent from '../DialogDetailComponent'
import { dataService } from '../_services/data.service'

export const styles = theme => ({
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

//TODO package (subscription)-> pending, delivered, --> bug: completed, processing

const statusColor = {
  processing: '#d9b028',
  delivered: '#5e9c5a'
}

class PackagePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            rowsPerPage:10,
            dialogState: false,
            dataCount:0,
            packageList: []
        };
        this.dialogDetailElement = React.createRef();
        this.userDetail = {};
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
        this.statusDetail = this.statusDetail.bind(this);
        this.getPackages = this.getPackages.bind(this);
        this.columns = [
          { id: 'ref_id', label: 'รหัสคำสั่งซื้อ', minWidth: 100 },
          { id: 'created_time',
            label: 'วันที่ทำรายการ',
            minWidth: 100,
            special: value => moment(value).format("D MMMM YYYY")
          },
          {
            id: 'user',
            label: 'ชื่อผู้ชื้อ',
            minWidth: 200,
            align: 'left',
            special: value => value.name
          },
          {
            id: 'seller',
            label: 'ร้านค้า',
            minWidth: 200,
            align: 'left',
            special: value => value.shop_name
          },
          {
            id: 'deliverweek',
            label: 'อาทิตย์ที่จัดส่ง',
            minWidth: 80,
            align: 'left',
          },
          {
            id: 'times',
            label: 'จัดส่งครั้งที่',
            minWidth: 80,
            align: 'left',
          },
          {
            id: 'status',
            label: 'สถานะ',
            minWidth: 120,
            align: 'center',
            special: (value, row) =>
              <Fab size="small" variant="extended" aria-label="delete" style={{margin: '10px', backgroundColor: statusColor[value], color: 'white', textTransform: 'inherit', width: '100px'}} disabled>
                {row.status}
              </Fab>
          },
        ];
    }
    componentDidMount(){
      this.getPackages(10,1)
    }

    getPackages(limit, page){
      dataService.getPackages(limit, page)
        .then(data => {
          this.setState(() => ({ packageList:data.docs, dataCount: data.total}))
        })
        .catch(err=>{
          if(err===401){
            this.props.history.push('/login')
          }
        })
    }

    statusDetail(e, orderNo){
      this.packageDetail = this.state.packageList.filter(data=>data._id===orderNo)[0];
      this.dialogDetailElement.current.changeStatus(this.packageDetail.status);
      Object.assign(this.userDetail, this.packageDetail.user);
      this.openDialog(true);
    }

    handleChangePage(event,newPage){
      this.setState({page: newPage})
      this.getPackages(this.state.rowsPerPage, newPage+1)
    }

    handleChangeRowsPerPage(event) {
      this.setState({page: 0,rowsPerPage:event.target.value})
      this.getPackages(event.target.value, 1)
    }

    openDialog = () => {
      this.setState({dialogState: true});
    }

    closeDialog = () => {
      this.setState({dialogState: false});
      this.getPackages(this.state.rowsPerPage,this.state.page)
    }

    render() {
        const { classes } = this.props;
        const { page, rowsPerPage, dialogState, dataCount, packageList } = this.state;
        const showStatus = true;
        const showOrderShipping = true;

        return (
          <>
          <DialogDetailComponent userDetail={this.userDetail} ref={this.dialogDetailElement} closeDialog={this.closeDialog} orderDetail={this.packageDetail} showStatus={showStatus} showOrderShipping={showOrderShipping} dialogState={dialogState}/>
          <Paper className={classes.root}>
              <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="flex-start"
                >
                <Fab variant="extended" aria-label="delete" className={classes.fabTransparent}>
                  PACKAGE
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
                  {packageList.map((row,index) => {
                    return (
                      <TableRow hover role="checkbox" style={index%2===0 ? {backgroundColor:'#f2f2f2'} : {}}
                        tabIndex={-1} key={row._id+"-"+index} onClick={(e) => {this.statusDetail(e, row._id)}}>
                        {this.columns.map(column => {
                          const value = row[column.id];
                          return (
                            <TableCell key={row._id+"-"+index+column.id} align={column.align}>
                              {column.format && typeof value === 'number' ? column.format(value)
                                :
                                column.special?
                                  column.special(value, row)
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
              count={dataCount}
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

const connectedPackagePage = connect(mapState,)(withStyles(styles)(PackagePage));
export { connectedPackagePage as PackagePage };
