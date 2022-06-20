import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Timeline, message } from 'antd';
import { fetchBetaTestInstructions } from '../../store/actions/betaTestInstructions';
import {
    BulletText, CodeSnippet, CopyField,
    GreyBox,
    HeartBox, Image, InfinityLoop,
    InformationBox,
    ParagraphTitle,
    SingleText,
    TitleBox, Video,
} from '../../components/blocks';
import './BetaTestInstructions.scss';

const { Item } = Timeline;

class BetaTestInstructions extends Component {
    constructor(props) {
        super(props);
        this.state = {

            currentStep: 0,
        };
    }

    componentDidMount() {
        const { fetchBetaTestInstructions } = this.props;
        const loader = message.loading('Loading..', 0);
        fetchBetaTestInstructions().then(res => {
            loader();
        });
    }

    __scrollToHead() {
        window.scrollTo({ top: this.state.collapsed ? 300 : 130, behavior: 'smooth' });
    }

    selectStep = index => {
        this.__scrollToHead();
        this.setState({
            currentStep: index,
        });
    }

    next = () => {
        const currentStep = this.state.currentStep + 1;
        window.scrollTo({ top: this.state.collapsed ? 300 : 130, behavior: 'smooth' });
        this.setState({ currentStep });
    }

    prev = () => {
        const currentStep = this.state.currentStep - 1;
        window.scrollTo({ top: this.state.collapsed ? 300 : 130, behavior: 'smooth' });
        this.setState({ currentStep });
    }

    render() {
        const { currentStep } = this.state;
        const { betaTest: { data } } = this.props;
        return (
            <div className='betaTestContainer'>
                {data.length > 0
                    && (
                        <div className="stepPageContent-wrapper">
                            <div className="stepsContainer">
                                <Timeline reverse={false} current={currentStep}>
                                    {data.map((item, key) => {
                                        if (currentStep > key) {
                                            return (
                                                <Item key={key} color="green" className="has-cursor step-item" onClick={() => this.selectStep(key)}>
                                                    {item.title}
                                                    {' '}
                                                </Item>
                                            );
                                        } if (currentStep === key) {
                                            return (
                                                <Item key={key} className="has-cursor step-item" onClick={() => this.selectStep(key)}>
                                                    {item.title}
                                                    {' '}
                                                </Item>
                                            );
                                        }
                                        return (
                                            <Item key={key} color="gray" className="has-cursor step-item" onClick={() => this.selectStep(key)}>
                                                {item.title}
                                                {' '}
                                            </Item>
                                        );
                                    })}
                                </Timeline>
                            </div>
                            <div className="contentContainer">
                                <div className="steps-content">
                                    {data[currentStep].contentBlocks.map((item, key) => (
                                        <div key={key}>
                                            { item.type === 'TitleBox' && <TitleBox content={item.content} /> }
                                            { item.type === 'BulletText' && <BulletText content={item.content} /> }
                                            { item.type === 'InformationBox' && <InformationBox content={item.content} /> }
                                            { item.type === 'ParagraphTitle' && <ParagraphTitle content={item.content} /> }
                                            { item.type === 'SingleText' && <SingleText content={item.content} /> }
                                            { item.type === 'GreyBox' && <GreyBox content={item.content} /> }
                                            { item.type === 'HeartBox' && <HeartBox content={item.content} /> }
                                            { item.type === 'InfinityLoop' && <InfinityLoop content={item.content} /> }
                                            { item.type === 'Image' && <Image content={item.content} /> }
                                            { item.type === 'Video' && <Video content={item.content} /> }
                                            { item.type === 'CodeSnippet' && <CodeSnippet content={item.content} /> }
                                            { item.type === 'CopyField' && <CopyField content={item.content} /> }
                                        </div>
                                    ))}
                                </div>
                                <div className="steps-action">
                                    {
                                        data.length === currentStep + 1
                                            ? ''
                                            : (
                                                <Button className='nav-button' onClick={() => this.next()} disabled={currentStep >= data.length - 1}>
                                                    Next
                                                </Button>
                                            )
                                    }
                                    <div className="stepsCount" data-id={currentStep}>
                                        {currentStep + 1}
                                        /
                                        {data.length}
                                    </div>
                                    <Button className='nav-button' onClick={() => this.prev()} disabled={currentStep <= 0}>
                                        Previous
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        betaTest: state.betaTest,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchBetaTestInstructions: () => dispatch(fetchBetaTestInstructions()),
    };
}

export { BetaTestInstructions };
export default connect(mapStateToProps, mapDispatchToProps)(BetaTestInstructions);
