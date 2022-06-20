import React from 'react';
import {
    Comment as AntComment, Icon, Tooltip, Avatar,
} from 'antd';
import moment from 'moment';

class Comment extends React.Component {
    state = {
        likes: 0,
        dislikes: 0,
        action: null,
    };

    like = () => {
        this.setState({
            likes: 1,
            dislikes: 0,
            action: 'liked',
        });
    };

    dislike = () => {
        this.setState({
            likes: 0,
            dislikes: 1,
            action: 'disliked',
        });
    };

    render() {
        const { likes, dislikes, action } = this.state;

        const actions = [
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <Icon
                        type="like"
                        theme={action === 'liked' ? 'filled' : 'outlined'}
                        onClick={this.like}
                    />
                </Tooltip>
                <span style={{ paddingLeft: 8, cursor: 'auto' }}>{likes}</span>
            </span>,
            <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    <Icon
                        type="dislike"
                        theme={action === 'disliked' ? 'filled' : 'outlined'}
                        onClick={this.dislike}
                    />
                </Tooltip>
                <span style={{ paddingLeft: 8, cursor: 'auto' }}>{dislikes}</span>
            </span>,
            <span key="comment-basic-reply-to">Reply to</span>,
        ];

        return (
            <AntComment
                actions={actions}
                author={<span>{this.props.author}</span>}
                avatar={(
                    <Avatar
                        alt={this.props.author}
                        src={this.props.avatar}
                    />
                )}
                content={(
                    <p>
                        {this.props.context}
                    </p>
                )}
                datetime={(
                    <Tooltip title={moment(this.props.date).format('YYYY-MM-DD HH:mm:ss')}>
                        <span>{moment(this.props.date).fromNow()}</span>
                    </Tooltip>
                )}
            />
        );
    }
}

export default Comment;
