import React from 'react';
import { Select, Form } from 'antd';

const FormItem = Form.Item;

const EmailSelect = props => {
    const emailValidator = (rule, values, callback) => {
        const emailRegex = /^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/;
        const invalidInputs = values.filter(value => !value.match(emailRegex));
        if (invalidInputs.length === 0) {
            callback();
        } else if (invalidInputs.length === 1) {
            callback(`${invalidInputs.join('')} is not a valid email`);
        } else {
            callback(`${invalidInputs.slice(0, -1).join(', ')} and ${invalidInputs.slice(-1)} are not valid emails`);
        }
    };
    const { getFieldDecorator } = props.form;
    const { handleEmailChange } = props;
    return (
        <Form>
            <FormItem>
                {getFieldDecorator('invitees', {
                    rules: [{
                        validator: emailValidator,
                    }],
                })(
                    <Select
                        onChange={handleEmailChange}
                        mode="tags"
                        tokenSeparators={[',']}
                        notFoundContent={null}
                        className="email-selectbox"
                        placeholder="Please enter the email addresses you like to send your certificate to"
                        dropdownClassName="certificates-container-email-dropdown"
                    />,
                )}
            </FormItem>
        </Form>
    );
};

export default Form.create()(EmailSelect);
