import React, { Component } from 'react';
import {
    Modal, Collapse, message, notification,
} from 'antd';
import HTMLSanitize from '../../HTMLSanitize/HTMLSanitize';

const { Panel } = Collapse;

export default class DropdownHint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            checkHint: false,
            activeKey: null,
            hintText: '',
            adminCheck: false,
            currentRememberToken: '',
        };
    }

    componentDidMount() {
        let { hintIsOpen, content, getHintMessage } = this.props;
        hintIsOpen = hintIsOpen || {};
        const { hint_id, remember_token } = content;

        this.setState({
            activeKey: hintIsOpen[remember_token] ? 1 : null,
            checkHint: hintIsOpen[remember_token] ? hintIsOpen[remember_token] : false,
            currentRememberToken: remember_token,
        });

        if (hintIsOpen[remember_token] === true) {
            getHintMessage(hint_id).then(res => {
                if (res.status < 300) {
                    this.setState({
                        hintText: res.data.message,
                        activeKey: 1,
                    });
                } else {
                    message.error('can`t get hint message');
                }
            });
        }
    }

    hintAlert = () => {
        const { checkHint } = this.state;
        if (checkHint === false) {
            this.setState({
                visible: !this.state.visible,
            });
        }
    }

    toggleModal = () => {
        this.setState({
            visible: !this.state.visible,
        });
    }

    showPreviewInfo = () => {
        const { hint_id } = this.props.content;
        const loader = message.loading('getting Hint Message..', 0);
        this.props.getHintMessage(hint_id).then(res => {
            if (res.status < 300) {
                this.setState({
                    hintText: res.data.message,
                    activeKey: 1,
                    visible: !this.state.visible,
                    adminCheck: true,
                });
            } else {
                message.error(res);
            }
            loader();
        });
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        let { hintIsOpen, content, getHintMessage } = nextProps;
        hintIsOpen = hintIsOpen || {};
        const { hint_id, remember_token } = content;

        this.setState({
            activeKey: hintIsOpen[remember_token] ? 1 : null,
            checkHint: hintIsOpen[remember_token] ? hintIsOpen[remember_token] : false,
        });

        if (hintIsOpen[remember_token] === true && this.state.currentRememberToken !== remember_token) {
            getHintMessage(hint_id).then(res => {
                if (res.status < 300) {
                    this.setState({
                        hintText: res.data.message,
                        activeKey: 1,
                        currentRememberToken: remember_token,
                    });
                } else {
                    message.error('can`t get hint message');
                }
            });
        }
    }

    showInfo = () => {
        const loader = message.loading('getting Hint Message..', 0);
        const {
            active_lab_id, getHintMessage, userLevel, updateOpenHints, getRemainingHintsCount,
        } = this.props;
        const { hint_id, remember_token } = this.props.content;

        getHintMessage(hint_id).then(res => {
            if (res.status < 300) {
                this.setState({
                    hintText: res.data.message,
                    visible: !this.state.visible,
                    checkHint: true,
                    activeKey: 1,
                }, () => {
                    updateOpenHints(active_lab_id, { remember_token }).then(res => {
                        if (res === true) {
                            if (userLevel === 'Advanced') {
                                getRemainingHintsCount(active_lab_id).then(res => {
                                    if (res.remaining_hints === -1) {
                                        notification.open({
                                            message: 'Your level has changed to medior!',
                                            description:
                                                'You have exceeded the limit of hints you can use. Your level is now MEDIOR.',
                                            duration: 0,
                                        });
                                    }
                                });
                            }
                        } else {
                            message.error('something went wrong');
                        }
                    });
                });
            } else {
                message.error('Something went wrong');
            }
            loader();
        });
    }

    render() {
        const { hintTitle, warningMessage, remember_token } = this.props.content;
        let { hintIsOpen, adminPreview } = this.props;
        hintIsOpen = hintIsOpen || {};
        const { activeKey, hintText, adminCheck } = this.state;
        return (
            <>
                {
                    hintTitle
                    && (
                        <Collapse
                            activeKey={activeKey}
                            style={{ marginBottom: '20px' }}
                            onChange={e => {
                                this.hintAlert(e);
                            }}
                        >
                            <Panel showArrow={false} header={hintTitle} key={1}>
                                {
                                    adminCheck || hintIsOpen[remember_token] ? <p><HTMLSanitize content={hintText} /></p> : null
                                }
                            </Panel>
                        </Collapse>
                    )
                }

                {
                    hintTitle
                    && (
                        <Modal
                            title=""
                            visible={this.state.visible}
                            onOk={adminPreview ? this.showPreviewInfo : this.showInfo}
                            okText="Show Hint Text"
                            onCancel={this.toggleModal}
                            width="40%"
                        >
                            <div>
                                <p><HTMLSanitize content={warningMessage} /></p>
                            </div>
                        </Modal>
                    )
                }
            </>
        );
    }
}
