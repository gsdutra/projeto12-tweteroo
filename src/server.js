import express from 'express';
import cors from 'cors';
//const { body, validationResult } = require('express-validator');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5000;

var server_users = [];

var tweets = [];

app.get('/tweets', (req, res) => {
	res.send(tweets.slice(-10).reverse());
});

app.post(
	'/sign-up',(req, res) => {

		const data = req.body;
		server_users.push(data);
		res.send('OK');
});

app.post('/tweets', (req, res) => {
	const data = req.body;
	const username = req.headers.user;
	console.log(username);

	if (server_users.find(element => element.username===username)){
		tweets.push(
			{
				"username": username,
				"avatar": server_users.find(({username})=> username === username).avatar,
				"tweet": data.tweet
			}
		)
		res.send("OK");
	}else{
		res.send("UNAUTHORIZED");
	}
});


app.listen(PORT,  ()=>console.log(`App running on port ${PORT}`));