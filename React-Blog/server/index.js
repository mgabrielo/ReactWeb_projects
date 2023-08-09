import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import postRoutes from './routes/posts.js'

const app = express();
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
app.use('/posts', postRoutes)

const CONNECT_URL = 'mongodb+srv://greycoinz:greyscott99@cluster0.upky5y7.mongodb.net/react-blog'
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECT_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() =>
    app.listen(PORT, () => console.log('server running on port : ' + PORT))
).catch((error) => console.log(error.message));

