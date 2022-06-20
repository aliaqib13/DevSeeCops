import React, { Component } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu, Dropdown } from 'antd';
import ReactGA from 'react-ga';
import { CATEGORIES, ACTIONS } from '../util/GAEventConstants';
import { getAuthUser } from '../store/actions/auth';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        };
        Promise.all(
            [import('bootstrap/dist/css/bootstrap.css').then().catch()],
            [import('./landingStyles/header.scss').then().catch()],
        ).then(() => {
            setTimeout(() => {
                this.setState({ loaded: true });
            }, 0);
        });
    }

    componentDidMount() {
        if (localStorage.getItem('token')) {
            this.props.getAuthUser();
        }
    }

    componentWillUnmount() {
        window.location.reload();
    }

    handleMenu = page => {
        const menu = document.getElementById('exampleModal');
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
        if (page) {
            this.handleGAEvent(page);
        }
    }

    handleGAEvent = page => {
        if (page === 'fellowship') {
            ReactGA.event({
                category: CATEGORIES.WEBSITE_NAVIGATION,
                action: ACTIONS.ACCESSED_FELLOWSHIP_PAGE(),
                label: 'Clicked on "fellowship" in header',
            });
            return true;
        }
        if (page === 'for-business') {
            ReactGA.event({
                category: CATEGORIES.WEBSITE_NAVIGATION,
                action: ACTIONS.ACCESSED_BUSINESS_PAGE(),
                label: 'Clicked on "for business" in header',
            });
            return true;
        }
        if (page === 'academy-tour') {
            ReactGA.event({
                category: CATEGORIES.WEBSITE_NAVIGATION,
                action: ACTIONS.ACCESSED_INTRODUCTION_TOUR_PAGE(),
                label: 'Clicked on "Introduction Tour" in header',
            });
            return true;
        }
        return true;
    }

    render() {
        const { user } = this.props.auth;
        const token = localStorage.getItem('token');
        const menu = (
            <Menu>
                <Menu.Item key="0">
                    <a rel="noopener noreferrer" href={token ? '/platform/courses' : '/courses'}>
                        All Courses
                    </a>
                </Menu.Item>
                <Menu.Item key="1">
                    <a rel="noopener noreferrer" href="/platform/academy-tour" onClick={() => this.handleGAEvent('academy-tour')}>
                        Introduction Tour
                    </a>
                </Menu.Item>
                <Menu.Item key="2">
                    <a rel="noopener noreferrer" href="/platform/learning-paths">
                        Learning Paths
                    </a>
                </Menu.Item>
            </Menu>
        );

        return (
            <>
                {
                    (this.state.loaded)
                    && (
                        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                            <div className="container">
                                <Link to="/">
                                    <img
                                        src="/img/images/DevSecOps-academy-wit.png"
                                        srcSet="/img/images/DevSecOps-academy-wit.png 1x, /img/images/DevSecOps-academy-wit-retina.png 2x"
                                        width="150"
                                        height="96"
                                        style={{ maxHeight: '96px', height: 'auto' }}
                                        alt="DevSecOps Logo"
                                        data-retina_logo_url="/img/images/DevSecOps-academy-wit-retina.png"
                                        className="fusion-standard-logo"
                                        data-testid="homepage-header-logo"

                                    />
                                </Link>
                                <button
                                    className="navbar-toggler"
                                    type="button"
                                    data-toggle="modal"
                                    data-target="#exampleModal"
                                    onClick={this.handleMenu}
                                >
                                    <span className="navbar-toggler-icon" />
                                </button>

                                <div
                                    className="modal"
                                    id="exampleModal"
                                    tabIndex="-1"
                                    role="dialog"
                                    aria-labelledby="exampleModalLabel"
                                    aria-hidden="true"
                                >
                                    <button
                                        type="button"
                                        className="close"
                                        data-dismiss="modal"
                                        aria-label="Close"
                                        onClick={this.handleMenu}
                                    >
                                        <span aria-hidden="true" style={{ color: '#fff!important' }}>&times;</span>
                                    </button>
                                    <div className="" role="document">
                                        <Link to="/">
                                            <img
                                                src="/img/images/DevSecOps-academy-wit.png"
                                                alt=""
                                                className="img-fluid d-block mx-auto"
                                                style={{
                                                    marginTop: '50px',
                                                    marginBottom: '10px',
                                                }}
                                            />
                                        </Link>

                                        <ul className="navbar-nav ml-auto">
                                            <NavLink className="nav-item" onClick={this.handleMenu} to="/what-we-are">
                                                <p className="fusion-textcolor-highlight nav-link">
                                                    <span className="menu-text">Who we are</span>
                                                </p>
                                            </NavLink>
                                            <p className="nav-link fusion-textcolor-highlight">
                                                <Dropdown overlay={menu} trigger={['hover', 'click']}>
                                                    <span className="ant-dropdown-link menu-text">Our Courses</span>
                                                </Dropdown>
                                            </p>
                                            <NavLink className="nav-item" onClick={() => this.handleMenu('fellowship')} to="/fellowship">
                                                <p className="fusion-textcolor-highlight nav-link">
                                                    <span className="menu-text">Fellowship</span>
                                                </p>
                                            </NavLink>
                                            <NavLink className="nav-item" onClick={() => this.handleMenu('for-business')} to="/for-business">
                                                <p className="fusion-textcolor-highlight nav-link">
                                                    <span className="menu-text">For Business</span>
                                                </p>
                                            </NavLink>
                                            <a
                                                className="nav-item"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                href='https://devsecopsacademy.recruitee.com/'
                                            >
                                                <p className="fusion-textcolor-highlight nav-link">
                                                    <span className="menu-text">Careers</span>
                                                </p>
                                            </a>
                                            {
                                                user
                                                    ? (
                                                        <>
                                                            <NavLink
                                                                className="menu-item  menu-item-type-custom menu-item-object-custom menu-item-1260 fusion-menu-item-button"
                                                                to="/platform"
                                                            >
                                                                <p className="fusion-textcolor-highlight nav-link">
                                                                    <span
                                                                        className="menu-text fusion-button button-default button-small"
                                                                    >
                                                                        {`${user.firstname} ${user.lastname}`}
                                                                    </span>
                                                                </p>
                                                            </NavLink>
                                                            <NavLink
                                                                className="menu-item  menu-item-type-custom menu-item-object-custom menu-item-1260 fusion-menu-item-button"
                                                                to="platform/edit-profile"
                                                            >
                                                                <p className="fusion-textcolor-highlight nav-link">
                                                                    <img src="/img/images/user.svg" alt="" className='user' />
                                                                </p>
                                                            </NavLink>
                                                            <NavLink
                                                                className="menu-item  menu-item-type-custom menu-item-object-custom menu-item-1260 fusion-menu-item-button"
                                                                to="platform/notifications"
                                                            >
                                                                <p className="fusion-textcolor-highlight nav-link">
                                                                    <img src="/img/images/bell.svg" alt="" className='bell' />
                                                                </p>
                                                            </NavLink>
                                                        </>
                                                    )
                                                    : (
                                                        <>
                                                            <a
                                                                rel="noopener noreferrer"
                                                                className="menu-item  menu-item-type-custom menu-item-object-custom menu-item-1260 fusion-menu-item-button"
                                                                href="/login"
                                                            >
                                                                <p className="fusion-textcolor-highlight nav-link">
                                                                    <span
                                                                        className="menu-text fusion-button button-default button-small"
                                                                    >
                                                                        Login
                                                                    </span>
                                                                </p>
                                                            </a>
                                                            <a
                                                                rel="noopener noreferrer"
                                                                className="menu-item  menu-item-type-custom menu-item-object-custom menu-item-1260 fusion-menu-item-button"
                                                                href="/register"
                                                            >
                                                                <p className="fusion-textcolor-highlight nav-link">
                                                                    <span
                                                                        className="menu-text fusion-button button-default button-small"
                                                                    >
                                                                        Register now
                                                                    </span>
                                                                </p>
                                                            </a>
                                                        </>
                                                    )
                                            }
                                        </ul>
                                    </div>
                                </div>

                                <div className="collapse navbar-collapse" id="navbarNav">
                                    <NavLink className="nav-item" to="/what-we-are">
                                        <p className="nav-link fusion-textcolor-highlight">
                                            <span className="menu-text">Who we are</span>
                                        </p>
                                    </NavLink>
                                    <p className="nav-link fusion-textcolor-highlight">
                                        <Dropdown overlay={menu}>
                                            <span className="ant-dropdown-link menu-text">Our Courses</span>
                                        </Dropdown>
                                    </p>
                                    <NavLink className="nav-item" onClick={() => this.handleGAEvent('fellowship')} to="/fellowship">
                                        <p className="nav-link fusion-textcolor-highlight">
                                            <span className="menu-text">Fellowship</span>
                                        </p>
                                    </NavLink>
                                    <NavLink className="nav-item" onClick={() => this.handleGAEvent('for-business')} to="/for-business">
                                        <p className="nav-link fusion-textcolor-highlight">
                                            <span className="menu-text">For Business</span>
                                        </p>
                                    </NavLink>
                                    <NavLink className="nav-item" to="/news">
                                        <p className="nav-link fusion-textcolor-highlight">
                                            <span className="menu-text">News</span>
                                        </p>
                                    </NavLink>
                                    <a
                                        className="nav-item"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href='https://devsecopsacademy.recruitee.com/'
                                    >
                                        <p className="nav-link fusion-textcolor-highlight">
                                            <span className="menu-text">Careers</span>
                                        </p>
                                    </a>
                                    {
                                        user
                                            ? (
                                                <>
                                                    <NavLink
                                                        className="menu-item  menu-item-type-custom menu-item-object-custom menu-item-1260 fusion-menu-item-button"
                                                        to="/platform"
                                                    >
                                                        <p className="fusion-textcolor-highlight nav-link">
                                                            <span
                                                                className="menu-text fusion-button button-default button-small"
                                                            >
                                                                {`${user.firstname} ${user.lastname}`}
                                                            </span>
                                                        </p>
                                                    </NavLink>
                                                    <NavLink
                                                        className="menu-item  menu-item-type-custom menu-item-object-custom menu-item-1260 fusion-menu-item-button"
                                                        to="/platform/edit-profile"
                                                    >
                                                        <p className="fusion-textcolor-highlight nav-link">
                                                            <img src="/img/images/user.svg" alt="" className='user' />
                                                        </p>
                                                    </NavLink>
                                                    <NavLink
                                                        className="menu-item  menu-item-type-custom menu-item-object-custom menu-item-1260 fusion-menu-item-button"
                                                        to="/platform/notifications"
                                                    >
                                                        <p className="fusion-textcolor-highlight nav-link">
                                                            <img src="/img/images/bell.svg" alt="" className='bell' />
                                                        </p>
                                                    </NavLink>
                                                </>
                                            )
                                            : (
                                                <>
                                                    <a
                                                        rel="noopener noreferrer"
                                                        className="menu-item  menu-item-type-custom menu-item-object-custom menu-item-1260 fusion-menu-item-button"
                                                        href="/login"
                                                    >
                                                        <p className="fusion-textcolor-highlight nav-link">
                                                            <span
                                                                className="menu-text fusion-button button-default button-small"
                                                            >
                                                                Login
                                                            </span>
                                                        </p>
                                                    </a>
                                                    <a
                                                        rel="noopener noreferrer"
                                                        className="menu-item  menu-item-type-custom menu-item-object-custom menu-item-1260 fusion-menu-item-button"
                                                        href="/register"
                                                    >
                                                        <p className="fusion-textcolor-highlight nav-link">
                                                            <span
                                                                className="menu-text fusion-button button-default button-small"
                                                            >
                                                                Register now
                                                            </span>
                                                        </p>
                                                    </a>
                                                </>
                                            )
                                    }
                                </div>
                            </div>
                        </nav>
                    )

                }
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
    };
}

function mapDispatchToPros(dispatch) {
    return {
        getAuthUser: () => dispatch(getAuthUser()),
    };
}

export { Header };
export default connect(mapStateToProps, mapDispatchToPros)(withRouter(Header));
