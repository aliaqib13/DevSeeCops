import { connect } from 'react-redux';
import { ChooseSubscription } from './choose-subscription';
import {
    getTokenSubscriptions, createSubscriptionCheckoutSession, getUserSubscriptionsInformation,
} from '../../store/actions/tokenSubscriptions';

function mapStateToProps(state) {
    return {
        tokenSubscriptionsInformation: state.tokenSubscriptions.tokenSubscriptionsInformation,
        userSubscription: state.auth.user.userSubscription,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getTokenSubscriptions: () => dispatch(getTokenSubscriptions()),
        createSubscriptionCheckoutSession: priceId => dispatch(createSubscriptionCheckoutSession(priceId)),
        getUserSubscriptionsInformation: () => dispatch(getUserSubscriptionsInformation()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseSubscription);
