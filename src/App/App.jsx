import React from 'react';
import { Router, Route,Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { ProductPage } from '../ProductPage';
import { ProductCreatePage } from '../ProductCreatePage';
import { ProductApprovalPage } from '../ProductApprovalPage';
import { OrderPage } from '../OrderPage';
import { PackagePage } from '../PackagePage';
import { UserPage } from '../UserPage';
import { BankSlipPage } from '../BankSlipPage';
import { ReportPage } from '../ReportPage';
import { LoginPage } from '../LoginPage';

class App extends React.Component {
    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            this.props.clearAlerts();
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <div className="jumbotron" >
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                            <div>
                                <Route exact path="/" render={() => (<Redirect to="/product"/>)}/>
                                <PrivateRoute exact path="/product" component={ProductPage} title="product"/>
                                <PrivateRoute exact path="/product/:product" component={ProductCreatePage} title="product"/>
                                <PrivateRoute exact path="/productApproval" component={ProductApprovalPage} title="product-approval"/>
                                <PrivateRoute exact path="/order" component={OrderPage} title="order"/>
                                <PrivateRoute exact path="/package" component={PackagePage} title="package"/>
                                <PrivateRoute exact path="/user" component={UserPage} title="user"/>
                                <PrivateRoute exact path="/bank-slip" component={BankSlipPage} title="bank-slip"/>
                                <PrivateRoute exact path="/report" component={ReportPage} title="report"/>
                                <Route path="/login" component={LoginPage} />
                            </div>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { alert } = state;
    return { alert };
}

const actionCreators = {
    clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };
