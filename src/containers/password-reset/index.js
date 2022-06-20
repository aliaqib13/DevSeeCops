import { connect } from 'react-redux';
import { Form } from 'antd';
import { resetPassword } from '../../store/actions/auth';
import PasswordReset from './password-reset';

const mapDispatchToProps = dispatch => ({
    resetPassword: data => dispatch(resetPassword(data)),
});

export default connect(null, mapDispatchToProps)(Form.create({ name: 'activate_account' })(PasswordReset));
