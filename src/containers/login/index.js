import { connect } from 'react-redux';
import Login from './login';
import { login, requestResetPassword } from '../../store/actions/auth';

const mapStateToProps = state => ({
    auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
    login: data => dispatch(login(data)),
    requestResetPassword: (email, recaptchaKey) => dispatch(requestResetPassword(email, recaptchaKey)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
