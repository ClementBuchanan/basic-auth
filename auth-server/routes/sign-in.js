'use strict';

const { Mongoose } = require("mongoose");

app.post('/routes/signin', async (req, res) => {
  /*
    req.headers.authorization is : "Basic sdkjdsljd="
    To get username and password from this, take the following steps:
      - Turn that string into an array by splitting on ' '
      - Pop off the last value
      - Decode that encoded string so it returns to user:pass
      - Split on ':' to turn it into an array
      - Pull username and password from that array
  */
  let basicHeaderParts = req.headers.authorization.split(' ');
  let encodedString = basicHeaderParts.pop();
  let decodedString = base64.decode(encodedString);
  let [username, password] = decodedString.split(':');

  try {
    const user = await User.findUser({ username: username });
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      res.status(200).json.user;
    }
    else {
      throw new error('not a valid user')
    }
  } catch (e) { res.status(403).send('Invalid Login'); }
});

Mongoose.connect('mongodb://localhost:27017/auth', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(3000, () => console.log('The server is up'));
  })
  .catch(e => console.error('Could not start server, e.message'));