import React, { Component } from 'react';
import {
    Form, Radio, Checkbox, Input, Button, message, Select, Spin, Icon,
} from 'antd';
import './preferences.scss';

const { TextArea } = Input;

const questions = [
    {
        type: 'radio-buttons',
        label: 'How experienced are you in DevSecOps ?',
        name: 'experience',
        options: [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        ],
    },
    {
        type: 'radio',
        label: 'What best describes your work / expertise ?',
        name: 'work_description',
        options: [
            'Development', 'Operations', 'Security', 'It is all even in my work : DevSecOps', 'Other',
        ],
    },
    {
        type: 'checkbox',
        label: 'What specific DevSecOps categories are you interested in for training ?',
        name: 'category',
        options: [
            'Threat Modeling', 'Secure Coding', 'SAST', 'DAST', 'ExamplePost Management', 'Container Security', 'Cloud Security', 'Compliance as Code', 'Secrets Management', 'Mobile Security', 'Other',
        ],
    },
    {
        type: 'radio',
        label: 'Which Cloud platform is most relevant to your work, either now or in the near future ?',
        name: 'cloud_platform',
        options: [
            'AWS', 'Azure', 'GCP', 'The cloud platform isn\'t particularly relevant to my training needs', 'Other',
        ],
    },
    {
        type: 'checkbox',
        label: 'If you would have to choose from this list, which application development platforms are relevant for your work, right now and in the near future ?',
        name: 'development_platform',
        options: [
            'Java', '.Net', 'Javascript (NodeJS)', 'GO', 'Python', 'The application development platform is not particularly of interest for my training needs', 'Other',
        ],
    },
    {
        type: 'textarea',
        label: 'Is there anything of particular interest you like to share or you would like to ask us ?',
        name: 'interest',
    },
];

class Preferences extends Component {
    state = {
        loading: false,
        survey: {
            experience: '',
            work_description: '',
            work_description_other: '',
            category: [],
            category_other: '',
            cloud_platform: '',
            cloud_platform_other: '',
            development_platform: [],
            development_platform_other: '',
            interest: '',
        },
        others: {
            work_description: false,
            category: false,
            cloud_platform: false,
            development_platform: false,
        },
        tags: [],
        userTags: [],
        deletedTags: [],
        updatedTags: [],
        fetching: true,
        options: [],
    };

    componentDidMount() {
        const loading = message.loading('Loading..');
        this.props.getPreferences(this.props.user_id).then(res => {
            loading();
            if (res === true) {
                const keys = Object.keys(this.props.preferences.content);
                const others = {};
                for (const key of keys) {
                    if (key.endsWith('_other')) {
                        if (this.props.preferences.content[key]) {
                            const field_name = key.slice(0, -6);
                            others[field_name] = true;
                        }
                    }
                }
                const tags = this.props.preferences.userCourseTags.map(item => item.title);
                this.setState({
                    survey: {
                        ...this.state.survey,
                        ...this.props.preferences.content,
                    },
                    others: {
                        ...this.state.others,
                        ...others,
                    },
                    tags,
                    options: this.props.preferences.userCourseTags,

                });
            }
        });
    }

    onCheckboxChange = (checkedValues, question) => {
        const { survey, others } = this.state;
        survey[question] = checkedValues;
        others[question] = checkedValues.indexOf('Other') !== -1;
        this.setState({
            survey: {
                ...survey,
                [`${question}_other`]: !others[question] ? '' : this.state.survey[`${question}_other`],
            },
            others,
        });
    };

