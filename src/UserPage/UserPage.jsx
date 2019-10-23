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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { withStyles } from '@material-ui/styles';

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

function createData(id, email, name,  outstandingBalance , amount) {
  const confirmMsg = 'ต้องการยืนยันการโอนเงินจำนวน ' + outstandingBalance + ' ให้ ' + name + 'หรือไม่';
  return { id, email, name,  outstandingBalance, amount, confirmMsg};
}

const rows = [
  createData(1, 'user1@hotmail.com', 'User A', '50 บาท', 1),
  createData(2, 'user1@hotmail.com', 'User B', '150 บาท', 1),
  createData(3, 'user1@hotmail.com', 'User B', '20 บาท', 1),
  createData(4, 'user1@hotmail.com', 'User B', '50 บาท', 1),
  createData(5, 'user1@hotmail.com', 'User C', '50 บาท', 1),
  createData(6, 'user1@hotmail.com', 'User C', '50 บาท', 1),
  createData(7, 'user1@hotmail.com', 'User A', '50 บาท', 1),
  createData(8, 'user1@hotmail.com', 'User A', '50 บาท', 1),
  createData(9, 'user1@hotmail.com', 'User C', '50 บาท', 1),
  createData(10, 'user1@hotmail.com', 'User A', '50 บาท', 1),
  createData(11, 'user1@hotmail.com', 'User A', '50 บาท', 1),
];

class UserPage extends React.Component {
    state = {
      dialog: false
    }
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            rowsPerPage:10,
        };
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
        
        this.closeDialog = this.closeDialog.bind(this);
        this.openDialog = this.openDialog.bind(this);
        this.cancel = this.cancel.bind(this);
        this.confirm = this.confirm.bind(this);

        this.columns = [
          { id: 'email', label: 'อีเมล์', minWidth: 100 },
          { id: 'name', label: 'ชื่อ', minWidth: 100 },
          {
            id: 'outstandingBalance',
            label: 'ยอดค้างโอน',
            minWidth: 200,
            align: 'left',
          },
          {
            id: 'amount',
            label: 'จำนวนสินค้า',
            minWidth: 80,
            align: 'left',
          },
          {
            id: 'confirmMsg',
            label: 'สถานะ',
            minWidth: 120,
            align: 'center',
            special: value => 
              <Fab size="small" onClick={(e) => this.openDialog(e, value)} variant="extended" aria-label="delete" style={{margin: '10px', backgroundColor: '#648eb5', color: 'white', textTransform: 'inherit', width: '100px'}}>
                โอนเงิน
              </Fab>
          },
        ];
    }

    handleChangePage(event,newPage){
      this.setState({page: newPage})
    }

    handleChangeRowsPerPage(event) {
      this.setState({page: 0,rowsPerPage:event.target.value})
    }

    closeDialog(){
      this.setState({dialog: false});
    }

    cancel(){
      this.closeDialog();
    }

    confirm(){
      this.closeDialog();
    }

    openDialog(e, value){
      debugger;
      this.value = value;
      this.name = 'name'
      this.setStateDialog({dialog: true});
      e.preventDefault();
      
    }

    detail(e){
      if (e.defaultPrevented ) return;
      alert('not implement');
    }

    setStateDialog(state){
      this.setState(state);
    }


    renderDialog() {
      return (
        <Dialog
          open={this.state.dialog}
          onClose={this.closeDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"ยืนยันการโอน?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.value}
          </DialogContentText>
          </DialogContent>
          <DialogActions style={{ justifyContent: 'flex-start' }}>
            <Fab size="small" onClick={this.cancel} variant="extended" aria-label="delete" style={{ margin: '10px', backgroundColor: '#eb2a51', color: 'white', textTransform: 'inherit', width: '130px' }}>
              ยกเลิก
              </Fab>
            <Fab size="small" onClick={this.confirm} variant="extended" aria-label="delete" style={{ margin: '10px', backgroundColor: '#0079ea', color: 'white', textTransform: 'inherit', width: '130px' }}>
              ยืนยัน
              </Fab>

          </DialogActions>
        </Dialog>
      );
    }
    render() {
        const { classes } = this.props;
        const { page,rowsPerPage } = this.state;
        return (
          <Paper className={classes.root}>
              {this.renderDialog()}
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
                  {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.code} onClick={this.detail}>
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

const connectedPackagePage = connect(mapState,)(withStyles(styles)(UserPage));
export { connectedPackagePage as UserPage };

