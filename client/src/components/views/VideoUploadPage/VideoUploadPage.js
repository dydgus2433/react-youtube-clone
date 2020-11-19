import React, { useState } from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd'
import Dropzone from 'react-dropzone'
import Axios from 'axios'

const { TextArea } = Input
const { Title } = Typography

const PrivateOption = [
	{ value: 0, label: 'Private' },
	{ value: 1, label: 'Public' },
]
const CategoryOption = [
	{ value: 0, label: 'Film & Animation' },
	{ value: 1, label: 'Autos & Vehicles' },
	{ value: 2, label: 'Film & Animation' },
	{ value: 3, label: 'Autos & Vehicles' },
]
function VideoUploadPage() {
	const [VideoTitle, setVideoTitle] = useState('')
	const [Description, setDescription] = useState('')
	const [Private, setPrivate] = useState(0)
	const [Category, setCategory] = useState('Film & Animation')

	const onTitleChange = (e) => {
		setVideoTitle(e.currentTarget.value)
	}

	const onDescriptionChange = (e) => {
		setDescription(e.currentTarget.value)
	}
	const onPrivateChange = (e) => {
		setPrivate(e.currentTarget.value)
	}

	const onCategoryChange = (e) => {
		setCategory(e.currentTarget.value)
	}

	const onDrop = async (files) => {
		let formData = new FormData()
		const config = {
			header: { 'content-type': 'multipart/form-data' },
		}
		console.log(files)
		formData.append('file', files[0])

		const response = await Axios.post('/api/video/uploadFiles', formData, config)
		if (response.status === 200) {
			console.log(response.data)
			let variable = {
				url: response.data.url,
				fileName: response.data.fileName,
			}
			const { data } = await Axios.post('/api/video/thumbnail', variable)
			if (data.success) {
				console.log(data)
			} else {
				alert('썸네일 생성에 실패했습니다.')
			}
		} else {
			alert('비디오 업로드를 실패했습니다.')
		}
	}
	return (
		<div style={{ maxWidth: '700px', margin: '2rem auth' }}>
			<div style={{ textAlign: 'center', marginBottom: '2rem' }}>
				<Title level={2}>VideoUploadPage</Title>
			</div>

			<Form>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<Dropzone onDrop={onDrop} multiple={false} maxSize={100000000}>
						{({ getRootProps, getInputProps }) => (
							<div
								style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignContent: 'center', justifyContent: 'center' }}
								{...getRootProps()}
							>
								<input {...getInputProps()} />
								<Icon type="plus" style={{ fontSize: '3rem' }} />
							</div>
						)}
					</Dropzone>
					<div>
						<img src alt></img>
					</div>
				</div>
				<br />
				<br />
				<label>Title</label>
				<Input onChange={onTitleChange} value={VideoTitle} />
				<br />
				<br />
				<label>Description</label>
				<TextArea onChange={onDescriptionChange} value={Description}></TextArea>
				<br></br>
				<br></br>
				<select onChange={onPrivateChange}>
					{PrivateOption.map((item, index) => (
						<option key={index} value={item.value}>
							{item.label}
						</option>
					))}
				</select>
				<select onChange={onCategoryChange}>
					{CategoryOption.map((item, index) => (
						<option key={index} value={item.value}>
							{item.label}
						</option>
					))}
				</select>
				<Button type="primary" size="large" onClick>
					Submit
				</Button>
			</Form>
		</div>
	)
}

export default VideoUploadPage
