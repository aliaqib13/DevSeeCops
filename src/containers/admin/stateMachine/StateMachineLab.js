import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Affix } from 'antd';
import StateMachine from '../../../components/admin/editCourse/StateMachine/StateMachine';
import StateMachineConfig from '../../../components/admin/editCourse/StateMachine/StateMachineConfig';
import StateMachineFiles from '../../../components/admin/editCourse/StateMachine/StateMachineFiles';
import StateMachineEscapeRegex from '../../../components/admin/editCourse/StateMachine/StateMachineEscapeRegex';
import {
    saveStateMachine, getStateMachine, saveStateMachineConfig,
    getStateMachineConfig, saveStateMachineFiles, getStateMachineFiles,
    deleteAllStateMachineFiles,
} from '../../../store/actions/admin/course';
import Loading from '../../../components/Loading/Loading';

const { TabPane } = Tabs;

class StateMachineLab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            config: {},
            dataFiles: {},
            loading: false,
            loadingConfig: false,
            loadingFiles: false,
            activeTab: '1',
            events: [],
        };
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.setState({ loading: true });
        this.props.getStateMachine(id).then(res => {
            if (res) {
                const { events } = this.state;
                Object.keys(res).forEach(key => {
                    if (typeof res[key] === 'object' && res[key].event) {
                        events.push(res[key].event);
                    }
                });
                this.setState({ data: res, loading: false, events });
            }
        });
        this.setState({ loadingConfig: true });
        this.props.getStateMachineConfig(id).then(res => {
            if (res) {
                this.setState({ config: res, loadingConfig: false });
            }
        });

        this.props.getStateMachineFiles(id).then(res => {
            if (res) {
                this.setState({ dataFiles: res, loadingFiles: false });
            }
        });
    }

    changeTab = key => {
        this.setState({
            activeTab: `${key}`,
        });
    }

    render() {
        const { id } = this.props.match.params;
        const {
            data, loading, events, config, loadingConfig, dataFiles, loadingFiles,
        } = this.state;
        return (
            !loading && !loadingConfig && !loadingFiles
                ? (
                    <div className="editCourseContainer">
                        <Affix offsetTop={64}>
                            <div className="categoryName">
                                <h1>
                                    State Machine for lab
                                    {id}
                                </h1>
                            </div>
                        </Affix>
                        <div className="tabsContainer">
                            <Tabs activeKey={this.state.activeTab} onChange={key => this.changeTab(key)}>
                                <TabPane tab="State Machine" key="1">
                                    <StateMachine saveStateMachine={this.props.saveStateMachine} id={id} data={data} />
                                </TabPane>
                                <TabPane tab="Config" key="2">
                                    <StateMachineConfig
                                        saveStateMachineConfig={this.props.saveStateMachineConfig}
                                        id={id}
                                        events={events}
                                        config={config}
                                    />
                                </TabPane>
                                <TabPane tab="Upload Files" key="3">
                                    <StateMachineFiles
                                        saveStateMachineFiles={this.props.saveStateMachineFiles}
                                        deleteAllStateMachineFiles={this.props.deleteAllStateMachineFiles}
                                        id={id}
                                        data={dataFiles}
                                    />
                                </TabPane>
                                <TabPane tab="Escape Regex" key="4">
                                    <StateMachineEscapeRegex />
                                </TabPane>
                            </Tabs>

                        </div>
                    </div>
                )
                : <Loading />
        );
    }
}

function mapStateToProps() {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return {
        saveStateMachine: data => dispatch(saveStateMachine(data)),
        saveStateMachineConfig: data => dispatch(saveStateMachineConfig(data)),
        saveStateMachineFiles: data => dispatch(saveStateMachineFiles(data)),
        getStateMachine: lab_id => dispatch(getStateMachine(lab_id)),
        getStateMachineConfig: lab_id => dispatch(getStateMachineConfig(lab_id)),
        getStateMachineFiles: lab_id => dispatch(getStateMachineFiles(lab_id)),
        deleteAllStateMachineFiles: lab_id => dispatch(deleteAllStateMachineFiles(lab_id)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StateMachineLab);
