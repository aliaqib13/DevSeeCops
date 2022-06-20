import React from 'react';
import './fellow-card.scss';
import { Card } from 'antd';

const FellowCard = ({
    img, name, description, link,
}) => (
    <Card className="fellow-card">
        <div className="img-container img-container-company">
            <a rel="noopener noreferrer" href={link} style={{ pointerEvents: !link ? 'none' : 'auto' }} target="_blank">
                <img src={img} alt="fellow" />
            </a>
        </div>
        <div className="name">{name}</div>
        <div className="description">{description}</div>
    </Card>
);

export default FellowCard;
