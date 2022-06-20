import React, { Component } from 'react';
import { message } from 'antd';
import './activeLab.scss';
import ActiveLab from '../../../components/admin/activeLabs/activeLabs';

class ActiveLabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            currentPage: 1,
            pageSize: 10,
        };
    }

    fetchInterval = null;

    componentDidMount() {
        const loader = message.loading('Loading..', 0);
        const { fetchActiveLabs } = this.props;
        const { pageSize } = this.state;

        return fetchActiveLabs(1, pageSize).then(res => {
            loader();
            this.setState({
                loading: false,
            });
            if (res !== true) {
                message.error(res.message);
            } else {
                this.__setActiveLabInterval();
            }
        });
    }

    componentWillUnmount() {
        clearInterval(this.fetchInterval);
        this.fetchInterval = null;
    }

    paginate = page => {
        const currentPage = page.current;
        const { fetchActiveLabs } = this.props;
        const { pageSize } = this.state;
        this.setState({
            currentPage,
        });

        return fetchActiveLabs(currentPage, pageSize).then(res => {
            if (res === true) {
                this.__setActiveLabInterval();
            }
        });
    }

    __setActiveLabInterval() {
        const { fetchActiveLabs } = this.props;
        const { currentPage, pageSize } = this.state;
        clearInterval(this.fetchInterval);

        this.fetchInterval = setInterval(() => {
            fetchActiveLabs(currentPage, pageSize);
        }, 5000);
    }

    render() {
        const { loading, currentPage, pageSize } = this.state;
        const { adminActiveLabsHistory: { activeLabs }, fetchStepsImages, stepsImages } = this.props;
        return (
            <ActiveLab
                labs={activeLabs}
                loading={loading}
                currentPage={currentPage}
                paginate={this.paginate}
                pageSize={pageSize}
                fetchStepsImages={fetchStepsImages}
                steps_images={stepsImages || []}
            />
        );
    }
}

export default ActiveLabs;
