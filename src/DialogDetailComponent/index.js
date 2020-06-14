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
import errorimage from '../static/errorimage.png';

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
                  return (
                  <div>
                    <Typography gutterBottom key={'ราคา'+index}>
                      {row.name} ( {row.price} บาท) X {row.amount} = {row.price*row.amount} บาท
                    </Typography>
                    <Typography gutterBottom key={'ค่าส่ง'+index}>
                      ค่าส่ง โดย {row.shipping.carrier} {row.shipping.price} บาท
                    </Typography>
                  </div>)
                })}
              </div>
              <Typography style={{ margin: '16px 0 0 0' }}>
                รวม {orderDetail.total_price} บาท
            </Typography>
            </div>
          </>
        )
      }

      renderAccountDetail(accountDetail) {
        const banklist = [
          {'code': '001', 'name': 'ธนาคารแห่งประเทศไทย'},
          {'code': '002', 'name': 'ธนาคารกรุงเทพ จำกัด (มหาชน)'},
          {'code': '004', 'name': 'ธนาคารกสิกรไทย จำกัด (มหาชน)'},
          {'code': '005', 'name': 'เดอะรอยัลแบงค์อ๊อฟสกอตแลนด์ เอ็น .วี.'},
          {'code': '006', 'name': 'ธนาคารกรุงไทย จำกัด (มหาชน)'},
          {'code': '008', 'name': 'ธนาคารเจพี มอร์แกน เชส'},
          {'code': '011', 'name': 'ธนาคารทหารไทย จำกัด (มหาชน)'},
          {'code': '014', 'name': 'ธนาคารไทยพาณิชย์ จำกัด (มหาชน)'},
          {'code': '017', 'name': 'ธนาคารซิต้ีแบงค์'},
          {'code': '018', 'name': 'ชูมิโตโม มิตซุย แบงก้ิง คอร์ปอเรชั่น'},
          {'code': '020', 'name': 'ธนาคารสแตนดาร์ด ชาร์เตอร์ด (ไทย) จำกัด'},
          {'code': '022', 'name': 'ธนาคาร ซีไอเอ็ม บี ไทย จำกัด (มหาชน)'},
          {'code': '024', 'name': 'ธนาคารยูโอบี จำกัด (มหาชน)'},
          {'code': '025', 'name': 'ธนาคารกรุงศรีอยุธยา จำกัด (มหาชน)'},
          {'code': '026', 'name': 'ธนาคาร เมกะ สากลพาณิชย์ จำกัด (มหาชน)'},
          {'code': '027', 'name': 'ธนาคารแห่ง อเมริกา เนชั่นแนล แอสโซซิเอชั่น'},
          {'code': '030', 'name': 'ธนาคารออมสิน'},
          {'code': '031', 'name': 'ธนาคารฮ่องกงและเซ่ียงไฮแบ้งก้ิงคอร์ปอเรชั่น จำกัด'},
          {'code': '032', 'name': 'ธนาคารดอยซ์แบงก์'},
          {'code': '033', 'name': 'อาคารสงเคราะห์'},
          {'code': '034', 'name': 'ธนาคารเพ่ือการเกษตรและสหกรณ์การเกษตร'},
          {'code': '039', 'name': 'ธนาคารมิซูโฮ คอร์เปอเรท'},
          {'code': '045', 'name': 'ธนาคาร บีเอ็น พี พารีบาส์'},
          {'code': '052', 'name': 'ธนาคารแห่ง ประเทศจีน (ไทย) จำกัด (มหาชน)'},
          {'code': '065', 'name': 'ธนาคารธนชาต จำกัด (มหาชน)'},
          {'code': '066', 'name': 'ธนาคารอิสลามแห่ง ประเทศไทย'},
          {'code': '067', 'name': 'ธนาคารทิส โก้ จำกัด (มหาชน)'},
          {'code': '069', 'name': 'ธนาคารเกียรตินาคิน จำกัด (มหาชน)'},
          {'code': '070', 'name': 'ธนาคารไอซีบีซี (ไทย) จำกัด (มหาชน)'},
          {'code': '071', 'name': 'ธนาคารไทยเครดิต เพ่ือรายย่อย จำกัด (มหาชน)'},
          {'code': '073', 'name': 'ธนาคารแลนด์ แอนด์ เฮ้าส์'},

        ]
        const getBankName = (bankcode) => {
          const item = banklist.filter(bank => bank.code === bankcode)
          return item.length === 0? 'ไม่พบข้อมูลธนาคาร' : item[0].name
        }
        const addDefaultSrc = (ev) => {
          ev.target.src = errorimage
        }
        return (
          <>
            <div>
              <div variant="h6" style={{marginBottom: '16px'}}>
                <Typography style={{marginRight: '30px'}}>รายละเอียดบัญชี</Typography>
              </div>
              <div style={{marginBottom: '16px', display: 'flex', flexDirection: "row"}}>
                <Typography style={{marginRight: '30px'}}>เลขที่บัญชี</Typography>
                <Typography>{accountDetail.account}</Typography>
              </div>
              <div style={{marginBottom: '16px', display: 'flex', flexDirection: "row"}}>
                <Typography style={{marginRight: '30px'}}>ธนาคาร</Typography>
                <Typography>{accountDetail.bankcode} : {getBankName(accountDetail.bankcode)}</Typography>
              </div>
              <div style={{display: 'flex'}}>
                <img style={{ maxWidth: 500, maxHeight: 500 }}
                  alt={accountDetail.account}
                  src={accountDetail.account_image}
                  onError={addDefaultSrc}
                />
              </div>
            </div>
          </>
        )
      }

      changeStatus(state){
        this.setState({status: state,error:null})
      }

      renderStatus(detail, closeDialog, type) {
        if(!detail) return;
        const statuses = dataService.getStatusData(type);
        const updateStatus = () => {
          if(type === "order"){
            createService.updateOrderStatus({_id:detail._id,status:this.state.status})
              .then(order => {
                closeDialog();
              })
              .catch(err => {
                this.setState({error: err.message})
              })
          }
          if(type === "account"){
            createService.updateAccountStatus({_id:detail._id,status:this.state.status})
              .then(order => {
                closeDialog();
              })
              .catch(err => {
                this.setState({error: err.message})
              })
          }

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
        const { userDetail, customTemplate, dialogState, closeDialog, showStatus, orderDetail, showOrderShipping, accountDetail } = this.props
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
                {accountDetail && this.renderAccountDetail(accountDetail)}
                {showStatus && orderDetail && this.renderStatus(orderDetail, closeDialog, "order")}
                {showStatus && accountDetail && this.renderStatus(accountDetail, closeDialog, "account")}
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
