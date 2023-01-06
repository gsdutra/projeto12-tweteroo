# Tweteroo API

## GET Requests:

- /tweets<br/>
Returns the 10 most recent tweets from the API
<pre>[
	{
		username: "username",
		avatar: "https://link-to-image.jpg",
		tweet: "I love potatoes"
	}
]</pre>

## POST Requests:
- /sign-up<br/>
body:<br/>
<pre>
{
    username: "username",
    avatar: "https://link-to-image.jpg"
}
</pre>
<br/>

- /tweets<br/>
body:<br/>
<pre>
{
    username: "username",
    tweet: "I love pizza"
}
</pre>
Obs: the username must be registered

