import { Button } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import Axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import SingleComment from './SingleComment'
function Comment(props) {
	const user = useSelector((state) => state.user)
	const videoId = props.videoId

	const [commentValue, setcommentValue] = useState('')

	const handleClick = (event) => {
		setcommentValue(event.currentTarget.value)
	}
	const onSubmit = (event) => {
		event.preventDefault()

		const variables = {
			content: commentValue,
			writer: user.userData._id,
			videoId: videoId,
		}
		console.log(variables)
		Axios.post('/api/comment/saveComment', variables).then((response) => {
			if (response.data.success) {
				console.log(response.data.success)

				props.refreshFunction(response.data.reuslt)
			} else {
				alert('커맨드를 저장하지 못했습니다')
			}
		})
	}
	return (
		<div>
			<br />
			<p> Replies </p>
			<hr />

			{props.commentLists &&
				props.commentLists.map(
					(comment, index) =>
						!comment['responseTo'] && (
							<SingleComment
								refreshFunction={props.refreshFunction}
								videoId={props.videoId}
								comment={comment}
							/>
						),
				)}

			<form style={{ display: 'flex' }} onSubmit={onSubmit}>
				<TextArea
					style={{ width: '100%', borderRadius: '5px' }}
					holder="코멘트를 달아주세요"
					onChange={handleClick}
					value={commentValue}
				/>

				<br />
				<button style={{ width: '20%', height: '52px' }} onSubmit={onSubmit}>
					Submit
				</button>
			</form>
		</div>
	)
}

export default Comment
