'use strict';

const users = mongoose.model('users', usersSchema);

//create new user
//test with Swagger
//echo '{"username": "Clement.Buchanan","password": "Yardie"}' | http post : 3000/signup

app.post('/signup', async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const user = newUser(req.body);
    const record = await user.save(req.body);
    res.status(200).json(record);
  } catch (e) { res.status(403).send('There was an error creating this user'); }
});
