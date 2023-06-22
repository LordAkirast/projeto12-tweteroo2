import express from "express"

//matar uma porta: fuser -k porta tcp

// //user format:
// {
// 	username: 'bobesponja', 
// 	avatar: "https://cdn.shopify.com/s/files/1/0150/0643/3380/files/Screen_Shot_2019-07-01_at_11.35.42_AM_370x230@2x.png" 
// }

// tweet format:
// {
// 	username: "bobesponja",
//   tweet: "Eu amo hambúrguer de siri!"
// }

let users = [];

const app = express()
app.use(express.json());

app.post("/sign-up", (req, res) => {
    const usersData = req.body
    users.push(usersData)
    res.sendStatus(200);
})


app.listen(5000, () =>  console.log("Servidor ligado!"))