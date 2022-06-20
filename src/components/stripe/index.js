import { connect } from 'react-redux';
import PaymentModal from './PaymentModal';
import { checkCustomer, verifyCoupon, payCourse } from '../../store/actions/coursePayment';
import { getCurrentTokenBalance } from '../../store/actions/tokenWallet';
import { CAMPAIGN_IDS } from '../../constants';

const mapStateToProps = state => ({
    buyOneGetOneFreeCampaign: state.campaigns[CAMPAIGN_IDS.buyOneGetOneFree],
    tokenBalance: state.tokenWallet.tokenBalance,
    course: state.course,
    user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
    checkCustomer: () => dispatch(checkCustomer()),
    verifyCoupon: couponName => dispatch(verifyCoupon(couponName)),
    payCourse: data => dispatch(payCourse(data)),
    getCurrentTokenBalance: () => dispatch(getCurrentTokenBalance()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentModal);
