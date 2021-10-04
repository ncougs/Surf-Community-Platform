const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
	try {
		//get user details out of req.body
		const newUser = new User(req.body);

		//save newUser to the database
		//TO DO: FIX ERROR WHEN SAVING
		const result = await newUser.save();

		res.status(200).json(result);
	} catch (err) {
		res.status(400).json(err);
	}
});

module.exports = router;
