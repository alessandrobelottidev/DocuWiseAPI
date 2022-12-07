const {
	S3Client,
	PutObjectCommand,
	GetObjectCommand,
} = require('@aws-sdk/client-s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')
const { v4: uuidv4 } = require('uuid')
const dotenv = require('dotenv')

// Load env variables
dotenv.config()

// Configure s3
const bucketName = process.env.AWS_BUCKET_NAME
const bucketRegion = process.env.AWS_BUCKET_REGION
const accessKey = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRECT_KEY

const s3 = new S3Client({
	credentials: {
		accessKeyId: accessKey,
		secretAccessKey: secretAccessKey,
	},
	region: bucketRegion,
})

// Uploads file to s3
exports.uploadFileToS3 = async (file) => {
	const uuid = uuidv4()

	const params = {
		Bucket: bucketName,
		Key: uuid,
		Body: file.buffer,
		ContentType: file.mimetype,
	}

	const command = new PutObjectCommand(params)

	try {
		await s3.send(command)
		return uuid
	} catch (error) {
		return ''
	}
}

// Get file url from s3
exports.getFileUrlFromS3 = async (uuid) => {
	const params = {
		Bucket: bucketName,
		Key: uuid,
	}

	const command = new GetObjectCommand(params)

	try {
		const url = await getSignedUrl(s3, command, { expiresIn: 3600 })
		return url
	} catch (err) {
		return ''
	}
}

// Delete file from s3
