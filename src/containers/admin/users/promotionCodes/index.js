import { connect } from 'react-redux';
import { searchUserByEmail } from '../../../../store/actions/admin/courseRatings';
import {
    fetchCoupons, sendTestEmail, sendPromoCodes, sendPromoCodesNewUsers,
} from '../../../../store/actions/admin/promotionCodes';
import PromotionCodes from './PromotionCodes';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
    searchUserByEmail: input => dispatch(searchUserByEmail(input)),
    fetchCoupons: () => dispatch(fetchCoupons()),
    sendTestEmail: data => dispatch(sendTestEmail(data)),
    sendPromoCodes: data => dispatch(sendPromoCodes(data)),
    sendPromoCodesNewUsers: data => dispatch(sendPromoCodesNewUsers(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PromotionCodes);
