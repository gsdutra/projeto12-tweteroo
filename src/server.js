import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

var server_users = [];

var tweets = [];

app.get('/tweets', (req, res) => {
	res.send(tweets.slice(-10).reverse());
});

app.post('/sign-up', (req, res) => {
	const data = req.body;
	server_users.push(data);
	res.send('OK');
});

app.post('/tweets', (req, res) => {
	const data = req.body;

	if (server_users.find(element => element.username===data.username)){
		tweets.push(
			{
				"username": data.username,
				"avatar": server_users.find(({username})=> username === data.username).avatar,
				"tweet": data.tweet
			}
		)
		res.send("OK");
	}else{
		res.send("UNAUTHORIZED");
	}
});


app.listen(5000,  ()=>console.log("App working"));