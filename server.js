const stripe = require('stripe')('sk_test_51IJvhOCQVp6bOhLZ1ysXzyFo6M3hqUGbJoDNppNBnIDB5yHMFw1hCcXiAJoGP1kYbSiyogeYOVrPDxhhB7DAnmd200KfWFb43q');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('.'));
const YOUR_DOMAIN = 'http://localhost:4242';

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/checkout.html');
})

app.post('/charge', async (req, res) => {
  // # トークンを取得
  var token = req.body.stripeToken;

  const charge = await stripe.charges.create({
    amount: 2000,
    currency: 'jpy',
    source: token,
    description: 'My First Test Charge (created for API docs)',
  });

  res.sendFile(__dirname + '/success.html');
});

app.listen(4242, () => console.log('Running on port 4242'));
