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
	}
});

//signing in will pull the username:password off the authorization header	
//the username:passsword will already be base 64 encoded at this time
//now we have to decode it, find the user in the db, check the password (hash) against the user for authentication
app.post('/signin', async (req, res) => {
	let basicAuthParts = req.headers.authorization.split('') // authorization '2665438:835524k -. ['basic', 4gv3836:hdba6453j']
	let encodeUser = basicAuthParts.pop(); //username as base 64
	let decoded = base64.decode(encodedUser); //username:password destruction
	let [username, password] = decoded.split(':'); // split at the time : (username, password)

	try {
		const user = await Users.findOne ({ username: username })
		console.log('user after saved', user);

		const
	}
}


