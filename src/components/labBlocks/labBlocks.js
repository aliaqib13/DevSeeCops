import React, { Component } from 'react';
import './lab-blocks.scss';
import {
    AutoComplete, Button, Icon, Input, Typography, Row,
    Col, message, Checkbox, Card, List, Select,
} from 'antd';

const { Title } = Typography;
const { Meta } = Card;
const { Option } = Select;

export default class LabBlocks extends Component {
    state = this.initialState

    get initialState() {
        return {
            searchList: [],
            labBlocks: [],
            inputValue: '',
            saveBlocksLoader: false,
            selectedItem: null,
            allCourses: [],
            selectedLabBlocks: [],
            selectedLab: null,
        };
    }

    onSelect = value => {
        const { allCourses } = this.state;
        const selectedItem = allCourses[allCourses.findIndex(item => item.title === value)];
        this.setState({
            selectedItem,
            inputValue: value,
            selectedLab: selectedItem.labs[0],
            selectedLabBlocks: selectedItem.labs[0].labBlocks.map(item => item.id),
            searchList: [],
        });
    }

    onSearch = value => {
        this.setState({
            inputValue: value,
        });
        if (value.length === 0) {
            this.setState(this.initialState);
        }
        if (value.length >= 3 && value.length < 255) {
            this.setState({
                selectedItem: null,
            });
            const { user_id } = this.props;
            this.props.searchCourse(value, user_id || null).then(res => {
                if (res !== false) {
                    const searchList = res.courses.map(item => item.title);
                    this.setState({
                        searchList,
                        allCourses: res.courses,
                        labBlocks: res.labBlocks,
                    });
                } else {
                    message.error('Something went wrong please try again');
                }
            });
        }
    }

    onChange = e => {
        const { value, checked } = e.target;
        const selectedBlocks = [...this.state.selectedLabBlocks];
        checked ? selectedBlocks.push(value) : selectedBlocks.splice(selectedBlocks.indexOf(value), 1);
        this.setState({
            selectedLabBlocks: selectedBlocks,
        });
    }

    save = () => {
        const { selectedLab, selectedLabBlocks } = this.state;
        if (selectedLab) {
            this.props.assignLabBlocks({ id: selectedLab.id, labBlocks: selectedLabBlocks }).then(res => {
                if (res === true) {
                    message.success('updated');
                    this.setState({
                        searchList: [],
                    });
                } else {
                    message.error('Something went wrong please try again');
                }
            });
        } else {
            return message.warning('please select some of you courses');
        }
    }

    onSelectChange = value => {
        const { labs } = this.state.selectedItem;
        const selectedLab = labs[labs.findIndex(item => item.id === value)];

        this.props.getLabBlocks(value).then(res => {
            let selectedLabBlocks;
            if (res !== false) {
                selectedLabBlocks = res.labBlocks.map(item => item.id);
            } else {
                message.error('can not get updated lab blocks');
                selectedLabBlocks = selectedLab.labBlocks.map(item => item.id);
            }
            this.setState({
                selectedLabBlocks,
            });
        });
        this.setState({
            selectedLab,
        });
    }

    render() {
        const {
            searchList, inputValue, saveBlocksLoader, selectedLabBlocks, selectedItem, labBlocks, selectedLab,
        } = this.state;
        return (
            <div className="fellow-lab-blocks-container">
                <div className="fellow-lab-blocks-title">
                    <Title level={4}>
                        Find and select your course
                    </Title>
                </div>
                <div className="curse-lab-blocks">
                    <Row>
                        <Col span={12}>
                            <AutoComplete
                                dataSource={searchList}
                                onSelect={this.onSelect}
                                onSearch={this.onSearch}
                                value={inputValue}
                                style={{ width: '100%' }}
                            >
                                <Input
                                    suffix={(
                                        <Button
                                            style={{ marginRight: -12 }}
                                            type="primary"
                                            onClick={() => this.save()}
                                            loading={saveBlocksLoader}
                                        >
                                            <Icon type="save" />
                                        </Button>
                                    )}
                                />
                            </AutoComplete>
                            {
                                selectedItem
                                    && (
                                        <>
                                            <Title level={4} style={{ marginTop: '2%' }}>
                                                Select a hands-on lab
                                            </Title>
                                            <Select
                                                showSearch
                                                style={{ width: '100%', marginTop: '2%' }}
                                                onChange={this.onSelectChange}
                                                placeholder="Select a Lab"
                                                defaultValue={selectedItem.labs[0].id}
                                            >
                                                {
                                                    (selectedItem.labs || []).map((item, key) => (
                                                        <Option key={key} value={item.id}>{item.name}</Option>
                                                    ))
                                                }
                                            </Select>
                                        </>
                                    )
                            }

                        </Col>
                    </Row>

                    {(selectedLab && selectedItem)
                        && (
                            <Checkbox.Group
                                style={{ width: '100%' }}
                                value={selectedLabBlocks}
                                defaultValue={selectedLabBlocks}
                            >
                                <List
                                    grid={{
                                        gutter: 16,
                                        xs: 1,
                                        sm: 2,
                                        md: 3,
                                        lg: 4,
                                        xl: 5,
                                        xxl: 6,
                                    }}
                                    itemLayout='horizontal'
                                    position='both'
                                    pagination={{
                                        pagination: 'bottom',
                                        pageSize: 5,
                                        total: labBlocks.length,
                                        defaultCurrent: 1,
                                        position: 'both',
                                        hideOnSinglePage: true,
                                        showQuickJumper: true,
                                        onChange: this.onChangePage,
                                    }}
                                    dataSource={labBlocks}
                                    footer={null}
                                    renderItem={(item, key) => (

                                        <Row className="lab-blocks-row" type="flex" align="top">
                                            <List.Item>
                                                <Col key={key} span={5} className="lab-block-col">
                                                    <div className="lab-blocks-card">
                                                        <Checkbox value={item.id} onChange={this.onChange}>
                                                            <Card
                                                                className={`lab-block-image-cover ${selectedLabBlocks.includes(item.id) ? 'checked-card' : ''}`}
                                                                hoverable
                                                                cover={<img alt='lab-block' src={item.image} />}
                                                            >
                                                                <Meta className="card-title" title={item.title} />
                                                                <div className="checked-icon-container">
                                                                    {
                                                                        selectedLabBlocks.includes(item.id)
                                                                    && (
                                                                        <Icon
                                                                            className="checked-icon"
                                                                            type="check-circle"
                                                                            style={{ fontSize: '20px' }}
                                                                        />
                                                                    )
                                                                    }
                                                                </div>
                                                            </Card>
                                                        </Checkbox>
                                                    </div>
                                                </Col>
                                            </List.Item>
                                        </Row>
                                    )}
                                />
                            </Checkbox.Group>
                        )}
                </div>
            </div>
        );
    }
}
