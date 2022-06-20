import React from 'react';
import { shallow } from 'enzyme';
import mockedGA from 'react-ga';
import SectionParts from './SectionParts';

jest.mock('react-ga', () => ({
    event: jest.fn(),
}));

describe('SectionParts', () => {
    let component;
    beforeEach(() => {
        component = shallow(<SectionParts />);
    });

    it('should render SectionParts component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('should render HashLinks and fire correct GA events', () => {
        const hashLinkStructure = component.find('HashLink').at(0);
        hashLinkStructure.props().onClick();
        expect(mockedGA.event).toHaveBeenCalledWith({
            category: 'website_navigation',
            action: 'Accessed Dennis page',
            label: 'Clicked on structure',
        });

        const hashLinkCategories = component.find('HashLink').at(1);
        hashLinkCategories.props().onClick();
        expect(mockedGA.event).toHaveBeenCalledWith({
            category: 'website_navigation',
            action: 'Accessed Dennis page',
            label: 'Clicked on categories',
        });

        const hashLinkLearningpath = component.find('HashLink').at(2);
        hashLinkLearningpath.props().onClick();
        expect(mockedGA.event).toHaveBeenCalledWith({
            category: 'website_navigation',
            action: 'Accessed Dennis page',
            label: 'Clicked on learningpath',
        });

        const hashLinkCertification = component.find('HashLink').at(3);
        hashLinkCertification.props().onClick();
        expect(mockedGA.event).toHaveBeenCalledWith({
            category: 'website_navigation',
            action: 'Accessed Dennis page',
            label: 'Clicked on certification',
        });
    });
});
