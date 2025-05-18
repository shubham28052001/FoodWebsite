import express from "express";
import cors from "cors";
import connectDB from "./db.js";  
import createUserRoute from "./Routes/CreateUser.js";  
import DisplayData from "./Routes/DisplayData.js"
import OrderData from "./Routes/OrderData.js";
const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));


connectDB(); 

app.use("/api", createUserRoute);
app.use("/api",DisplayData);
app.use("/api",OrderData);


console.log("✅ API Routes Registered Successfully!");

app.listen(4000, () => console.log("🚀 Server running on http://localhost:4000"));
