import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

// css
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';

//appbar
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';


//avatar
import Button from '@material-ui/core/Button';
import KeyBoardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Avatar from '@material-ui/core/Avatar';

// popper
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';

import { withStyles } from '@material-ui/styles';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor:'transparent',
    boxShadow:'5px 5px 5px rgba(0,0,0,0)',
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: '#0F273E'
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  typography: {
    color:'white',
    marginTop: '10%',
    marginLeft: '10%',
    marginBottom: '10%'
  },
  listItem:{
    paddingLeft: '10%',
    color:'white',
  },
  whiteIcon:{
    color:'white',
  },
  button: {
    backgroundColor:'transparent',
    boxShadow:'5px 5px 5px rgba(0,0,0,0)',

  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  leftAvatar: {
    marginRight: theme.spacing(1),
  },

});

const AvatarMenu = ({avatarOpen}) => {
   const anchorRef = React.useRef(null);
   return <Popper open={avatarOpen} anchorEl={anchorRef.current} transition disablePortal>
     {({ TransitionProps, placement }) => (
       <Grow
         {...TransitionProps}
         style={{
           transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
         }}
       >
         <Paper id="menu-list-grow" style={{minWidth:'150px'}}>
           <MenuList>
             <MenuItem
               key={"Logout"}
               component={Link} to="/login"
             >
               <span style={{marginLeft:'10px'}}>Logout</span>
             </MenuItem>
           </MenuList>
         </Paper>
       </Grow>
     )}
   </Popper>;
}

class HomePage extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          avatarOpen: false,
      };
      this.handleAvatar = this.handleAvatar.bind(this);
  }

  handleAvatar(e){
    this.setState({avatarOpen: !this.state.avatarOpen})
  }


  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute" className={classes.appBarShift}>
          <Toolbar className={classes.toolbar}>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            </Typography>
            <div>
              <Button variant="contained" color="default" className={classes.button} onClick={this.handleAvatar}>
                <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" className={classes.leftAvatar} />
                  USER
                <KeyBoardArrowDownIcon className={classes.rightIcon} />
              </Button>
              <AvatarMenu avatarOpen={this.state.avatarOpen}/>
            </div>


          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          open
        >
          <Typography component="h1" variant="h5" className={classes.typography}>
            Nature Food
          </Typography>
          <Divider />
            <List>
              <ListItem className={classes.listItem} button key={'PRODUCT'}>
                <ListItemIcon className={classes.whiteIcon}><InboxIcon /></ListItemIcon>
                <ListItemText primary={'PRODUCT'} />
              </ListItem>
              <ListItem className={classes.listItem} button key={'ORDER'}>
                <ListItemIcon className={classes.whiteIcon}><InboxIcon /></ListItemIcon>
                <ListItemText primary={'ORDER'} />
              </ListItem>
              <ListItem className={classes.listItem} button key={'PACKAGE'}>
                <ListItemIcon className={classes.whiteIcon}><InboxIcon /></ListItemIcon>
                <ListItemText primary={'PACKAGE'} />
              </ListItem>
              <ListItem className={classes.listItem} button key={'USER'}>
                <ListItemIcon className={classes.whiteIcon}><InboxIcon /></ListItemIcon>
                <ListItemText primary={'USER'} />
              </ListItem>
              <ListItem className={classes.listItem} button key={'BANK SLIP'}>
                <ListItemIcon className={classes.whiteIcon}><InboxIcon /></ListItemIcon>
                <ListItemText primary={'BANK SLIP'} />
              </ListItem>
              <ListItem className={classes.listItem} button key={'REPORT'}>
                <ListItemIcon className={classes.whiteIcon}><InboxIcon /></ListItemIcon>
                <ListItemText primary={'REPORT'} />
              </ListItem>
            </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              <Typography paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
                facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
                gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
                donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
                Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
                imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
                arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
                donec massa sapien faucibus et molestie ac.
              </Typography>
            </Grid>
          </Container>
        </main>
      </div>
    );
  }

}


// <Link to="/login">Logout</Link>

function mapState(state) {
    const { authentication } = state;
    return { authentication };
}
const connectedHomePage = connect(mapState,)(withStyles(styles)(HomePage));
export { connectedHomePage as HomePage };
