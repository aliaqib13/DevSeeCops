import React from 'react';
import { Button, Timeline, Icon } from 'antd';
import './lab-steps.scss';
import {
    TitleBox, InformationBox, BulletText, ParagraphTitle,
    SingleText, GreyBox, HeartBox, CodeSnippet, Video, Image,
    Image2, InfinityLoop, DropdownHint, CopyField, UploadImageByUser,
} from '../blocks';

const { Item } = Timeline;

const labSteps = props => {
    const {
        currentStep, chapters, showDone, hint_is_open,
        updateOpenHints, active_lab_id, getRemainingHintsCount,
        user_level, getHintMessage, uploadFile, uploadLabImage, lab_id, getLabImage, deleteLabImage, finished, stages, completed_steps,
    } = props;

    let currentStepContentBlocks;
    if (chapters[currentStep]) {
        currentStepContentBlocks = chapters[currentStep].contentBlocks;
    } else if (currentStep > 0 && chapters[currentStep - 1]) {
        currentStepContentBlocks = chapters[currentStep - 1].contentBlocks;
    } else if (chapters[0]) {
        currentStepContentBlocks = chapters[0].contentBlocks;
    } else {
        currentStepContentBlocks = [];
    }

    return (
        <div className='stepPageContent'>
            <div className="stepPageContent-wrapper">
                <div className="stepsContainer">
                    <Timeline reverse={false} current={currentStep}>
                        {chapters.map((item, key) => {
                            const isCompleted = completed_steps && completed_steps.includes(key);
                            if (isCompleted
                                    || (item.states && item.states.length
                                    && item.states.every(value => stages.includes(value.title)))) {
                                return (
                                    <Item
                                        key={key}
                                        color={currentStep === key ? 'blue' : 'green'}
                                        dot={<Icon type="check" style={{ fontSize: '16px' }} />}
                                        className="has-cursor step-item"
                                        onClick={() => props.selectStep(key)}
                                    >
                                        {item.title}
                                        {' '}

                                    </Item>
                                );
                            } if (currentStep > key) {
                                return (
                                    <Item
                                        key={key}
                                        color="green"
                                        dot={!isCompleted ? ''
                                            : <Icon type="check" style={{ fontSize: '16px' }} />}
                                        className="has-cursor step-item"
                                        onClick={() => props.selectStep(key)}
                                    >
                                        {item.title}
                                        {' '}

                                    </Item>
                                );
                            } if (currentStep === key) {
                                return (
                                    <Item
                                        key={key}
                                        color="blue"
                                        dot={!isCompleted ? ''
                                            : <Icon type="check" style={{ fontSize: '16px' }} />}
                                        className="has-cursor step-item"
                                        onClick={() => props.selectStep(key)}
                                    >
                                        {item.title}
                                        {' '}

                                    </Item>
                                );
                            }
                            return (
                                <Item
                                    key={key}
                                    color={isCompleted ? 'green' : 'grey'}
                                    className="has-cursor step-item"
                                    dot={!isCompleted ? ''
                                        : <Icon type="check" style={{ fontSize: '16px' }} />}
                                    onClick={() => props.selectStep(key)}
                                >
                                    {item.title}
                                </Item>
                            );
                        })}
                    </Timeline>
                </div>

                <div className="contentContainer">
                    <div className="steps-content">
                        {currentStepContentBlocks.map((item, key) => {
                            let image_2_url = '';

                            if (item.type === 'Image2' && item.content.uuid) {
                                const content = props.steps_images.find(img => img.uuid === item.content.uuid);
                                if (content) {
                                    image_2_url = content.image;
                                }
                            }

                            return (
                                <div key={key}>
                                    { item.type === 'TitleBox' && <TitleBox content={item.content} /> }
                                    { item.type === 'BulletText' && <BulletText content={item.content} /> }
                                    { item.type === 'InformationBox' && <InformationBox content={item.content} /> }
                                    { item.type === 'ParagraphTitle' && <ParagraphTitle content={item.content} /> }
                                    { item.type === 'SingleText' && <SingleText content={item.content} /> }
                                    { item.type === 'GreyBox' && <GreyBox content={item.content} /> }
                                    { item.type === 'HeartBox' && <HeartBox content={item.content} /> }
                                    { item.type === 'InfinityLoop' && <InfinityLoop content={item.content} /> }
                                    { item.type === 'Image' && <Image content={item.content} /> }
                                    { item.type === 'Image2' && <Image2 content={{ image: image_2_url }} /> }
                                    { item.type === 'Video' && <Video content={item.content} /> }
                                    { item.type === 'CodeSnippet' && <CodeSnippet content={item.content} /> }
                                    { item.type === 'CopyField' && <CopyField content={item.content} /> }
                                    { item.type === 'UploadImageByUser' && (
                                        <UploadImageByUser
                                            content={item.content}
                                            uploadFile={uploadFile}
                                            uploadLabImage={uploadLabImage}
                                            stepTitle={chapters[currentStep].title}
                                            lab_id={lab_id}
                                            getLabImage={getLabImage}
                                            deleteLabImage={deleteLabImage}
                                        />
                                    )}
                                    { item.type === 'DropdownHint' && !finished && (
                                        <DropdownHint
                                            content={item.content}
                                            getRemainingHintsCount={getRemainingHintsCount}
                                            hintIsOpen={hint_is_open}
                                            updateOpenHints={updateOpenHints}
                                            active_lab_id={active_lab_id}
                                            userLevel={user_level}
                                            getHintMessage={getHintMessage}
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <div className="steps-action">

                        {
                            chapters.length === currentStep + 1
                                ? (
                                    <Button className='nav-button check-results' disabled={showDone} onClick={props.done}>
                                        Check Results
                                    </Button>
                                )
                                : (
                                    <Button className='nav-button' onClick={() => props.next()} disabled={currentStep >= chapters.length - 1}>
                                        Next
                                    </Button>
                                )
                        }
                        <div className="stepsCount" data-id={currentStep}>
                            {currentStep + 1}
                            /
                            {chapters.length}
                        </div>
                        <Button className='nav-button' onClick={() => props.prev()} disabled={currentStep <= 0}>
                            Previous
                        </Button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default labSteps;
