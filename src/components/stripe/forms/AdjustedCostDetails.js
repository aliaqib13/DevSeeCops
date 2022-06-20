import React from 'react';
import {
    Typography, Row, Col, Tooltip,
} from 'antd';
import propTypes from 'prop-types';

const { Text } = Typography;

const AdjustedCostDetails = ({
    ideal, coursePrice, discount, subTotal, tokensToDeduct, valueOfTokensToDeduct, total,
}) => {
    const currency = ideal ? '€ ' : '$ ';
    return (
        <>
            <Row className='amount-changes'>
                <Col xs={24} sm={14} md={12}>
                    <div className='cost-details'>
                        <Text>
                            {currency}
                            {coursePrice}
                        </Text>
                        { discount && (
                            <Text>
                                {`- ${discount.coupon.percent_off} %`}
                            </Text>
                        )}

                        <Text>
                            <Tooltip
                                placement="leftBottom"
                                title={`${tokensToDeduct} token${tokensToDeduct !== 1 ? 's' : ''}`}
                            >
                                {`- ${currency}${valueOfTokensToDeduct}`}
                            </Tooltip>
                        </Text>
                        <Text>+ 21% VAT</Text>
                    </div>
                    <div className='total-remaining'>
                        <Text>
                            {currency}
                            {total}
                        </Text>
                    </div>
                </Col>
            </Row>
        </>
    );
};

AdjustedCostDetails.propTypes = {
    ideal: propTypes.bool,
    coursePrice: propTypes.number.isRequired,
    discount: propTypes.shape({
        coupon: propTypes.shape({
            percent_off: propTypes.number,
        }),
    }),
    subTotal: propTypes.number,
    valueOfTokensToDeduct: propTypes.number,
    tokensToDeduct: propTypes.number,
    total: propTypes.string.isRequired,
};

AdjustedCostDetails.defaultProps = {
    ideal: false,
    tokensToDeduct: 0,
    valueOfTokensToDeduct: 0,
    discount: null,
    subTotal: 0,
};

export default AdjustedCostDetails;
