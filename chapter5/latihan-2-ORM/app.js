const express = require('express');
const app = express();
const {Op} = require('sequelize');
const {User} = require('./models')
const acceptedQueries = ['name','email','address'];

app.use(express.json());
// app.post("/api/user", usersMethod.create);
// app.get("/api/user",usersMethod.read)
// app.get("/api/user/:id",usersMethod.readById)
// app.patch("/api/user/:id",usersMethod.update)
// app.delete("/api/user/:id",usersMethod.delete)

app.listen(3000, () => {
    console.log("Server running at http://127.0.0.1:3000")
    })