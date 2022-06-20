import React from 'react';
import { Select, Button, Col } from 'antd';

const { Option } = Select;

const types = [
    {
        title: 'Information Box',
        value: 'InformationBox',
    },
    {
        title: 'Text Box',
        value: 'SingleText',
    },
    {
        title: 'Heart Box',
        value: 'HeartBox',
    },
    {
        title: 'Code Snippet',
        value: 'CodeSnippet',
    },
    {
        title: 'Grey Box',
        value: 'GreyBox',
    },
    {
        title: 'Infinity Loop',
        value: 'InfinityLoop',
    },
    {
        title: 'Image',
        value: 'Image',
    },
    {
        title: 'Video',
        value: 'Video',
    },
];

const SelectGuidelineType = props => (
    <div>
        <Col span={12}>
            <Select value={props.selected} style={{ width: '100%' }} onChange={type => props.onChangeContentType(type, props.index)}>
                {
                    types.map((item, key) => (
                        <Option key={key} value={item.value}>{item.title}</Option>
                    ))
                }
            </Select>
        </Col>
        <Col span={8}>
            <div className="position-buttons">
                <Button type="primary" className="change-pos-btn" shape="circle" icon="arrow-up" onClick={() => props.changePosition(props.index, 'up')} />
                <Button type="primary" className="change-pos-btn" shape="circle" icon="arrow-down" onClick={() => props.changePosition(props.index, 'down')} />
            </div>

        </Col>
        <Col span={3}>
            <div className="position-buttons">
                <Button type="danger" className="change-pos" shape="circle" icon="delete" onClick={() => props.removeBlock(props.index)} />
            </div>
        </Col>
    </div>
);

export default SelectGuidelineType;
