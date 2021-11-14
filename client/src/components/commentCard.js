import { useState, useEffect } from 'react';
import { Col, Row, Button, Form } from 'react-bootstrap';
import { ThreeDots } from 'react-bootstrap-icons';
import { useMutation } from '@apollo/client';
import { UPDATE_COMMENT, DELETE_COMMENT } from '../utils/mutations';
import Auth from '../utils/auth';

const CommentCard = ({ id, username, body, userID }) => {
	const [showEdit, setShowEdit] = useState(false);
	const [showUpdate, setShowUpdate] = useState(false);
	const [isUser, setIsUser] = useState(false);
	const [updateCommentField, setUpdateComment] = useState(body);

	const handleShowEdit = (e) => {
		e.preventDefault();

		setShowEdit(!showEdit);
		setShowUpdate(false);
	};

	const handleShowUpdate = (e) => {
		e.preventDefault();

		setShowEdit(false);
		setShowUpdate(!showUpdate);
		setUpdateComment(body);
	};

	const [updateComment] = useMutation(UPDATE_COMMENT);

	const [deleteComment] = useMutation(DELETE_COMMENT);

	const handleDelete = async (e) => {
		e.preventDefault();

		setShowEdit(false);
		setShowUpdate(false);

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

	const Styles = {
		cursor: {
			cursor: 'pointer',
		},
	};

	return (
		<>
			<div className='my-3'>
				<Row>
					<Col>
						<h5>
							{username}{' '}
							{isUser ? (
								<>
									<ThreeDots
										className='mx-3'
										onClick={(e) => handleShowEdit(e)}
										style={Styles.cursor}
									/>
									{showEdit ? (
										<>
											<span
												className='mx-3'
												onClick={(e) => handleShowUpdate(e)}
												style={Styles.cursor}
											>
												Edit
											</span>
											<span
												className='mx-3'
												onClick={(e) => handleDelete(e)}
												style={Styles.cursor}
											>
												Delete
											</span>
										</>
									) : (
										''
									)}
								</>
							) : (
								''
							)}
						</h5>
					</Col>
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
						<Button
							onClick={(e) => handleShowUpdate(e)}
							className='mt-3 me-3'
							value='cancel'
						>
							Cancel
						</Button>
						<Button type='submit' className='mt-3' value='update'>
							Update Comment
						</Button>
					</Form>
				)}
			</div>
		</>
	);
};

export default CommentCard;
