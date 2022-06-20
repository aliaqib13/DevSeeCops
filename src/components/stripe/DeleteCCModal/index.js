import React from 'react';
import { Button, Modal, message } from 'antd';

const confirmModal = Modal.confirm;

const DeleteCCModal = props => {
    const deleteCC = () => {
        confirmModal({
            title: 'Are you sure to remove your credit card details?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                message.loading('Deleting...');
                props.deleteCreditCard().then(res => {
                    message.destroy();
                    if (res === true) {
                        return message.success('Deleted');
                    }
                    return message.err(res.message);
                }).catch(err => console.warn(err));
            },
        });
    };

    return (
        <Button onClick={deleteCC}>Delete Credit Card</Button>
    );
};

export default DeleteCCModal;
