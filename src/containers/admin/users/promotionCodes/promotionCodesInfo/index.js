import { connect } from 'react-redux';
import { getPromotionCodesInfo, notifyByEmail } from '../../../../../store/actions/admin/promotionCodes';
import PromotionCodesInfo from './PromotionCodesInfo';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
    getPromotionCodesInfo: () => dispatch(getPromotionCodesInfo()),
    notifyByEmail: data => dispatch(notifyByEmail(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PromotionCodesInfo);
