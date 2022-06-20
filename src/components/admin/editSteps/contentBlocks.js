import React, { Component } from 'react';
import {
    Button, Col, Icon, Row, Modal, Table, Divider, Input, message,
} from 'antd';
import InformationBox from './blocks/InformationBox';
import SingleText from './blocks/SingleText';
import HeartBox from './blocks/HeartBox';
import CodeSnippet from './blocks/CodeSnippet';
import GreyBox from './blocks/GreyBox';
import BulletText from './blocks/BulletText';
import TitleBox from './blocks/TitleBox';
import ParagraphTitle from './blocks/ParagraphTitle';
import Image from './blocks/Image';
import Image2 from './blocks/Image2';
import Video from './blocks/Video';
import DropdownHint from './blocks/DropdownHint';
import CopyField from './blocks/CopyField';
import LearningPathSelectBox from './blocks/LearningPathSelectBox';
import SelectBlockType from './selectBlockType';
import './editLabsSteps.scss';
import { arrayMoveElement } from '../../../util/utils';

import PreviewFavorites from './previewFavorites';

const { Column } = Table;

export default class ContentBlocks extends Component {
    state = {
        addSavedComponentModalVisible: false,
        favorites: [],
        searchTitle: '',
        previewComponent: false,
        selectedComponent: null,
    }

    componentDidMount() {
        this.props.fetchFavoriteComponents('');
    }

    showAddSavedComponentModal = addToTop => {
        this.setState({
            addSavedComponentModalVisible: true,
            addToTop,
        });
    }

    handleCancel = e => {
        this.setState({
            addSavedComponentModalVisible: false,
        });
    }

    previewComponent = record => {
        this.setState({
            selectedComponent: record,
        }, () => {
            this.togglePreviewComponentModel();
        });
    }

    togglePreviewComponentModel = () => {
        this.setState({
            previewComponent: !this.state.previewComponent,
        });
    }

    searchTitle = e => {
        const searchData = e.target.value;
        this.setState({
            searchTitle: searchData,
        });
        if (e.target.value.length < 254) {
            this.props.fetchFavoriteComponents(`${searchData}`);
        }
    }

