'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const cors = require('cors');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3333;

const app = express();

//give access to anyone to use the API
app.use(cors);

//sign up and sign im from forms on the front end
app.use(express.urlencoded({ extend:true }));
app.use(express.json());

//mongoose schema (blueprint for the db)
const usersSchema = mongoose.Schema({
	username: { type: String, required: true },
	password: { type: String, required: true }
})

//assigning the user model so we can start adding users to the db
const users = mongoose.model('users', usersSchema);

//signup route

app.post('/signup', async (req, res) => {
	try {
		//immediately pulls the password off the req.body on signup then
		//hash it then put it back on the req.body
		req.body.password = await bcrypt.hash(req.body.password, 5);
		//instantiste the new user with a nsername and password
		const user = new users(req.body);
		console.log('after initiation of mode:', user);			//to save the user to the db
		const record = await user.save(req.body);
		console.log('after saving the record in the db', record);
		//send back the user details
		res.status(200).send('error creating user');
	} catch (e) { res.status(403).send('Error Creating User'); }

});

//signing in will pull the username:password off the authorization header	
//the username:passsword will already be base 64 encoded at this time
//now we have to decode it, find the user in the db, check the password (hash) against the user for authentication
app.post('/signin', async (req, res) => {
	let basicHeaderParts = req.headers.authorization.split('') // authorization '2665438:835524k -. ['basic', 4gv3836:hdba6453j']
	let encodedString = basicHeaderParts.pop(); //username as base 64
	let decodedString = base64.decode(encodedString); //username:password destruction
	let [username, password] = decodedString.split(':'); // split at the time : (username, password)

	/*
	Now that we finally have username and password, let's see if it's valid
	1. Find the user in the database by username
	2. Compare the plaintext password we now have against the encrypted password in the db
	- bcrypt does this by re-encrypting the plaintext password and comparing THAT
	3. Either we're valid or we throw an error
	*/


	try {
		const user = await Users.findOne ({ username: username })
		console.log('user after saved', user);
		// compare the plain text password we pulled off of the req.authorization header
		// and compare it with the plan text password of the user
		// if valid, "valid" will be true
		const valid = await bcrypt.compare(password, user.password);

		if (valid) {
		res.status(200).json({ loggedIn: true });
		}
		else {
			throw new error('Invalid user')
		}
		} catch (error) {res.status(403).send('Invalid Login') }
	
	});

	mongoose.connect('mongodb://localhost:27017/your-db-name-goes-here', { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		app.listen(3333, () => console.log('server up:', PORT));
	})
	.catch(e => console.error('could not start server', e.message));

});

