import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Typography, message } from 'antd';
import {
    fetchSettings, createFaq, updateFaq, deleteFaq,
    uploadImage, updateRightSideBarContent, saveCEOConfigs,
    updateGlobalNotification, createGlobalNotification,
    getHelp, updateHelp,
} from '../../../store/actions/admin/settings';
import { fetchGeneralNotification } from '../../../store/actions/generalNotification';
import { searchCourse } from '../../../store/actions/admin/course';
import {
    createPost,
    fetchPosts,
    removePost,
    updatePost,
    searchFellow,
    fetchPostTags,
    updateTags,
    searchPostTag,
} from '../../../store/actions/admin/posts';
import FaqTab from '../../../components/admin/settings/faq';
import AcademyUpdates from '../../../components/admin/settings/homePage/sideBar';
import CEOConfigs from '../../../components/admin/settings/CEO';
import GeneralNotification from '../../../components/admin/settings/generalNotification';
import Help from '../../../components/admin/settings/help';
import Post from '../../../components/admin/settings/posts';

const { TabPane } = Tabs;
const { Title } = Typography;

class Settings extends Component {
    componentDidMount() {
        const loader = message.loading('Loading..');

        this.props.fetchSettings().then(res => {
            if (res !== true) {
                message.error(res.message);
            }
        });
        this.props.fetchPosts().then(res => {
            if (res === true) {
                message.success('fetched!!');
            }
        });
        loader();
    }

    render() {
        const {
            faq, homePage, CEO, globalNotification,
        } = this.props.adminSettings;
        return (
            <div className="admin-settings">
                <div className="page-title">
                    <Title>
                        Settings
                    </Title>
                </div>
                <Tabs defaultActiveKey="faq">
                    <TabPane tab="faq" key="faq">
                        <FaqTab
                            faq={faq}
                            createFaq={this.props.createFaq}
                            updateFaq={this.props.updateFaq}
                            deleteFaq={this.props.deleteFaq}
                        />
                    </TabPane>
                    <TabPane tab="Academy Updates" key="academy_updates">
                        <AcademyUpdates
                            sideBarContent={homePage}
                            uploadFile={this.props.uploadImage}
                            uploadContent={this.props.updateRightSideBarContent}
                        />
                    </TabPane>
                    <TabPane tab="CEO Configs" key="ceo_configs">
                        <CEOConfigs
                            configs={CEO}
                            saveConfigs={this.props.saveCEOConfigs}
                        />
                    </TabPane>
                    <TabPane tab="General Notification" key="general_notification">
                        <GeneralNotification
                            globalNotification={globalNotification}
                            updateGlobalNotification={this.props.updateGlobalNotification}
                            createGlobalNotification={this.props.createGlobalNotification}
                            fetchGeneralNotification={this.props.fetchGeneralNotification}

                        />
                    </TabPane>
                    <TabPane tab="Help" key="help">
                        <Help
                            uploadFile={this.props.uploadImage}
                            getHelp={this.props.getHelp}
                            updateHelp={this.props.updateHelp}
                        />
                    </TabPane>
                    <TabPane tab="Posts" key="posts">
                        <Post
                            searchUserByEmail={this.props.searchFellow}
                            searchCourse={this.props.searchCourse}
                            uploadImage={this.props.uploadImage}
                            createPost={this.props.createPost}
                            posts={this.props.posts}
                            removePost={this.props.removePost}
                            updatePost={this.props.updatePost}
                            fetchPosts={this.props.fetchPosts}
                            fetchPostTags={this.props.fetchPostTags}
                            updateTags={this.props.updateTags}
                            searchPostTag={this.props.searchPostTag}
                        />
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        adminSettings: state.adminSettings,
        posts: state.adminPosts,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchSettings: () => dispatch(fetchSettings()),
        createFaq: data => dispatch(createFaq(data)),
        updateFaq: (id, data) => dispatch(updateFaq(id, data)),
        deleteFaq: id => dispatch(deleteFaq(id)),
        uploadImage: (file, folder) => dispatch(uploadImage(file, folder)),
        updateRightSideBarContent: (id, data) => dispatch(updateRightSideBarContent(id, data)),
        saveCEOConfigs: configs => dispatch(saveCEOConfigs(configs)),
        updateGlobalNotification: data => dispatch(updateGlobalNotification(data)),
        createGlobalNotification: data => dispatch(createGlobalNotification(data)),
        fetchGeneralNotification: () => dispatch(fetchGeneralNotification()),
        updateHelp: data => dispatch(updateHelp(data)),
        getHelp: () => dispatch(getHelp()),
        searchFellow: email => dispatch(searchFellow(email)),
        searchCourse: keyword => dispatch(searchCourse(keyword)),
        createPost: data => dispatch(createPost(data)),
        fetchPosts: page => dispatch(fetchPosts(page)),
        removePost: id => dispatch(removePost(id)),
        updatePost: (id, data) => dispatch(updatePost(id, data)),
        fetchPostTags: () => dispatch(fetchPostTags()),
        updateTags: data => dispatch(updateTags(data)),
        searchPostTag: keyword => dispatch(searchPostTag(keyword)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