    onChangeBlock = (block, index) => {
        const blocks = [...this.props.blocks];
        blocks[index].id = block.id; // Preserve block id so we can use it as array key
        blocks[index].type = block.type;
        blocks[index].content = block.content;
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
        Modal.confirm({
            title: 'Are you sure you want to delete this information?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                const blocks = [...this.props.blocks];
                this.props.getRemovedComponents(blocks[index].uuid);
                blocks.splice(index, 1);
                this.props.onChangeState(blocks);
            },
            onCancel() {},
        });
    }

    addSavedComponent = component => {
        const { addToTop } = this.state;
        this.props.addSavedComponent(component, addToTop);
        this.setState({
            addSavedComponentModalVisible: false,
        });
        message.success('Added!');
    }

    pushContentChanges = index => {
        const loader = message.loading('updating...');
        const content = this.props.blocks[index];
        const { type } = this.props;
        this.props.updateStepContent({ content, type }).then(res => {
            loader();
            if (res === true) {
                message.success('updated!');
            } else {
                message.error('Something went wrong, please try again');
            }
        });
    }

    render() {
        const {
            blocks, onChangeContentType, uploadFile, hints,
            storeSavedComponent, favorites, type, isTemplate, is_compulsory,
        } = this.props;
        const { searchTitle, selectedComponent } = this.state;
        return (
            <div className="blocks-container">
                <div className="add-paragraph bottom-button">
                    <Button type="link" className="add-component-btn-top" onClick={() => this.props.addComponent(true)}>
                        <Icon type="plus-circle" />
                        Add Component
                    </Button>
                    <Button type="link" className="add-saved-component-btn-top" onClick={() => this.showAddSavedComponentModal(true)}>
                        <Icon type="plus-circle" />
                        Add saved component
                    </Button>
                </div>
                {
                    blocks.map((item, key) => (
                        <Row className="block-component" key={item.id}>
                            <Col span={24}>
                                <div className="box-container">
                                    <span className="title-component">
                                        component
                                    </span>
                                    <div className="block-item-header">
                                        <SelectBlockType
                                            selected={item.type}
                                            item={item}
                                            index={key}
                                            onChangeContentType={onChangeContentType}
                                            changePosition={this.changeBlockPosition}
                                            removeBlock={this.removeBlock}
                                            storeSavedComponent={storeSavedComponent}
                                            isTemplate={isTemplate}
                                            pushContentChanges={this.pushContentChanges}
                                            is_compulsory={is_compulsory}
                                            type={type}
                                        />
                                    </div>
                                    {item.type === 'InformationBox' && <InformationBox key={key} block={item} index={key} onChangeBlock={this.onChangeBlock} />}
                                    {item.type === 'SingleText' && <SingleText key={key} block={item} index={key} onChangeBlock={this.onChangeBlock} />}
                                    {item.type === 'HeartBox' && <HeartBox key={key} block={item} index={key} onChangeBlock={this.onChangeBlock} />}
                                    {item.type === 'CodeSnippet' && <CodeSnippet key={key} block={item} index={key} onChangeBlock={this.onChangeBlock} />}
                                    {item.type === 'GreyBox' && <GreyBox key={key} block={item} index={key} onChangeBlock={this.onChangeBlock} />}
                                    {/* Not being able to be selected anymore, decision: Hans @ 28/12/2021 */}
                                    {/* {item.type === 'InfinityLoop' && <InfinityLoop key={key} block={item} index={key} onChangeBlock={this.onChangeBlock}/>} */}
                                    {item.type === 'BulletText' && <BulletText key={key} block={item} index={key} onChangeBlock={this.onChangeBlock} />}
                                    {item.type === 'ParagraphTitle' && <ParagraphTitle key={key} block={item} index={key} onChangeBlock={this.onChangeBlock} />}
                                    {item.type === 'TitleBox' && <TitleBox key={key} block={item} index={key} onChangeBlock={this.onChangeBlock} uploadFile={uploadFile} />}
                                    {item.type === 'Image' && <Image key={key} block={item} index={key} onChangeBlock={this.onChangeBlock} uploadFile={uploadFile} />}
                                    {item.type === 'Image2' && <Image2 key={key} block={item} index={key} onChangeBlock={this.onChangeBlock} steps_images={this.props.steps_images} />}
                                    {item.type === 'Video' && <Video key={key} block={item} index={key} onChangeBlock={this.onChangeBlock} uploadFile={uploadFile} />}
                                    {item.type === 'CopyField' && <CopyField key={key} block={item} index={key} onChangeBlock={this.onChangeBlock} />}
                                    {item.type === 'DropdownHint' && (
                                        <DropdownHint
                                            key={item.content.remember_token}
                                            block={item}
                                            index={key}
                                            hints={hints}
                                            onChangeBlock={this.onChangeBlock}
                                            addHint={this.props.addHint}
                                            editHint={this.props.editHint}
                                            deleteHint={this.props.deleteHint}
                                            course_id={this.props.course_id}
                                        />
                                    )}
                                    {item.type === 'LearningPath' && (
                                        <LearningPathSelectBox
                                            key={key}
                                            block={item}
                                            index={key}
                                            onChangeBlock={this.onChangeBlock}
                                            learningPaths={this.props.learningPaths}
                                        />
                                    )}

                                </div>

                            </Col>
                        </Row>
                    ))
                }
                <div className="add-paragraph bottom-button">
                    <Button type="link" className="add-component-btn-bottom" onClick={() => this.props.addComponent()}>
                        <Icon type="plus-circle" />
                        Add Component
                    </Button>
                    <Button type="link" className="add-saved-component-btn-bottom" onClick={() => this.showAddSavedComponentModal(false)}>
                        <Icon type="plus-circle" />
                        Add saved component
                    </Button>
                </div>
                <Modal
                    title="Saved Components"
                    width={580}
                    visible={this.state.addSavedComponentModalVisible}
                    onCancel={this.handleCancel}
                    footer={null}
                    className="stored-components-modal"
                >
                    <div>
                        <Table dataSource={favorites} rowKey={item => item.id} pagination={{ position: 'bottom', pageSize: 6 }}>
                            <Column title="Title" dataIndex="title" key="title" />
                            <Column
                                title={() => (
                                    <Input
                                        value={searchTitle}
                                        placeholder="Search by title"
                                        onChange={this.searchTitle}
                                    />
                                )}
                                key="search"
                            />
                            <Column
                                title="Actions"
                                key="action"
                                className="stored-components-actions"
                                render={(text, record) => (
                                    <span>
                                        <Button type="link" onClick={() => this.previewComponent(record.component)}>Preview</Button>
                                        <Divider type="vertical" />
                                        <Button type="link" onClick={() => this.addSavedComponent(record.component)}>Restore</Button>
                                    </span>
                                )}
                            />
                        </Table>
                    </div>
                </Modal>
                <PreviewFavorites
                    visible={this.state.previewComponent}
                    toggleModal={this.togglePreviewComponentModel}
                    content={selectedComponent}
                    hints={hints}
                    onChangeBlock={this.onChangeBlock}
                    addHint={this.props.addHint}
                    editHint={this.props.editHint}
                    deleteHint={this.props.deleteHint}
                    course_id={this.props.course_id}
                />
            </div>
        );
    }
}
