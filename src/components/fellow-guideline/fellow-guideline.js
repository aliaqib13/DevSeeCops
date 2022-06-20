import React, { Component } from 'react';
import { Button, Timeline } from 'antd';
import {
    TitleBox, InformationBox,
    BulletText, ParagraphTitle,
    SingleText, GreyBox, HeartBox,
    CodeSnippet, Video, Image,
    InfinityLoop, CopyField,
} from '../blocks';

const { Item } = Timeline;

export default class FellowGuideline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStep: 0,
        };
    }

    selectStep = index => {
        this.__scrollToHead();
        this.setState({
            currentStep: index,
        });
    }

    next = () => {
        const { collapsed } = this.state;
        window.scrollTo({ top: collapsed ? 300 : 130, behavior: 'smooth' });
        this.setState(prevState => ({ currentStep: prevState.currentStep + 1 }));
    }

    prev = () => {
        const { collapsed } = this.state;
        window.scrollTo({ top: collapsed ? 300 : 130, behavior: 'smooth' });
        this.setState(prevState => ({ currentStep: prevState.currentStep - 1 }));
    }

    __scrollToHead() {
        const { collapsed } = this.state;
        window.scrollTo({ top: collapsed ? 300 : 130, behavior: 'smooth' });
    }

    render() {
        const { chapters } = this.props;
        const { currentStep } = this.state;
        return (
            <div className='stepPageContent'>
                {chapters.length > 0
                && (
                    <div className="stepPageContent-wrapper">
                        <div className="stepsContainer">
                            <Timeline reverse={false} current={currentStep}>
                                {chapters.map((item, index) => {
                                    // Determine the colour:
                                    let color;
                                    if (currentStep > index) color = 'green';
                                    if (currentStep !== index) color = 'gray';

                                    return (
                                        <Item
                                            key={item.title}
                                            color={color}
                                            className="has-cursor step-item"
                                            onClick={() => this.selectStep(index)}
                                        >
                                            {item.title}
                                            {' '}
                                        </Item>
                                    );
                                })}
                            </Timeline>
                        </div>
                        <div className="contentContainer">
                            <div className="steps-content">
                                {chapters[currentStep].contentBlocks.map((item, key) => (
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
                                    chapters.length === currentStep + 1
                                        ? ''
                                        : (
                                            <Button className='nav-button' onClick={() => this.next()} disabled={currentStep >= chapters.length - 1}>
                                                Next
                                            </Button>
                                        )
                                }
                                <div className="stepsCount" data-id={currentStep}>
                                    {currentStep + 1}
                                    /
                                    {chapters.length}
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
