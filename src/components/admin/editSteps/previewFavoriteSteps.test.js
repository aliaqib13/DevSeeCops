import React from 'react';
import { shallow } from 'enzyme';
import PreviewFavoriteSteps from './previewFavoriteSteps';

describe('PreviewFavoriteSteps', () => {
    let component; const
        props = {
            step: {
                contentBlocks: [

                ],
            },
        };
    beforeEach(() => {
        component = shallow(<PreviewFavoriteSteps {...props} />);
    });

    it('should render PreviewFavoriteSteps component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('should render chapters-container successfully', () => {
        const chaptersContainer = component.find('.chapters-container');
        expect(chaptersContainer.exists()).toBeTruthy();
    });
});
