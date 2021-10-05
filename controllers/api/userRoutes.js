const router = require('express').Router();
const { User } = require('../../models');

//routes for api/users

//create a new user
router.post('/', async (req, res) => {
	try {
		//get user details out of req.body
		const newUser = new User(req.body);

		//save newUser to the database
		const result = await newUser.save();

		//save session
		req.session.save(() => {
			req.session.user_id = newUser._id;
			req.session.logged_in = true;
		});

		//send status response
		res.status(200).json(result);
	} catch (err) {
		res.status(400).json(err);
	}
});

//login to user account
router.post('/login', async (req, res) => {
	try {
		const { username, password } = req.body;
		const errorMessage = 'Incorrect email or password';

		const user = await User.findOne({ username });

		if (!user) {
			return res.status(400).json({ message: errorMessage });
		}

		const validPassword = await user.checkPassword(password);

		if (!validPassword) {
			res.status(400).json({ message: errorMessage });
			return;
		}

		req.session.save(() => {
			req.session.user_id = user.id;
			req.session.logged_in = true;
		});

		res.status(200).json(user);
	} catch (err) {
		res.status(400).json(err);
	}
});

module.exports = router;
