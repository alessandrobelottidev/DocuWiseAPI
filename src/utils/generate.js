const { default: puppeteer } = require('puppeteer-core')
const ejs = require('ejs')

const { uploadFileToS3 } = require('@services/s3')

const generateHtml = async (themePath, account, invoice) => {
	let html = ''

	await ejs.renderFile(
		themePath,
		{ account, invoice },
		{},
		async (err, str) => {
			if (!err) html = str
		},
	)

	return html
}

exports.generate = async (fileType, account, invoice) => {
	const browser = await puppeteer.launch({ headless: true, channel: 'chrome' })
	const page = await browser.newPage()

	const themePath = './src/templates/' + invoice.theme + '.ejs'

	let html = await generateHtml(themePath, account, invoice)
	if (html === '') return ''

	try {
		await page.setContent(html)

		let file

		if (fileType === 'pdf') {
			file = await page.pdf({ format: 'A4', printBackground: true })
			file.mimetype = 'application/pdf'
		} else {
			page.setViewport({ width: 892, height: 1263 })
			file = await page.screenshot({
				type: 'jpeg',
				quality: 90,
				fullPage: true,
			})
			file.mimetype = 'image/jpeg'
		}

		browser.close()
		return uploadFileToS3(file)
	} catch (error) {
		browser.close()
		return ''
	}
}
