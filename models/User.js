const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
	username: String,
	first_name: String,
	last_name: String,
	email: String,
	password: String,
	favourite_locations: [String],
});

//Hash password on save
UserSchema.pre('save', async (next) => {
	const currentUser = this;

	// Only hash the password if it has been modified
	if (!currentUser.isModified('password')) {
		return next();
	}

	//Generate salt rounds hash password
	currentUser.password = await bcrypt.hash(currentUser.password, 10);

	return next();
});

//Method to compare entered password with users password
UserSchema.methods.checkPassword = async (password) => {
	return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
