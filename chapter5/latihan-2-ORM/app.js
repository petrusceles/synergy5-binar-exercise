const express = require('express');
const app = express();
const {Op} = require('sequelize');
const {User} = require('./models')
const acceptedQueries = ['name','email','address'];
const usersMethod = {
    create: async (req,res) => {
        try {
            console.log(req.body)
            const {name, email, password,address} = req.body;
            
            if (!name || !email || !password || !address) {
                return res.status(400).json({
                    message:"invalid input",
                    data:{}
                })
            }
            const [newUser, isCreated] = await User.findOrCreate({
                where: {
                    name
                },
                defaults: {email,password,address}
            })

            if (!isCreated) {
                return res.status(400).json({
                    message:"data already exist",
                    data:isCreated
                })
            }

            res.status(201).json({
                data:newUser
            })

        } catch (err) {
            res.status(500).json({
                data:err
            })
        }
    },
    read: async (req,res) => {
        try {
            for (object in req.query) {
                if (!acceptedQueries.includes(object)) {
                    return res.status(400).json({
                        message:"unaccepted queries"
                    })
                }
            }
            const users = await User.findAll({
                where: req.query
            })
            res.status(200).json({
                data:users
            })
        } catch (err) {
            res.status(500).json({
                data:err
            })
        }
    },
    readById: async (req,res) => {
        try {
            const {id} = req.params
            const data = User.findOne({
                where: {
                    id
                }
            })
            if (!data) {
                return res.status(404).json({
                    message:`No data with id ${id}`
                })
            }
            res.status(200).json(data)
        } catch (err) {
            res.status(500).json({
                data:err
            })
        }
    },
    update: async (req,res) => {
        try {
            const {name,email,password,address} = req.body;
            const {id} = req.params
            if (!name && !email && !password && !address) {
                return res.status(200).json({
                    message:"no data updated"
                })
            }
    
            const user = await User.findByPk(id)

            await user.update({
                name,email,password,address
            })
            return res.status(200).json({
                user
            })
        } catch (err) {
            res.status(500).json({
                data:err
            })
        }
    },
    delete: async (req,res) => {
        try {
            const {id} = req.params
            const deleted = await User.destroy({
                where: {
                    id
                }
            })
            if (!deleted) {
                return res.status(404).json({
                    message:"no data deleted"
                })
            }
            return res.status(200).json({
                data:deleted
            })
        } catch (err) {
            res.status(500).json({
                data:err
            })
        }
    }
}

app.use(express.json());
app.post("/api/user", usersMethod.create);
app.get("/api/user",usersMethod.read)
app.get("/api/user/:id",usersMethod.readById)
app.patch("/api/user/:id",usersMethod.update)
app.delete("/api/user/:id",usersMethod.delete)

app.listen(3000, () => {
    console.log("Server running at http://127.0.0.1:3000")
  })