import React from 'react';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

// styles

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: '#0F273E',
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '20%',
    paddingLeft: '10%',
    paddingRight: '10%',
    paddingBottom: '20%',
  },
  form: {
    marginTop: theme.spacing(5),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    padding: 15,
  },
});

const RoundedTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#0079EA',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#0079EA',
      borderRadius: 25,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#0079EA',
        borderRadius: 25,
      },
      '&:hover fieldset': {
        borderColor: '#0079EA',
        borderRadius: 25,
      },
      '&.Mui-focused fieldset': {
        borderColor: '#0079EA',
        borderRadius: 25,
      },
    },
  },
})(TextField);

const StyledButton = withStyles({
  root: {
    background: '#0079EA',
    borderRadius: 25,
    border: 0,
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);

class LoginPage extends React.Component {

    constructor(props) {
        super(props);

        // reset login status
        this.props.logout();

        this.state = {
            username: '',
            password: '',
            submitted: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        if (username && password) {
            this.props.login(username, password);
        }
    }

    render() {
        const { username, password, submitted } = this.state;
        const { classes } = this.props;
        return (
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Card className={classes.paper}>
              <Typography component="h1" variant="h5" style={{color:'#0079EA'}}>
                Nature Food
              </Typography>
              <form className={classes.form} noValidate name="form" onSubmit={this.handleSubmit}>
                <RoundedTextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="email"
                  type="text"
                  value={username}
                  onChange={this.handleChange}
                  helperText={submitted && !username && "Username is required"}
                  error={submitted && !username}
                  autoFocus
                />
                <RoundedTextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={this.handleChange}
                  helperText={submitted && !password && "Password is required"}
                  error={submitted && !password}
                />
                <StyledButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  LOGIN
                </StyledButton>
              </form>
            </Card>
          </Container>
        );
    }
}

function mapState(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators)(withStyles(styles)(LoginPage));
export { connectedLoginPage as LoginPage };
