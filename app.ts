import * as dotenv from 'dotenv' 
dotenv.config()
import express from 'express'
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { indexRouter } from './src/index'

import path from 'path'
const app = express()


app.use(express.static("public"))
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', indexRouter)

main().catch(err => console.log(err));
async function main() {
  mongoose.set("strictQuery", false);
  await mongoose.connect('mongodb+srv://Chandan_Sharma:HakZhXhSvIDcD9FS@cluster0.wyf30.mongodb.net/test');
  console.log("DB connected")
}

app.listen(process.env.PORT, () => {
  console.log(`port running on ${process.env.PORT}`);
})