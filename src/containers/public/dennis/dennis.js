import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import DennisComponent from '../../../components/public/dennis/dennis';

function Dennis(props) {
    return (
        <DennisComponent auth={props.auth} history={props.history} />
    );
}

const mapStateToProps = state => ({
    auth: state.auth,
});

export { Dennis };
export default connect(mapStateToProps)(withRouter(Dennis));
