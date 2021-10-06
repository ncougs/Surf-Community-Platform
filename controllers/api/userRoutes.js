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
		//get username & password from req.body
		const { username, password } = req.body;
		const errorMessage = 'Incorrect email or password';

		//find the username within our db - Usernames are unqiue
		const user = await User.findOne({ username });

		//no username found, return error
		if (!user) {
			return res.status(400).json({ message: errorMessage });
		}

		//check plain text password with hashed db password
		const validPassword = await user.checkPassword(password);

		//passwords do not match, return error
		if (!validPassword) {
			return res.status(400).json({ message: errorMessage });
		}

		//username & password match - save session
		req.session.save(() => {
			req.session.user_id = user.id;
			req.session.logged_in = true;
		});

		//return sucessfull response
		res.status(200).json(user);
	} catch (err) {
		res.status(400).json(err);
	}
});

//logout of user account
router.post('/logout', (req, res) => {
	try {
		//if a user is currently logged in, destroy their current session
		if (req.session.logged_in) {
			req.session.destroy(() => {
				res.status(200);
			});
		} else {
			res.status(404).send('No user logged in');
		}
	} catch (err) {
		res.status(400);
	}
});

module.exports = router;
