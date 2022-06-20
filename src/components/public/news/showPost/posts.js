import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import HTMLSanitize from '../../../HTMLSanitize/HTMLSanitize';

const Posts = props => {
    const { post } = props;
    const { courses, fellows } = post;
    const token = localStorage.getItem('token');
    return (
        <>
            <section className='posts'>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <img
                                src={post.image}
                                alt=""
                                className='img-fluid post-img-big'
                            />
                            <p className="text-post">
                                <HTMLSanitize content={post.text} />
                            </p>
                            <div className="by">
                                <p>
                                    <span className="nameBy">
                                        By
                                        {' '}
                                        {post.author_name}
                                    </span>
                                    <span className="published">
                                        Published On:
                                        {' '}
                                        {moment(post.created_at).format('DD/MM/YYYY')}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            {
                                courses.map((item, key) => {
                                    if (key < 2) {
                                        return (
                                            <div key={key} className="related" id="second-animation">
                                                <h1>Related course</h1>
                                                <div className="line" />
                                                <Link to={token ? `/platform/course-information/${item.id}` : `/course-information/${item.id}`}>{item.title}</Link>
                                                <img src={item.image} alt="" className="img-fluid" />
                                            </div>
                                        );
                                    }
                                    return false;
                                })
                            }

                            {
                                fellows.map((item, key) => (
                                    <div key={key} className="related" id="fourth-animation">
                                        <h1>Fellow</h1>
                                        {
                                            item.fellow
                                            && (
                                                <img
                                                    src={item.fellow.image}
                                                    alt=""
                                                    className="img-fluid"
                                                    style={{ borderRadius: '10px' }}
                                                />
                                            )
                                        }
                                        <p>{`${item.firstname} ${item.lastname}`}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Posts;
