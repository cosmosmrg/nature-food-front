import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

class DialogDetailComponent extends React.Component {

    render() {
        const { userDetail, child, dialogState, closeDialog } = this.props
        return (
          <>
            <Dialog
              onClose={closeDialog}
              aria-labelledby="customized-dialog-title"
              open={dialogState}
            >
              <DialogContent style={{margin: '0 10px'}}>
                <Typography variant="h6" style={{marginBottom: '16px'}}>
                  รายละเอียดลูกค้า
                </Typography>
                <Typography style={{marginBottom: '16px', display: 'flex', flexDirection: "row"}}>
                  <Typography style={{marginRight: '30px'}}>ชื่อ</Typography>
                  <Typography>{userDetail.name}</Typography>
                </Typography>
                <Typography style={{marginBottom: '16px', display: 'flex', flexDirection: "row"}}>
                  <Typography style={{marginRight: '30px'}}>ที่อยู่</Typography>
                  <Typography>{userDetail.place}</Typography>
                </Typography>
                <Typography style={{marginBottom: '16px', display: 'flex', flexDirection: "row"}}>
                  <Typography style={{marginRight: '30px'}}>อีเมล์</Typography>
                  <Typography>{userDetail.email}</Typography>
                </Typography>
                <Typography style={{marginBottom: '16px', display: 'flex', flexDirection: "row"}}>
                  <Typography style={{marginRight: '30px'}}>เบอร์</Typography>
                  <Typography>{userDetail.phoneNumber}</Typography>
                </Typography>
                {child && child()}
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