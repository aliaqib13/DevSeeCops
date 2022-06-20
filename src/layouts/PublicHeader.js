import React, { Component } from 'react';
import { Icon, Layout } from 'antd';
import './PublicHeader.scss';
import { Link, withRouter } from 'react-router-dom';

const { Header } = Layout;

class PublicHeader extends Component {
    render() {
        const { menuCollapsed, isMobile } = this.props;

        return (
            <Header className="publicHeader" style={{ width: isMobile ? '100%' : menuCollapsed ? 'calc(100% - 80px)' : 'calc(100% - 200px)' }}>
                <div className="triggerContainer">
                    <Icon
                        className="trigger"
                        type="menu-unfold"
                        onClick={this.props.toggle}
                    />
                </div>
                <div className="rightContainer">
                    <div className="authContainer">
                        <div className="loginContainer">
                            <Link to="/login">
                                Login
                                <Icon type="login" />
                            </Link>
                        </div>
                    </div>
                </div>
            </Header>
        );
    }
}

export default withRouter(PublicHeader);
