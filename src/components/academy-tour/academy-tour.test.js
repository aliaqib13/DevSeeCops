import React from 'react';
import { shallow } from 'enzyme';
import { AcademyTourView } from './academy-tour';

jest.mock('react-ga', () => ({
    event: jest.fn(),
}));

const props = {
    introCourses: [{
        id: 1,
        title: 'Secrets Management for your applications',
        description: 'Storing & managing your application secrets in a safe way by using HashiCorp Vault',
        category_id: 1,
        category: {
            id: 1, name: 'Secrets Management', created_at: null, updated_at: null, description: 'test desc',
        },
    }, {
        id: 2,
        title: 'Secrets Management for your applications Test1',
        description: 'Storing & managing your application secrets in a safe way by using HashiCorp Vault',
        category_id: 11,
        category: {
            id: 11, name: 'Serverless Security', created_at: null, updated_at: null, description: 'test desc',
        },
    }, {
        id: 3,
        title: 'Secrets Management for your applications Test2',
        description: 'Storing & managing your application secrets in a safe way by using HashiCorp Vault',
        category_id: 4,
        category: {
            id: 4,
            name: 'Cloud Security',
            created_at: null,
            updated_at: null,
            description: 'test descasdasd asd asdsd f dfg sdf gsdfg sdfg sdfg sdfg sdfg dsfg sdfg dfg dsfg sdfg sdfg s',
        },
    }, {
        id: 11,
        title: 'Threat Modeling for containers',
        description: 'Threat modeling for containers',
        category_id: 5,
        category: {
            id: 5, name: 'Threat Modeling', created_at: null, updated_at: null,
        },
    }, {
        id: 15,
        title: 'Mobile Security',
        description: 'Mobile Security',
        category_id: 9,
        category: {
            id: 9, name: 'Mobile Security', created_at: null, updated_at: null,
        },
    }],
    userDidIntroductions: true,
    history: { push: jest.fn(() => Promise.resolve(true)) },
    createActiveIntroductionCourse: jest.fn(() => Promise.resolve(true)),
    certificate: {
        badge: 'https://atp-resources-dev-testing',
        lab_name: 'Secrets Management in Kubernetes',
        platform: 'Azure',
        difficulty: 'V1.0.0 Advanced',
        created_at: 'created_at',
        uuid: '3111ed91-caf7-4b36-83f2-c3d5fc8b0f3d',
    },
    downloadCertificate: jest.fn(),
    notifyViaSlack: jest.fn(),
};

describe('AcademyTour', () => {
    let component;

    beforeEach(() => {
        component = shallow(<AcademyTourView {...props} />);
    });

    it('Should render AcademyTour successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('Should not render academy-tour if introCourses does not exist', () => {
        const propsNotValid = {
            introCourses: null,
            userDidIntroductions: true,
        };
        const emptyComponent = shallow(<AcademyTourView {...propsNotValid} />);
        const container = emptyComponent.find('.academy-tour');
        expect(emptyComponent.props().children[0]).toBe('');
        expect(container.children().length).toBe(0);
    });

    it('Should render the children', () => {
        const container = component.find('.academy-tour');
        const imgCont = container.props().children[0];
        expect(imgCont.props.children.type).toBe('img');

        const svgCont = container.props().children[1];
        expect(svgCont.props.children.type).toBe('svg');
    });

    it('Should manage to click to the icon', () => {
        const icon = component.find('.icon_active').at(0);
        icon.props().onClick();
    });

    it('Should change the active category after hovering the icon', () => {
        const icon1 = component.find('.icon_active').at(0);
        const icon2 = component.find('.icon_active').at(1);
        const icon3 = component.find('.icon_active').at(2);
        const icon4 = component.find('.icon_active').at(3);
        const icon5 = component.find('.icon_active').at(4);
        expect(component.instance().state.activeCategory).toBe('');
        icon1.props().onMouseEnter();
        expect(component.instance().state.activeCategory).toBe(props.introCourses[1].category.id);
        icon2.props().onMouseEnter();
        expect(component.instance().state.activeCategory).toBe(props.introCourses[0].category.id);
        icon3.props().onMouseEnter();
        expect(component.instance().state.activeCategory).toBe(props.introCourses[2].category.id);
        icon4.props().onMouseEnter();
        expect(component.instance().state.activeCategory).toBe(props.introCourses[4].category.id);
        icon5.props().onMouseEnter();
        expect(component.instance().state.activeCategory).toBe(props.introCourses[3].category.id);
        icon5.props().onMouseLeave();
    });

    it('Should not render certificate modal if props certificate is null', () => {
        component.setProps({ certificate: null });
        const modal = component.find('Modal');
        const certImage = modal.find('.certificate-img');
        expect(modal.exists()).toBe(false);
        expect(certImage.exists()).toBe(false);
    });

    it('Should work generateStringOnTags method successfully', () => {
        const mockGenerateStringOnTags = component.instance().generateStringOnTags;
        const shortText = 'short text';
        const longText = 'testing long text and change max letters count';
        const short = mockGenerateStringOnTags(shortText, 10);
        const longWithMax15 = mockGenerateStringOnTags(longText, 15);
        const longWithMax45 = mockGenerateStringOnTags(longText, 45);
        expect(short.length).toBe(1);
        expect(longWithMax15.length).toBe(4);
        expect(longWithMax45.length).toBe(2);
        expect(JSON.stringify(short)).toBe(JSON.stringify([shortText]));
        expect(JSON.stringify(longWithMax15)).toBe(
            JSON.stringify(
                ['testing long', 'text and change', 'max letters', 'count'],
            ),
        );
        expect(JSON.stringify(longWithMax45)).toBe(
            JSON.stringify(
                ['testing long text and change max letters', 'count'],
            ),
        );
    });

    describe('.getCategoryTitle', () => {
        it('it return empty string when is not introCourses', async () => {
            const testProps = {
                introCourses: [],
            };
            // Create an instance
            const instance = shallow(<AcademyTourView {...testProps} />).instance();
            // Call the function:
            const res = await instance.getCategoryTitle();
            expect(res).toBe('');
        });
        it('it return empty string when is not find course', async () => {
            const testProps = {
                introCourses: [{ id: 'wrong-id', category: { id: 'wrong-id' } }],
            };
            // Create an instance
            const instance = shallow(<AcademyTourView {...testProps} />).instance();
            // Call the function:
            const res = await instance.getCategoryTitle();
            expect(res).toBe('');
        });
    });
});
