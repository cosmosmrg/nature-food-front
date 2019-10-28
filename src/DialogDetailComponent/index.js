import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { dataService } from '../_services/data.service'
import Fab from '@material-ui/core/Fab';

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

class DialogDetailComponent extends React.Component {
      renderOrderShipping(orderDetail){
        return (<div style={{ padding: '10px 0', borderBottom: '1px solid white' }}>
          
          <Typography gutterBottom>
            ระยะเวลา: {orderDetail.time} เดือน
          </Typography>
          <Typography gutterBottom>
            สัปดาห์ในการจัดส่ง {orderDetail.transportWeek}
          </Typography>
          <Typography gutterBottom>
            วันที่เริ่มต้น: {orderDetail.startDate}
          </Typography>
          <Typography gutterBottom>
            วันที่สิ้นสุด: {orderDetail.endDate}
          </Typography>
        </div>);
      }

      renderOrderDetail(orderDetail, showOrderShipping) {
        function sum(products){
          let total = 0;
          products.forEach(x=> total += x.total);
          return total;
        }

        const packageToal = sum(orderDetail.products);
        return (
          <>
            <div style={{ width: '500px', borderRadius: '5px', backgroundColor: '#294b81', marginBottom: '10px', color: 'white', padding: '16px' }}>
              <Typography variant="h6" >
              คำสั่งซื้อ
              </Typography>
              {showOrderShipping && this.renderOrderShipping(orderDetail)}
              <div style={{ paddingBottom: '10px', paddingTop: '10px', borderBottom: '1px solid white' }}>
                {orderDetail.products.map(row => {
                  return (<Typography gutterBottom>
                    {row.productName} X {row.amount}
                  </Typography>)
                })}
              </div>
              <Typography style={{ margin: '16px 0 0 0' }}>
                รวม {packageToal} บาท
            </Typography>
            </div>
          </>
        )
      }

      changeStatus(state){
        this.setState({status: state})
      }

      renderStatus(orderDetail, closeDialog) {
        if(!orderDetail) return;
        const statuses = dataService.getStatusData();
        const updateStatus = () => {
          closeDialog();
        }

        const handleChange = event => {
          this.setState({status: event.target.value})
        };
        
        return (
          <>
          <FormControl component="fieldset" style={{marginTop: '10px'}}>
            <FormLabel component="legend" style={{fontWeight: 'bold'}}>สถานะ</FormLabel>
            <RadioGroup aria-label="position" name="position" value={this.state.status} onChange={handleChange} row>
            {statuses.map(column => {
              return(
              <FormControlLabel
                value={column.value}
                control={<Radio color="primary" />}
                label={column.label}
                labelPlacement="end"
            />)})}
            </RadioGroup>
          </FormControl>
           <Fab size="small" variant="extended" aria-label="delete" onClick={updateStatus} style={{margin: '0 0 10px 0', color: 'white', backgroundColor: '#0079ea', textTransform: 'inherit', width: '150px'}}>
           อัพเดตสถานะ
            </Fab>
         </>
        );
      }

      render() {
        const { userDetail, customTemplate, dialogState, closeDialog, showStatus, orderDetail, showOrderShipping } = this.props
        return (
          <>
            <Dialog
              onClose={closeDialog}
              aria-labelledby="customized-dialog-title"
              open={dialogState}
            >
              <DialogContent style={{margin: '0 10px'}}>
                <div variant="h6" style={{marginBottom: '16px'}}>
                  รายละเอียดลูกค้า
                </div>
                <div style={{marginBottom: '16px', display: 'flex', flexDirection: "row"}}>
                  <Typography style={{marginRight: '30px'}}>ชื่อ</Typography>
                  <Typography>{userDetail.name}</Typography>
                </div>
                <div style={{marginBottom: '16px', display: 'flex', flexDirection: "row"}}>
                  <Typography style={{marginRight: '30px'}}>ที่อยู่</Typography>
                  <Typography>{userDetail.place}</Typography>
                </div>
                <div style={{marginBottom: '16px', display: 'flex', flexDirection: "row"}}>
                  <Typography style={{marginRight: '30px'}}>อีเมล์</Typography>
                  <Typography>{userDetail.email}</Typography>
                </div>
                <div style={{marginBottom: '16px', display: 'flex', flexDirection: "row"}}>
                  <Typography style={{marginRight: '30px'}}>เบอร์</Typography>
                  <Typography>{userDetail.phoneNumber}</Typography>
                </div>
                {customTemplate && customTemplate()}
                {orderDetail && this.renderOrderDetail(orderDetail, showOrderShipping)}
                {showStatus && this.renderStatus(orderDetail, closeDialog)}
              </DialogContent>
            </Dialog>
          </>
        );
    }
}

DialogDetailComponent.propTypes = {
  userDetail: PropTypes.object.isRequired,
  child: PropTypes.element,
}

export default DialogDetailComponent;