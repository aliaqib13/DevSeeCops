import React, { Component } from 'react';
import {
    Button, Col, Icon, Row,
} from 'antd';
import InformationBox from '../../editSteps/blocks/InformationBox';
import SingleText from '../../editSteps/blocks/SingleText';
import HeartBox from '../../editSteps/blocks/HeartBox';
import CodeSnippet from '../../editSteps/blocks/CodeSnippet';
import GreyBox from '../../editSteps/blocks/GreyBox';
import InfinityLoop from '../../editSteps/blocks/InfinityLoop';
import BulletText from '../../editSteps/blocks/BulletText';
import TitleBox from '../../editSteps/blocks/TitleBox';
import ParagraphTitle from '../../editSteps/blocks/ParagraphTitle';
import Image from '../../editSteps/blocks/Image';
import Video from '../../editSteps/blocks/Video';
import SelectGuidelineType from './selectGuidelineType';
import { arrayMoveElement } from '../../../../util/utils';

export default class Blocks extends Component {
    onChangeBlock = (block, index) => {
        const blocks = this.props.blocks.slice();
        blocks[index] = block;
        this.props.onChangeState(blocks);
    }

    changeBlockPosition = (index, dir) => {
        const blocks = this.props.blocks.slice();
        const to = dir === 'up' ? parseInt(index) - 1 : parseInt(index) + 1 >= blocks.length ? 0 : parseInt(index) + 1;
        const from = parseInt(index);
        const newBlocks = arrayMoveElement([...blocks], from, to);
        this.props.onChangeBlocksPosition(newBlocks);
        this.forceUpdate();
    }

    removeBlock = index => {
        const blocks = this.props.blocks.slice();
        blocks.splice(index, 1);
        this.props.onChangeState(blocks);
    }

    render() {
        const { blocks, onChangeContentType, uploadFile } = this.props;
        return (
            <div className="blocks-container">
                <div className="add-paragraph">
                    <Button
                        type="link"
                        className="add-component-btn-top"
                        onClick={() => this.props.addComponent(true)}
                    >
                        <Icon type="plus-circle" />
                        Add Component
                    </Button>
                </div>
                {
                    blocks.map((item, key) => (
                        <Row className="block-component" key={key}>
                            <Col span={24}>
                                <div className="box-container">
                                    <span className="title-component">
                                        component
                                    </span>
                                    <div className="block-item-header">
                                        <SelectGuidelineType
                                            selected={item.type}
                                            item={item}
                                            index={key}
                                            onChangeContentType={onChangeContentType}
                                            changePosition={this.changeBlockPosition}
                                            removeBlock={this.removeBlock}
                                        />
                                    </div>
                                    {item.type === 'InformationBox' && <InformationBox key={key} block={item} index={key} onChangeBlock={this.onChangeBlock} />}
                                    {item.type === 'SingleText' && <SingleText key={key} block={item} index={key} onChangeBlock={this.onChangeBlock} />}
                                    {item.type === 'HeartBox' && <HeartBox key={key} block={item} index={key} onChangeBlock={this.onChangeBlock} />}
                                    {item.type === 'CodeSnippet' && <CodeSnippet key={key} block={item} index={key} onChangeBlock={this.onChangeBlock} />}
                                    {item.type === 'GreyBox' && <GreyBox key={key} block={item} index={key} onChangeBlock={this.onChangeBlock} />}
                                    {item.type === 'InfinityLoop' && <InfinityLoop key={key} block={item} index={key} onChangeBlock={this.onChangeBlock} />}
                                    {item.type === 'BulletText' && <BulletText key={key} block={item} index={key} onChangeBlock={this.onChangeBlock} />}
                                    {item.type === 'ParagraphTitle' && <ParagraphTitle key={key} block={item} index={key} onChangeBlock={this.onChangeBlock} />}
                                    {item.type === 'TitleBox' && <TitleBox key={key} block={item} index={key} onChangeBlock={this.onChangeBlock} uploadFile={uploadFile} />}
                                    {item.type === 'Image' && <Image key={key} block={item} index={key} onChangeBlock={this.onChangeBlock} uploadFile={uploadFile} />}
                                    {item.type === 'Video' && <Video key={key} block={item} index={key} onChangeBlock={this.onChangeBlock} uploadFile={uploadFile} />}

                                </div>

                            </Col>
                        </Row>
                    ))
                }
            </div>
        );
    }
}
