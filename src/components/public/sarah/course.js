import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga';
import { CATEGORIES, ACTIONS } from '../../../util/GAEventConstants';

class Course extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            subtitle: '',
            link: '',
        };
    }

    openDescription = (title, subtitle) => {
        this.setState({
            title,
            subtitle,
            link: 'Click to start your introduction tour',
        });
        if (window.innerWidth < 992) {
            document.getElementById('description_block').style.display = 'block';
        }
    };

    handleLinkTo = () => {
        const { auth: { user }, history } = this.props;
        ReactGA.event({
            category: CATEGORIES.WEBSITE_NAVIGATION,
            action: ACTIONS.ACCESSED_INTRODUCTION_TOUR_PAGE(),
            label: 'Sarah page',
        });
        return history.push(user ? '/platform/academy-tour' : '/login');
    }

    render() {
        const { title, subtitle, link } = this.state;
        return (
            <>
                <div id="course">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12" id="sarah-animation">
                                <h2 className="title-heading-left fusion-responsive-typography-calculated">
                                    Tour the introduction modules
                                    to determine your Learning Path
                                </h2>
                            </div>
                            <div className="col-lg-7" id="sarah-animation1">
                                <div style={{ position: 'relative' }}>
                                    <img src="/img/images/Group 331.png" alt="" className='loop' />
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                        width="1467.5"
                                        viewBox="0 0 1467.5 828.698"
                                    >
                                        <defs>
                                            <filter
                                                id="Path_317"
                                                x="125.8"
                                                y="121.376"
                                                width="1341.7"
                                                height="707.321"
                                                filterUnits="userSpaceOnUse"
                                            >
                                                <feOffset dy="3" />
                                                <feGaussianBlur stdDeviation="3" result="blur" />
                                                <feFlood floodOpacity="0.161" />
                                                <feComposite operator="in" in2="blur" />
                                                <feComposite in="SourceGraphic" />
                                            </filter>
                                            <filter
                                                id="_43101-Recovered"
                                                x="17.5"
                                                y="17.5"
                                                width="1399"
                                                height="767"
                                                filterUnits="userSpaceOnUse"
                                            >
                                                <feOffset dx="33" dy="35" />
                                                <feGaussianBlur stdDeviation="10" result="blur-2" />
                                                <feFlood floodOpacity="0.18" />
                                                <feComposite operator="in" in2="blur-2" />
                                                <feComposite in="SourceGraphic" />
                                            </filter>
                                            <filter
                                                id="_43101-Recovered-2"
                                                x="0"
                                                y="0"
                                                width="1369"
                                                height="735"
                                                filterUnits="userSpaceOnUse"
                                            >
                                                <feOffset dx="-1" dy="-1" />
                                                <feGaussianBlur stdDeviation="5.5" result="blur-3" />
                                                <feFlood floodOpacity="0.18" />
                                                <feComposite operator="in" in2="blur-3" />
                                                <feComposite in="SourceGraphic" />
                                            </filter>
                                            <filter
                                                id="Ellipse_11"
                                                x="600"
                                                y="296.698"
                                                width="171"
                                                height="171"
                                                filterUnits="userSpaceOnUse"
                                            >
                                                <feOffset dx="5" />
                                                <feGaussianBlur stdDeviation="10" result="blur-4" />
                                                <feFlood floodOpacity="0.302" />
                                                <feComposite operator="in" in2="blur-4" />
                                                <feComposite in="SourceGraphic" />
                                            </filter>
                                            <filter
                                                id="Ellipse_13"
                                                x="31.5"
                                                y="297.198"
                                                width="171"
                                                height="171"
                                                filterUnits="userSpaceOnUse"
                                            >
                                                <feOffset dx="5" />
                                                <feGaussianBlur stdDeviation="10" result="blur-5" />
                                                <feFlood floodOpacity="0.302" />
                                                <feComposite operator="in" in2="blur-5" />
                                                <feComposite in="SourceGraphic" />
                                            </filter>
                                            <filter
                                                id="Path_308"
                                                x="1168.5"
                                                y="297.198"
                                                width="171"
                                                height="171"
                                                filterUnits="userSpaceOnUse"
                                            >
                                                <feOffset dx="5" />
                                                <feGaussianBlur stdDeviation="10" result="blur-6" />
                                                <feFlood floodOpacity="0.302" />
                                                <feComposite operator="in" in2="blur-6" />
                                                <feComposite in="SourceGraphic" />
                                            </filter>
                                            <filter
                                                id="Ellipse_10"
                                                x="417.5"
                                                y="501.198"
                                                width="171"
                                                height="171"
                                                filterUnits="userSpaceOnUse"
                                            >
                                                <feOffset dx="5" />
                                                <feGaussianBlur stdDeviation="10" result="blur-7" />
                                                <feFlood floodOpacity="0.302" />
                                                <feComposite operator="in" in2="blur-7" />
                                                <feComposite in="SourceGraphic" />
                                            </filter>
                                            <linearGradient
                                                id="linear-gradient"
                                                x1="0.5"
                                                x2="0.5"
                                                y2="1"
                                                gradientUnits="objectBoundingBox"
                                            >
                                                <stop offset="0" stopColor="#549bcd" />
                                                <stop offset="1" stopColor="#5bc8ab" />
                                            </linearGradient>
                                            <filter
                                                id="Path_310"
                                                x="417.5"
                                                y="96.075"
                                                width="171"
                                                height="171"
                                                filterUnits="userSpaceOnUse"
                                            >
                                                <feOffset dx="5" />
                                                <feGaussianBlur stdDeviation="10" result="blur-8" />
                                                <feFlood floodOpacity="0.302" />
                                                <feComposite operator="in" in2="blur-8" />
                                                <feComposite in="SourceGraphic" />
                                            </filter>
                                            <filter
                                                id="Path_307"
                                                x="782.5"
                                                y="501.198"
                                                width="171"
                                                height="171"
                                                filterUnits="userSpaceOnUse"
                                            >
                                                <feOffset dx="5" />
                                                <feGaussianBlur stdDeviation="10" result="blur-9" />
                                                <feFlood floodOpacity="0.302" />
                                                <feComposite operator="in" in2="blur-9" />
                                                <feComposite in="SourceGraphic" />
                                            </filter>
                                            <filter
                                                id="Path_311"
                                                x="782.501"
                                                y="96.075"
                                                width="171"
                                                height="171"
                                                filterUnits="userSpaceOnUse"
                                            >
                                                <feOffset dx="5" />
                                                <feGaussianBlur stdDeviation="10" result="blur-10" />
                                                <feFlood floodOpacity="0.302" />
                                                <feComposite operator="in" in2="blur-10" />
                                                <feComposite in="SourceGraphic" />
                                            </filter>
                                            <filter
                                                id="Path_312"
                                                x="139"
                                                y="86.075"
                                                width="171"
                                                height="171"
                                                filterUnits="userSpaceOnUse"
                                            >
                                                <feOffset dx="5" />
                                                <feGaussianBlur stdDeviation="10" result="blur-11" />
                                                <feFlood floodOpacity="0.302" />
                                                <feComposite operator="in" in2="blur-11" />
                                                <feComposite in="SourceGraphic" />
                                            </filter>
                                            <filter
                                                id="Ellipse_12"
                                                x="1061"
                                                y="86.075"
                                                width="171"
                                                height="171"
                                                filterUnits="userSpaceOnUse"
                                            >
                                                <feOffset dx="5" />
                                                <feGaussianBlur stdDeviation="10" result="blur-12" />
                                                <feFlood floodOpacity="0.302" />
                                                <feComposite operator="in" in2="blur-12" />
                                                <feComposite in="SourceGraphic" />
                                            </filter>
                                            <filter
                                                id="Ellipse_9"
                                                x="1050.5"
                                                y="513.322"
                                                width="171"
                                                height="171"
                                                filterUnits="userSpaceOnUse"
                                            >
                                                <feOffset dx="5" />
                                                <feGaussianBlur stdDeviation="10" result="blur-13" />
                                                <feFlood floodOpacity="0.302" />
                                                <feComposite operator="in" in2="blur-13" />
                                                <feComposite in="SourceGraphic" />
                                            </filter>
                                            <filter
                                                id="Path_309"
                                                x="139"
                                                y="513.322"
                                                width="171"
                                                height="171"
                                                filterUnits="userSpaceOnUse"
                                            >
                                                <feOffset dx="5" />
                                                <feGaussianBlur stdDeviation="10" result="blur-14" />
                                                <feFlood floodOpacity="0.302" />
                                                <feComposite operator="in" in2="blur-14" />
                                                <feComposite in="SourceGraphic" />
                                            </filter>
                                            <filter
                                                id="Rectangle_27"
                                                x="476.428"
                                                y="200.698"
                                                width="600"
                                                height="279.145"
                                                filterUnits="userSpaceOnUse"
                                            >
                                                <feOffset />
                                                <feGaussianBlur stdDeviation="5" result="blur-15" />
                                                <feFlood floodOpacity="0.161" />
                                                <feComposite operator="in" in2="blur-15" />
                                                <feComposite in="SourceGraphic" />
                                            </filter>
                                            <image
                                                id="image"
                                                width="1336"
                                                height="702"
                                                xlinkHref="data:image/png;base64,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"
                                            />
                                        </defs>
                                        <g id="Group_434" data-name="Group 434" transform="translate(-3399.5 -2494.5)">
                                            <g id="Group_424" data-name="Group 424" transform="translate(-392 -2479)">
                                                <g
                                                    transform="matrix(1, 0, 0, 1, 3791.5, 4973.5)"
                                                    filter="url(#Path_317)"
                                                >
                                                    <path
                                                        id="Path_317-2"
                                                        data-name="Path 317"
                                                        d="M3863.324,6676.532l202.547,189.134,1121.152-6.745V6378.077l-204.5-201.733Z"
                                                        transform="translate(-3728.52 -6048.97)"
                                                        fill="rgba(217,217,217,0.13)"
                                                    />
                                                </g>
                                                <g
                                                    transform="matrix(1, 0, 0, 1, 3791.5, 4973.5)"
                                                    filter="url(#_43101-Recovered)"
                                                >
                                                    <use
                                                        id="_43101-Recovered-3"
                                                        data-name="43101-Recovered"
                                                        transform="translate(17.5 17.5)"
                                                        xlinkHref="#image"
                                                    />
                                                </g>
                                                <g
                                                    transform="matrix(1, 0, 0, 1, 3791.5, 4973.5)"
                                                    filter="url(#_43101-Recovered-2)"
                                                >
                                                    <use
                                                        id="_43101-Recovered-4"
                                                        data-name="43101-Recovered"
                                                        transform="translate(17.5 17.5)"
                                                        xlinkHref="#image"
                                                    />
                                                </g>
                                            </g>
                                            <g
                                                onClick={() => this.openDescription('Serverless', 'Engineer the assurance of code integrity,tight permissions, behavioral analysis,and conduct vulnerability assessments.')}
                                                className="hover_over_icon"
                                                id="hover_over_icon_313"
                                                transform="matrix(1, 0, 0, 1, 3399.5, 2494.5)"
                                                filter="url(#Ellipse_11)"
                                            >
                                                <circle
                                                    id="Ellipse_11-2"
                                                    data-name="Ellipse 11"
                                                    cx="55"
                                                    cy="55"
                                                    r="55"
                                                    transform="translate(735.5 327.2) rotate(90)"
                                                    fill=" url(#linear-gradient)"
                                                    stroke="rgba(0,0,0,0)"
                                                    strokeWidth="1"
                                                />
                                            </g>
                                            <g
                                                id="Group_313"
                                                data-name="Group 313"
                                                transform="translate(4033.645 2859.343)"
                                            >
                                                <path
                                                    id="Path_64"
                                                    data-name="Path 64"
                                                    d="M922.374,396.359c.733-.007,1.467,0,2.2,0,.2.4.338.814.5,1.223q1.064,2.664,2.127,5.331a5.1,5.1,0,0,0,.23.552.829.829,0,0,0,.337-.057c.288-.092.573-.2.868-.264.167.406.283.83.422,1.246-.4.161-.81.268-1.215.4-.468.132-.919.316-1.389.428-.051-.105-.1-.21-.145-.317-.351-.918-.727-1.826-1.083-2.742-.164-.371-.283-.76-.467-1.124-.486.7-.953,1.407-1.437,2.107-.305.476-.651.926-.952,1.4-.066.1-.138.227-.272.229-.54.024-1.077-.038-1.615-.042.6-.874,1.15-1.776,1.725-2.664.568-.845,1.1-1.715,1.659-2.563.058-.1.157-.208.124-.334-.046-.235-.147-.455-.214-.684a5.83,5.83,0,0,0-.245-.719c-.386,0-.772.005-1.159,0,0-.469,0-.939,0-1.409"
                                                    transform="translate(-836.774 -384.458)"
                                                    fill="#fff"
                                                />
                                                <rect
                                                    id="Rectangle_9"
                                                    data-name="Rectangle 9"
                                                    width="27.592"
                                                    height="0.867"
                                                    transform="translate(53.223 16.964)"
                                                    fill="#fff"
                                                />
                                                <rect
                                                    id="Rectangle_10"
                                                    data-name="Rectangle 10"
                                                    width="8.18"
                                                    height="0.867"
                                                    transform="translate(66.509 26.805)"
                                                    fill="#fff"
                                                />
                                                <rect
                                                    id="Rectangle_11"
                                                    data-name="Rectangle 11"
                                                    width="8.18"
                                                    height="0.867"
                                                    transform="translate(66.509 7.132)"
                                                    fill="#fff"
                                                />
                                                <rect
                                                    id="Rectangle_12"
                                                    data-name="Rectangle 12"
                                                    width="0.868"
                                                    height="20.312"
                                                    transform="translate(66.52 7.123)"
                                                    fill="#fff"
                                                />
                                                <path
                                                    id="Path_65"
                                                    data-name="Path 65"
                                                    d="M802.181,408.728h39.28V383.452h-39.28Zm.992-24.282h37.3v23.29h-37.3Zm40.249,25.586V383.3a1.948,1.948,0,0,0-1.94-2H801.919a1.948,1.948,0,0,0-1.939,2v26.735H793.9v1.239a1.97,1.97,0,0,0,1.938,2H847.57a1.97,1.97,0,0,0,1.938-2v-1.239ZM800.975,383.3a.955.955,0,0,1,.946-1h39.563a.955.955,0,0,1,.946,1v26.731H800.975Zm47.54,27.972a.977.977,0,0,1-.945,1H795.833a.977.977,0,0,1-.944-1v-.245h53.625Z"
                                                    transform="translate(-793.897 -379.358)"
                                                    fill="#fff"
                                                />
                                                <path
                                                    id="Path_66"
                                                    data-name="Path 66"
                                                    d="M839.671,395.6l-3.576-2.065-3.575-2.064a.3.3,0,0,0-.179-.077.31.31,0,0,0-.181.077l-3.576,2.064L825,395.6a.391.391,0,0,0-.155.121.332.332,0,0,0-.029.192v8.259a.721.721,0,0,0,.037.193c.023.066.146.12.146.12l3.576,2.064,3.576,2.065a.271.271,0,0,0,.36,0l3.576-2.065,3.576-2.064a.31.31,0,0,0,.14-.111.474.474,0,0,0,.044-.2v-8.262a.314.314,0,0,0-.044-.21.425.425,0,0,0-.14-.1m-10.729-1.44,3.079-1.777a.635.635,0,0,1,.636,0l3.079,1.777,2.786,1.6a.167.167,0,0,1,0,.29l-5.862,3.384a.635.635,0,0,1-.636,0l-5.841-3.372a.182.182,0,0,1,0-.315Zm-3.076,9.989a.638.638,0,0,1-.318-.552v-6.773a.163.163,0,0,1,.245-.142l5.819,3.358a.732.732,0,0,1,.366.634v6.59a.238.238,0,0,1-.358.206l-2.677-1.545Zm13.263-.552a.639.639,0,0,1-.319.552l-3.076,1.776-2.715,1.568a.213.213,0,0,1-.319-.185v-6.69a.637.637,0,0,1,.318-.552l5.945-3.431a.11.11,0,0,1,.165.095Z"
                                                    transform="translate(-804.37 -382.776)"
                                                    fill="#fff"
                                                />
                                                <path
                                                    id="Path_67"
                                                    data-name="Path 67"
                                                    d="M918.861,386.768a1.027,1.027,0,0,0-1.018,1.034,1.041,1.041,0,0,0,.247.671v.583a.771.771,0,1,0,1.542,0v-.583a1.038,1.038,0,0,0,.247-.671,1.027,1.027,0,0,0-1.018-1.034m.31,1.382-.092.083v.822a.218.218,0,1,1-.436,0v-.822l-.092-.083a.463.463,0,1,1,.62,0"
                                                    transform="translate(-835.88 -381.21)"
                                                    fill="#fff"
                                                />
                                                <path
                                                    id="Path_68"
                                                    data-name="Path 68"
                                                    d="M920.559,382.666H920.1v-1.554a2.748,2.748,0,1,0-5.5,0v1.554h-.463a.777.777,0,0,0-.77.782v4.263a.778.778,0,0,0,.77.782h6.428a.778.778,0,0,0,.77-.782v-4.266a.777.777,0,0,0-.77-.782m-5.41-1.554a2.2,2.2,0,0,1,4.392,0v1.554h-.689v-1.619a1.517,1.517,0,0,0-3.025,0v1.619h-.684Zm3.156-.066v1.62h-1.918v-1.62a.969.969,0,0,1,1.918,0m2.472,6.668a.22.22,0,0,1-.218.221h-6.428a.22.22,0,0,1-.218-.221v-4.266a.22.22,0,0,1,.218-.221h6.428a.22.22,0,0,1,.218.221Z"
                                                    transform="translate(-834.364 -378.364)"
                                                    fill="#fff"
                                                />
                                                <path
                                                    id="Path_69"
                                                    data-name="Path 69"
                                                    d="M915.7,404.779l1.111-1.11-1.111-1.11.61-.61,1.415,1.415.305.306-.305.3-1.415,1.416Z"
                                                    transform="translate(-835.154 -386.352)"
                                                    fill="#fff"
                                                />
                                                <path
                                                    id="Path_70"
                                                    data-name="Path 70"
                                                    d="M906.62,419.874l1.11-1.111-1.11-1.11.61-.61,1.416,1.415.3.3-.3.306-1.416,1.416Z"
                                                    transform="translate(-832.079 -391.465)"
                                                    fill="#fff"
                                                />
                                                <path
                                                    id="Path_71"
                                                    data-name="Path 71"
                                                    d="M906.536,390l1.111-1.111-1.111-1.11.61-.61,1.415,1.415.305.3-.305.306-1.415,1.416Z"
                                                    transform="translate(-832.05 -381.348)"
                                                    fill="#fff"
                                                />
                                                <path
                                                    id="Path_72"
                                                    data-name="Path 72"
                                                    d="M918.555,412.24c1.147,0,2.295,0,3.443,0l-.832,1.252c-.479.715-.944,1.439-1.426,2.15.78,0,1.559,0,2.338,0-1.608,2.238-3.2,4.488-4.818,6.719a5.071,5.071,0,0,1,.278-.909c.471-1.371.948-2.74,1.418-4.111-.744,0-1.489,0-2.233,0,.6-1.7,1.229-3.4,1.831-5.105"
                                                    transform="translate(-835.501 -389.837)"
                                                    fill="#fff"
                                                />
                                                <path
                                                    id="Path_73"
                                                    data-name="Path 73"
                                                    d="M923.683,415.164c.049-.153.228-.183.354-.25,1.051,1,2.1,2,3.139,3.015,0,.113-.006.226-.009.341-.486.4-.9.885-1.374,1.3-.589.583-1.17,1.172-1.774,1.738-.132-.044-.331-.04-.38-.2-.066-.227.165-.373.295-.52.745-.757,1.526-1.477,2.27-2.237a.609.609,0,0,0,.17-.265c-.034-.16-.175-.261-.282-.371-.723-.709-1.455-1.409-2.186-2.109-.1-.122-.3-.253-.223-.439"
                                                    transform="translate(-837.84 -390.744)"
                                                    fill="#fff"
                                                />
                                                <path
                                                    id="Path_74"
                                                    data-name="Path 74"
                                                    d="M915.179,415.015c.239-.179.605.231.359.43-.776.8-1.582,1.575-2.38,2.355-.14.116-.274.331-.116.491.822.855,1.688,1.668,2.513,2.519a.331.331,0,0,1,.054.4c-.1.1-.243.087-.368.1-.5-.449-.973-.926-1.469-1.382-.491-.471-1.006-.917-1.455-1.432-.1-.119-.251-.226-.227-.4-.015-.146.12-.236.2-.335.643-.639,1.311-1.256,1.96-1.889.326-.265.58-.609.92-.856"
                                                    transform="translate(-833.931 -390.763)"
                                                    fill="#fff"
                                                />
                                            </g>
                                            <g
                                                onClick={() => this.openDescription('Secret Management', 'Automate manage and enforce secure digital authentication.')}
                                                className="hover_over_icon"
                                                id="hover_over_icon_40"
                                                transform="matrix(1, 0, 0, 1, 3399.5, 2494.5)"
                                                filter="url(#Ellipse_13)"
                                            >
                                                <circle
                                                    id="Ellipse_13-2"
                                                    data-name="Ellipse 13"
                                                    cx="55"
                                                    cy="55"
                                                    r="55"
                                                    transform="translate(57 327.7)"
                                                    fill=" url(#linear-gradient)"
                                                    stroke="rgba(0,0,0,0)"
                                                    strokeWidth="1"
                                                />
                                            </g>
                                            <path
                                                id="Path_40"
                                                data-name="Path 40"
                                                d="M558.3,428.079h57.3V391.21H558.3Zm1.448-35.42h54.4v33.975h-54.4Zm58.71,37.322v-39a2.841,2.841,0,0,0-2.828-2.915H557.918a2.841,2.841,0,0,0-2.827,2.915v39h-8.876v1.806a2.873,2.873,0,0,0,2.826,2.913h75.466a2.873,2.873,0,0,0,2.826-2.913v-1.806Zm-61.917-39a1.392,1.392,0,0,1,1.379-1.466h57.711a1.393,1.393,0,0,1,1.379,1.466v38.991h-60.47Zm69.345,40.808a1.425,1.425,0,0,1-1.378,1.464H549.041a1.424,1.424,0,0,1-1.377-1.464v-.358h78.22Zm-25.541-29.7h-5.794a3.625,3.625,0,0,0-3.621,3.621v.289H574.274v-4.845h4.221v-1.448h-5.67v19.814h5.666v-1.449H574.27V412.92h2.153v1.522h1.448V412.92h2.4v1.522h1.449V412.92h2.4v1.522h1.449V412.92h2.4v1.522h1.448V412.92h1.5v.858a3.626,3.626,0,0,0,3.621,3.622h5.794a3.627,3.627,0,0,0,3.622-3.622v-8.066a3.626,3.626,0,0,0-3.622-3.621m-26.067,5.359h16.652v4.025H574.274Zm28.24,6.328a2.175,2.175,0,0,1-2.173,2.173h-5.794a2.175,2.175,0,0,1-2.172-2.173v-8.066a2.175,2.175,0,0,1,2.172-2.172h5.794a2.175,2.175,0,0,1,2.173,2.172Zm-3.65-7.249H600.3v6.177h-1.446Zm-12.267,3.657h-9.376v-1.448H586.6Z"
                                                transform="translate(2925.285 2466.129)"
                                                fill="#fff"
                                            />
                                            <g
                                                onClick={() => this.openDescription('Vulnerability Management', 'Automate identification, classification,prioritization, and mitigation of software vulnerabilities.')}
                                                className="hover_over_icon"
                                                id="hover_over_icon_312"
                                                transform="matrix(1, 0, 0, 1, 3399.5, 2494.5)"
                                                filter="url(#Path_308)"
                                            >
                                                <path
                                                    id="Path_308-2"
                                                    data-name="Path 308"
                                                    d="M387.217,316.094a55,55,0,1,1-55-55A55,55,0,0,1,387.217,316.094Z"
                                                    transform="translate(916.78 66.6)"
                                                    fill=" url(#linear-gradient)"
                                                    stroke="rgba(0,0,0,0)"
                                                    strokeWidth="1"
                                                />
                                            </g>
                                            <g
                                                id="Group_312"
                                                data-name="Group 312"
                                                transform="translate(4619.5 2848.198)"
                                            >
                                                <path
                                                    id="Path_41"
                                                    data-name="Path 41"
                                                    d="M388.935,399.719h-.684v-2.726a5.5,5.5,0,0,0-10.987,0v2.726h-.683a1.692,1.692,0,0,0-1.694,1.693v8.077a1.692,1.692,0,0,0,1.694,1.693h12.359a1.693,1.693,0,0,0,1.694-1.693v-8.077a1.693,1.693,0,0,0-1.694-1.693m-10.186-2.726a4.011,4.011,0,0,1,8.017,0v4.213h2.169a.213.213,0,0,1,.208.207v8.077a.213.213,0,0,1-.208.207H376.58a.212.212,0,0,1-.208-.207v-8.077a.212.212,0,0,1,.208-.207h2.169Zm7.124-.126a3.129,3.129,0,0,0-6.233,0v4.339h6.233Zm-4.747,0a1.656,1.656,0,0,1,3.261,0v2.853H381.13Zm1.636,5.231a2.161,2.161,0,0,0-1.694,3.513v1.033a1.69,1.69,0,1,0,3.38,0V405.61a2.161,2.161,0,0,0-1.687-3.513m.943,3.224v1.322a.947.947,0,1,1-1.894,0v-1.322a1.422,1.422,0,1,1,1.894,0m24.724-1.679a2.928,2.928,0,0,0-2.838,2.192h-8.469a14.757,14.757,0,0,0,.505-3.271h3.21a2.935,2.935,0,1,0,0-1.486h-3.21a14.451,14.451,0,0,0-.408-2.734H405.6a2.934,2.934,0,1,0,0-1.487h-8.815a14.954,14.954,0,0,0-8.789-8.915v-8.685a2.928,2.928,0,1,0-1.486,0v8.217a14.792,14.792,0,0,0-3.261-.475v-3a2.934,2.934,0,1,0-1.486,0v3.024a14.487,14.487,0,0,0-2.734.445v-8.217a2.935,2.935,0,1,0-1.486,0v8.695a14.953,14.953,0,0,0-8.788,8.915H359.92a2.935,2.935,0,1,0,0,1.487h8.373a14.73,14.73,0,0,0-.431,3.261h-3.187a2.934,2.934,0,1,0,0,1.486h3.231a15.177,15.177,0,0,0,.483,2.742H359.92a2.928,2.928,0,1,0,0,1.486h8.967a14.936,14.936,0,0,0,8.64,8.514v9.087a2.928,2.928,0,1,0,1.486,0V416.3a14.753,14.753,0,0,0,3.261.475v3.389a2.934,2.934,0,1,0,1.486,0v-3.418a14.4,14.4,0,0,0,2.734-.446v8.618a2.935,2.935,0,1,0,1.486,0V415.83a14.934,14.934,0,0,0,8.64-8.514h8.967a2.932,2.932,0,1,0,2.838-3.678m-4.754-3.271a1.449,1.449,0,1,1-1.448,1.448,1.448,1.448,0,0,1,1.448-1.448m4.754-4.22a1.444,1.444,0,1,1-1.028.425,1.444,1.444,0,0,1,1.028-.425m-51.343,2.9a1.449,1.449,0,1,1,1.448-1.449,1.448,1.448,0,0,1-1.448,1.449m4.754,4.747a1.447,1.447,0,1,1,1.03-.423,1.447,1.447,0,0,1-1.03.423m-4.754,4.22a1.446,1.446,0,1,1,1.448-1.441,1.446,1.446,0,0,1-1.448,1.441m28.716-31.6a1.445,1.445,0,1,1,1.441,1.441,1.445,1.445,0,0,1-1.441-1.441m-4.755,4.747a1.448,1.448,0,1,1,.422,1.028,1.449,1.449,0,0,1-.422-1.028m-4.221-4.747a1.445,1.445,0,1,1,.426,1.025,1.445,1.445,0,0,1-.426-1.025m2.89,51.336a1.445,1.445,0,1,1-1.441-1.448,1.445,1.445,0,0,1,1.441,1.448M384.466,423a1.448,1.448,0,1,1-1.448-1.441A1.448,1.448,0,0,1,384.466,423m4.22,4.754a1.445,1.445,0,1,1-.423-1.025,1.445,1.445,0,0,1,.423,1.025m-5.928-12.444a9.673,9.673,0,1,1,.005,0m25.668-7.3a1.446,1.446,0,1,1,1.441-1.441,1.446,1.446,0,0,1-1.441,1.441m-19.494-8.3h-.684v-2.726a5.5,5.5,0,0,0-10.987,0v2.726h-.683a1.692,1.692,0,0,0-1.694,1.693v8.077a1.692,1.692,0,0,0,1.694,1.693h12.359a1.693,1.693,0,0,0,1.694-1.693V401.41a1.693,1.693,0,0,0-1.694-1.693m-10.186-2.726a4.011,4.011,0,0,1,8.017,0V401.2h2.169a.213.213,0,0,1,.208.207v8.077a.213.213,0,0,1-.208.207H376.582a.212.212,0,0,1-.208-.207v-8.077a.212.212,0,0,1,.208-.207h2.169Zm7.124-.126a3.129,3.129,0,0,0-6.233,0V401.2h6.233Zm-4.747,0a1.656,1.656,0,0,1,3.261,0v2.853h-3.264Zm1.636,5.231a2.161,2.161,0,0,0-1.694,3.513v1.033a1.69,1.69,0,1,0,3.38,0v-1.033a2.161,2.161,0,0,0-1.687-3.513m.943,3.224v1.322a.947.947,0,0,1-1.894,0v-1.32a1.408,1.408,0,0,1-.476-1.055,1.423,1.423,0,1,1,2.37,1.055m-.943-11.307a3.034,3.034,0,0,0-3.12,2.853v4.339h6.233v-4.339a3.031,3.031,0,0,0-3.112-2.853m-1.636,2.853a1.656,1.656,0,0,1,3.261,0v2.853h-3.264Zm1.636,5.231a2.161,2.161,0,0,0-1.694,3.513v1.033a1.69,1.69,0,1,0,3.38,0V405.61a2.161,2.161,0,0,0-1.687-3.513m.943,3.224v1.322a.947.947,0,0,1-1.894,0v-1.322a1.421,1.421,0,1,1,1.894,0m5.231-5.6h-.684v-2.726a5.5,5.5,0,0,0-10.987,0v2.726h-.683a1.692,1.692,0,0,0-1.694,1.693v8.077a1.692,1.692,0,0,0,1.694,1.693h12.359a1.693,1.693,0,0,0,1.694-1.693v-8.077a1.693,1.693,0,0,0-1.694-1.693m-10.186-2.726a4.011,4.011,0,0,1,8.017,0v4.213h2.169a.213.213,0,0,1,.208.207v8.077a.213.213,0,0,1-.208.207H376.587a.212.212,0,0,1-.208-.207v-8.077a.212.212,0,0,1,.208-.207h2.169Zm7.124-.126a3.129,3.129,0,0,0-6.233,0v4.339h6.233Zm-4.747,0a1.656,1.656,0,0,1,3.261,0v2.853h-3.261Zm1.636,5.231a2.161,2.161,0,0,0-1.694,3.513v1.033a1.69,1.69,0,1,0,3.38,0v-1.033a2.161,2.161,0,0,0-1.687-3.513m.943,3.224v1.322a.947.947,0,0,1-1.894,0v-1.322a1.408,1.408,0,0,1-.476-1.055,1.423,1.423,0,1,1,2.37,1.055m-.943-11.307a3.034,3.034,0,0,0-3.121,2.853v4.339h6.233v-4.339a3.031,3.031,0,0,0-3.112-2.853m-1.636,2.853a1.656,1.656,0,0,1,3.261,0v2.853h-3.261Zm1.636,5.231a2.161,2.161,0,0,0-1.694,3.513v1.033a1.69,1.69,0,1,0,3.38,0v-1.033a2.161,2.161,0,0,0-1.687-3.513m.943,3.224v1.322a.947.947,0,1,1-1.894,0v-1.322a1.408,1.408,0,0,1-.476-1.055,1.423,1.423,0,1,1,2.37,1.055"
                                                    transform="translate(-354.146 -373.477)"
                                                    fill="#fff"
                                                />
                                            </g>
                                            <g
                                                onClick={() => this.openDescription('Mobile Security', 'Automate your mobile application security testing')}
                                                className="hover_over_icon"
                                                id="hover_over_icon_311"
                                                transform="matrix(1, 0, 0, 1, 3399.5, 2494.5)"
                                                filter="url(#Ellipse_10)"
                                            >
                                                <circle
                                                    id="Ellipse_10-2"
                                                    data-name="Ellipse 10"
                                                    cx="55"
                                                    cy="55"
                                                    r="55"
                                                    transform="translate(443 531.7)"
                                                    fill=" url(#linear-gradient)"
                                                    stroke="rgba(0,0,0,0)"
                                                    strokeWidth="1"
                                                />
                                            </g>
                                            <g
                                                id="Group_311"
                                                data-name="Group 311"
                                                transform="translate(3882.145 3052.843)"
                                            >
                                                <path
                                                    id="Path_38"
                                                    data-name="Path 38"
                                                    d="M177.092,381.942H152.314a3.2,3.2,0,0,0-3.2,3.2v48.822a3.2,3.2,0,0,0,3.2,3.2h24.777a3.2,3.2,0,0,0,3.2-3.2V385.139a3.2,3.2,0,0,0-3.2-3.2m-24.777,1.6h24.777a1.6,1.6,0,0,1,1.6,1.6v3.2H150.716v-3.2a1.6,1.6,0,0,1,1.6-1.6m26.376,44.527H150.716V389.935H178.69Zm-1.6,7.492H152.314a1.6,1.6,0,0,1-1.6-1.6v-4.3H178.69v4.3a1.6,1.6,0,0,1-1.6,1.6m-16.5-49.521a.8.8,0,0,1,.8-.8h6.772a.8.8,0,1,1,0,1.6h-6.772a.8.8,0,0,1-.8-.8m-2.22,33.635h13.072a2.4,2.4,0,0,0,2.4-2.4v-7.571a2.4,2.4,0,0,0-2.4-2.4h-.666v-4.393a2.206,2.206,0,0,0-2.2-2.2h-7.237a2.206,2.206,0,0,0-2.2,2.2v4.393h-.762a2.4,2.4,0,0,0-2.4,2.4v7.571a2.4,2.4,0,0,0,2.4,2.4m2.36-16.76a.606.606,0,0,1,.606-.605h7.236a.606.606,0,0,1,.6.606v4.393h-8.447Zm-3.16,6.791a.8.8,0,0,1,.8-.8h13.072a.8.8,0,0,1,.8.8v7.571a.8.8,0,0,1-.8.8H158.367a.8.8,0,0,1-.8-.8Zm5.607,2.642a1.778,1.778,0,1,1,2.576,1.578v2.046a.8.8,0,0,1-1.6,0v-2.043a1.77,1.77,0,0,1-.977-1.578"
                                                    transform="translate(-149.117 -381.942)"
                                                    fill="#fff"
                                                />
                                            </g>
                                            <g
                                                onClick={() => this.openDescription('Software Composition Analysis', 'Automate control over your dependencies’ vulnerabilities.')}
                                                className="hover_over_icon"
                                                id="hover_over_icon_6"
                                                transform="matrix(1, 0, 0, 1, 3399.5, 2494.5)"
                                                filter="url(#Path_310)"
                                            >
                                                <path
                                                    id="Path_310-2 hover-icon-popup"
                                                    data-name="Path 310"
                                                    d="M547.212,155.228a55,55,0,1,1-55-55A55,55,0,0,1,547.212,155.228Z"
                                                    transform="translate(5.79 26.35)"
                                                    stroke="rgba(0,0,0,0)"
                                                    strokeWidth="1"
                                                    fill=" url(#linear-gradient)"
                                                />
                                            </g>
                                            <g id="Group_6" data-name="Group 6" transform="translate(3854.393 2650.59)">
                                                <rect
                                                    id="Rectangle_8"
                                                    data-name="Rectangle 8"
                                                    width="2.094"
                                                    height="10.468"
                                                    transform="translate(25.14 28.864)"
                                                    fill="#fff"
                                                />
                                                <path
                                                    id="Path_49"
                                                    data-name="Path 49"
                                                    d="M78.628,262.161H66.812l-.108-.92-1.035-8.422v-.254a4.262,4.262,0,0,1,.528-1.637,2.264,2.264,0,0,1,1.337-1.091h0c.18-.047,2.937-.072,5.651-.072s5.478.025,5.658.072h0a2.264,2.264,0,0,1,1.337,1.091,4.262,4.262,0,0,1,.529,1.637v.254l-1.035,8.422-.113.92Zm-9.965-2.094H77.7l.9-7.366a2.048,2.048,0,0,0-.234-.709c-.052-.087-.067-.134-.073-.135H68.074a1.1,1.1,0,0,1-.072.135,2.063,2.063,0,0,0-.234.711Z"
                                                    transform="translate(-30.445 -212.709)"
                                                    fill="#fff"
                                                />
                                                <path
                                                    id="Path_50"
                                                    data-name="Path 50"
                                                    d="M63.093,241.771H51.277l-.108-.921-1.035-8.422v-.253a4.263,4.263,0,0,1,.528-1.637A2.264,2.264,0,0,1,52,229.447h0c.18-.049,2.937-.072,5.651-.072s5.478.024,5.657.072h0a2.27,2.27,0,0,1,1.337,1.09,4.269,4.269,0,0,1,.529,1.638v.253l-1.035,8.422-.108.921Zm-9.965-2.094h9.039l.906-7.366a2.048,2.048,0,0,0-.234-.709c-.052-.087-.067-.134-.073-.135H52.536c-.006,0-.02.046-.072.135a2.066,2.066,0,0,0-.234.709Z"
                                                    transform="translate(-31.66 -214.304)"
                                                    fill="#fff"
                                                />
                                                <path
                                                    id="Path_51"
                                                    data-name="Path 51"
                                                    d="M62.4,224.772a4.94,4.94,0,0,1-4.943,4.944h0a4.934,4.934,0,1,1,4.94-4.937m-2.927,2.014a2.841,2.841,0,1,0-2.013.837h0a2.833,2.833,0,0,0,2.013-.833"
                                                    transform="translate(-31.473 -215.049)"
                                                    fill="#fff"
                                                />
                                                <path
                                                    id="Path_52"
                                                    data-name="Path 52"
                                                    d="M45.968,262.161H34.152l-.108-.92L33,252.822v-.255a4.262,4.262,0,0,1,.528-1.637,2.264,2.264,0,0,1,1.337-1.091h0c.18-.047,2.937-.072,5.651-.072s5.478.025,5.657.072h0a2.264,2.264,0,0,1,1.337,1.091,4.262,4.262,0,0,1,.529,1.637v.255L47,261.243l-.108.92ZM36,260.067h9.039l.906-7.366a2.048,2.048,0,0,0-.234-.709c-.052-.087-.067-.134-.073-.135H35.411c-.006,0-.021.047-.072.135a2.042,2.042,0,0,0-.234.711Z"
                                                    transform="translate(-33 -212.709)"
                                                    fill="#fff"
                                                />
                                                <path
                                                    id="Path_53"
                                                    data-name="Path 53"
                                                    d="M45.273,245.157a4.94,4.94,0,0,1-4.94,4.94h0a4.933,4.933,0,1,1,4.94-4.936m-2.927,2.013a2.84,2.84,0,1,0-2.013.838h0a2.838,2.838,0,0,0,2.013-.833"
                                                    transform="translate(-32.812 -213.455)"
                                                    fill="#fff"
                                                />
                                                <path
                                                    id="Path_54"
                                                    data-name="Path 54"
                                                    d="M116.073,256.933l-9.37-9.371a5.175,5.175,0,0,0-4.792-1.39l-3.031-3.03-.216-.222a18.578,18.578,0,0,0,2.156-16.027,26.4,26.4,0,0,0-4.52-6.882,18.9,18.9,0,0,0-14.243-4.522l-1.317.19a17.513,17.513,0,0,0-4.433,1.483c-7.027,3.261-10.623,10.657-9.659,18.5a17.591,17.591,0,0,0,14.092,14.594,19.427,19.427,0,0,0,3.291.311,17.313,17.313,0,0,0,10.751-3.652l2.78,2.78a6.089,6.089,0,0,0,1.8,5.21l9.37,9.369a5.19,5.19,0,1,0,7.341-7.34M72.894,244.1a15.755,15.755,0,1,1,22.28,0,15.755,15.755,0,0,1-22.28,0m23.587,1.316a14.51,14.51,0,0,0,.982-1.078l2.622,2.623a4.761,4.761,0,0,0-.722.592,5.451,5.451,0,0,0-.593.715l-2.577-2.577c.108-.093.2-.185.288-.278m18.285,17.545a3.434,3.434,0,0,1-4.717,0l-9.37-9.37a3.286,3.286,0,0,1-.791-1.308l-.175-1.13a3.331,3.331,0,0,1,5.683-2.289l9.37,9.37a3.358,3.358,0,0,1,0,4.727m-23.9-35.315,2.972-2.973-1.31-1.311L89.987,225.9a6.592,6.592,0,0,0-11.936-.075L76,223.78l-1.308,1.313,2.465,2.466a14.076,14.076,0,0,0-1.038,5.079H72.513v1.853H76.2a13.485,13.485,0,0,0,1.34,4.705l-2.42,2.419,1.31,1.311,2.11-2.111A6.912,6.912,0,0,0,84,243.865c2.5,0,4.731-1.617,6.175-4.138l2.78,2.779,1.311-1.31-3.22-3.219-.083.083a13.881,13.881,0,0,0,.837-3.568h2.961v-1.853H91.868a14.124,14.124,0,0,0-1-4.993M84,223.928c2.219,0,4.16,1.809,5.206,4.5H78.792c1.046-2.687,2.988-4.5,5.206-4.5m0,18.084c-3.321,0-6.023-4.056-6.023-9.042a13.175,13.175,0,0,1,.273-2.7h11.5a13.173,13.173,0,0,1,.273,2.7c0,4.986-2.7,9.042-6.023,9.042"
                                                    transform="translate(-30.38 -215.397)"
                                                    fill="#fff"
                                                />
                                                <path
                                                    id="Path_55"
                                                    data-name="Path 55"
                                                    d="M74.772,247.221a2.824,2.824,0,0,1-1.776.637h0a2.839,2.839,0,0,1-2.6-4,17.493,17.493,0,0,1-1.418-1.708,4.931,4.931,0,0,0,4.014,7.8h0a4.918,4.918,0,0,0,3.492-1.448,4.766,4.766,0,0,0,.312-.376,17.032,17.032,0,0,1-2.028-.908"
                                                    transform="translate(-30.258 -213.305)"
                                                    fill="#fff"
                                                />
                                                <rect
                                                    id="Rectangle_7"
                                                    data-name="Rectangle 7"
                                                    width="16.704"
                                                    height="2.094"
                                                    transform="translate(17.636 39.364)"
                                                    fill="#fff"
                                                />
                                            </g>
                                            <g
                                                onClick={() => this.openDescription('Cloud Security', 'Automate the protection of cloud-based systems, data and infrastructure from threats.')}
                                                className="hover_over_icon"
                                                id="hover_over_icon_310"
                                                transform="matrix(1, 0, 0, 1, 3399.5, 2494.5)"
                                                filter="url(#Path_307)"
                                            >
                                                <path
                                                    id="Path_307-2"
                                                    data-name="Path 307"
                                                    d="M277.217,155.228a55,55,0,1,0,55-55A55,55,0,0,0,277.217,155.228Z"
                                                    transform="translate(530.78 431.47)"
                                                    fill=" url(#linear-gradient)"
                                                    stroke="rgba(0,0,0,0)"
                                                    strokeWidth="1"
                                                />
                                            </g>
                                            <g
                                                id="Group_310"
                                                data-name="Group 310"
                                                transform="translate(4229.5 3058.198)"
                                            >
                                                <path
                                                    id="Path_45"
                                                    data-name="Path 45"
                                                    d="M904.644,75.511a13.267,13.267,0,0,0-1.956-5.289m.759,12.975a13.224,13.224,0,0,0,1.318-5.288m-4.024-10.084a15.791,15.791,0,0,0-9.323-3.8h-.925a21.481,21.481,0,0,0-42.808.38c-2.314.555-2.277.12-6.157,3.424-6.667,6.088-3.677,15.654-1.235,17.769,1.542,1.871,6.258,5.17,10.538,5.17H891.42a13.326,13.326,0,0,0,9.452-3.923c.392-.394-1.375,2.065,1.079-1.247,5.05-6.5,2.46-15.069-1.213-17.769M837.483,77.908A13.254,13.254,0,0,0,838.8,83.2m.764-12.975a13.174,13.174,0,0,0-1.96,5.289m61.566,9.633a10.93,10.93,0,0,1-7.751,3.217H850.833a10.96,10.96,0,0,1-7.744-18.729,10.818,10.818,0,0,1,5.939-3.062l.977-.158.029-.989a19.083,19.083,0,0,1,38.141-.161l.044,1.151h3.2a10.966,10.966,0,0,1,7.756,18.727"
                                                    transform="translate(-837.465 -44.539)"
                                                    fill="#fff"
                                                />
                                                <path
                                                    id="Path_46"
                                                    data-name="Path 46"
                                                    d="M864.392,65.683a3.567,3.567,0,0,0-3.536,3.589,3.612,3.612,0,0,0,.859,2.33v2.027a2.677,2.677,0,1,0,5.355,0V71.6a3.612,3.612,0,0,0,.858-2.33,3.567,3.567,0,0,0-3.535-3.589m1.079,4.8-.318.29v2.855a.758.758,0,1,1-1.514,0V70.773l-.318-.29a1.616,1.616,0,1,1,2.149,0"
                                                    transform="translate(-832.819 -40.34)"
                                                    fill="#fff"
                                                />
                                                <path
                                                    id="Path_47"
                                                    data-name="Path 47"
                                                    d="M877.259,64.523h-1.614V59.129a9.547,9.547,0,1,0-19.093,0v5.394h-1.616a2.7,2.7,0,0,0-2.676,2.716V82.055a2.7,2.7,0,0,0,2.676,2.717h22.322a2.7,2.7,0,0,0,2.678-2.717V67.239a2.7,2.7,0,0,0-2.678-2.716m-18.787-5.394a7.627,7.627,0,1,1,15.253,0v5.394h-2.373V58.9a5.274,5.274,0,0,0-10.5,0v5.624h-2.375Zm10.96-.225v5.624h-6.667V58.894a3.366,3.366,0,0,1,6.667,0m8.586,23.156a.764.764,0,0,1-.759.768h-22.32a.765.765,0,0,1-.759-.768V67.239a.766.766,0,0,1,.759-.768h22.322a.765.765,0,0,1,.759.768Z"
                                                    transform="translate(-834.525 -43.537)"
                                                    fill="#fff"
                                                />
                                            </g>
                                            <g
                                                onClick={() => this.openDescription('Container Security', 'Automate protecting your containers . integrity - from the applications running within to the container infrastructure')}
                                                className="hover_over_icon"
                                                id="hover_over_icon_315"
                                                transform="matrix(1, 0, 0, 1, 3399.5, 2494.5)"
                                                filter="url(#Path_311)"
                                            >
                                                <path
                                                    id="Path_311-2"
                                                    data-name="Path 311"
                                                    d="M628.534,235.895a55,55,0,1,1-55-55A55,55,0,0,1,628.534,235.895Z"
                                                    transform="translate(289.47 -54.32)"
                                                    fill=" url(#linear-gradient)"
                                                    stroke="rgba(0,0,0,0)"
                                                    strokeWidth="1"
                                                />
                                            </g>
                                            <g
                                                id="Group_315"
                                                data-name="Group 315"
                                                transform="translate(4237.5 2648.075)"
                                            >
                                                <path
                                                    id="Path_56"
                                                    data-name="Path 56"
                                                    d="M789.666,221.154a2.756,2.756,0,0,0-2.056,4.547v1.558a2.056,2.056,0,1,0,4.113,0V225.7a2.772,2.772,0,0,0,.659-1.79,2.741,2.741,0,0,0-2.716-2.757m.829,3.684-.244.223v2.194a.583.583,0,1,1-1.165,0v-2.191l-.243-.223a1.241,1.241,0,1,1,1.652,0"
                                                    transform="translate(-756.53 -206.328)"
                                                    fill="#fff"
                                                />
                                                <path
                                                    id="Path_57"
                                                    data-name="Path 57"
                                                    d="M797.558,216.533h-1.241v-4.144a7.334,7.334,0,1,0-14.667,0v4.144h-1.242a2.074,2.074,0,0,0-2.056,2.087V230a2.074,2.074,0,0,0,2.056,2.087h17.151A2.074,2.074,0,0,0,799.615,230V218.62a2.074,2.074,0,0,0-2.057-2.087m-14.435-4.144a5.86,5.86,0,1,1,11.721,0v4.144h-1.824v-4.321a4.052,4.052,0,0,0-8.071,0v4.321h-1.824Zm8.421-.173v4.321h-5.122v-4.321a2.586,2.586,0,0,1,5.122,0m6.6,17.791a.587.587,0,0,1-.582.59H780.407a.587.587,0,0,1-.582-.59V218.62a.587.587,0,0,1,.582-.59h17.151a.587.587,0,0,1,.582.59Z"
                                                    transform="translate(-755.85 -205.055)"
                                                    fill="#fff"
                                                />
                                                <path
                                                    id="Path_58"
                                                    data-name="Path 58"
                                                    d="M803.283,236.985a1.637,1.637,0,0,0-.465-.207l-6.538-2.266a2.423,2.423,0,0,1-.921.184h-3.386l6.974,2.414c.376.131.376.456,0,.587l-19.7,6.83a3.418,3.418,0,0,1-2.141,0l-19.623-6.805c-.408-.141-.408-.5,0-.636l9.28-3.223,8.964-3.108v-1.681l-10.17,3.527-12.018,4.168a1.436,1.436,0,0,0-.518.242.432.432,0,0,0-.092.389v16.668a.89.89,0,0,0,.125.389c.077.128.488.242.488.242l12.018,4.167,12.017,4.168a1.771,1.771,0,0,0,.636.137,1.7,1.7,0,0,0,.571-.137l12.017-4.168L802.82,254.7a1.164,1.164,0,0,0,.46-.224.645.645,0,0,0,.148-.407V237.4a.428.428,0,0,0-.148-.424m-25.857,23.5c0,.368-.669.6-1.2.417l-9.457-3.291-11.185-3.847c-.663-.23-1.071-.655-1.071-1.114V238.981c0-.255.46-.414.829-.287l20.86,7.213c.762.264,1.23.752,1.23,1.281ZM802.076,245.5v7.174c0,.46-.408.884-1.071,1.114L789.586,257.6l-9.125,3.164c-.475.165-1.072-.04-1.072-.368V246.9c0-.46.409-.884,1.071-1.114l21.056-7.16c.247-.086.552.021.552.192Z"
                                                    transform="translate(-752.918 -206.955)"
                                                    fill="#fff"
                                                />
                                                <path
                                                    id="Path_59"
                                                    data-name="Path 59"
                                                    d="M785.341,248.725v10.087l-1.75.614v-10.09Zm.921-1.3-3.592,1.26v12.038l3.592-1.26Z"
                                                    transform="translate(-755.271 -208.407)"
                                                    fill="#fff"
                                                />
                                                <path
                                                    id="Path_60"
                                                    data-name="Path 60"
                                                    d="M790.092,247.15v10.087l-1.754.614V247.766Zm.921-1.3-3.591,1.26V259.15l3.6-1.26Z"
                                                    transform="translate(-755.647 -208.282)"
                                                    fill="#fff"
                                                />
                                                <path
                                                    id="Path_61"
                                                    data-name="Path 61"
                                                    d="M794.858,245.543V255.63l-1.754.614V246.159Zm.921-1.3-3.6,1.26v12.038l3.6-1.26Z"
                                                    transform="translate(-756.024 -208.155)"
                                                    fill="#fff"
                                                />
                                                <path
                                                    id="Path_62"
                                                    data-name="Path 62"
                                                    d="M799.57,243.88v10.087l-1.75.614V244.5Zm.921-1.3-3.591,1.26V255.88l3.591-1.26Z"
                                                    transform="translate(-756.397 -208.024)"
                                                    fill="#fff"
                                                />
                                                <path
                                                    id="Path_63"
                                                    data-name="Path 63"
                                                    d="M804.226,242.217V252.3l-1.75.615V242.835Zm.921-1.3-3.591,1.26v12.038l3.591-1.26Z"
                                                    transform="translate(-756.766 -207.892)"
                                                    fill="#fff"
                                                />
                                            </g>
                                            <g
                                                onClick={() => this.openDescription('Dynamic Application Security Testing', 'Automate blackbox testing of your deployed application.')}
                                                className="hover_over_icon"
                                                id="hover_over_icon_316"
                                                transform="matrix(1, 0, 0, 1, 3399.5, 2494.5)"
                                                filter="url(#Path_312)"
                                            >
                                                <path
                                                    id="Path_312-2"
                                                    data-name="Path 312"
                                                    d="M387.217,155.228a55,55,0,1,1-55-55A55,55,0,0,1,387.217,155.228Z"
                                                    transform="translate(-112.72 16.35)"
                                                    fill=" url(#linear-gradient)"
                                                    stroke="rgba(0,0,0,0)"
                                                    strokeWidth="1"
                                                />
                                            </g>
                                            <g
                                                id="Group_316"
                                                data-name="Group 316"
                                                transform="translate(3580.339 2648.536)"
                                            >
                                                <path
                                                    id="Path_42"
                                                    data-name="Path 42"
                                                    d="M326.994,240.451a7.109,7.109,0,1,0,7.109,7.109,7.109,7.109,0,0,0-7.109-7.109m0,12.593a5.485,5.485,0,1,1,5.484-5.484,5.485,5.485,0,0,1-5.484,5.484m35.545-20.989H330.564a2.439,2.439,0,0,0-2.437,2.437v1.9H291.038a2.44,2.44,0,0,0-2.437,2.437v26.812a2.44,2.44,0,0,0,2.437,2.436h46.311a2.44,2.44,0,0,0,2.438-2.436v-19.5H363.35v6.5a.813.813,0,0,1-.812.812h-4.048v1.625h4.048a2.439,2.439,0,0,0,2.437-2.437V234.492a2.439,2.439,0,0,0-2.437-2.437m-24.375,33.583a.814.814,0,0,1-.812.812H291.038a.814.814,0,0,1-.812-.812V238.826a.813.813,0,0,1,.812-.812h46.311a.812.812,0,0,1,.812.812Zm25.188-21.125H339.791v-4.063h23.562Zm0-5.691H339.791a2.44,2.44,0,0,0-2.438-2.437h-7.6v-1.9a.813.813,0,0,1,.813-.812H362.54a.813.813,0,0,1,.812.812ZM309.312,241.8h-15v10.019h15Zm-1.625,8.4h-11.75v-6.77H307.69Zm-11.883,9.75h5.887v1.625H295.8Zm19.5,0h5.887v1.625H315.3Zm9.75,0h5.887v1.625h-5.887Zm-19.5,0h5.887v1.625h-5.887Zm44.853-1.342a2.5,2.5,0,0,0-.812,4.868v1.516a.812.812,0,0,0,1.625,0v-1.516a2.5,2.5,0,0,0-.812-4.868m0,3.378a.877.877,0,1,1,.876-.876.877.877,0,0,1-.876.876m6.3-5.757h-.641V253.5a5.661,5.661,0,0,0-11.319,0v2.732h-.641a1.784,1.784,0,0,0-1.782,1.782v8.242a1.784,1.784,0,0,0,1.782,1.782h12.6a1.785,1.785,0,0,0,1.782-1.782v-8.242a1.785,1.785,0,0,0-1.782-1.782M346.373,253.5a4.037,4.037,0,0,1,8.067,0v2.732h-8.067Zm10.491,12.755a.157.157,0,0,1-.157.157h-12.6a.158.158,0,0,1-.158-.157v-8.242a.158.158,0,0,1,.158-.157h12.6a.157.157,0,0,1,.157.157Z"
                                                    transform="translate(-288.601 -232.055)"
                                                    fill="#fff"
                                                />
                                            </g>
                                            <g
                                                onClick={() => this.openDescription('Bug Bounty Hunting', 'Find the best security experts to test your domain for vulnerabilities.')}
                                                className="hover_over_icon"
                                                id="hover_over_icon_48"
                                                transform="matrix(1, 0, 0, 1, 3399.5, 2494.5)"
                                                filter="url(#Ellipse_12)"
                                            >
                                                <circle
                                                    id="Ellipse_12-2"
                                                    data-name="Ellipse 12"
                                                    cx="55"
                                                    cy="55"
                                                    r="55"
                                                    transform="translate(1086.5 116.57)"
                                                    fill=" url(#linear-gradient)"
                                                    stroke="rgba(0,0,0,0)"
                                                    strokeWidth="1"
                                                />
                                            </g>
                                            <path
                                                id="Path_48"
                                                data-name="Path 48"
                                                d="M610.3,207.089a25,25,0,0,0,0,49.991c.253,0,.5,0,.746-.007V232.83h24.242c.007-.246.007-.492.007-.745a25.02,25.02,0,0,0-24.995-25m-2.768,1.664a28.542,28.542,0,0,0-6.23,6.2,28.8,28.8,0,0,1-4.641-1.993,23.392,23.392,0,0,1,10.871-4.208m-12.17,5.2a30.574,30.574,0,0,0,5.044,2.284,28.86,28.86,0,0,0-4.686,15.1h-8.9a23.484,23.484,0,0,1,8.542-17.384m-8.542,18.877h8.9a28.792,28.792,0,0,0,3.977,13.946,30.088,30.088,0,0,0-5.3,2.6,23.413,23.413,0,0,1-7.581-16.542m8.774,17.572a29.463,29.463,0,0,1,4.909-2.328,28.688,28.688,0,0,0,7.029,7.35,23.428,23.428,0,0,1-11.938-5.022m13.961,4.6a27.317,27.317,0,0,1-7.573-7.409,28.758,28.758,0,0,1,7.573-1.194Zm0-10.1a30.268,30.268,0,0,0-8.409,1.4,27.369,27.369,0,0,1-3.933-13.468h12.342Zm0-13.565H597.21a27.286,27.286,0,0,1,4.692-14.646,29.961,29.961,0,0,0,7.649,1.172Zm0-14.967a29.043,29.043,0,0,1-6.731-.952,27.413,27.413,0,0,1,6.731-6.237Zm14.385-3.41a28.955,28.955,0,0,1-4.373,1.91,28.826,28.826,0,0,0-6.125-6.073,23.413,23.413,0,0,1,10.5,4.163m-12.894-3.991a27.2,27.2,0,0,1,6.992,6.371,28.944,28.944,0,0,1-6.992,1.03Zm0,22.367V217.863a30.775,30.775,0,0,0,7.916-1.246,27.33,27.33,0,0,1,4.747,14.72Zm14.154,0a28.788,28.788,0,0,0-4.752-15.2,30.409,30.409,0,0,0,4.789-2.189,23.487,23.487,0,0,1,8.551,17.384Zm7.646,14.458h-1.256v-4.136a7.424,7.424,0,1,0-14.848,0v4.136h-1.256a2.082,2.082,0,0,0-2.082,2.081v11.349a2.084,2.084,0,0,0,2.082,2.082H632.84a2.084,2.084,0,0,0,2.082-2.082V247.876a2.083,2.083,0,0,0-2.082-2.081m-14.608-4.136a5.933,5.933,0,0,1,11.859,0V245.8h-1.846v-4.308a4.1,4.1,0,0,0-8.167,0V245.8h-1.846Zm8.521,4.136h-5.184v-4.308a2.623,2.623,0,0,1,5.184,0Zm6.675,13.43a.589.589,0,0,1-.588.589H615.485a.589.589,0,0,1-.589-.589V247.876a.589.589,0,0,1,.589-.588h17.358a.588.588,0,0,1,.588.588Zm-9.267-10.089a2.74,2.74,0,0,0-2.082,4.533v1.553a2.082,2.082,0,0,0,4.163,0v-1.553a2.741,2.741,0,0,0-2.082-4.533m.836,3.678-.248.222v2.189a.589.589,0,1,1-1.177,0v-2.189l-.248-.222a1.238,1.238,0,0,1-.421-.929,1.256,1.256,0,0,1,2.513,0,1.238,1.238,0,0,1-.42.929"
                                                transform="translate(3930.343 2431.63)"
                                                fill="#fff"
                                            />
                                            <g
                                                onClick={() => this.openDescription('Threat Modeling', 'Identify and enumerate threats in your applications, like vulnerabilities or lack of safeguards, and prioritize threat mitigations.')}
                                                className="hover_over_icon"
                                                id="hover_over_icon_309"
                                                transform="matrix(1, 0, 0, 1, 3399.5, 2494.5)"
                                                filter="url(#Ellipse_9)"
                                            >
                                                <circle
                                                    id="Ellipse_9-2"
                                                    data-name="Ellipse 9"
                                                    cx="55"
                                                    cy="55"
                                                    r="55"
                                                    transform="translate(1186 543.82) rotate(90)"
                                                    fill=" url(#linear-gradient)"
                                                    stroke="rgba(0,0,0,0)"
                                                    strokeWidth="1"
                                                />
                                            </g>
                                            <g
                                                id="Group_309"
                                                data-name="Group 309"
                                                transform="translate(4492.145 3075.966)"
                                            >
                                                <path
                                                    id="Path_43"
                                                    data-name="Path 43"
                                                    d="M531.269,75.82a3.8,3.8,0,1,0,0-1.569h-9.459a8.678,8.678,0,0,0-1.281-3.466h3.811l4.105-6.034h2.822a3.8,3.8,0,1,0,0-1.568h-3.651l-4.106,6.033h-4.247a8.715,8.715,0,0,0-6.1-2.488h-.606a14.054,14.054,0,0,0-28.006.248,8.656,8.656,0,0,0-4.028,2.24h-4.2l-3.982-6.032h-3.658a3.8,3.8,0,1,0,0,1.568h2.814l3.982,6.034h3.762a8.626,8.626,0,0,0-1.283,3.46h-9.276a3.8,3.8,0,1,0,0,1.569h9.2a8.675,8.675,0,0,0,.861,3.459h-3.13L471.5,85.308h-2.821a3.8,3.8,0,1,0,0,1.569h3.65l4.106-6.033h3.273a8.73,8.73,0,0,0,6.894,3.378h26.554a8.713,8.713,0,0,0,6.183-2.567,9.083,9.083,0,0,0,.71-.815h3.577l3.982,6.033h3.658a3.8,3.8,0,1,0,0-1.569h-2.814l-3.981-6.033h-3.446a8.667,8.667,0,0,0,.862-3.459Zm3.722-3.018a2.233,2.233,0,1,1-2.233,2.234,2.233,2.233,0,0,1,2.233-2.234m0-11.062a2.233,2.233,0,1,1-2.233,2.233,2.233,2.233,0,0,1,2.233-2.233M464.96,66.206a2.233,2.233,0,1,1,2.232-2.234,2.233,2.233,0,0,1-2.232,2.234m0,11.061a2.233,2.233,0,1,1,2.232-2.232,2.233,2.233,0,0,1-2.232,2.232m0,11.063a2.233,2.233,0,1,1,2.232-2.234,2.233,2.233,0,0,1-2.232,2.234m70.031-4.466a2.233,2.233,0,1,1-2.233,2.233,2.233,2.233,0,0,1,2.233-2.233m-16.756-3.31a7.148,7.148,0,0,1-5.073,2.111H486.606a7.17,7.17,0,0,1-5.067-12.253,7.073,7.073,0,0,1,3.885-2.006l.639-.106.019-.647a12.485,12.485,0,0,1,24.953-.106l.029.754h2.1a7.178,7.178,0,0,1,5.073,12.245"
                                                    transform="translate(-461.16 -53.985)"
                                                    fill="#fff"
                                                />
                                                <path
                                                    id="Path_44"
                                                    data-name="Path 44"
                                                    d="M497.067,70.1a2.414,2.414,0,0,0-.784,4.7v1.467a.784.784,0,1,0,1.568,0V74.8a2.414,2.414,0,0,0-.783-4.7m0,3.261a.845.845,0,1,1,.844-.845.844.844,0,0,1-.844.845m6.08-5.556h-.62V65.167a5.463,5.463,0,0,0-10.923,0v2.639h-.62a1.721,1.721,0,0,0-1.72,1.719v7.952a1.722,1.722,0,0,0,1.72,1.72h12.162a1.722,1.722,0,0,0,1.72-1.72V69.525a1.721,1.721,0,0,0-1.72-1.719m-9.974-2.639a3.9,3.9,0,0,1,7.786,0v2.639h-7.786ZM503.3,77.475a.152.152,0,0,1-.151.152H490.986a.152.152,0,0,1-.151-.152v-7.95a.15.15,0,0,1,.151-.15h12.162a.15.15,0,0,1,.151.15Z"
                                                    transform="translate(-459.597 -53.659)"
                                                    fill="#fff"
                                                />
                                            </g>
                                            <g
                                                onClick={() => this.openDescription('Static Application Security Testing', 'Automate whitebox testing of your application code.')}
                                                className="hover_over_icon"
                                                id="hover_over_icon_39"
                                                transform="matrix(1, 0, 0, 1, 3399.5, 2494.5)"
                                                filter="url(#Path_309)"
                                            >
                                                <path
                                                    id="Path_309-2"
                                                    data-name="Path 309"
                                                    d="M437.212,155.228a55,55,0,1,0,55-55A55,55,0,0,0,437.212,155.228Z"
                                                    transform="translate(-272.71 443.59)"
                                                    fill=" url(#linear-gradient)"
                                                    stroke="rgba(0,0,0,0)"
                                                    strokeWidth="1"
                                                />
                                            </g>
                                            <path
                                                id="Path_39"
                                                data-name="Path 39"
                                                d="M131.933,40.183c-1.776,0-3.35,1.575-3.35,5.257s1.574,5.257,3.35,5.257,3.376-1.583,3.376-5.257-1.592-5.257-3.376-5.257m0,9.452c-1.062,0-2.1-1.114-2.1-4.2s1.036-4.2,2.1-4.2,2.123,1.1,2.123,4.2-1.062,4.2-2.123,4.2m12.454-22.767c0-.157.1-.236.27-.279l3.429-.749c.218,0,.453.13.453.3v9h2.185c.209,0,.3.13.3.445v.174c0,.314-.086.444-.3.444h-6c-.2,0-.295-.129-.295-.444v-.174c0-.314.1-.445.295-.445H147.3V27.181l-2.62.444c-.2,0-.3-.488-.3-.757M135.224,64.7v.175c0,.313-.087.443-.3.443h-6c-.2,0-.287-.13-.287-.443V64.7c0-.313.087-.444.287-.444h2.58V56.293l-2.62.444c-.2,0-.3-.488-.3-.758,0-.157.1-.235.27-.278l3.429-.749c.218,0,.454.129.454.3v9h2.184c.209,0,.3.13.3.444m-6.633-37.828c0-.157.1-.236.27-.279l3.429-.749c.218,0,.454.13.454.3v9h2.184c.209,0,.3.13.3.445v.174c0,.314-.087.444-.3.444h-6c-.2,0-.287-.129-.287-.444v-.174c0-.314.087-.445.287-.445h2.577v-7.96l-2.62.444c-.2,0-.3-.488-.3-.757m11.238-1.089c-1.767,0-3.35,1.576-3.35,5.258s1.583,5.256,3.35,5.256c1.793,0,3.385-1.583,3.385-5.256s-1.592-5.258-3.385-5.258m0,9.452c-1.062,0-2.1-1.1-2.1-4.194s1.036-4.2,2.1-4.2,2.132,1.1,2.132,4.2-1.062,4.194-2.132,4.194M151.024,64.7v.175c0,.313-.086.443-.295.443h-6c-.2,0-.3-.13-.3-.443V64.7c0-.313.1-.444.3-.444h2.577V56.293l-2.62.444c-.2,0-.3-.488-.3-.758,0-.157.1-.235.27-.278l3.429-.749c.218,0,.453.129.453.3v9h2.185c.209,0,.295.13.295.444m-11.192-9.808c-1.767,0-3.35,1.575-3.35,5.257s1.583,5.257,3.35,5.257c1.793,0,3.385-1.584,3.385-5.257s-1.592-5.257-3.385-5.257m0,9.451c-1.062,0-2.1-1.1-2.1-4.194s1.036-4.2,2.1-4.2,2.132,1.1,2.132,4.2-1.062,4.194-2.132,4.194m.809-23.79v9h2.184c.209,0,.3.13.3.435v.183c0,.3-.087.444-.3.444h-6c-.209,0-.3-.138-.3-.444v-.185c0-.3.087-.435.3-.435H139.4V41.585l-2.609.444c-.209,0-.3-.488-.3-.757,0-.157.087-.236.261-.279l3.43-.749c.226,0,.461.13.461.3m55.631,29.129-8.8-8.8a4.861,4.861,0,0,0-4.5-1.3l-2.846-2.846v-.676a16.418,16.418,0,0,0,2.594-8.88c0-.393-.031-.783-.058-1.172.01-.189.031-.359.031-.56a6.791,6.791,0,0,0-1-3.969,16.439,16.439,0,0,0-3.165-5.265h3.784c.209,0,.3-.129.3-.444v-.174c0-.314-.087-.445-.3-.445h-2.184v-9c0-.175-.236-.3-.462-.3l-3.421.749c-.183.043-.27.122-.27.279,0,.269.087.757.3.757l2.62-.444v7.963H177.5a16.5,16.5,0,0,0-2.881-2.168,9.7,9.7,0,0,0,.185-1.939c0-3.681-1.593-5.258-3.385-5.258-1.721,0-3.257,1.505-3.336,4.989a16.666,16.666,0,0,0-3.749-.008V26.148c0-.175-.235-.3-.453-.3l-3.43.749c-.183.043-.269.122-.269.279,0,.269.086.757.3.757l2.62-.444v3.758a16.5,16.5,0,0,0-4.164,1.392A10.769,10.769,0,0,0,159,31.044c0-3.681-1.593-5.258-3.385-5.258-1.767,0-3.351,1.576-3.351,5.258,0,2.592.8,4.131,1.883,4.816a16.412,16.412,0,0,0-3.686,6.221,3.01,3.01,0,0,0-2.74-1.9c-1.776,0-3.351,1.575-3.351,5.257s1.575,5.257,3.351,5.257a2.8,2.8,0,0,0,2.136-.993,16.433,16.433,0,0,0,2.98,7.215,8.009,8.009,0,0,0-.574,3.23c0,3.672,1.584,5.257,3.351,5.257,1.462,0,2.778-1.061,3.217-3.433a16.493,16.493,0,0,0,4.259,1.435v.849h-2.577c-.2,0-.3.13-.3.444v.175c0,.313.1.444.3.444h6c.209,0,.3-.13.3-.444V64.7c0-.313-.087-.444-.3-.444H164.33v-.671a16.6,16.6,0,0,0,1.854.114,16.786,16.786,0,0,0,2.526-.2,2.977,2.977,0,0,0,2.709,1.906c1.588,0,3.01-1.253,3.311-4.089a16.319,16.319,0,0,0,1.549-1.047l2.609,2.609v1.376h-2.576c-.2,0-.3.13-.3.444v.175c0,.313.1.444.3.444h2.959a4.816,4.816,0,0,0,1.316,2.454l8.8,8.8a4.874,4.874,0,1,0,6.892-6.893M171.42,26.841c1.062,0,2.132,1.1,2.132,4.2a10.291,10.291,0,0,1-.079,1.312,16.447,16.447,0,0,0-4.147-1.4c.021-3.016,1.043-4.106,2.094-4.106m-15.8,0c1.062,0,2.132,1.1,2.132,4.2a8.938,8.938,0,0,1-.212,2.059,16.438,16.438,0,0,0-2.584,1.964c-.791-.4-1.434-1.591-1.434-4.023,0-3.09,1.035-4.2,2.1-4.2M147.73,49.633c-1.062,0-2.1-1.114-2.1-4.2s1.037-4.2,2.1-4.2c1,0,1.979.994,2.1,3.661a16.606,16.606,0,0,0-.163,2.509c-.35,1.605-1.143,2.225-1.937,2.225m7.894,14.708c-1.063,0-2.1-1.1-2.1-4.194a8.8,8.8,0,0,1,.224-2.1c.242.276.478.557.742.821a16.546,16.546,0,0,0,3.211,2.469c-.242,2.183-1.159,3-2.07,3m15.8,0a1.733,1.733,0,0,1-1.517-1.071,16.423,16.423,0,0,0,3.465-1.216c-.344,1.64-1.143,2.287-1.948,2.287m-15.692-6.71a14.8,14.8,0,1,1,20.922,0,14.8,14.8,0,0,1-20.922,0m22.149,1.236c.322-.322.635-.661.922-1.009l2.463,2.462a4.522,4.522,0,0,0-.678.557,4.936,4.936,0,0,0-.557.67l-2.419-2.419c.1-.087.183-.175.269-.261m17.171,16.475a3.224,3.224,0,0,1-4.43,0l-8.8-8.8a3.068,3.068,0,0,1-.742-1.227l-.166-1.062a3.129,3.129,0,0,1,5.337-2.15l8.8,8.8a3.151,3.151,0,0,1,0,4.438M172.605,42.176l2.791-2.792-1.231-1.23-2.387,2.386a6.191,6.191,0,0,0-11.208-.07l-1.922-1.926-1.23,1.231,2.316,2.315a13.192,13.192,0,0,0-.975,4.77h-3.388V48.6h3.457a12.668,12.668,0,0,0,1.259,4.415L157.814,55.3l1.231,1.23,1.981-1.982a6.5,6.5,0,0,0,5.126,2.863c2.347,0,4.443-1.521,5.8-3.887l2.609,2.609,1.23-1.234-3.022-3.022-.078.078a13.07,13.07,0,0,0,.786-3.35h2.786v-1.74h-2.709a13.257,13.257,0,0,0-.941-4.689m-6.453-3.492c2.083,0,3.907,1.7,4.889,4.223H161.27c.982-2.524,2.809-4.223,4.889-4.223m0,16.983c-3.119,0-5.656-3.813-5.656-8.492a12.478,12.478,0,0,1,.256-2.528h10.8a12.41,12.41,0,0,1,.256,2.528c0,4.683-2.538,8.492-5.656,8.492"
                                                transform="translate(3455.417 3041.543)"
                                                fill="#fff"
                                            />
                                            <g className='descriptions'>
                                                <g id="cloud" className="popup" transform="translate(150,150)">
                                                    <g
                                                        transform="matrix(1, 0, 0, 1, 3399.57, 2494.5)"
                                                        filter="url(#Rectangle_27)"
                                                    >
                                                        <rect
                                                            id="Rectangle_27-2"
                                                            data-name="Rectangle 27"
                                                            width="470"
                                                            height="199.145"
                                                            rx="4"
                                                            transform="translate(491.43 215.7)"
                                                            fill="#fff"
                                                        />
                                                    </g>
                                                    <g id="Group_432" data-name="Group 432" transform="translate(-17)">
                                                        <text
                                                            transform="translate(3939.072 2791.771)"
                                                            fill="#032140"
                                                            fontSize="30"
                                                            fontFamily="Montserrat-Regular, Montserrat"
                                                        >
                                                            <tspan x="0" y="0">Automate the protection of</tspan>
                                                            <tspan x="0" y="30">cloud-based systems, data</tspan>
                                                            <tspan x="0" y="60">and infrastructure from threats.</tspan>
                                                        </text>
                                                        <text
                                                            id="Click_to_start_your_introduction_tour"
                                                            data-name="Click to start your introduction tour"
                                                            transform="translate(3939.072 2828.466)"
                                                            fill="#1492e6"
                                                            fontSize="20"
                                                            fontFamily="Montserrat-Regular, Montserrat"
                                                            textDecoration="underline"
                                                        >
                                                            <tspan x="0" y="60" onClick={this.handleLinkTo}>
                                                                Click to start your introduction tour
                                                            </tspan>
                                                        </text>
                                                        <text
                                                            id="SAST_Source_Code_Analysis"
                                                            data-name="SAST Source Code Analysis"
                                                            transform="translate(3939.072 2754.075)"
                                                            fill="#032140"
                                                            fontSize="24"
                                                            fontFamily="Montserrat-SemiBold, Montserrat"
                                                            fontWeight="600"
                                                        >
                                                            <tspan x="0" y="0">Cloud Security</tspan>
                                                        </text>
                                                    </g>
                                                </g>
                                                <g id="mobile" className="popup" transform="translate(-150,200)">
                                                    <g
                                                        transform="matrix(1, 0, 0, 1, 3399.57, 2494.5)"
                                                        filter="url(#Rectangle_27)"
                                                    >
                                                        <rect
                                                            id="Rectangle_27-2"
                                                            data-name="Rectangle 27"
                                                            width="470"
                                                            height="159.145"
                                                            rx="4"
                                                            transform="translate(491.43 215.7)"
                                                            fill="#fff"
                                                        />
                                                    </g>
                                                    <g id="Group_432" data-name="Group 432" transform="translate(-17)">
                                                        <text
                                                            transform="translate(3939.072 2791.771)"
                                                            fill="#032140"
                                                            fontSize="30"
                                                            fontFamily="Montserrat-Regular, Montserrat"
                                                        >
                                                            <tspan x="0" y="0">Automate your mobile application</tspan>
                                                            <tspan x="0" y="25">security testing</tspan>
                                                        </text>
                                                        <text
                                                            id="Click_to_start_your_introduction_tour"
                                                            data-name="Click to start your introduction tour"
                                                            transform="translate(3939.072 2828.466)"
                                                            fill="#1492e6"
                                                            fontSize="20"
                                                            fontFamily="Montserrat-Regular, Montserrat"
                                                            textDecoration="underline"
                                                        >
                                                            <tspan x="0" y="20" onClick={this.handleLinkTo}>
                                                                Click to start your introduction tour
                                                            </tspan>
                                                        </text>
                                                        <text
                                                            id="SAST_Source_Code_Analysis"
                                                            data-name="SAST Source Code Analysis"
                                                            transform="translate(3939.072 2754.075)"
                                                            fill="#032140"
                                                            fontSize="24"
                                                            fontFamily="Montserrat-SemiBold, Montserrat"
                                                            fontWeight="600"
                                                        >
                                                            <tspan x="0" y="0">Mobile Security</tspan>
                                                        </text>
                                                    </g>
                                                </g>
                                                <g id="sast" className="popup" transform="translate(-450,170)">
                                                    <g
                                                        transform="matrix(1, 0, 0, 1, 3399.57, 2494.5)"
                                                        filter="url(#Rectangle_27)"
                                                    >
                                                        <rect
                                                            id="Rectangle_27-2"
                                                            data-name="Rectangle 27"
                                                            width="470"
                                                            height="179.145"
                                                            rx="4"
                                                            transform="translate(491.43 215.7)"
                                                            fill="#fff"
                                                        />
                                                    </g>
                                                    <g id="Group_432" data-name="Group 432" transform="translate(-17)">
                                                        <text
                                                            transform="translate(3939.072 2791.771)"
                                                            fill="#032140"
                                                            fontSize="30"
                                                            fontFamily="Montserrat-Regular, Montserrat"
                                                        >
                                                            <tspan x="0" y="0">Automate whitebox testing</tspan>
                                                            <tspan x="0" y="30">of your application code.</tspan>
                                                        </text>
                                                        <text
                                                            id="Click_to_start_your_introduction_tour"
                                                            data-name="Click to start your introduction tour"
                                                            transform="translate(3939.072 2828.466)"
                                                            fill="#1492e6"
                                                            fontSize="20"
                                                            fontFamily="Montserrat-Regular, Montserrat"
                                                            textDecoration="underline"
                                                        >
                                                            <tspan x="0" y="40" onClick={this.handleLinkTo}>
                                                                Click to start your introduction tour
                                                            </tspan>
                                                        </text>
                                                        <text
                                                            id="SAST_Source_Code_Analysis"
                                                            data-name="SAST Source Code Analysis"
                                                            transform="translate(3939.072 2754.075)"
                                                            fill="#032140"
                                                            fontSize="24"
                                                            fontFamily="Montserrat-SemiBold, Montserrat"
                                                            fontWeight="600"
                                                        >
                                                            <tspan x="0" y="0">
                                                                Static Application Security Testing
                                                            </tspan>
                                                        </text>
                                                    </g>
                                                </g>
                                                <g id="threat" className="popup" transform="translate(450,150)">
                                                    <g
                                                        transform="matrix(1, 0, 0, 1, 3399.57, 2494.5)"
                                                        filter="url(#Rectangle_27)"
                                                    >
                                                        <rect
                                                            id="Rectangle_27-2"
                                                            data-name="Rectangle 27"
                                                            width="490"
                                                            height="199.145"
                                                            rx="4"
                                                            transform="translate(491.43 215.7)"
                                                            fill="#fff"
                                                        />
                                                    </g>
                                                    <g id="Group_432" data-name="Group 432" transform="translate(-17)">
                                                        <text
                                                            transform="translate(3939.072 2791.771)"
                                                            fill="#032140"
                                                            fontSize="30"
                                                            fontFamily="Montserrat-Regular, Montserrat"
                                                        >
                                                            <tspan x="0" y="0">
                                                                Identify and enumerate threats in your
                                                            </tspan>
                                                            <tspan x="0" y="30">
                                                                applications, like vulnerabilities or
                                                                lack
                                                                of
                                                            </tspan>
                                                            <tspan x="0" y="60">
                                                                {' '}
                                                                safeguards, and prioritize threat
                                                                mitigations.
                                                            </tspan>
                                                        </text>
                                                        <text
                                                            id="Click_to_start_your_introduction_tour"
                                                            data-name="Click to start your introduction tour"
                                                            transform="translate(3939.072 2828.466)"
                                                            fill="#1492e6"
                                                            fontSize="20"
                                                            fontFamily="Montserrat-Regular, Montserrat"
                                                            textDecoration="underline"
                                                        >
                                                            <tspan x="0" y="60" onClick={this.handleLinkTo}>
                                                                Click to start your introduction tour
                                                            </tspan>
                                                        </text>
                                                        <text
                                                            id="SAST_Source_Code_Analysis"
                                                            data-name="SAST Source Code Analysis"
                                                            transform="translate(3939.072 2754.075)"
                                                            fill="#032140"
                                                            fontSize="24"
                                                            fontFamily="Montserrat-SemiBold, Montserrat"
                                                            fontWeight="600"
                                                        >
                                                            <tspan x="0" y="0">Threat Modeling</tspan>
                                                        </text>
                                                    </g>
                                                </g>
                                                <g id="secret" className="popup" transform="translate(-450,-45)">
                                                    <g
                                                        transform="matrix(1, 0, 0, 1, 3399.57, 2494.5)"
                                                        filter="url(#Rectangle_27)"
                                                    >
                                                        <rect
                                                            id="Rectangle_27-2"
                                                            data-name="Rectangle 27"
                                                            width="470"
                                                            height="179.145"
                                                            rx="4"
                                                            transform="translate(491.43 215.7)"
                                                            fill="#fff"
                                                        />
                                                    </g>
                                                    <g id="Group_432" data-name="Group 432" transform="translate(-17)">
                                                        <text
                                                            transform="translate(3939.072 2791.771)"
                                                            fill="#032140"
                                                            fontSize="30"
                                                            fontFamily="Montserrat-Regular, Montserrat"
                                                        >
                                                            <tspan x="0" y="0">
                                                                Automate manage and enforce secure
                                                            </tspan>
                                                            <tspan x="0" y="30">digital authentication.</tspan>
                                                        </text>
                                                        <text
                                                            id="Click_to_start_your_introduction_tour"
                                                            data-name="Click to start your introduction tour"
                                                            transform="translate(3939.072 2828.466)"
                                                            fill="#1492e6"
                                                            fontSize="20"
                                                            fontFamily="Montserrat-Regular, Montserrat"
                                                            textDecoration="underline"
                                                        >
                                                            <tspan x="0" y="40" onClick={this.handleLinkTo}>
                                                                Click to start your introduction tour
                                                            </tspan>
                                                        </text>
                                                        <text
                                                            id="SAST_Source_Code_Analysis"
                                                            data-name="SAST Source Code Analysis"
                                                            transform="translate(3939.072 2754.075)"
                                                            fill="#032140"
                                                            fontSize="24"
                                                            fontFamily="Montserrat-SemiBold, Montserrat"
                                                            fontWeight="600"
                                                        >
                                                            <tspan x="0" y="0">Secret Management</tspan>
                                                        </text>
                                                    </g>
                                                </g>
                                                <g id="serverless" className="popup" transform="translate(50,-55)">
                                                    <g
                                                        transform="matrix(1, 0, 0, 1, 3399.57, 2494.5)"
                                                        filter="url(#Rectangle_27)"
                                                    >
                                                        <rect
                                                            id="Rectangle_27-2"
                                                            data-name="Rectangle 27"
                                                            width="470"
                                                            height="199.145"
                                                            rx="4"
                                                            transform="translate(491.43 215.7)"
                                                            fill="#fff"
                                                        />
                                                    </g>
                                                    <g id="Group_432" data-name="Group 432" transform="translate(-17)">
                                                        <text
                                                            transform="translate(3939.072 2791.771)"
                                                            fill="#032140"
                                                            fontSize="30"
                                                            fontFamily="Montserrat-Regular, Montserrat"
                                                        >
                                                            <tspan x="0" y="0">
                                                                Engineer the assurance of code integrity,
                                                            </tspan>
                                                            <tspan x="0" y="30">
                                                                tight permissions, behavioral analysis,
                                                            </tspan>
                                                            <tspan x="0" y="60">
                                                                and conduct vulnerability assessments.
                                                            </tspan>
                                                        </text>
                                                        <text
                                                            id="Click_to_start_your_introduction_tour"
                                                            data-name="Click to start your introduction tour"
                                                            transform="translate(3939.072 2828.466)"
                                                            fill="#1492e6"
                                                            fontSize="20"
                                                            fontFamily="Montserrat-Regular, Montserrat"
                                                            textDecoration="underline"
                                                        >
                                                            <tspan x="0" y="60" onClick={this.handleLinkTo}>
                                                                Click to start your introduction tour
                                                            </tspan>
                                                        </text>
                                                        <text
                                                            id="SAST_Source_Code_Analysis"
                                                            data-name="SAST Source Code Analysis"
                                                            transform="translate(3939.072 2754.075)"
                                                            fill="#032140"
                                                            fontSize="24"
                                                            fontFamily="Montserrat-SemiBold, Montserrat"
                                                            fontWeight="600"
                                                        >
                                                            <tspan x="0" y="0">Serverless</tspan>
                                                        </text>
                                                    </g>
                                                </g>
                                                <g id="vulnerability" className="popup" transform="translate(450,-55)">
                                                    <g
                                                        transform="matrix(1, 0, 0, 1, 3399.57, 2494.5)"
                                                        filter="url(#Rectangle_27)"
                                                    >
                                                        <rect
                                                            id="Rectangle_27-2"
                                                            data-name="Rectangle 27"
                                                            width="470"
                                                            height="199.145"
                                                            rx="4"
                                                            transform="translate(491.43 215.7)"
                                                            fill="#fff"
                                                        />
                                                    </g>
                                                    <g id="Group_432" data-name="Group 432" transform="translate(-17)">
                                                        <text
                                                            transform="translate(3939.072 2791.771)"
                                                            fill="#032140"
                                                            fontSize="30"
                                                            fontFamily="Montserrat-Regular, Montserrat"
                                                        >
                                                            <tspan x="0" y="0">
                                                                Automate identification, classification,
                                                            </tspan>
                                                            <tspan x="0" y="30">prioritization, and mitigation</tspan>
                                                            <tspan x="0" y="60">of software vulnerabilities.</tspan>
                                                        </text>
                                                        <text
                                                            id="Click_to_start_your_introduction_tour"
                                                            data-name="Click to start your introduction tour"
                                                            transform="translate(3939.072 2828.466)"
                                                            fill="#1492e6"
                                                            fontSize="20"
                                                            fontFamily="Montserrat-Regular, Montserrat"
                                                            textDecoration="underline"
                                                        >
                                                            <tspan x="0" y="60" onClick={this.handleLinkTo}>
                                                                Click to start your introduction tour
                                                            </tspan>
                                                        </text>
                                                        <text
                                                            id="SAST_Source_Code_Analysis"
                                                            data-name="SAST Source Code Analysis"
                                                            transform="translate(3939.072 2754.075)"
                                                            fill="#032140"
                                                            fontSize="24"
                                                            fontFamily="Montserrat-SemiBold, Montserrat"
                                                            fontWeight="600"
                                                        >
                                                            <tspan x="0" y="0">Vulnerability Management</tspan>
                                                        </text>
                                                    </g>
                                                </g>
                                                <g id="bug" className="popup" transform="translate(450,0)">
                                                    <g
                                                        transform="matrix(1, 0, 0, 1, 3399.57, 2494.5)"
                                                        filter="url(#Rectangle_27)"
                                                    >
                                                        <rect
                                                            id="Rectangle_27-2"
                                                            data-name="Rectangle 27"
                                                            width="470"
                                                            height="179.145"
                                                            rx="4"
                                                            transform="translate(491.43 215.7)"
                                                            fill="#fff"
                                                        />
                                                    </g>
                                                    <g id="Group_432" data-name="Group 432" transform="translate(-17)">
                                                        <text
                                                            transform="translate(3939.072 2791.771)"
                                                            fill="#032140"
                                                            fontSize="30"
                                                            fontFamily="Montserrat-Regular, Montserrat"
                                                        >
                                                            <tspan x="0" y="0">
                                                                Find the best security experts to test
                                                                your
                                                            </tspan>
                                                            <tspan x="0" y="30"> domain for vulnerabilities.</tspan>
                                                        </text>
                                                        <text
                                                            id="Click_to_start_your_introduction_tour"
                                                            data-name="Click to start your introduction tour"
                                                            transform="translate(3939.072 2828.466)"
                                                            fill="#1492e6"
                                                            fontSize="20"
                                                            fontFamily="Montserrat-Regular, Montserrat"
                                                            textDecoration="underline"
                                                        >
                                                            <tspan x="0" y="30" onClick={this.handleLinkTo}>
                                                                Click to start your introduction tour
                                                            </tspan>
                                                        </text>
                                                        <text
                                                            id="SAST_Source_Code_Analysis"
                                                            data-name="SAST Source Code Analysis"
                                                            transform="translate(3939.072 2754.075)"
                                                            fill="#032140"
                                                            fontSize="24"
                                                            fontFamily="Montserrat-SemiBold, Montserrat"
                                                            fontWeight="600"
                                                        >
                                                            <tspan x="0" y="0">Bug Bounty Hunting</tspan>
                                                        </text>
                                                    </g>
                                                </g>
                                                <g id="sastSecurity" className="popup" transform="translate(-150,0)">
                                                    <g
                                                        transform="matrix(1, 0, 0, 1, 3399.57, 2494.5)"
                                                        filter="url(#Rectangle_27)"
                                                    >
                                                        <rect
                                                            id="Rectangle_27-2"
                                                            data-name="Rectangle 27"
                                                            width="470"
                                                            height="169.145"
                                                            rx="4"
                                                            transform="translate(491.43 215.7)"
                                                            fill="#fff"
                                                        />
                                                    </g>
                                                    <g id="Group_432" data-name="Group 432" transform="translate(-17)">
                                                        <text
                                                            transform="translate(3939.072 2791.771)"
                                                            fill="#032140"
                                                            fontSize="30"
                                                            fontFamily="Montserrat-Regular, Montserrat"
                                                        >
                                                            <tspan x="0" y="0">Automate control over your</tspan>
                                                            <tspan x="0" y="30">dependencies’ vulnerabilities.</tspan>
                                                        </text>
                                                        <text
                                                            id="Click_to_start_your_introduction_tour"
                                                            data-name="Click to start your introduction tour"
                                                            transform="translate(3939.072 2828.466)"
                                                            fill="#1492e6"
                                                            fontSize="20"
                                                            fontFamily="Montserrat-Regular, Montserrat"
                                                            textDecoration="underline"
                                                        >
                                                            <tspan x="0" y="30" onClick={this.handleLinkTo}>
                                                                Click to start your introduction tour
                                                            </tspan>
                                                        </text>
                                                        <text
                                                            id="SAST_Source_Code_Analysis"
                                                            data-name="SAST Source Code Analysis"
                                                            transform="translate(3939.072 2754.075)"
                                                            fill="#032140"
                                                            fontSize="24"
                                                            fontFamily="Montserrat-SemiBold, Montserrat"
                                                            fontWeight="600"
                                                        >
                                                            <tspan x="0" y="0">Software Composition Analysis</tspan>
                                                        </text>
                                                    </g>
                                                </g>
                                                <g id="dast" className="popup" transform="translate(-450,0)">
                                                    <g
                                                        transform="matrix(1, 0, 0, 1, 3399.57, 2494.5)"
                                                        filter="url(#Rectangle_27)"
                                                    >
                                                        <rect
                                                            id="Rectangle_27-2"
                                                            data-name="Rectangle 27"
                                                            width="470"
                                                            height="169.145"
                                                            rx="4"
                                                            transform="translate(491.43 215.7)"
                                                            fill="#fff"
                                                        />
                                                    </g>
                                                    <g id="Group_432" data-name="Group 432" transform="translate(-17)">
                                                        <text
                                                            transform="translate(3939.072 2791.771)"
                                                            fill="#032140"
                                                            fontSize="30"
                                                            fontFamily="Montserrat-Regular, Montserrat"
                                                        >
                                                            <tspan x="0" y="0">Automate blackbox testing of</tspan>
                                                            <tspan x="0" y="30">your deployed application.</tspan>
                                                        </text>
                                                        <text
                                                            id="Click_to_start_your_introduction_tour"
                                                            data-name="Click to start your introduction tour"
                                                            transform="translate(3939.072 2828.466)"
                                                            fill="#1492e6"
                                                            fontSize="20"
                                                            fontFamily="Montserrat-Regular, Montserrat"
                                                            textDecoration="underline"
                                                        >
                                                            <tspan x="0" y="30" onClick={this.handleLinkTo}>
                                                                Click to start your introduction tour
                                                            </tspan>
                                                        </text>
                                                        <text
                                                            id="SAST_Source_Code_Analysis"
                                                            data-name="SAST Source Code Analysis"
                                                            transform="translate(3939.072 2754.075)"
                                                            fill="#032140"
                                                            fontSize="24"
                                                            fontFamily="Montserrat-SemiBold, Montserrat"
                                                            fontWeight="600"
                                                        >
                                                            <tspan x="0" y="0">
                                                                Dynamic Application Security Testing
                                                            </tspan>
                                                        </text>
                                                    </g>
                                                </g>
                                                <g id="container" className="popup" transform="translate(150,0)">
                                                    <g
                                                        transform="matrix(1, 0, 0, 1, 3399.57, 2494.5)"
                                                        filter="url(#Rectangle_27)"
                                                    >
                                                        <rect
                                                            id="Rectangle_27-2"
                                                            data-name="Rectangle 27"
                                                            width="470"
                                                            height="199.145"
                                                            rx="4"
                                                            transform="translate(491.43 215.7)"
                                                            fill="#fff"
                                                        />
                                                    </g>
                                                    <g id="Group_432" data-name="Group 432" transform="translate(-17)">
                                                        <text
                                                            transform="translate(3939.072 2791.771)"
                                                            fill="#032140"
                                                            fontSize="30"
                                                            fontFamily="Montserrat-Regular, Montserrat"
                                                        >
                                                            <tspan x="0" y="0">
                                                                Automate protecting your containers .
                                                            </tspan>
                                                            <tspan x="0" y="30">
                                                                integrity - from the applications
                                                                running
                                                            </tspan>
                                                            <tspan x="0" y="60">
                                                                within to the container infrastructure
                                                            </tspan>
                                                        </text>
                                                        <text
                                                            id="Click_to_start_your_introduction_tour"
                                                            data-name="Click to start your introduction tour"
                                                            transform="translate(3939.072 2828.466)"
                                                            fill="#1492e6"
                                                            fontSize="20"
                                                            fontFamily="Montserrat-Regular, Montserrat"
                                                            textDecoration="underline"
                                                        >
                                                            <tspan x="0" y="60" onClick={this.handleLinkTo}>
                                                                Click to start your introduction tour
                                                            </tspan>
                                                        </text>
                                                        <text
                                                            id="SAST_Source_Code_Analysis"
                                                            data-name="SAST Source Code Analysis"
                                                            transform="translate(3939.072 2754.075)"
                                                            fill="#032140"
                                                            fontSize="24"
                                                            fontFamily="Montserrat-SemiBold, Montserrat"
                                                            fontWeight="600"
                                                        >
                                                            <tspan x="0" y="0">Container Security</tspan>
                                                        </text>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                    <div className="description_block" id='description_block'>
                                        <h6>{title}</h6>
                                        <p>{subtitle}</p>
                                        <Link to='/sarah'>{link}</Link>
                                    </div>
                                </div>
                                <h4
                                    data-fontsize="22"
                                    data-lineheight="29.92px"
                                    className="fusion-responsive-typography-calculated"
                                    style={{ fontSize: '22px' }}
                                >
                                    <span style={{ fontSize: '16px' }}>
                                        <p>Each DevSecOps category has a free introduction module that introduces you to the category and its common security issues. It also helps you to understand which learning paths, courses and exams are available.</p>
                                        <p>The introduction modules contain very basic hands-on labs to help you to become familiar with how the academy's hands-on labs work and to get beginners started with applying DevSecOps practices in that category.</p>
                                    </span>
                                </h4>
                            </div>
                            <div className="col-lg-4 offset-1" id="sarah-animation2">
                                <img
                                    src="/img/images/sarah-polan-secretsmanagement-architect.jpg"
                                    alt=""
                                    className="img-fluid sarah"
                                />
                                <em>
                                    <span>
                                        “The introduction tour convinced me
                                        that I was able to successfully follow courses, complete the exams, and make the change I was planning to make.”
                                    </span>
                                </em>

                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Course;
