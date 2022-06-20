import React from 'react';
import { withRouter } from 'react-router-dom';

const goToLogin = props => {
    props.history.push('/login');
    window.scrollTo(0, 0);
};

const SectionStart = props => (
    <section id="start">
        <h1
            className="title-heading-center fusion-responsive-typography-calculated"
            id="eleventh-animation"
            style={{
                fontFamily: "'Open Sans',sans-serif", fontWeight: '600', margin: '5px 5px 30px', color: 'rgb(255, 255, 255)', fontSize: '35px', lineHeight: '1.16',
            }}
            data-fontsize="35"
            data-lineheight="40.6px"
        >
            Determine your DevSecOps Learning Path
            <br />
            with the free Introduction Tour
        </h1>
        <span onClick={() => goToLogin(props)} className="animate__animated animate__fadeInUp fusion-button button-flat fusion-button-default-size button-custom button-6 fusion-button-default-span fusion-button-default-type">
            <span className="fusion-button-text">Start</span>
        </span>
    </section>
);

export default withRouter(SectionStart);
