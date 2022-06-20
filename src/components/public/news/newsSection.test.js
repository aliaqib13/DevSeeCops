import React from 'react';
import { shallow } from 'enzyme';
import { NewsSection } from './newsSection';

describe('NewsSection', () => {
    it('.goSinglePage encodes any special characters in the news item.slug', () => {
        const props = {
            history: { push: jest.fn() },
        };

        const slug = 'SomeSlug&with?special++characters';
        const expectedEncodedValue = encodeURIComponent(slug);

        const component = shallow(<NewsSection {...props} />, { disableLifecycleMethods: true });
        const instance = component.instance();
        // Call the function
        instance.goSinglePage({ slug });

        // Check history.push was called with correct value:
        expect(props.history.push).toHaveBeenCalledWith(`/news/post/${expectedEncodedValue}`);
    });
});
