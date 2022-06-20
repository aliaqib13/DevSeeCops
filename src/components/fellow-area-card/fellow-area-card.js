import React from 'react';
import './fellow-area-card.scss';
import { Card } from 'antd';

const FellowAreaCard = ({
    img, name, description,
}) => (
    <Card className="fellow-card">
        <div className="img-container img-container-company">
            <img src={img} alt="fellow" />
        </div>
        <div className="name">{name}</div>
        <div className="description">{description}</div>
    </Card>
);

export default FellowAreaCard;
