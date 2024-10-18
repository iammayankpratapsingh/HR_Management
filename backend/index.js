import express from "express";
import cors from 'cors';
import mongoose from 'mongoose';
import { adminRouter } from "./Routes/AdminRoute.js";
import { EmployeeRouter } from "./Routes/EmployeeRoute.js";
import Jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// MongoDB connection
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(err => {
        console.error("MongoDB connection error", err);
    });

// Middleware
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ['GET', 'POST', 'PUT', "DELETE"],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use('/auth', adminRouter);
app.use('/employee', EmployeeRouter);
app.use(express.static('Public'));

// JWT verification middleware
const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        Jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) return res.json({ Status: false, Error: "Wrong Token" });
            req.id = decoded.id;
            req.role = decoded.role;
            next();
        });
    } else {
        res.json({ Status: false, Error: "Not authenticated" });
    }
};

// Verify route
app.get('/verify', verifyUser, (req, res) => {
    res.json({ Status: true, role: req.role, id: req.id });
});

// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
