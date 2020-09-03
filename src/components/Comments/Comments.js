import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getName } from '../getName';

import EditComment from './EditComment';
import DeleteComment from './DeleteComment';
import CommentRender from './CommentRender';

import { Container, Button } from 'react-bootstrap';

class Comments extends Component {
	constructor(props) {
		super(props);

		this.closeDeleteComment = this.closeDeleteComment.bind(this);
		this.closeEditComment = this.closeEditComment.bind(this);

		this.state = {
			deleteComment: null,
			editComment: null,
			comment: null,
			commentId: null
		};
	}

	closeDeleteComment = () => {
		this.setState({ deleteComment: false });
	};

	closeEditComment = () => {
		this.setState({ editComment: false });
	};

	getComments = () => {
		const issueId = this.props.selectedIssue.id;
		const comments = this.props.issues[issueId].comments;

		return comments.map((comment) => {
			if (comment.userId === this.props.auth.userId) {
				return (
					<CommentRender
						key={comment.id}
						class="Comments__row right"
						comment={comment.comment}
						createdAt={comment.createdAt}
						userId={getName(comment.userId, this.props.users[0].users, this.props.auth.userName)}
						renderCommentsOptions={this.renderCommentsOptions(this.props.auth.userId, comment)}
						edit={this.edited(comment.edit)}
					/>
				);
			} else {
				return (
					<CommentRender
						key={comment.id}
						class="Comments__row left"
						comment={comment.comment}
						createdAt={comment.createdAt}
						userId={getName(comment.userId, this.props.users[0].users, this.props.auth.userName)}
						renderCommentsOptions={this.renderCommentsOptions(this.props.auth.userId, comment)}
						edit={this.edited(comment.edit)}
					/>
				);
			}
		});
	};

	edited(edit) {
		if (edit)
			return (
				<div className="card__edited">
					<strong>Edited</strong>
				</div>
			);
	}

	renderCommentsOptions(user, comment) {
		if (
			user === this.props.selectedProject.owner ||
			user === this.props.selectedIssue.owner ||
			user === comment.userId
		) {
			return (
				<div>
					<Button
						style={{ width: '8rem' }}
						onClick={() => {
							this.setState({ editComment: true, comment: comment.comment, commentId: comment.id });
						}}
					>
						Edit
					</Button>
					<Button
						style={{ marginLeft: '1rem', width: '8rem' }}
						onClick={() => {
							this.setState({ deleteComment: true, comment: comment.comment, commentId: comment.id });
						}}
					>
						Delete
					</Button>
				</div>
			);
		} else {
			return null;
		}
	}

	render() {
		return (
			<Container className="Comments">
				{this.getComments()}

				<DeleteComment
					comment={this.state.comment}
					commentId={this.state.commentId}
					show={this.state.deleteComment}
					onHide={this.closeDeleteComment}
				/>
				<EditComment
					comment={this.state.comment}
					commentId={this.state.commentId}
					show={this.state.editComment}
					onHide={this.closeEditComment}
				/>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		users: Object.values(state.projectUsers),
		auth: state.auth,
		selectedIssue: state.selectedIssue,
		issues: state.issues,
		selectedProject: state.selectedProject
	};
};

export default connect(mapStateToProps)(Comments);
