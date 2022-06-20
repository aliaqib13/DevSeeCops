import React, { Component } from 'react';
import {
    Tooltip, Icon,
} from 'antd';
import { LinkedinShareButton } from 'react-share';

class ImageShareDownload extends Component {
    render() {
        const {
            certificateById, notifyViaSlack, downloadCertificate, certificateImageBadge,
        } = this.props;

        return (
            <>
                <div className='certificate-image-body'>
                    <img className="certificate-by-id-img" src={certificateImageBadge} alt="certificate" />
                </div>
                <div className='certificate-share-body'>
                    <LinkedinShareButton
                        url={certificateImageBadge}
                        onClick={() => notifyViaSlack('linkedin', certificateById)}
                    >
                        <Tooltip placement="top" title="Share on LinkedIn">
                            <Icon className='linkedin-share-icon share-icon active' type="linkedin" />
                        </Tooltip>
                    </LinkedinShareButton>
                    <Tooltip placement="top" title="Share on Facebook">
                        <Icon className='facebook-share-icon share-icon  non-active' type="facebook" />
                    </Tooltip>
                    <Tooltip placement="top" title="Share on Twitter">
                        <Icon className='twitter-share-icon share-icon  non-active' type="twitter" />
                    </Tooltip>
                    <Tooltip placement="top" title="Share on Instagram">
                        <Icon className='instagram-share-icon share-icon  non-active' type="instagram" />
                    </Tooltip>
                    <Tooltip placement="top" title="Download your certificate">
                        <Icon className='certificate-mail-download-button share-icon  active' onClick={e => downloadCertificate(e, certificateImageBadge, certificateById)} type="download" />
                    </Tooltip>
                </div>
            </>
        );
    }
}

export { ImageShareDownload };
export default ImageShareDownload;
