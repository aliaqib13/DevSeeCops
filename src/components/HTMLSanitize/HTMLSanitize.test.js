import React from 'react';
import { shallow } from 'enzyme';
import HTMLSanitize from './HTMLSanitize';

describe('<HTMLSanitize />', () => {
    it('HTMLSanitize renders the given html', () => {
        const divId = 'aDiv';
        const spanId = 'aSpan';
        const text = 'MyText';

        const innerHtml = `<div class="${divId}"><span id="${spanId}">${text}</span></div>`;
        // Create the component
        const component = shallow(<HTMLSanitize content={innerHtml} />);

        // Check the html was passed through correctly (wrapped in a div)
        expect(component.html()).toBe(`<div>${innerHtml}</div>`);
    });

    // Test examples taken from NPM docs
    it('Cleansup any various XSS attempts', () => {
        const tests = [
            '<img src=x onerror=alert(1)//>',
            '<svg><g/onload=alert(2)//<p>',
            '<p>abc<iframe//src=jAva&Tab;script:alert(3)>def</p>',
            '<math><mi//xlink:href="data:x,<script>alert(4)</script>">',
            '<TABLE><tr><td>HELLO</tr></TABL>',
            '<UL><li><A HREF=//google.com>click</UL>',
            '<a href="http://google.com" target="_blank">Some link</a>',
        ];

        const results = [
            '<img src="x">',
            '<svg><g></g></svg>',
            '<p>abc</p>',
            '<math><mi></mi></math>',
            '<table><tbody><tr><td>HELLO</td></tr></tbody></table>',
            '<ul><li><a href="//google.com" target="_self">click</a></li></ul>',
            '<a href="http://google.com" target="_blank" rel="noopener">Some link</a>',
        ];

        tests.forEach((test, i) => {
            const component = shallow(<HTMLSanitize content={test} />);

            // If we convert the result to HTML, it should be the same as the expected:
            expect(component.html()).toEqual(`<div>${results[i]}</div>`); // the output is wrapped in a div
        });
    });
});
