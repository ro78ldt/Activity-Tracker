import express from "express";
import generateToken from "./db/generateToken.js";
import "./db/conn.js"
import dotenv from "dotenv";
import connectDB from "./db/conn.js";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import { User } from "./model/userModel.js";

dotenv.config();
const app = express();
connectDB();

// Middleware for parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const static_path = path.join(__dirname, '../public/css');
const template_path = path.join(__dirname, '../templates/views');


app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);

app.get('/', (req, res) => {
    res.render("login");
});

app.get('/index', (req, res) => {
    res.render("index");
});

app.get('/register', (req, res) => {
    res.render("register");
});

app.post('/auth', async (req, res) => {
    const { username, password } = req.body.data;

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(401).json({ message: 'Authentication failed' });
    }

    if (user && password === user?.password) {
        res.json({
            _id: user._id,
            username: user.username,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
});

app.post('/signup', async (req, res) => {
    const { username, password, fullname, age, weight, height } = req.body.data;
    if (!username || !password) {
        res.status(400);
        throw new Error("Please give username and password");
    }

    const userExists = await User.findOne({ username });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({
        username,
        password,
        fullname,
        age,
        weight,
        height
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            fullname: user.fullname,
            age: user.age,
            weight: user.weight,
            height: user.height,
            token: generateToken(user._id),
        })
    } else {
        res.status(400);
        throw new Error("Failed to create user");
    }
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})