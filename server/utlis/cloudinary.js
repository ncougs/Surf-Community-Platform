const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
	cloud_name: 'dyhire8bc',
	api_key: '134327326861285',
	api_secret: 'L2y28VbnA96ZYrRE06iI3dDebEc',
	secure: true,
});

module.exports = cloudinary;
