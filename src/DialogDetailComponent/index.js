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
import { createService } from '../_services/create.service'
import Fab from '@material-ui/core/Fab';
import moment from 'moment'

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

class DialogDetailComponent extends React.Component {
      constructor(props) {
          super(props);
          this.state = {
              status: "processing",
              error: null
          };
      }
      renderOrderShipping(orderDetail){
        return (<div style={{ padding: '10px 0', borderBottom: '1px solid white' }}>

          <Typography gutterBottom>
            ระยะเวลา: {orderDetail.duration} เดือน
          </Typography>
          <Typography gutterBottom>
            สัปดาห์ในการจัดส่ง {orderDetail.deliverweek}
          </Typography>
          <Typography gutterBottom>
            ครั้งที่ส่ง: {orderDetail.times}
          </Typography>
          <Typography gutterBottom>
            วันที่ควรเริ่มส่ง: {moment(orderDetail.expected_deliver_date).utc(7).format('D MMMM YYYY')}
          </Typography>
          <Typography gutterBottom>
            ร้านค้า: {orderDetail.seller.shop_name}
          </Typography>
        </div>);
      }

      renderOrderDetail(orderDetail, showOrderShipping) {
        return (
          <>
            <div style={{ width: '500px', borderRadius: '5px', backgroundColor: '#294b81', marginBottom: '10px', color: 'white', padding: '16px' }}>
              <Typography variant="h6" >
              คำสั่งซื้อ
              </Typography>
              {showOrderShipping && this.renderOrderShipping(orderDetail)}
              <div style={{ paddingBottom: '10px', paddingTop: '10px', borderBottom: '1px solid white' }}>
                {orderDetail.items.map((row,index) => {
                  return (<Typography gutterBottom key={index}>
                    {row.name} X {row.amount}
                  </Typography>)
                })}
              </div>
              <Typography style={{ margin: '16px 0 0 0' }}>
                รวม {orderDetail.total_price} บาท
            </Typography>
            </div>
          </>
        )
      }

      changeStatus(state){
        this.setState({status: state,error:null})
      }

      renderStatus(orderDetail, closeDialog) {
        if(!orderDetail) return;
        const statuses = dataService.getStatusData();
        const updateStatus = () => {
          createService.updateOrderStatus({_id:orderDetail._id,status:this.state.status})
            .then(order => {
              closeDialog();
            })
            .catch(err => {
              this.setState({error: err.message})
            })
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
                key={column.value}
            />)})}
            </RadioGroup>
          </FormControl>
          <br/>
          <Fab
            size="small"
            variant="extended"
            aria-label="delete"
            onClick={updateStatus}
            style=
            {{ margin: '0 0 10px 0',
               color: 'white',
               backgroundColor: '#0079ea',
               textTransform: 'inherit',
               width: '150px'
             }}>
           อัพเดตสถานะ
          </Fab>
         </>
        );
      }

      render() {
        const { userDetail, customTemplate, dialogState, closeDialog, showStatus, orderDetail, showOrderShipping } = this.props
        const { error } = this.state
        return (
          <>
            <Dialog
              onClose={closeDialog}
              aria-labelledby="customized-dialog-title"
              open={dialogState}
            >
              <DialogContent style={{margin: '0 10px'}}>
                {
                  error?
                  <Fab
                    size="small"
                    variant="extended"
                    disabled
                    style={{marginBottom: '20px', width: '100%',backgroundColor:'#ffcccc', color:'red'}}>
                    Error: {error}
                  </Fab>
                  :
                  null
                }
                <div variant="h6" style={{marginBottom: '16px'}}>
                  <Typography style={{marginRight: '30px'}}>รายละเอียดลูกค้า</Typography>
                </div>
                <div style={{marginBottom: '16px', display: 'flex', flexDirection: "row"}}>
                  <Typography style={{marginRight: '30px'}}>ชื่อ</Typography>
                  <Typography>{userDetail.name}</Typography>
                </div>
                <div style={{marginBottom: '16px', display: 'flex', flexDirection: "row"}}>
                  <Typography style={{marginRight: '30px'}}>ที่อยู่</Typography>
                  <Typography>{userDetail.address}</Typography>
                </div>
                <div style={{marginBottom: '16px', display: 'flex', flexDirection: "row"}}>
                  <Typography style={{marginRight: '30px'}}>อีเมล์</Typography>
                  <Typography>{userDetail.email}</Typography>
                </div>
                <div style={{marginBottom: '16px', display: 'flex', flexDirection: "row"}}>
                  <Typography style={{marginRight: '30px'}}>เบอร์</Typography>
                  <Typography>{userDetail.tel}</Typography>
                </div>
                {customTemplate}
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
