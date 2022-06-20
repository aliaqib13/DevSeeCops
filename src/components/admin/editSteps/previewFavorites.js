import React, { Component } from 'react';
import { Button, Modal } from 'antd';
import SingleText from './blocks/SingleText';
import InformationBox from './blocks/InformationBox';
import HeartBox from './blocks/HeartBox';
import CodeSnippet from './blocks/CodeSnippet';
import GreyBox from './blocks/GreyBox';
import InfinityLoop from './blocks/InfinityLoop';
import BulletText from './blocks/BulletText';
import ParagraphTitle from './blocks/ParagraphTitle';
import TitleBox from './blocks/TitleBox';
import Image from './blocks/Image';
import Video from './blocks/Video';
import DropdownHint from './blocks/DropdownHint';
import CopyField from './blocks/CopyField';
import UploadImageByUser from '../../blocks/UploadImageByUser/UploadImageByUser';

export default class previewFavorites extends Component {
    handleCancel = () => {
        this.props.toggleModal();
    }

    render() {
        const { content, visible, onChangeBlock } = this.props;
        return (
            <Modal
                title="Preview Component"
                className="preview-favorites-modal"
                width={1000}
                visible={visible}
                onCancel={this.handleCancel}
                footer={[
                    <Button key="back" onClick={this.handleCancel}>
                        Close
                    </Button>,
                ]}
            >
                { content
                    ? (
                        <div className='blocks-container'>
                            <div className="box-container">
                                {content.type === 'SingleText' && <SingleText block={content} onChangeBlock={onChangeBlock} preview />}
                                {content.type === 'InformationBox' && <InformationBox block={content} onChangeBlock={onChangeBlock} preview />}
                                {content.type === 'HeartBox' && <HeartBox block={content} onChangeBlock={onChangeBlock} preview />}
                                {content.type === 'CodeSnippet' && <CodeSnippet block={content} onChangeBlock={onChangeBlock} preview />}
                                {content.type === 'GreyBox' && <GreyBox block={content} onChangeBlock={onChangeBlock} preview />}
                                {content.type === 'InfinityLoop' && <InfinityLoop block={content} onChangeBlock={onChangeBlock} preview />}
                                {content.type === 'BulletText' && <BulletText block={content} onChangeBlock={onChangeBlock} preview />}
                                {content.type === 'ParagraphTitle' && <ParagraphTitle block={content} onChangeBlock={onChangeBlock} preview />}
                                {content.type === 'TitleBox' && <TitleBox block={content} onChangeBlock={onChangeBlock} preview />}
                                {content.type === 'Image' && <Image block={content} onChangeBlock={onChangeBlock} preview />}
                                {content.type === 'Video' && <Video block={content} onChangeBlock={onChangeBlock} preview />}
                                {content.type === 'CopyField' && <CopyField block={content} onChangeBlock={this.onChangeBlock} preview />}
                                {content.type === 'UploadImageByUser' && <UploadImageByUser block={content} demoMode />}
                                {content.type === 'DropdownHint' && (
                                    <DropdownHint
                                        block={content}
                                        hints={this.props.hints}
                                        onChangeBlock={this.onChangeBlock}
                                        addHint={this.props.addHint}
                                        editHint={this.props.editHint}
                                        deleteHint={this.props.deleteHint}
                                        course_id={this.props.course_id}
                                        preview
                                    />
                                )}
                            </div>
                        </div>
                    ) : <> </> }
            </Modal>
        );
    }
}
