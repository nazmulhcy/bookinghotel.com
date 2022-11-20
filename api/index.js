import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
const app = express();

dotenv.config();

const connect = async () => {
  try {
    const data = await mongoose.connect(process.env.DB);
    console.log(data);
    console.log("connected to DB");
  } catch (error) {
    throw error;
  }
};

//middleweares
app.use(cookieParser());

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.get("/", (req, res) => {
  res.send("hello i am from backend");
});

app.listen(8800, () => {
  connect();
  console.log(" listening at port 8800");
});
