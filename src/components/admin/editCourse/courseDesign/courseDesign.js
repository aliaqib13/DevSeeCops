import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Input, Empty } from 'antd';
import parse from 'html-react-parser';
import './courseDesign.scss';

class CourseDesign extends Component {
    formatName = html => {
        const name = html.split('<br />')[0];
        return name.replace('<p>', '');
    }

    formatValue = value => parse(value)

    render() {
        const { courseDesigns } = this.props;
        return (
            courseDesigns.length
                ? (
                    <div className="editCourse">
                        {courseDesigns.map(courseDesign => (
                            <div className="small-input">
                                <span className="inputSpan">{this.formatName(courseDesign.draftCourseField.name)}</span>
                                {typeof this.formatValue(courseDesign.value) === 'string'
                                    ? (
                                        <Input
                                            value={this.formatValue(courseDesign.value)}
                                            disabled
                                            className="course-design-input"
                                        />
                                    )
                                    : <div className="course-design-cont">{this.formatValue(courseDesign.value)}</div>}
                            </div>
                        )) }
                    </div>
                ) : <Empty />
        );
    }
}

export { CourseDesign };
export default withRouter(CourseDesign);
