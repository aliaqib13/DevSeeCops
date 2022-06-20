import React from 'react';
import Clipboard from 'react-clipboard.js';
import { Icon, Tooltip } from 'antd';
import './copyField.scss';

class CopyField extends React.Component {
    state = {
        tooltipTitle: 'Copy to clipboard',
    }

    onSuccess = e => {
        e.clearSelection();
        this.setState({
            tooltipTitle: 'Copied!',
        });
    }

    changeTooltipTitle = visible => {
        if (!visible) {
            this.setState({
                tooltipTitle: 'Copy to clipboard',
            });
        }
    }

    render() {
        const { content } = this.props;
        return (
            <div className='copy-field'>
                <Tooltip title={this.state.tooltipTitle} onVisibleChange={this.changeTooltipTitle}>
                    <span className="copy-button-container">
                        <Clipboard
                            onSuccess={this.onSuccess}
                            option-target={trigger => trigger.parentElement.nextElementSibling}
                            className="copy-button"
                        >
                            <Icon type="copy" />
                        </Clipboard>
                    </span>
                </Tooltip>

                <code className="command">
                    <span className="command-wrapper">
                        {content.text}
                    </span>
                </code>
            </div>
        );
    }
}

export default CopyField;
