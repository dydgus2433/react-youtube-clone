import React, { useEffect, useState } from 'react'
import { Avatar, Card, Col, Row, Typography } from 'antd'
import Axios from 'axios'
import moment from 'moment'
const { Title } = Typography
const { Meta } = Card
function LandingPage() {
	const [Videos, setVideos] = useState([])
	// const renderCards =
	useEffect(() => {
		Axios.get('/api/video/getVideos').then((response) => {
			if (response.data.success) {
				console.log(response.data)
				setVideos(response.data.videos)
			} else {
				alert('비디오를 가져오는데 실패했습니다.')
			}
		})
	}, [])

	const renderCards = Videos.map((video, index) => {
		var minutes = Math.floor(video.duration / 60)
		let seconds = Math.floor(video.duration - minutes * 60)
		return (
			<Col lg={6} md={8} xs={24}>
				<a href={`/video/post/${video._id}`}>
					<img style={{ width: '100%' }} src={`http://localhost:5000/${video.thumbnail}`} alt="thumnail"></img>
					<div style={{ position: 'relative' }}>
						<div className="duration">
							<span>
								{minutes} : {seconds}
							</span>
						</div>
					</div>
				</a>
				<br />
				<Meta avatar={<Avatar src={video.writer.image} />} title={video.title} description />
				<span>{video.writer.name}</span>
				<span style={{ marginLeft: '3rem' }}>{video.views} views</span> - <span>{moment(video.createdAt).format('MMM Do YY')}</span>
			</Col>
		)
	})

	return (
		<div style={{ width: '85%', margin: '3rem auto' }}>
			<Title level={2}> Recommended</Title>
			<hr />
			<Row gutter={[32, 16]}>{renderCards}</Row>
		</div>
	)
}

export default LandingPage
