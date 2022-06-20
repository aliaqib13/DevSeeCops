import React from 'react';
import { Row, Col } from 'antd';
import {
    TitleBox, InformationBox, BulletText,
    ParagraphTitle, SingleText, GreyBox, HeartBox,
    CodeSnippet, Video, Image, InfinityLoop,
    DropdownHint, CopyField, Image2,
} from '../../blocks';

export default function PreviewFavoriteSteps(props) {
    return (
        <>
            {
                props.step
                    ? (
                        <div className='chapters-container'>
                            <Row className="stepsRow">
                                <Col span={18} className="contentCol">
                                    <div className="steps-content">
                                        {
                                            props.step.contentBlocks.map((item, key) => {
                                                let image_2_url = '';

                                                if (item.type === 'Image2' && item.content.uuid) {
                                                    const content = this.props.steps_images.find(img => img.uuid === item.content.uuid);
                                                    if (content) {
                                                        image_2_url = content.image;
                                                    }
                                                }

                                                return (
                                                    <div
                                                        key={key}
                                                        className={item.type === 'Image' ? 'imageContainer' : ''}
                                                    >
                                                        {item.type === 'TitleBox' && <TitleBox content={item.content} />}
                                                        {item.type === 'BulletText' && <BulletText content={item.content} />}
                                                        {item.type === 'InformationBox'
                                                    && <InformationBox content={item.content} />}
                                                        {item.type === 'ParagraphTitle'
                                                    && <ParagraphTitle content={item.content} />}
                                                        {item.type === 'SingleText' && <SingleText content={item.content} />}
                                                        {item.type === 'GreyBox' && <GreyBox content={item.content} />}
                                                        {item.type === 'HeartBox' && <HeartBox content={item.content} />}
                                                        {item.type === 'InfinityLoop'
                                                    && <InfinityLoop content={item.content} />}
                                                        {item.type === 'Image' && <Image content={item.content} />}
                                                        {item.type === 'Image2' && <Image2 content={{ image: image_2_url }} />}
                                                        {item.type === 'Video' && <Video content={item.content} />}
                                                        {item.type === 'CodeSnippet'
                                                    && <CodeSnippet content={item.content} />}
                                                        {item.type === 'CopyField' && <CopyField content={item.content} />}
                                                        {item.type === 'DropdownHint' && (
                                                            <DropdownHint
                                                                adminPreview
                                                                getHintMessage={props.getHintMessage}
                                                                content={item.content}
                                                            />
                                                        )}
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    ) : 'Favorite Step Not Found'
            }
        </>

    );
}
