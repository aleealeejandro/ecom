exports.userSignupValidator = (req, res, next) => {
	req.check('name', 'Name is required').notEmpty()
	req.check('email', 'Email must be between 6 to 32 characters')
		.matches(/.+\@.+\..+/)
		.withMessage('Email must contain @')
		.isLength({
			min:6,
			max:32
		});
	req.check('password', 'Password is required').notEmpty()
	req.check('password')
		.matches(/\d/)
		.withMessage('Password must contain a number')
		.isLength({min: 6})
		.withMessage('Password must contain at least 6 characters')
	const errors = req.validationErrors()
	if(errors) {
		const firstError = errors.map(error => error.msg)[0];
		return res.status(400).json({error: firstError});
	}
	next();
};