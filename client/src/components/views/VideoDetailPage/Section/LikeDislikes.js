import { Tooltip, Icon } from 'antd'
import Axios from 'axios'
import React, { useEffect, useState } from 'react'
function LikeDislikes(props) {
	const [Likes, setLikes] = useState(0)
	const [Dislikes, setDislikes] = useState(0)
	const [LikeAction, setLikeAction] = useState(null)
	const [DislikeAction, setDislikeAction] = useState(null)

	let variable = {}

	if (props.video) {
		variable = { videoId: props.videoId, userId: props.userId }
	} else {
		variable = { commentId: props.commentId, userId: props.userId }
	}
	useEffect(() => {
		Axios.get('/api/like/getLikes', variable).then((response) => {
			if (response.data.success) {
				//얼마나 많은 좋아요를 받았는지
				setLikes(response.data.likes.length)
				// 내가 이미 그 좋아요 눌렀는지
				response.data.likes.map((like) => {
					if (like.userId === props.userId) {
						setLikeAction('liked')
					}
				})
			} else {
				alert('like에 대한 정보를 가져오지 못했습니다.')
			}
		})

		Axios.get('/api/like/getDisLikes', variable).then((response) => {
			if (response.data.success) {
				//얼마나 많은 싫어요를 받았는지
				setDislikes(response.data.dislikes.length)
				// 내가 이미 그 싫어요 눌렀는지
				response.data.dislikes.map((dislike) => {
					if (dislike.userId === props.userId) {
						setDislikeAction('disliked')
					}
				})
			} else {
				alert('Dislike에 대한 정보를 가져오지 못했습니다.')
			}
		})
	}, [props.commentId, props.userId, props.video, props.videoId, variable])

	const onLike = () => {
		if (LikeAction === null) {
			Axios.post('/api/like/upLike', variable)
				.then((result) => {
					if (result.data.success) {
					} else {
						alert('Like를 올리지 못하였습니다.')
					}
				})
				.catch((err) => {})
		}
	}
	return (
		<div>
			<span key="comment-basic-like">
				<Tooltip title="Like">
					<Icon
						type="like"
						theme={LikeAction === 'liked' ? 'filled' : 'outlined'}
						onClick={onLike}
					/>
				</Tooltip>
				<span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Likes}</span>
			</span>
			<span key="comment-basic-dislike">
				<Tooltip title="DisLike">
					<Icon
						type="dislike"
						theme={DislikeAction === 'disliked' ? 'filled' : 'outlined'}
						onClick={onLike}
					/>
				</Tooltip>
				<span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Dislikes}</span>
			</span>
		</div>
	)
}

export default LikeDislikes
