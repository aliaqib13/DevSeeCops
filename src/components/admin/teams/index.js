import { connect } from 'react-redux';
import {
    adminSearchUsersByEmail,
} from '../../../store/actions/admin/users';
import {
    adminCreateTeam,
} from '../../../store/actions/admin/teams';

import CreateTeamPage from './create-team-page';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
    adminSearchUsersByEmail: searchEmail => dispatch(adminSearchUsersByEmail(
        searchEmail,
    )),
    adminCreateTeam: input => dispatch(adminCreateTeam(input)),

});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTeamPage);
