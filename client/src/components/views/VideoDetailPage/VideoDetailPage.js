import React, { useEffect, useState } from 'react'
import { Avatar, Col, List, Row } from 'antd'
import Axios from 'axios'
import SideVideo from './Section/SideVideo'
import Subscribe from './Section/Subscribe'
import Comment from './Section/Comment'
function VideoDetailPage(props) {
	const videoId = props.match.params.videoId

	const [VideoDetail, setVideoDetail] = useState('')
	const [Comments, setComments] = useState([])
	useEffect(() => {
		const variable = {
			videoId: videoId,
		}
		Axios.post('/api/video/getVideoDetail', variable).then((response) => {
			if (response.data.success) {
				setVideoDetail(response.data.VideoDetail)
			} else {
				alert('비디오 정보를 가져오길 실패했습니다.')
			}
		})

		Axios.post('/api/comment/getComments', variable).then((response) => {
			if (response.data.success) {
				setComments(response.data.comments)
			} else {
				alert('코멘트 정보를 가져오는 것을 실패 하였습니다.')
			}
		})
	}, [videoId])

	const refreshFunction = (newComment) => {
		console.log('newComment', newComment)
		setComments(Comments.concat(newComment))
	}

	if (VideoDetail.writer) {
		const subscribeButton = VideoDetail.writer._id !==
			localStorage.getItem('userId') && (
			<Subscribe
				userTo={VideoDetail.writer._id}
				userFrom={localStorage.getItem('userId')}
			/>
		)
		return (
			<Row gutter={[16, 16]}>
				<Col lg={18} xs={24}>
					<div style={{ width: '100%', padding: '3rem 4rem' }}>
						<video
							style={{ width: '100%' }}
							src={`http://localhost:5000/${VideoDetail.filePath}`}
						></video>
						<List.Item actions={[subscribeButton]}>
							{VideoDetail.writer && (
								<List.Item.Meta
									avatar={
										<Avatar
											src={
												VideoDetail.writer.image ? VideoDetail.writer.image : ''
											}
										/>
									}
									title={VideoDetail.writer.name}
									description={VideoDetail.description}
								></List.Item.Meta>
							)}
						</List.Item>
						<Comment
							refreshFunction={refreshFunction}
							videoId={videoId}
							commentLists={Comments}
						/>
					</div>
				</Col>
				<Col lg={6} xs={24}>
					<SideVideo />
				</Col>
			</Row>
		)
	} else {
		return <div> ...loading</div>
	}
}

export default VideoDetailPage
