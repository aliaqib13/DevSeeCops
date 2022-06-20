import React, { Component } from 'react';
import './learning-paths-view.scss';
import LearningPath from './learning-path';

class LearningPathCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: [],
        };
    }

    getLabCount = courses => {
        let labCount = 0;
        courses.map(courseData => (
            labCount += courseData.course ? courseData.course.labs.length : 0
        ));
        return labCount;
    }

    handleVideo = index => {
        const { visible } = this.state;
        visible[index] = !visible[index];
        this.setState({ visible }, () => {
            setTimeout(() => {
                const video = document.getElementById(`video-popup-${index}`);
                if (video) {
                    this.state.visible[index] ? video.play() : video.pause();
                }
            }, 1000);
        });
    }

    scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    render() {
        const {
            category, introduction, learningPathCategory, user, createNotifyMe, getPlannedCourses, notifyCourses,
        } = this.props;
        return (
            <div className="learning-path-category">
                <div className="heading">
                    <img
                        src={`/img/categories/ID_${category.id}.png`}
                        alt="intro"
                        width={category.name === 'Mobile Security' ? '30' : '60'}
                        className="learning-path-heading"
                    />
                    <h4>
                        <strong>
                            {`${category.name} Learning Paths`}
                        </strong>
                    </h4>
                </div>
                {introduction && (
                    <div className="description_block">
                        <img src={introduction.image} alt="intro" width="120" />
                        <div className="intro-cont">
                            <strong>{introduction.title}</strong>
                            <div className="intro-description">{introduction.description}</div>
                        </div>
                    </div>
                )}
                {learningPathCategory.map((item, index) => (
                    <LearningPath
                        key={index}
                        item={item}
                        modalVisible={this.state.visible[index]}
                        handleVideo={this.handleVideo}
                        getLabCount={this.getLabCount}
                        user={user}
                        index={index}
                        createNotifyMe={createNotifyMe}
                        getPlannedCourses={getPlannedCourses}
                        notifyCourses={notifyCourses}
                        showArrow
                    />
                ))}
                <svg xmlns="http://www.w3.org/2000/svg" width="25.538" height="23.757" viewBox="0 0 25.538 23.757" className="double-arrow" onClick={this.scrollToTop}>
                    <g id="Group_262" data-name="Group 262" transform="translate(-1755.375 -2370)">
                        <g id="next_1_" data-name="next (1)" transform="translate(1755.375 2383.757) rotate(-90)">
                            <g id="Group_255" data-name="Group 255" transform="translate(0 0)">
                                <path id="Path_289" data-name="Path 289" d="M13.469,13.469,1.677,25.262a.983.983,0,0,1-1.389-1.39l11.1-11.1L.288,1.677A.983.983,0,0,1,1.677.288L13.469,12.08A.983.983,0,0,1,13.469,13.469Z" transform="translate(0 0)" fill="#032140" />
                            </g>
                        </g>
                        <g id="next_1_2" data-name="next (1)" transform="translate(1755.375 2393.757) rotate(-90)">
                            <g id="Group_255-2" data-name="Group 255" transform="translate(0 0)">
                                <path id="Path_289-2" data-name="Path 289" d="M13.469,13.469,1.677,25.262a.983.983,0,0,1-1.389-1.39l11.1-11.1L.288,1.677A.983.983,0,0,1,1.677.288L13.469,12.08A.983.983,0,0,1,13.469,13.469Z" transform="translate(0 0)" fill="#032140" />
                            </g>
                        </g>
                    </g>
                </svg>

            </div>
        );
    }
}

export default LearningPathCategory;
