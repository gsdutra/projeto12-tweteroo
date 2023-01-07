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
	let page = req.query.page;
	if(isNaN(parseInt(page))){page=1}
	if(parseInt(page)>=1){
		//res.send([...tweets].reverse().slice((page-1)*(10),page*10));
		res.send([...tweets].reverse().slice((page-1)*(10),page*10).reverse());
	}else{
		res.status(400).send("Informe uma página válida!");
	}
});

app.get('/tweets/:username', (req, res)=>{
	const username = req.params.username;
	res.status(200).send(tweets.filter(element => element.username === username));
});

app.post(
	'/sign-up',(req, res) => {
		const data = req.body;

		if (data.username && data.avatar && typeof data.username === 'string' && typeof data.avatar == 'string'){
			server_users.push(data);
			res.status(201).send('OK')
		}else{
			res.status(400).send("Todos os campos são obrigatórios!");
		}
});

app.post('/tweets', (req, res) => {
	const data = req.body;
	const username = req.headers.user;
	
	if (data.tweet && username && typeof data.tweet === 'string'){
		if (server_users.find(element => element.username===username)){
			tweets.push(
				{
					"username": username,
					"avatar": server_users.find(({username})=> username === username).avatar,
					"tweet": data.tweet
				}
			)
			res.status(201).send("OK");
		}else{
			res.status(400).send("UNAUTHORIZED");
		}
	}else{
		res.status(400).send("Todos os campos são obrigatórios!");
	}
});


app.listen(PORT,  ()=>console.log(`App running on port ${PORT}`));