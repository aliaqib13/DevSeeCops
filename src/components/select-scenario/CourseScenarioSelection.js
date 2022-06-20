import React, { Component } from 'react';
import {
    Row, Col, Table, Button, Tooltip,
} from 'antd';
import './course-scenario-selection.scss';

const { Column } = Table;

class CourseScenarioSelection extends Component {
    createFromScenario = (scenario, category, object) => {
        const {
            goToDraftPage, setScenario, user, fellowName, notifyScenarioSelection, fellow_id,
        } = this.props;
        goToDraftPage('2');
        setScenario(scenario, category, object);
        notifyScenarioSelection({
            user_id: user.id, fellowName, scenario, fellow_id,
        });
    }

    render() {
        const { courseScenarios } = this.props;
        return (
            <div>
                <p className="select-course-scenario-tab-info">
                    On this page a list of course scenario’s is shown that have high priority for adding to the academy.
                    Choosing one of the scenarios will enable you to create a draft course page you can work out.
                    The other option is to start a new draft course page from scratch.
                </p>
                <Row>
                    <Col>
                        <Table dataSource={courseScenarios} pagination={false}>
                            <Column title="Course Scenario" render={(text, record, index) => record.title} />
                            <Column title="Category" render={(text, record, index) => record.category.name} />
                            <Column title="Object" render={(text, record, index) => record.object} />
                            <Column
                                title="Lab Building blocks"
                                render={(text, record, index) => (record.labBlockContent.length ? record.labBlockContent.map((item, index) => (
                                    <Tooltip title={item.description}>
                                        {item.title}
                                        {(index >= record.labBlockContent.length - 1) ? '' : ', '}
                                    </Tooltip>
                                )) : 'Does not exist')}
                            />
                            <Column
                                title="Action"
                                render={(text, record, index) => (
                                    <Button onClick={
                                        () => this.createFromScenario(record.title, record.category.name, record.object)
                                    }
                                    >
                                        Choose and Create
                                    </Button>
                                )}
                            />
                        </Table>
                    </Col>
                </Row>
                <Row>
                    <Button
                        type="primary"
                        style={{ marginTop: '15px' }}
                        onClick={() => this.createFromScenario('', '', '')}
                    >
                        Create From Scratch
                    </Button>
                </Row>
            </div>
        );
    }
}

export default CourseScenarioSelection;
