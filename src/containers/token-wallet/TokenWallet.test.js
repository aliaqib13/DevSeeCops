import React from 'react';
import { shallow } from 'enzyme';
import { TokenWallet } from './TokenWallet';

const props = {
    tokenBalance: 20,
    tokenWalletTransactions: {
        data: [
            {
                id: 3, wallet_id: 2, description: 'Adding 5 Tokens to the wallet', change: 5, created_at: '2021-11-17 15:25:30',
            },
            {
                id: 4, wallet_id: 2, description: 'Purchase Course test', change: -5, created_at: '2021-11-17 16:25:30',
            },
        ],
        lastPage: 2,
        page: 2,
        perPage: 25,
        total: 3,

    },
    getCurrentTokenBalance: jest.fn(() => Promise.resolve(true)),
    getTokenWalletTransactions: jest.fn(() => Promise.resolve(true)),
    history: { push: jest.fn(() => Promise.resolve(true)) },
    referrals: { data: [] },
    referralsCampaignActive: true,

};
describe('TokenWallet', () => {
    let component;

    beforeEach(() => {
        component = shallow(<TokenWallet {...props} />);
    });

    it('Should render TokenWallet Component successfully', () => {
        expect(component).toHaveLength(1);
    });

    it('Should Call `getCurrentTokenBalance` and `getTokenWalletTransactions` methods when componentDidMount', () => {
        // Arrange
        const propsTest = {
            tokenBalance: 20,
            tokenWalletTransactions: {
                data: [
                    {
                        id: 3, wallet_id: 2, description: 'Adding 5 Tokens to the wallet', change: 5, created_at: '2021-11-17 15:25:30',
                    },
                ],
                lastPage: 2,
                page: 2,
                perPage: 25,
                total: 3,

            },
            getCurrentTokenBalance: jest.fn(() => Promise.resolve(true)),
            getTokenWalletTransactions: jest.fn(() => Promise.resolve(true)),
            history: { push: jest.fn(() => Promise.resolve(true)) },

        };
        const componentTest = shallow(<TokenWallet {...propsTest} />, { disableLifecycleMethods: true });

        expect(propsTest.getCurrentTokenBalance).not.toHaveBeenCalled();
        expect(propsTest.getTokenWalletTransactions).not.toHaveBeenCalled();

        // Act
        const instance = componentTest.instance();
        instance.componentDidMount();

        // Assert
        expect(propsTest.getCurrentTokenBalance).toHaveBeenCalled();
        expect(propsTest.getTokenWalletTransactions).toHaveBeenCalled();
    });

    it('Should not show the "Introduction to Token wallet" Modal when the `introductionWalletMode` state is false', () => {
        // Arrange
        component.setState({
            introductionWalletMode: false,
        });

        expect(component.find('.modal-container').props().visible).toBe(false);
    });

    it('Should show the "Introduction to Token wallet" Modal when the `introductionWalletMode` state is true', () => {
        // Arrange
        component.setState({
            introductionWalletMode: true,
        });

        const introModal = component.find('.modal-container');

        expect(introModal).toHaveLength(1);
        expect(introModal.props().visible).toBe(true);
    });

    it('Should render `introductionWallet` Modal elements', () => {
        // Arrange
        component.setState({
            introductionWalletMode: true,
        });
        const introModal = component.find('.modal-container').props();
        expect(introModal.title).toBe("Welcome to your token's wallet");
        expect(introModal.okText).toBe('Okay');

        const introModalElements = component.find('.token-introduction-mode');
        expect(introModalElements.find('h3').text()).toBe('Hi!😁');
        expect(introModalElements.find('h4').at(0).text()).toBe('Welcome to your token wallet page!');
        expect(introModalElements.find('p').at(0).text()).toBe("It may look a little empty for now, but it'll hopefully fill up as we roll out new features!");
        expect(introModalElements.find('p').at(1).text()).toBe("Tokens are our way of giving you choice: We'll be implementing various ways to obtain tokens that you can redeem to cover all or part of the cost of a course.");
        expect(introModalElements.find('p').at(2).text()).toBe('Whenever you purchase a course on our platform, any tokens in your wallet will automatically be removed from the amount you need to pay.');
        expect(introModalElements.find('h4').at(1).text()).toBe("For now, we'll give you a token so you can see what we mean: Simply click \"Okay\" below to claim it!");
    });

    it('Should Call `claimWalletIntroductionToken` along with `getCurrentTokenBalance` and `getTokenWalletTransactions` When click on `Okay` in `introductionWallet` Modal', () => {
        // Arrange
        const propsTest = {
            tokenBalance: 0,
            tokenWalletTransactions: {
                data: [],
            },
            getCurrentTokenBalance: jest.fn(() => Promise.resolve(true)),
            getTokenWalletTransactions: jest.fn(() => Promise.resolve(true)),
            claimWalletIntroductionToken: jest.fn(() => Promise.resolve(true)),
            history: { push: jest.fn(() => Promise.resolve(true)) },

        };
        const componentTest = shallow(<TokenWallet {...propsTest} />);

        componentTest.setState({
            introductionWalletMode: true,
        });

        const introModal = componentTest.find('.modal-container').at(0).props();

        // Act
        introModal.onOk();

        // Assert
        expect(propsTest.claimWalletIntroductionToken).toHaveBeenCalledTimes(1);
        expect(propsTest.getCurrentTokenBalance).toHaveBeenCalledTimes(1);
        expect(propsTest.getCurrentTokenBalance).toHaveBeenCalledTimes(1);
    });

    it('Should render the the `walletBalanceCard` successfully', () => {
        const walletCard = component.find('.wallet-balance-card');
        expect(walletCard).toHaveLength(1);

        const walletAvatar = walletCard.find('Avatar');
        expect(walletAvatar.props().icon.props.type).toBe('wallet');

        const tokenBalance = walletCard.find('Text').at(0);
        expect(tokenBalance.props().strong).toBe(true);
        expect(tokenBalance.props().children).toBe(props.tokenBalance);

        const tokenBalanceText = walletCard.find('Text').at(1);
        expect(tokenBalanceText.props().children).toBe('Current Token Balance');
    });

    it('Should render `refer-friend` button  successfully', () => {
        const referFriend = component.find('.refer-friend').find('Button');

        expect(referFriend).toHaveLength(1);
        expect(referFriend.props().children).toBe('Refer a friend');
    });

    it('Should not render `refer-friend` button if there is no `referral` campaign ', () => {
        component.setProps({ referralsCampaignActive: false });

        const referFriend = component.find('.refer-friend').find('Button');

        expect(referFriend).toHaveLength(0);
    });

    it('Should call `handleReferFriend` method  when `referFriend` button is clicked', () => {
        const referFriend = component.find('.refer-friend').find('Button');
        const historySpy = jest.spyOn(props.history, 'push');

        referFriend.simulate('click');

        expect(historySpy).toHaveBeenCalledTimes(1);
        expect(historySpy).toHaveBeenCalledWith('/platform/edit-profile');
    });

    it('Should render `Transaction Details` Table successfully', () => {
        const transactionsTable = component.find('.table-container');
        expect(transactionsTable).toHaveLength(1);
    });

    it('Should render `Transaction Details` Title successfully', () => {
        const transactionsTable = component.find('.table-container');
        expect(transactionsTable.props().title().props.children).toBe('Transaction Details');
    });

    it('Should `Transaction Details` Table Rows be equal to the fetched Data', () => {
        const transactionsTable = component.find('.table-container');
        expect(transactionsTable.props().dataSource).toStrictEqual(props.tokenWalletTransactions.data);
    });

    it("Should render `Transaction Details` Table's Columns' title ", () => {
        const transactionsTableColumns = component.find('.table-container').find('Column');
        expect(transactionsTableColumns.at(0).props().title).toBe('Amount');
        expect(transactionsTableColumns.at(0).props().dataIndex).toBe('change');

        expect(transactionsTableColumns.at(1).props().title).toBe('Description');
        expect(transactionsTableColumns.at(1).props().dataIndex).toBe('description');

        expect(transactionsTableColumns.at(2).props().title).toBe('Date');
        expect(transactionsTableColumns.at(2).props().dataIndex).toBe('created_at');
    });

    it('Should render `Transaction Details` and call `Paginate` method when user paginate', () => {
        const transactionTable = component.find('.table-container');
        const paginateSpy = jest.spyOn(props, 'getTokenWalletTransactions');

        expect(component.state().currentPage).toBe(1);

        transactionTable.props().pagination.onChange(5);

        expect(paginateSpy).toHaveBeenCalled();
        expect(component.state().currentPage).toBe(5);
    });
});
