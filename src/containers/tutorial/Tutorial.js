import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Button, Timeline, message, Typography,
} from 'antd';
import { fetchHelpData } from '../../store/actions/help';
import {
    BulletText, CodeSnippet, CopyField,
    GreyBox,
    HeartBox, Image, InfinityLoop,
    InformationBox,
    ParagraphTitle,
    SingleText,
    TitleBox,
    Video,
} from '../../components/blocks';
import './tutorial.scss';

const { Item } = Timeline;
const { Title } = Typography;

class Tutorial extends Component {
    constructor(props) {
        super(props);
        this.state = {

            currentStep: 0,
        };
    }

    componentDidMount() {
        const loader = message.loading('Loading..', 0);
        this.props.fetchHelpData().then(res => {
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
        const { data } = this.props.help;
        return (
            <div className='helpContainer'>
                {data.length > 0
                    ? (
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
                    )
                    : (
                        <div className="tutorial-heading">
                            <Title level={2} className="main-title">
                                Help
                            </Title>
                        </div>
                    )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        help: state.help,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchHelpData: () => dispatch(fetchHelpData()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Tutorial);
