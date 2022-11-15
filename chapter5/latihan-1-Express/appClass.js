const express = require('express');
const fs = require('fs').promises;
const app = express();
app.use(express.json());


let users = [];

class User {
    constructor(params) {
        this.id = params.id;
        this.name = params.name;
        this.email = params.email;
        this.password = params.password;
        this.is_active = params.is_active;
    }

    static create(params) {
        let id = !users.length ? 0:users[users.length-1].id + 1;
        const user = new this({id, ...params})
        users.push(user)
        return user;
    }

    static findAll(params) {
        const filtered = users.filter((e) => {
            const idCond = params.id == undefined ? true : params.id == e.id;
            const nameCond = params.name == undefined ? true : params.name == e.name;
            const emailCond = params.email == undefined ? true : params.email == e.email;
            const isActiveCond = params.is_active == undefined ? true : params.is_active == e.is_active;
            return (nameCond && emailCond && isActiveCond && idCond)
        })
        return filtered
    }

    static find(params) {
        const filtered = User.findAll(params)
        return filtered[0]
    }

    update(params) {
        users.map((e) => {
            if (e == this) {
                if (params.name) {
                    this.name = params.name
                }
                if (params.email) {
                    this.email = params.email
                }
                if (params.password) {
                    this.password = params.password
                }
                if (params.is_active != undefined) {
                    this.is_active = params.is_active
                }

                return this;
            }
            return e;
        })
        return this
    }

    static delete(params) {
        const userDatas = this.findAll(params)
        userDatas.forEach(i => {
            users = users.filter((e) => {
                return i != e;
            })
        });
        return userDatas.length
    }
}

const usersMethod = {
    create: (req,res) => {
        const {name, email, password,is_active} = req.body;
    
        if (!name || !email || !password || is_active==null) {
            return res.status(400).json({
                message:"invalid input",
                data:{}
            })
        }
        const isExist = User.findAll({name,email})
        if (isExist.length) {
            return res.status(400).json({
                message:"data already exist",
                data:isExist
            })
        }
        const user = User.create(req.body)
        res.status(201).json({
            data:user
        })
    },
    read: async (req,res) => {
        let {name, email, is_active} = req.query;
        if (is_active != undefined) {
            is_active = is_active === "true"
        }
        const filtered = User.findAll({name,email,is_active})
        res.status(200).json(filtered)
    },
    readById: async (req,res) => {
        const {id} = req.params
        const data = User.find({id})
        if (!data) {
            return res.status(404).json({
                message:`No data with id ${id}`
            })
        }
        res.status(200).json(data)
    },
    update: async (req,res) => {
        const {name,email,password,is_active} = req.body;
        const {id} = req.params
        if (!name && !email && !password && is_active==null) {
            return res.status(200).json({
                message:"no data updated"
            })
        }

        const user = User.find({id})
        const updatedUser = user.update(req.body)
        return res.status(200).json({
            updatedUser
        })
    },
    delete: (req,res) => {
        const {id} = req.params
        const deleted = User.delete({id})
        if (!deleted) {
            return res.status(404).json({
                message:"no data deleted"
            })
        }
        return res.status(200).json({
            data:deleted
        })
    }
}

app.post("/api/user", usersMethod.create);
app.get("/api/user",usersMethod.read)
app.get("/api/user/:id",usersMethod.readById)
app.patch("/api/user/:id",usersMethod.update)
app.delete("/api/user/:id",usersMethod.delete)

app.listen(3000, () => {
    console.log("Server running at http://127.0.0.1:3000")
  })