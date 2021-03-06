import React from 'react';
import { Link } from 'react-router-dom'

// css
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
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
    backgroundColor:'#fafafa',
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
    paddingTop: theme.spacing(1),
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
  listItemSelected:{
    paddingLeft: '10%',
    color:'white',
    backgroundColor:'#657584',
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

const AvatarMenu = ({avatarOpen,anchorEl}) => {
   return <Popper open={avatarOpen} anchorEl={anchorEl} transition disablePortal>
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
          anchorEl: null
      };
      this.handleAvatar = this.handleAvatar.bind(this);
  }

  handleAvatar(e){
    console.log("click");
    let newAnchorEl = this.state.anchorEl ? null : e.currentTarget
    this.setState(
      {
        avatarOpen: !this.state.avatarOpen,
        anchorEl:newAnchorEl
      })

  }


  render() {
    const { classes, title } = this.props;
    const routes = [
      {
        key: 'product',
        text: 'PRODUCT',
        icon: <InboxIcon />
      },
      {
        key: 'order',
        text: 'ORDER',
        icon: <InboxIcon />,
      },
      {
        key: 'package',
        text: 'PACKAGE',
        icon: <InboxIcon />,
      },
      {
        key: 'user',
        text: 'USER',
        icon: <InboxIcon />,
      },
      {
        key: 'account',
        text: 'ACCOUNT',
        icon: <InboxIcon />,
      },
      {
        key: 'bank-slip',
        text: 'BANK SLIP',
        icon: <InboxIcon />,
      },
      {
        key: 'report',
        text: 'REPORT',
        icon: <InboxIcon />,
      },
    ]
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
              <AvatarMenu avatarOpen={this.state.avatarOpen} anchorEl={this.state.anchorEl}/>
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
              {
                routes.map((item,idex) => (
                  <ListItem
                    className={title === item.key? classes.listItemSelected :classes.listItem}
                    button
                    key={item.key}
                    component={Link} to={`/${item.key}`}
                    >
                    <ListItemIcon className={classes.whiteIcon}>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>)
                )
              }
            </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            {this.props.children}
          </Container>
        </main>
      </div>
    );
  }

}


// <Link to="/login">Logout</Link>

const connectedHomePage = (withStyles(styles)(HomePage));
export { connectedHomePage as HomePage };
