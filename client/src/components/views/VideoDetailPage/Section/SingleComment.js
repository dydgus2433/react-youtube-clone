import React, { useState } from 'react'
import { Avatar, Button, Comment, Input } from 'antd'
import Axios from 'axios'
import { useSelector } from 'react-redux'

const { TextArea } = Input
function SingleComment(props) {
	const user = useSelector((state) => state.user)

	const [OpenReply, setOpenReply] = useState(false)
	const [CommentValue, setCommentValue] = useState('')

	const onClickReplyOpen = () => {
		setOpenReply(!OpenReply)
	}

	const onHandleChange = (event) => {
		setCommentValue(event.currentTarget.value)
	}

	const onSubmit = (event) => {
		event.preventDefault()

		const variables = {
			content: CommentValue,
			writer: user.userData._id,
			videoId: props.videoId,
			responseTo: props.comment._id,
		}
		Axios.post('/api/comment/saveComment', variables).then((response) => {
			if (response.data.success) {
				console.log(response.data.success)
				props.refreshFunction(response.data.result)
				setOpenReply(false)
			} else {
				alert('커맨드를 저장하지 못했습니다')
			}
		})
	}
	const actions = [
		<span onClick={onClickReplyOpen} key="comment-basic-reply-to">
			Reply to
		</span>,
	]
	return (
		<div>
			<Comment
				actions={actions}
				author={props.comment.writer.name}
				avatar={<Avatar src={props.comment.writer.image} />}
				content={<p>{props.comment.content}</p>}
			/>

			{OpenReply && (
				<form style={{ display: 'flex' }} onSubmit={onSubmit}>
					<TextArea
						style={{ width: '100%', borderRadius: '5px' }}
						holder="코멘트를 달아주세요"
						onChange={onHandleChange}
						value={CommentValue}
					/>

					<br />
					<button style={{ width: '20%', height: '52px' }} onSubmit={onSubmit}>
						Submit
					</button>
				</form>
			)}
		</div>
	)
}

export default SingleComment
