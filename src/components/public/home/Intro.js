import React from 'react';

function scrollTo(e, id) {
    const section = document.getElementById(id);
    e.preventDefault();

    window.scrollTo({
        behavior: section ? 'smooth' : 'auto',
        top: section ? section.offsetTop - 136 : '136px',
    });
}

const Intro = () => (
    <>
        <div className="line" />
        <div className="container-fluid description-block">
            <div className="row">
                <div className="col-lg-4 offset-1" id="first-animation">
                    <img src="/img/images/description.png" alt="" className="img-fluid desc-img" />
                </div>
                <div className="col-lg-7">
                    <ul className="description-block">
                        <li>
                            <div className="d-flex align-items-center">
                                <img
                                    src="/img/images/Free-beginner-courses2.png"
                                    alt=""
                                    className="img-fluid intro_img"
                                />
                                <a
                                    className="homepage"
                                    id="third-animation"
                                    href="#sarah"
                                    onClick={e => scrollTo(e, 'sarah')}
                                >
                                    Free resources to determine your Learning Path
                                </a>
                            </div>
                        </li>
                        <li>
                            <div className="d-flex align-items-center">
                                <img
                                    src="/img/images/Academy-Tour-to-determine-your-learning-path2.png"
                                    alt=""
                                    className="img-fluid intro_img"
                                />
                                <a
                                    className="homepage"
                                    id="fourth-animation"
                                    href="#dennis"
                                    onClick={e => scrollTo(e, 'dennis')}
                                >
                                    How DevSecOps Academy works for you
                                </a>
                            </div>
                        </li>
                        <li>
                            <div className="d-flex align-items-center">
                                <img
                                    src="/img/images/important-for-your-career2.png"
                                    alt=""
                                    className="img-fluid intro_img"
                                />
                                <a
                                    className="homepage"
                                    id="second-animation"
                                    href="#why"
                                    onClick={e => scrollTo(e, 'why')}
                                >
                                    How DevSecOps strengthens your career
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </>
);

export default Intro;
