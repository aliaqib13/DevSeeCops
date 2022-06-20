import React from 'react';
import DOMPurify from 'dompurify';

const TEMPORARY_ATTRIBUTE = 'data-temp-href-target';

DOMPurify.addHook('beforeSanitizeAttributes', (node => {
    if (node.tagName === 'A') {
        if (!node.hasAttribute('target')) {
            node.setAttribute('target', '_self');
        }

        if (node.hasAttribute('target')) {
            node.setAttribute(TEMPORARY_ATTRIBUTE, node.getAttribute('target'));
        }
    }
}));

DOMPurify.addHook('afterSanitizeAttributes', (node => {
    if (node.tagName === 'A' && node.hasAttribute(TEMPORARY_ATTRIBUTE)) {
        node.setAttribute('target', node.getAttribute(TEMPORARY_ATTRIBUTE));
        node.removeAttribute(TEMPORARY_ATTRIBUTE);
        if (node.getAttribute('target') === '_blank') {
            node.setAttribute('rel', 'noopener');
        }
    }
}));

const HTMLSanitize = ({ content }) => {
    const sanitized = DOMPurify.sanitize(content);
    return (
        <div dangerouslySetInnerHTML={{ __html: sanitized }} />
    );
};

export default HTMLSanitize;
