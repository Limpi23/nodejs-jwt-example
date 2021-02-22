import express, { json } from "express";
const app = express();

app.use(json());

// Import Routes
import authRoute from "./routes/auth";

// Route Middlewares
app.use("/api/users", authRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on ${port}`));
