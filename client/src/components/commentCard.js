import { useState, useEffect } from 'react';
import { Col, Row, Button, Form } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { UPDATE_COMMENT, DELETE_COMMENT } from '../utils/mutations';
import Auth from '../utils/auth';

const CommentCard = ({ id, username, body, userID }) => {
	const [showUpdate, setShowUpdate] = useState(false);
	const [isUser, setIsUser] = useState(false);
	const [updateCommentField, setUpdateComment] = useState(body);

	const handleShowUpdate = (e) => {
		e.preventDefault();

		setShowUpdate(!showUpdate);
		setUpdateComment(body);
	};

	const [updateComment] = useMutation(UPDATE_COMMENT);

	const [deleteComment] = useMutation(DELETE_COMMENT);

	const handleDelete = async (e) => {
		e.preventDefault();

		const deletedComment = await deleteComment({
			variables: {
				deleteCommentId: id,
			},
		});
	};

	const handleUpdateComment = async (e) => {
		e.preventDefault();

		const update = await updateComment({
			variables: {
				body: updateCommentField,
				updateCommentId: id,
			},
		});

		setShowUpdate(false);
	};

	const isLoggedIn = Auth.loggedIn();

	useEffect(() => {
		if (isLoggedIn) {
			const currentUser = Auth.getProfile();
			currentUser?.data?._id === userID ? setIsUser(true) : setIsUser(false);
		}
	}, [isLoggedIn, userID]);

	return (
		<>
			<div className='my-3'>
				<Row>
					<Col>
						<h5>{username}</h5>
					</Col>
					{isUser ? (
						<>
							<Col>
								<Button onClick={(e) => handleShowUpdate(e)}>Update</Button>
							</Col>
							<Col>
								<Button onClick={(e) => handleDelete(e)}>Delete</Button>
							</Col>
						</>
					) : (
						''
					)}
				</Row>

				{!showUpdate ? (
					<p>{body}</p>
				) : (
					<Form onSubmit={(e) => handleUpdateComment(e)} className='mt-3'>
						<Form.Control
							as='textarea'
							rows={3}
							value={updateCommentField}
							onChange={(e) => setUpdateComment(e.target.value)}
						/>
						<Button type='submit' className='mt-3'>
							Update Comment
						</Button>
					</Form>
				)}
			</div>
		</>
	);
};

export default CommentCard;
