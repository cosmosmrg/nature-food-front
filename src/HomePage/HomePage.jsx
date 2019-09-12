import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class HomePage extends React.Component {

    render() {
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi!</h1>
                <p>You're logged in with React!!</p>
                <h3>All registered users:</h3>
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}

function mapState(state) {
    const { authentication } = state;
    return { authentication };
}
const connectedHomePage = connect(mapState,)(HomePage);
export { connectedHomePage as HomePage };
