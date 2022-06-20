import React from 'react';
import { shallow } from 'enzyme';
import PromotionCodesInfo from './PromotionCodesInfo';

const props = {
    getPromotionCodesInfo: jest.fn(() => Promise.resolve(true)),
};

const data = {
    unusedNotExpired: [
        {
            id: 4, coupon: 'Coup', coupon_id: '8pSJDhe9', promotion_code: 'TESTINGG', email: 'mihrantesting1@gmail.com', expiration_date: '2021-01-20T13:14:09.000Z', send: 0, created_at: '2021-01-07 16:18:27', updated_at: '2021-01-07 16:18:27', is_used: 0,
        },
    ],
    used: [
        {
            id: 1, coupon: 'TESTING', coupon_id: 'WR8elhxF', promotion_code: 'TEST41qrd5r', email: 'mihrantesting1@gmail.com', expiration_date: '2021-01-07T06:23:35.000Z', send: 0, created_at: '2020-12-30 16:10:41', updated_at: '2020-12-30 18:23:00', is_used: 1,
        },
        {
            id: 2, coupon: 'Coup', coupon_id: '8pSJDhe9', promotion_code: 'TEST5wx2tvo', email: 'mihrantesting1@gmail.com', expiration_date: '2021-01-05T12:17:47.000Z', send: 0, created_at: '2020-12-30 16:18:27', updated_at: '2020-12-30 16:18:27', is_used: 0,
        },
        {
            id: 3, coupon: 'Coup', coupon_id: '8pSJDhe9', promotion_code: 'TESTcs54e6n', email: 'henry@araido.io', expiration_date: '2021-01-05T12:17:47.000Z', send: 0, created_at: '2020-12-30 16:18:27', updated_at: '2020-12-30 16:18:27', is_used: 0,
        },
    ],
    expired: [
        {
            id: 1, coupon: 'TESTING', coupon_id: 'WR8elhxF', promotion_code: 'TEST41qrd5r', email: 'mihrantesting1@gmail.com', expiration_date: '2021-01-07T06:23:35.000Z', send: 0, created_at: '2020-12-30 16:10:41', updated_at: '2020-12-30 18:23:00', is_used: 1,
        },
        {
            id: 2, coupon: 'Coup', coupon_id: '8pSJDhe9', promotion_code: 'TEST5wx2tvo', email: 'mihrantesting1@gmail.com', expiration_date: '2021-01-05T12:17:47.000Z', send: 0, created_at: '2020-12-30 16:18:27', updated_at: '2020-12-30 16:18:27', is_used: 0,
        },
        {
            id: 3, coupon: 'Coup', coupon_id: '8pSJDhe9', promotion_code: 'TESTcs54e6n', email: 'henry@araido.io', expiration_date: '2021-01-05T12:17:47.000Z', send: 0, created_at: '2020-12-30 16:18:27', updated_at: '2020-12-30 16:18:27', is_used: 0,
        },
    ],
    total: 4,
};

const users = {};
users.data = data.used;
users.total = users.data.length;
users.perPage = 10;

describe('Promotion Codes Info', () => {
    let component;

    beforeEach(() => {
        component = shallow(<PromotionCodesInfo {...props} />);
        component.instance().setState({ users });
    });

    it('should render promo codes info component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('should render title component successfully', () => {
        const title = component.find('Title');
        expect(title.props().children).toEqual('Promotion Codes');
    });

    it('Should render table with the data', () => {
        const table = component.find('withStore(Table)').at(0);
        component.instance().setState({ data });
        expect(table.exists()).toBeTruthy();
        expect(table.props().dataSource.length).toEqual(3);
    });

    it('Should open render drawer', () => {
        const drawer = component.find('withConfigConsumer(Drawer)');
        const table = drawer.props().children[1].props;
        expect(drawer.props().title).toBe('Users');
        expect(table.dataSource).toBe(users.data);
    });
});
