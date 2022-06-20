import React from 'react';
import { shallow } from 'enzyme';
import FaqTab from './index';

const event = { preventDefault: () => {}, stopPropagation: () => {} };

describe('FaqTab', () => {
    let component;
    const props = {
        faq: [
            {
                question: 'test1',
                answer: 'testing1',
            },
            {
                question: 'test2',
                answer: 'testing2',
            },
        ],
    };

    beforeEach(() => {
        component = shallow(<FaqTab {...props} />);
    });

    it('should render FaqTab component successfully', () => {
        expect(component).toHaveLength(1);
    });

    it('Should render `Add` button successfully', () => {
        const addButton = component.find('.add-btn');

        expect(addButton).toHaveLength(1);
        expect(addButton.props().htmlType).toBe('button');
    });

    it('Should render `addModal` when `add` button is clicked successfully', () => {
        const addButton = component.find('.add-btn');
        const addModal = component.find('Modal[title="Add FAQ"]');

        expect(addModal.props().visible).toBe(false);
        expect(component.state().faqModal).toBe(false);

        addButton.props().onClick(event);

        expect(component.state().faqModal).toBe(true);
        expect(component.find('Modal[title="Add FAQ"]').props().visible).toBe(true);
    });

    it('Should update `editFaq` state when date is entered in the `add Modal` text fields ', () => {
        const addModal = component.find('Modal[title="Add FAQ"]');
        const questionTextArea = addModal.find('TextArea').at(0);
        const answerTextArea = addModal.find('TextArea').at(1);

        expect(component.state().editFaq.question).toBe('');
        expect(component.state().editFaq.answer).toBe('');

        questionTextArea.props().onChange({ target: { name: 'question', value: 'question test' } });
        answerTextArea.props().onChange({ target: { name: 'answer', value: 'answer test' } });

        expect(component.state().editFaq.question).toBe('question test');
        expect(component.state().editFaq.answer).toBe('answer test');
    });

    it('Should render `faq` questions and answers successfully', () => {
        const faq = component.find('CollapsePanel');
        expect(faq).toHaveLength(props.faq.length);

        expect(faq.at(0).props().header).toBe(props.faq[0].question);
        expect(faq.at(0).props().children.props.children).toBe(props.faq[0].answer);

        // Render Edit & Delete buttons
        expect(faq.at(0).props().extra.props.children[0].props.type).toBe('edit');
        expect(faq.at(0).props().extra.props.children[1].props.type).toBe('delete');
    });

    it('Should be able to remove `faq` successfully', () => {
        const spy = jest.spyOn(component.instance(), 'delete');

        const faq = component.find('CollapsePanel').at(0);
        faq.props().extra.props.children[1].props.onClick(event);
        expect(spy).toHaveBeenCalled();
    });

    it('Should be able to edit `faq` successfully', () => {
        const spy = jest.spyOn(component.instance(), 'openModal');
        const faq = component.find('CollapsePanel').at(0);
        faq.props().extra.props.children[0].props.onClick(event);
        expect(spy).toHaveBeenCalled();
    });
});
