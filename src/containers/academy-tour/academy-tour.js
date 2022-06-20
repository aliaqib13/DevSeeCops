import React, { Component } from 'react';
import AcademyTourView from '../../components/academy-tour/academy-tour';

class AcademyTour extends Component {
    constructor(props) {
        super(props);
        this.state = {
            certificate: null,
        };
    }

    async componentWillMount() {
        const {
            user, fetchIntroCourses, getIntroductionCertificate, fetchPublicIntroCourses,
        } = this.props;
        // If we have a user, fetch info specific to them
        if (user && user.id) {
            await Promise.all([
                fetchIntroCourses(),
                getIntroductionCertificate(user.id).then(res => {
                    if (res !== false) {
                        this.setState({
                            certificate: res,
                        });
                    }
                    return res;
                }).catch(console.error),
            ]);
        } else {
            // If there's no user, this is the public version of the page:
            await fetchPublicIntroCourses();
        }
    }

    render() {
        const { certificate } = this.state;
        const {
            createActiveIntroductionCourse,
            introCourses,
            sendCertificateToEmail,
            userDidIntroductions,
        } = this.props;
        return (
            <AcademyTourView
                introCourses={introCourses}
                certificate={certificate}
                userDidIntroductions={userDidIntroductions}
                sendCertificateToEmail={sendCertificateToEmail}
                createActiveIntroductionCourse={createActiveIntroductionCourse}
            />
        );
    }
}

export default AcademyTour;