    onInputChange = e => {
        const { name } = e.target;
        const { value } = e.target;
        const { survey, others } = this.state;
        survey[name] = value;
        others[name] = value === 'Other';
        this.setState({
            survey: {
                ...survey,
                [`${name}_other`]: !others[name] ? '' : this.state.survey[`${name}_other`],
            },
            others,

        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { survey, updatedTags, deletedTags } = this.state;
        this.props.form.validateFields((err, values) => {
            if (err) {
                message.error('Please fill in all required fields!');
            } else {
                this.setState({ loading: true });
                this.props.updatePreferences({
                    content: survey,
                    tags: this.filterUpdatedTags(this.getUniqueArray(updatedTags)),
                    deletedTags: this.getUniqueArray(deletedTags),
                }).then(res => {
                    if (res === true) {
                        message.success('Updated!');
                        this.setState({
                            updatedTags: [],
                            deletedTags: [],
                        });
                    } else {
                        message.error('Something went wrong, please try again.');
                    }
                    this.setState({ loading: false });
                });
            }
        });
    };

    onChangeUserTags = (tags, props) => {
        const { key } = props;
        const { userTags } = this.state;
        const exists = userTags.includes(key);
        if (!exists) {
            return false;
        }
        this.setState({
            tags,
            userTags: [],
        });
    }

    onSelectUserTags = (value, params) => {
        const { key } = params;
        const { tags, userTags, updatedTags } = this.state;
        if ((key === value) || userTags.length === 0) {
            return message.info('please choose by existing tags ');
        }
        tags.push(value);
        updatedTags.push(key);
        this.setState({
            tags,
            updatedTags,
            userTags: [],
        });
    }

    onDeselectUserTags = (values, params) => {
        const { key } = params;
        const { tags, deletedTags, options } = this.state;
        deletedTags.push(key);
        const updatedOptions = [];
        options.forEach(item => {
            if (item.id !== parseInt(key)) {
                updatedOptions.push(item);
            }
        });
        tags.splice(tags.findIndex(item => item === values), 1);
        this.setState({
            tags,
            deletedTags,
            options: updatedOptions,
        });
    }

    onSearchUserTags = tags => {
        if (tags.length >= 1 && tags.length < 200) {
            this.setState({
                fetching: true,
                userTags: [],
            });
            this.props.searchByCourseTags(tags).then(res => {
                if (res !== false) {
                    this.setState({
                        userTags: res,
                        fetching: false,
                    });
                } else {
                    message.error('something went wrong');
                }
            });
        }
    }

    getUniqueArray = arr => arr.filter((value, index, arr) => arr.indexOf(value) === index)

    filterUpdatedTags = updatedTags => {
        const { userCourseTags } = this.props.preferences;
        const updatedTagsArr = userCourseTags.map(item => {
            if (updatedTags.includes(item.id)) {
                return item.id;
            }
            return true;
        });
        return updatedTags.map((item, key) => {
            if (updatedTagsArr[key] !== item) {
                return item;
            }
            return true;
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const {
            survey, others, loading, tags, userTags, fetching,
        } = this.state;

        const { onlyShow } = this.props;
        let options;
        (userTags.length === 0) ? options = this.state.options : options = userTags;

        if (tags.length === 0) {
            options = userTags;
        }
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        return (
            <div className="preferences-container">
                <Form onSubmit={this.handleSubmit}>
                    {onlyShow && this.props.user && (
                        <>
                            <Form.Item label="E-mail">
                                <Input
                                    prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    value={this.props.user.email}
                                    disabled
                                />
                            </Form.Item>
                            <Form.Item label="LinkedIn profile">
                                <Input
                                    prefix={<Icon type="linkedin" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    value={this.props.user.linkedin_url}
                                    disabled
                                />
                            </Form.Item>
                        </>
                    )}
                    {questions.map((item, key) => (
                        <Form.Item key={key} label={item.label}>
                            {item.type === 'radio-buttons'
                            && getFieldDecorator(item.name, {
                                rules: [{ required: true, message: 'Please select an option!' }],
                                initialValue: survey[item.name],
                            })(
                                <Radio.Group buttonStyle="solid" name={item.name} onChange={this.onInputChange}>
                                    {item.options.map((value, key) => (
                                        <Radio.Button disabled={onlyShow} key={key} value={value}>{value}</Radio.Button>
                                    ))}
                                </Radio.Group>,
                            )}

                            {item.type === 'radio'
                            && getFieldDecorator(item.name, {
                                rules: [{ required: true, message: 'Please select an option!' }],
                                initialValue: survey[item.name],
                            })(
                                <Radio.Group name={item.name} onChange={this.onInputChange}>
                                    {item.options.map((value, key) => (
                                        value !== 'Other'
                                        && (
                                            <Radio disabled={onlyShow} style={radioStyle} key={key} value={value}>
                                                {value}
                                            </Radio>
                                        )
                                    ))}
                                    <Radio disabled={onlyShow} style={radioStyle} value="Other">
                                        Other
                                        {others[item.name] === true
                                            ? (
                                                <Form.Item>
                                                    {getFieldDecorator(`${item.name}_other`, {
                                                        rules: [{ required: true, message: 'This field is required!' }],
                                                        initialValue: survey[`${item.name}_other`],
                                                    })(
                                                        <TextArea
                                                            disabled={onlyShow}
                                                            rows={4}
                                                            onChange={e => {
                                                                this.setState({
                                                                    survey: {
                                                                        ...survey,
                                                                        [`${item.name}_other`]: e.target.value,
                                                                    },
                                                                });
                                                            }}
                                                        />,
                                                    )}

                                                </Form.Item>
                                            )
                                            : null}
                                    </Radio>
                                </Radio.Group>,
                            )}

                            {item.type === 'checkbox'
                            && getFieldDecorator(item.name, {
                                rules: [{ required: true, message: 'Please select at least one option!' }],
                                initialValue: survey[item.name],
                            })(
                                <Checkbox.Group
                                    onChange={checkedValues => this.onCheckboxChange(checkedValues, item.name)}
                                >
                                    {item.options.map((value, key) => (
                                        value !== 'Other'
                                        && (
                                            <div key={key}>
                                                <Checkbox disabled={onlyShow} value={value}>{value}</Checkbox>
                                            </div>
                                        )
                                    ))}
                                    <div>
                                        <Checkbox disabled={onlyShow} value="Other">
                                            Other
                                            {others[item.name] === true
                                                ? (
                                                    <Form.Item>
                                                        {getFieldDecorator(`${item.name}_other`, {
                                                            rules: [{ required: true, message: 'This field is required!' }],
                                                            initialValue: survey[`${item.name}_other`],
                                                        })(
                                                            <TextArea
                                                                disabled={onlyShow}
                                                                rows={4}
                                                                name={`${item.name}_other`}
                                                                onChange={e => {
                                                                    this.setState({
                                                                        survey: {
                                                                            ...survey,
                                                                            [`${item.name}_other`]: e.target.value,
                                                                        },
                                                                    });
                                                                }}
                                                                style={{ marginLeft: 10 }}
                                                            />,
                                                        )}

                                                    </Form.Item>
                                                )
                                                : null}
                                        </Checkbox>
                                    </div>
                                </Checkbox.Group>,
                            )}

                            {item.type === 'textarea'
                            && getFieldDecorator(item.name, {
                                rules: [
                                    { max: 1000, message: 'Text must be less than 1000 characters!' },
                                ],
                                initialValue: survey[item.name],
                            })(
                                <TextArea disabled={onlyShow} rows={4} name={item.name} onChange={this.onInputChange} />,
                            )}
                        </Form.Item>
                    ))}
                    <Form.Item key="assign-user-tags" label="Add Course Tags">
                        <Select
                            disabled={onlyShow}
                            mode='tags'
                            style={{ width: '100%' }}
                            placeholder="Add User Tags"
                            value={tags}
                            notFoundContent={fetching ? <Spin size="small" /> : null}
                            filterOption={false}
                            onDeselect={this.onDeselectUserTags}
                            onChange={this.onChangeUserTags}
                            onSelect={this.onSelectUserTags}
                            onSearch={this.onSearchUserTags}
                        >
                            {options.map(item => (
                                <Select.Option key={item.id} value={item.title}>
                                    {item.title}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    {!onlyShow ? (
                        <Form.Item className="submit-preferences">
                            <Button type="primary" htmlType="submit" loading={loading}>
                                Submit
                            </Button>
                        </Form.Item>
                    )
                        : null}
                </Form>
            </div>
        );
    }
}

export { Preferences };
export default Form.create({ name: 'survey' })(Preferences);
