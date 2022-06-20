import React, { Component } from 'react';
import {
    Typography, Table, message, Icon, Avatar, Row, Col, Button, Modal,
} from 'antd';

import { connect } from 'react-redux';
import { getCurrentTokenBalance, getTokenWalletTransactions, claimWalletIntroductionToken } from '../../store/actions/tokenWallet';
import './token-wallet.scss';
import { CAMPAIGN_IDS } from '../../constants';

const { Text } = Typography;
const { Column } = Table;

class TokenWallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            loading: true,
            introductionWalletMode: false,
        };
    }

    componentDidMount() {
        const {
            getCurrentTokenBalance, getTokenWalletTransactions,
        } = this.props;

        return Promise.allSettled([
            getCurrentTokenBalance().then(res => {
                if (res !== true) {
                    message.error('Can`t load TokenWallet Balance');
                }
                this.setState({
                    loading: false,
                });
            }),
            getTokenWalletTransactions().then(res => {
                if (res !== true) {
                    message.error('Can`t load TokenWallet Transactions');
                }
                const { tokenWalletTransactions } = this.props;
                if (tokenWalletTransactions.data.length === 0) {
                    this.setState({
                        introductionWalletMode: true,
                    });
                }
                this.setState({
                    loading: false,

                });
            }),
        ]).catch(console.error);
    }

    handleReferFriend=() => {
        const { history } = this.props;
        history.push('/platform/edit-profile');
    }

    paginate = page => {
        const {
            getTokenWalletTransactions,
        } = this.props;

        this.setState({
            currentPage: page,
            loading: true,
        });

        return getTokenWalletTransactions(page).then(res => {
            if (res !== true) {
                message.error('Can`t load TokenWallet Transactions');
            }
            this.setState({
                loading: false,

            });
        });
    }

    referralsButton=() => {
        const {
            referrals, referralsCampaignActive,
        } = this.props;

        if (referralsCampaignActive // If the campaign is active
            || (referrals && referrals.data && referrals.data.length) // OR there are referrals
        ) {
            return (
                <div className="refer-friend">
                    <Button
                        onClick={this.handleReferFriend}
                        type="secondary"
                    >
                        Refer a friend
                    </Button>
                </div>
            );
        }
        return null;
    }

    handleIntroductionWalletModeClick = () => {
        const { claimWalletIntroductionToken, getCurrentTokenBalance, getTokenWalletTransactions } = this.props;
        return claimWalletIntroductionToken().then(res => {
            if (res !== true) {
                message.error('Can`t claim this offer, try again');
            }

            getCurrentTokenBalance();
            getTokenWalletTransactions();

            this.setState({
                introductionWalletMode: false,
            });
        });
    }

    render() {
        const { tokenBalance, tokenWalletTransactions } = this.props;
        const { currentPage, loading, introductionWalletMode } = this.state;
        return (

            <div className="token-wallet-container">
                <Row>
                    <Col span={12}>

                        <div className="wallet-balance-card">
                            <Avatar size={70} icon={<Icon type="wallet" />} />
                            <div className='balance-content'>
                                <Text strong>{tokenBalance}</Text>
                                <Text>Current Token Balance</Text>
                            </div>
                        </div>
                    </Col>

                    <Col span={12}>
                        {this.referralsButton()}

                    </Col>
                </Row>

                <Table
                    loading={loading}
                    dataSource={tokenWalletTransactions.data}
                    rowKey={item => item.id}
                    pagination={{
                        onChange: this.paginate,

                        position: 'bottom',
                        current: currentPage,
                        pageSize: tokenWalletTransactions.perPage,
                        total: tokenWalletTransactions.total,
                        currentDefault: 1,
                    }}
                    title={() => (<div className="table-title">Transaction Details</div>)}
                    className="table-container"
                >

                    <Column title="Amount" dataIndex="change" key="Amount" />
                    <Column title="Description" dataIndex="description" key="Description" />
                    <Column title="Date" dataIndex="created_at" key="Date" />

                </Table>

                <Modal
                    className='modal-container'
                    title="Welcome to your token's wallet"
                    visible={introductionWalletMode}
                    onOk={this.handleIntroductionWalletModeClick}

                    okText="Okay"
                    closable={false}

                    cancelButtonProps={{ style: { display: 'none' } }}
                >
                    <div className='token-introduction-mode'>

                        <h3>
                            <span>Hi!</span>
                            <span role="img" aria-label="Beaming Face with Smiling Eyes">&#128513;</span>
                        </h3>
                        <h4>Welcome to your token wallet page!</h4>
                        <p>It may look a little empty for now, but it'll hopefully fill up as we roll out new features!</p>
                        <p>
                            Tokens are our way of giving you choice: We'll be implementing various ways to obtain tokens that you can
                            redeem to cover all or part of the cost of a course.
                        </p>
                        <p>
                            Whenever you purchase a course on our platform, any tokens in your wallet will automatically be removed
                            from the amount you need to pay.
                        </p>
                        <h4>
                            For now, we'll give you a token so you can see what we mean: Simply click
                            {' '}
                            <strong>"Okay"</strong>
                            {' '}
                            below to claim it!
                        </h4>
                    </div>

                </Modal>

            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        tokenBalance: state.tokenWallet.tokenBalance,
        tokenWalletTransactions: state.tokenWallet.tokenWalletTransactions,
        referrals: state.referrals,
        referralsCampaignActive: !!state.campaigns[CAMPAIGN_IDS.referral]?.active,

    };
}

function mapDispatchToProps(dispatch) {
    return {

        getCurrentTokenBalance: () => dispatch(getCurrentTokenBalance()),
        getTokenWalletTransactions: page => dispatch(getTokenWalletTransactions(page)),
        claimWalletIntroductionToken: () => dispatch(claimWalletIntroductionToken()),
    };
}

export { TokenWallet };
export default connect(mapStateToProps, mapDispatchToProps)(TokenWallet);
