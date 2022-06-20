import React, { Component } from 'react';
import {
    Input, Button, Icon, message,
} from 'antd';

class StateMachine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initial_state: '',
            states: [{
                name: '',
                event: '',
                next_state: '',
            }],
        };
    }

    componentDidMount() {
        const states = [];
        const { data } = this.props;
        const keyArr = Object.keys(data);
        const nextStates = keyArr.map(key => data[key].nextState);
        const firstState = keyArr.find(key => key !== 'initial' && key !== 'finish' && !nextStates.includes(key));
        if (firstState) {
            states.push({ name: firstState, event: data[firstState].event, next_state: data[firstState].nextState });
            keyArr.splice(keyArr.indexOf(firstState), 1);
        }
        if (keyArr.length) {
            const initial_state = data.initial;
            keyArr.forEach(key => {
                if (key !== 'initial' && key !== 'finish') {
                    if (states[states.length - 1]) {
                        const { next_state } = states[states.length - 1];
                        if (data[next_state]) {
                            states.push({ name: next_state, event: data[next_state].event, next_state: data[next_state].nextState });
                        } else {
                            states.push({ name: key, event: data[key].event, next_state: data[key].nextState });
                        }
                    } else {
                        states.push({ name: key, event: data[key].event, next_state: data[key].nextState });
                    }
                }
            });
            this.setState({ initial_state, states });
        }
    }

    saveStateMachine = () => {
        const { id, saveStateMachine } = this.props;
        const { states, initial_state } = this.state;
        if (!states.length) {
            message.error('No state exists');
            return;
        }
        if (states.find(state => state.name === '' || state.event === '')) {
            message.error('Some fields are empty');
            return;
        }
        const data = {
            labID: id,
            config: {
                initial: initial_state,
                finish: {},
            },
        };
        states.forEach(state => {
            data.config[state.name] = {
                event: state.event,
                nextState: state.next_state,
            };
        });

        saveStateMachine(data).then(res => {
            if (res === true) {
                message.success('Successfully saved');
            } else {
                message.error(res.message);
            }
            return true;
        }).catch(err => console.error('Failed to save state machine: ', err));
    }

    addState = () => {
        const { states } = this.state;
        const lastState = states[states.length - 1];
        if (lastState && (lastState.name === '' || lastState.event === '' || lastState.next_state === '')) {
            message.error('Please fill in all the inputs of the last state');
            return;
        }
        states.push({
            name: lastState ? lastState.next_state : '',
            event: '',
            next_state: '',
        });
        this.setState({ states });
    }

    deleteState = index => {
        const { states } = this.state;
        states.splice(index, 1);
        this.setState({ states });
    }

    handleChange = (e, index) => {
        message.destroy();
        const { states } = this.state;
        const state = states[index];
        const { name } = e.target;
        const { value } = e.target;
        if (name === 'name' && index === 0) {
            const regex = /^[a-z_]*$/;
            if (value && !regex.test(value)) {
                message.error('Only lowercase letters with underscores are allowed');
                return;
            }
            const initial_state = value;
            state[name] = value;
            this.setState({ states, initial_state });
        } else if (name === 'next_state') {
            const regex = /^[a-z_]*$/;
            if (value && !regex.test(value)) {
                message.error('Only lowercase letters with underscores are allowed');
                return;
            }
            if (index < states.length - 1) {
                const nextState = states[index + 1];
                nextState.name = value;
            }
            state[name] = value;
            this.setState({ states });
        } else if (name === 'event') {
            const regex = /^[A-Z_]*$/;
            if (value && !regex.test(value)) {
                message.error('Only capital letters with underscores are allowed');
                return;
            }
            state[name] = value;
            this.setState({ states });
        }
    }

    moveUp = index => {
        const { states } = this.state;
        const current = JSON.stringify(states[index]);
        states[index] = states[index - 1];
        states[index - 1] = JSON.parse(current);
        states[index - 2] && (states[index - 2].next_state = states[index - 1].name);
        states[index - 1].next_state = states[index].name;
        states[index + 1] && (states[index].next_state = states[index + 1].name);
        this.setState({ states });
    }

    moveDown = index => {
        const { states } = this.state;
        const current = JSON.stringify(states[index]);
        states[index] = states[index + 1];
        states[index + 1] = JSON.parse(current);
        states[index - 1] && (states[index - 1].next_state = states[index].name);
        states[index].next_state = states[index + 1].name;
        states[index + 2] && (states[index + 1].next_state = states[index + 2].name);
        this.setState({ states });
    }

    render() {
        const { id } = this.props;
        const { states } = this.state;
        return (
            <div className="editCourse">
                <div className="actions-top-block">
                    <div className="small-input">
                        <span className="inputSpan">Lab Id</span>
                        <Input name="lab_id" value={id} disabled />
                    </div>
                    <Button type="primary" onClick={this.addState}>
                        Add State
                        <Icon type="save" />
                    </Button>
                    {
                        states.map((state, index) => (
                            <div className="state-block" key={index}>
                                <div className="arrow-deletion-button-content">
                                    <div className="move-arrow">
                                        {index > 0 && <Icon type="up-circle" onClick={() => this.moveUp(index)} /> }
                                        {index < states.length - 1 && <Icon type="down-circle" onClick={() => this.moveDown(index)} />}
                                    </div>
                                    <Button type="danger" className="delete-state" onClick={() => { this.deleteState(index); }}>
                                        Delete State
                                        <Icon type="delete" />
                                    </Button>
                                </div>
                                <div style={{ width: '80%' }}>
                                    <hr />
                                    <div className="small-input">
                                        <span className="inputSpan">{index === 0 ? 'Initial State' : ''}</span>
                                        {index === 0 ? (
                                            <Input
                                                name="name"
                                                value={state.name}
                                                onChange={e => this.handleChange(e, index)}
                                            />
                                        ) : <p style={{ textAlign: 'center' }}>{state.name}</p>}
                                    </div>
                                    <div className="small-input">
                                        <span className="inputSpan">Event</span>
                                        <Input name="event" value={state.event} onChange={e => this.handleChange(e, index)} />
                                    </div>
                                    <div className="small-input">
                                        <span className="inputSpan">Next State</span>
                                        <Input name="next_state" value={state.next_state} onChange={e => this.handleChange(e, index)} />
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    <Button type="primary" onClick={this.saveStateMachine}>
                        Save State Machine
                        <Icon type="save" />
                    </Button>
                </div>
            </div>
        );
    }
}

export default StateMachine;
