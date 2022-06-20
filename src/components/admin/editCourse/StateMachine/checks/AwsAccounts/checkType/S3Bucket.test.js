import React from 'react';
import { shallow } from 'enzyme';
import S3Bucket from './S3Bucket';

const props = {
    configCheck: '',
    bucketPrefixRegex: '',
    handleInputChange: jest.fn(() => Promise.resolve(true)),
    handleConfigCheck: jest.fn(() => Promise.resolve(true)),
};

describe('S3Bucket Component', () => {
    let component;
    beforeEach(() => {
        component = shallow(<S3Bucket {...props} />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should render component successfully', () => {
        expect(component).toHaveLength(1);
    });

    it('Should render `bucketConfigCheck`  Container successfully', () => {
        const bucketConfigCheck = component.find('[data-testid="bucketConfigCheck-container"]');

        expect(bucketConfigCheck).toHaveLength(1);

        // bucketConfigCheck  Headings
        const bucketConfigCheckHeading = bucketConfigCheck.find('span').at(0);
        expect(bucketConfigCheckHeading.text()).toBe('Checking config');

        // bucketConfigCheck DropDown menu and options
        const bucketConfigCheckSelect = bucketConfigCheck.find('Select').at(0);
        const bucketConfigCheckOptions = bucketConfigCheckSelect.find('Option');

        expect(bucketConfigCheckSelect.props().name).toBe('configCheck');
        expect(bucketConfigCheckOptions.at(0).props().children).toBe('Select');
        expect(bucketConfigCheckOptions.at(1).props().value).toBe('contents');
        expect(bucketConfigCheckOptions.at(2).props().value).toBe('encryption');
        expect(bucketConfigCheckOptions.at(3).props().value).toBe('policy');
        expect(bucketConfigCheckOptions.at(4).props().value).toBe('versioning');
        expect(bucketConfigCheckOptions.at(5).props().value).toBe('logging');
        expect(bucketConfigCheckOptions.at(6).props().value).toBe('public-access-block');

        bucketConfigCheckSelect.props().onChange('policy');
        expect(props.handleConfigCheck).toHaveBeenCalledTimes(1);
        expect(props.handleConfigCheck).toHaveBeenCalledWith('policy');
    });

    it('Should render `bucketPrefixRegex`  Container successfully', () => {
        const bucketPrefixRegex = component.find('[data-testid="bucketPrefixRegex-container"]');

        expect(bucketPrefixRegex).toHaveLength(1);

        // bucketPrefixRegex Headings
        const bucketPrefixRegexHeading = bucketPrefixRegex.find('span').at(0);
        expect(bucketPrefixRegexHeading.text()).toBe('S3 Bucket Prefix Regex');

        // bucketPrefixRegex Input field
        const bucketPrefixRegexInput = bucketPrefixRegex.find('Input').at(0);
        expect(bucketPrefixRegexInput.props().name).toBe('bucketPrefixRegex');

        bucketPrefixRegexInput.props().onChange('test'); // change input
        expect(props.handleInputChange).toHaveBeenCalledTimes(1);
        expect(props.handleInputChange).toHaveBeenCalledWith('test');
    });
});
