const express = require('express');
const cors = require("cors")
const mongoose = require('mongoose');
const postsRouter = require('./router/postRouter')
const commentsRouter = require('./router/commentRouter')
const userRouter = require('./router/usersRouter')


const app = express();
app.use(cors({ origin: '*' }))



const port = 3000;
const connectData = async () => {
    try {
        const connect = await mongoose.connect("mongodb://localhost:27017/be")
        // console.log(connect);
    } catch (error) {
        console.log('connect server', error);
    }
}

connectData()
app.get('/', (req, res) => {
    res.send('Hello, World from Express!');
});
app.use("/posts", postsRouter)
app.use("/comments", commentsRouter)
app.use("/users", userRouter)

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});