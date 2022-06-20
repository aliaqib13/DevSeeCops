import React from 'react';
import { Link } from 'react-router-dom';

const PostInfo = props => {
    const { post } = props;
    return (
        <>
            <section className="info_name">
                <h1 id='fifth-animation'>{post.title}</h1>
            </section>
            <section className='direction'>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <p>
                                <span className='here'> You Are Currently Here:</span>
                                <span className='loc'>
                                    <Link to="/">Home</Link>
                                    {' '}
                                </span>
                                >
                                <span className='loc'>
                                    <Link to="/news">{(post.type === 'academy_news') ? 'Academy' : 'Community'}</Link>
                                    {' '}
                                </span>
                                >
                                <span className='loc'>{post.title}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default PostInfo;
