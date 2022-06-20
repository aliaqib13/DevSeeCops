import React from 'react';
import { shallow } from 'enzyme';
import { message } from 'antd';

import ActiveLabs from './activeLabs';

jest.mock('antd', () => {
    const antd = jest.requireActual('antd');
    const messageANTD = {
        ...antd.message,
        loading: jest.fn().mockReturnValue(() => {}),
        error: jest.fn(),
    };
    return {
        ...antd,
        message: messageANTD,
    };
});

describe('<ActiveLabs /> normal operation', () => {
    const props = {
        adminActiveLabsHistory: {
            activeLabs: {},
        },
        fetchActiveLabs: jest.fn(() => Promise.resolve(true)),
    };

    let component;
    beforeEach(() => {
        component = shallow(<ActiveLabs {...props} />);
    });

    afterEach(() => {
        jest.clearAllMocks();
        jest.useRealTimers();
    });

    const { fetchActiveLabs } = props;

    it('should render successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('calls fetchActiveLabs() on mount', async () => {
        expect(fetchActiveLabs).toHaveBeenCalledTimes(1);
    });

    it('calls fetchActiveLabs() requesting a new page', async () => {
        const page = {
            current: 2,
        };
        const instance = component.instance();
        instance.paginate(page);

        expect(fetchActiveLabs).toHaveBeenCalledTimes(2); // Once on mount, once for the pagination
        expect(fetchActiveLabs).toHaveBeenCalledWith(2, 10);
    });

    it('updates activeLabs after 5 seconds with fetchActiveLabs()', async () => {
        jest.useFakeTimers();
        component.instance().__setActiveLabInterval();
        jest.advanceTimersByTime(10000);

        expect(fetchActiveLabs).toHaveBeenCalledTimes(3); // On mount and 2 updates
    });
});

describe('<ActiveLabs /> failed operation', () => {
    const props = {
        adminActiveLabsHistory: {
            activeLabs: {},
        },
        fetchActiveLabs: jest.fn(() => Promise.resolve({ message: 'Something went wrong, please try again' })),
    };

    let component;
    beforeEach(() => {
        component = shallow(<ActiveLabs {...props} />, { disableLifecycleMethods: true });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('fetchActiveLabs() calls message.error when promise returns without res', async () => {
        const err = { message: 'Something went wrong, please try again' };

        // fetchActiveLabs() is called on mount, so we are calling the `componentDidMount` instance ourselves.
        const instance = component.instance();
        await instance.componentDidMount();

        expect(message.loading).toHaveBeenCalledWith('Loading..', 0);
        expect(message.error).toHaveBeenCalledWith(err.message);
    });
});
