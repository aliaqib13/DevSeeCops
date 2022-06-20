import React, { useState, useRef } from 'react';
import {
    Typography, Table, Tag, Statistic, Button, Modal,
} from 'antd';
import moment from 'moment';
import PreviewSteps from '../../../containers/admin/previewSteps/previewSteps';

const { Title } = Typography;
const { Column } = Table;
const { Countdown } = Statistic;

function ActiveLabs(props) {
    const [visible, setVisible] = useState(false);
    const [steps, setSteps] = useState([]);
    const [completed_steps, setCompletedSteps] = useState([]);
    const [failed_steps, setFailedSteps] = useState([]);
    const [current_step, setCurrentStep] = useState(0);
    const modal = useRef(null);

    const handlePreviewModal = record => {
        props.fetchStepsImages(record.activeCourse.course_id);
        const completed_failed_steps = record.completed_failed_steps ? JSON.parse(record.completed_failed_steps) : {};
        const completed_steps = completed_failed_steps.completed || [];
        const failed_steps = completed_failed_steps.failed || [];
        const steps = record.lab.step;
        const { selectedSteps } = record;
        if (selectedSteps && selectedSteps.length) {
            const item = selectedSteps.find(el => el.user_id === record.user_id);
            if (item) {
                setCurrentStep(item.lab_step);
            }
        }
        setSteps(steps);
        setCompletedSteps(completed_steps);
        setFailedSteps(failed_steps);
        setVisible(true);
    };

    const getLastCompletedStep = record => {
        const completed_failed_steps = record.completed_failed_steps ? JSON.parse(record.completed_failed_steps) : {};
        const completed_steps = completed_failed_steps.completed;
        if (completed_steps && completed_steps.length) {
            const max = Math.max(...completed_steps);
            return max + 1;
        }
        return 'None';
    };

    React.useEffect(() => {
        if (modal && modal.current) {
            modal.current.selectStep(current_step);
        }
    }, [visible, current_step]);

    React.useEffect(() => {
        if (modal && modal.current) {
            modal.current.setProgress(completed_steps, failed_steps);
        }
    }, [completed_steps, failed_steps]);

    const {
        labs, loading, pageSize, steps_images,
    } = props;
    return (
        <div className="active-lab-container">
            <div className="page-title">
                <Title>
                    Active Labs
                </Title>
            </div>
            {labs
                && (
                    <div>
                        <Table
                            loading={loading}
                            className="active-labs-table"
                            dataSource={labs.data}
                            rowKey={item => item.id}
                            onChange={props.paginate}
                            pagination={{
                                pagination: 'bottom',
                                current: props.currentPage,
                                pageSize,
                                total: labs.total,
                                defaultCurrent: 1,
                            }}
                        >
                            <Column
                                className="active-labs-row"
                                title="First Name"
                                render={(text, record) => (
                                    <div>
                                        <p>
                                            {record.user.firstname}
                                            {' '}
                                        </p>
                                    </div>
                                )}
                                key="fname"
                            />
                            <Column
                                className="active-labs-row"
                                title="Last Name"
                                render={(text, record) => (
                                    <div>
                                        <p>
                                            {record.user.lastname}
                                            {' '}
                                        </p>
                                    </div>
                                )}
                                key="lname"
                            />
                            <Column
                                className="active-labs-row"
                                title="Email"
                                render={(text, record) => (
                                    <div>
                                        <p>
                                            {record.user.email}
                                            {' '}
                                        </p>
                                    </div>
                                )}
                                key="email"
                            />
                            <Column
                                className="active-labs-row"
                                title="User Type"
                                render={(text, record) => (record.user.roles.map(item => (<Tag color="blue" key={item.id}>{item.name}</Tag>)))}
                                key="user_type"
                            />
                            <Column
                                className="active-labs-row"
                                title="Lab Started Time"
                                render={(text, record) => (
                                    moment(record.start_time).format('DD-MM-YYYY HH:mm:ss')
                                )}
                                key="lab_started"
                            />
                            <Column
                                className="active-labs-row"
                                title="Lab Name"
                                render={(text, record) => (record.lab.name)}
                                key="lab_name"
                            />
                            <Column
                                className="active-labs-row"
                                title="Current / Last completed Step"
                                render={(text, record) => (
                                    record.selectedSteps.map((item, key) => {
                                        if (item.user_id === record.user.id) {
                                            return (
                                                <div key={key}>
                                                    <p>
                                                        (
                                                        {item.lab_step + 1 }
                                                        ) / (
                                                        { getLastCompletedStep(record) }
                                                        )
                                                    </p>
                                                </div>
                                            );
                                        }
                                        return '';
                                    })
                                )}
                                key="current_lab_step"
                            />
                            <Column
                                className="active-labs-row"
                                title="Time Remaining"
                                render={(text, record) => {
                                    const deadline = record.lab_end_at - moment().unix();
                                    return (
                                        <Countdown className='labs-table-content-heading-timer' value={moment().add(deadline < 0 ? 0 : deadline, 'seconds')} />
                                    );
                                }}
                                key="time_to_left"
                            />
                            <Column
                                className="active-labs-row"
                                title="Progress"
                                render={(text, record) => (
                                    <Button onClick={() => handlePreviewModal(record)}>View</Button>
                                )}
                                key="alab_progress"
                            />

                        </Table>
                        <Modal
                            title="Progress"
                            className="preview-steps-modal"
                            visible={visible}
                            onCancel={() => setVisible(false)}
                            width="95%"
                            onOk={() => setVisible(false)}
                        >
                            <PreviewSteps
                                chapters={steps}
                                completed_steps={completed_steps}
                                failed_steps={failed_steps}
                                currentStep={current_step}
                                ref={modal}
                                steps_images={steps_images || []}
                            />
                        </Modal>
                    </div>
                )}
        </div>
    );
}

export default ActiveLabs;
