import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
    Input, Tabs, message, Button, Icon, Affix,
} from 'antd';
import LearningPaths from '../learningPaths/LearningPaths';

const { TabPane } = Tabs;
const { TextArea } = Input;

class EditCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            loading: false,
        };
    }

    componentDidMount() {
        const { getIntroductionByCategory, match: { params: { id } } } = this.props;
        getIntroductionByCategory(id);
    }

    UNSAFE_componentWillReceiveProps(props) {
        const { category } = props;
        const { name, description } = category;
        this.setState({ name, description });
    }

    handleOnChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    updateCategory = () => {
        const { match: { params: { id } }, getCategory } = this.props;
        const { name, description } = this.state;
        const { updateCategory } = this.props;
        if (!name) {
            return message.error('Please fill in the name');
        }
        this.setState({ loading: true });
        updateCategory(id, { name, description }).then(res => {
            this.setState({ loading: false });
            if (res === true) {
                getCategory(id);
                return message.success('updated!');
            }
            return message.error(res.message);
        }).catch(err => console.error('Error updating category: ', err));
        return true;
    }

    goBack = () => {
        const { history } = this.props;
        history.push('/platform/admin/categories');
    }

    render() {
        const {
            name, description, loading,
        } = this.state;
        const {
            learningPaths, createLearningPath, editLearningPath, deleteLearningPath, getLearningPaths,
            category, introByCategory, uploadImage, uploadVideo, examCourses, courses,
        } = this.props;
        const leftArrow = {
            float: 'left',
            marginTop: '5px',
            marginRight: '10px',
        };
        return (
            <div className="editCourseContainer">
                <Affix offsetTop={64}>
                    <div className="categoryName">
                        <Icon type="left" onClick={this.goBack} style={leftArrow} />
                        <h1>{category.name}</h1>
                    </div>
                </Affix>
                <div className="tabsContainer">
                    <Tabs>
                        <TabPane tab='Category' key='1'>
                            <div className="editCourse editEvent">
                                <div className="small-input">
                                    <span className="inputSpan">Name</span>
                                    <Input name="name" placeholder="Name" value={name} onChange={this.handleOnChange} />
                                </div>
                                <div className="small-input">
                                    <span className="inputSpan">Description</span>
                                    <TextArea rows={3} name='description' value={description} onChange={this.handleOnChange} />
                                </div>
                                <div className="savePreviewContainer">
                                    <Button type="primary" loading={loading} onClick={this.updateCategory}>
                                        Save
                                        <Icon type="save" />
                                    </Button>
                                </div>
                            </div>
                        </TabPane>
                        <TabPane tab='Learning Paths' key='2'>
                            <LearningPaths
                                examCourses={examCourses}
                                courses={courses}
                                learningPaths={learningPaths}
                                createLearningPath={createLearningPath}
                                editLearningPath={editLearningPath}
                                deleteLearningPath={deleteLearningPath}
                                getLearningPaths={getLearningPaths}
                                category={category}
                                introByCategory={introByCategory}
                                uploadImage={uploadImage}
                                uploadVideo={uploadVideo}
                            />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}

export { EditCategory };
export default withRouter(EditCategory);
