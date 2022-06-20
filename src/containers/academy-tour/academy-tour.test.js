import React from 'react';
import { shallow } from 'enzyme';
import AcademyTour from './academy-tour';

const defaultProps = {
    user: { id: 4 },
    fetchIntroCourses: jest.fn(),
    getIntroductionCertificate: jest.fn().mockResolvedValue(false),
    fetchPublicIntroCourses: jest.fn(),
};

describe('academy-tour container', () => {
    beforeEach(() => {
        defaultProps.getIntroductionCertificate.mockClear();
        defaultProps.fetchIntroCourses.mockClear();
        defaultProps.fetchPublicIntroCourses.mockClear();
    });

    describe('componentWillMount', () => {
        it('componentWillMount() does not call getIntroductionCertificate if user.id not set', async () => {
            // Copy of the props with the user id removed
            const props = {
                ...defaultProps,
            };
            delete props.user;

            const testComponent = shallow(<AcademyTour {...props} />, { disableLifecycleMethods: true });
            const instance = testComponent.instance();
            await instance.componentWillMount();

            expect(defaultProps.getIntroductionCertificate).not.toHaveBeenCalled();
        });
        it('componentWillMount() calls getIntroductionCertificate if user.id is set', async () => {
            const testComponent = shallow(<AcademyTour {...defaultProps} />);
            const instance = testComponent.instance();
            await instance.componentWillMount();

            expect(defaultProps.getIntroductionCertificate).toHaveBeenCalledWith(defaultProps.user.id);
        });

        it('componentWillMount() calls fetchPublicIntroCourses if no user.id', async () => {
            const props = {
                ...defaultProps,
            };
            delete props.user;
            const testComponent = shallow(<AcademyTour {...props} />, { disableLifecycleMethods: true });
            const instance = testComponent.instance();
            await instance.componentWillMount();

            expect(defaultProps.fetchPublicIntroCourses).toHaveBeenCalled();
            expect(defaultProps.fetchIntroCourses).not.toHaveBeenCalled();
        });
        it('componentWillMount() calls fetchIntroCourses if there is a user id', async () => {
            const testComponent = shallow(<AcademyTour {...defaultProps} />, { disableLifecycleMethods: true });
            const instance = testComponent.instance();
            await instance.componentWillMount();

            expect(defaultProps.fetchIntroCourses).toHaveBeenCalled();
            expect(defaultProps.fetchPublicIntroCourses).not.toHaveBeenCalled();
        });
    });
});
