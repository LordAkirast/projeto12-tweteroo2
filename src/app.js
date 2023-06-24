import express from "express"
import Joi from "joi"

let users = [];
let tweets = [];
let avatarTweet = [];

const app = express()
app.use(express.json());


const signUpSchema = Joi.object({
    username: Joi.string().required(),
    avatar: Joi.string().required()
  });

const tweetsSchema = Joi.object({
    username: Joi.string().required,
    tweet: Joi.string().required()
});

app.post("/sign-up", (req, res) => {
    const usersData = req.body


  const { error } = signUpSchema.validate(usersData);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

    if (!usersData.username) {
        res.status(400).send("Username precisa ser preenchido!")
    }
    users.push(usersData)
    res.sendStatus(201);
})


app.post("/tweets", (req,res) => {
    const tweetData = req.body;

    const { error } = tweetsSchema.validate(tweetData);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    if (users.find((user) => user.username === tweetData.username)) {
        if (tweets.length > 9) {
            tweets.shift()
            }
        if (avatarTweet.length > 9) {
            avatarTweet.shift()
                }
        tweets.push(tweetData);
        const user = users.find((user) => user.username === tweetData.username)
        avatarTweet.push({avatar: user.avatar, username: tweetData.username, tweet: tweetData.tweet})
        res.sendStatus(201);
    } else {
        res.sendStatus(401);
    }
    
})

app.get("/tweets", (req,res) => {
    res.send(avatarTweet)
        
    }
    )

app.listen(5000, () =>  console.log("Servidor ligado!"))