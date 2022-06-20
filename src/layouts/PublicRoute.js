import React from 'react';

export default function PublicRoute(props) {
    const ChildComponent = props.component;
    return (<ChildComponent />);
}
